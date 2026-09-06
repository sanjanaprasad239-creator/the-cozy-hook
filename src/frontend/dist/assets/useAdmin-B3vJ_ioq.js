var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a, _client2, _currentResult2, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn2, _b;
import { P as ProtocolError, T as TimeoutWaitingForResponseErrorCode, t as utf8ToBytes, w as ExternalError, x as MissingRootKeyErrorCode, y as Certificate, z as lookupResultToBuffer, R as RequestStatusResponseStatus, U as UnknownError, G as RequestStatusDoneNoReplyErrorCode, I as RejectError, J as CertifiedRejectErrorCode, K as UNREACHABLE_ERROR, N as InputError, O as InvalidReadStateRequestErrorCode, Q as ReadRequestType, V as Principal, Y as IDL, Z as MissingCanisterIdErrorCode, _ as HttpAgent, $ as encode, a0 as QueryResponseStatus, a1 as UncertifiedRejectErrorCode, a2 as isV3ResponseBody, a3 as isV2ResponseBody, a4 as UncertifiedRejectUpdateErrorCode, a5 as UnexpectedErrorCode, a6 as decode, a7 as Subscribable, a8 as pendingThenable, a9 as resolveEnabled, aa as shallowEqualObjects, ab as resolveStaleTime, ac as noop, ad as environmentManager, ae as isValidTimeout, af as timeUntilStale, ag as timeoutManager, ah as focusManager, ai as fetchState, aj as replaceData, ak as notifyManager, al as hashKey, am as getDefaultState, r as reactExports, an as shouldThrowError, ao as useQueryClient, ap as useInternetIdentity, aq as createActorWithConfig, ar as Variant, as as Record, at as Vec, au as Service, av as Func, aw as Text, ax as Opt, ay as Null, az as Bool, aA as Float64, aB as Nat, aC as Int } from "./index-BoTxUwZ-.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = {
        ...options,
        ...(_b2 = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b2.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = {
        ...options,
        ...(_b2 = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b2.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout2 = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout2));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var MutationObserver = (_b = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client2);
    __privateAdd(this, _currentResult2);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client2, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client2).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client2).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult2);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client2).getMutationCache().build(__privateGet(this, _client2), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client2 = new WeakMap(), _currentResult2 = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult2, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn2 = function(action) {
  notifyManager.batch(() => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult2).variables;
      const onMutateResult = __privateGet(this, _currentResult2).context;
      const context = {
        client: __privateGet(this, _client2),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b2 = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b2.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult2));
    });
  });
}, _b);
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b2, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b2 = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b2.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const Value = Variant({
  "int": Int,
  "nat": Nat,
  "float": Float64,
  "bool": Bool,
  "null": Null,
  "text": Text
});
const Cell = Record({ "value": Value, "name": Text });
const Result = Record({
  "hasMore": Bool,
  "rows": Vec(Vec(Cell))
});
const WhatsappSubscriber = Record({
  "id": Text,
  "subscribedAt": Int,
  "name": Text,
  "phone": Text
});
const Bundle = Record({
  "id": Text,
  "productIds": Vec(Text),
  "name": Text,
  "description": Text,
  "imageUrl": Text,
  "badge": Text,
  "price": Nat
});
const ProductTimer = Record({
  "productId": Text,
  "caption": Text,
  "endTimestamp": Int
});
const PressEntry = Record({
  "id": Text,
  "url": Text,
  "outlet": Text,
  "title": Text,
  "date": Text
});
const AdminSettings = Record({
  "currentlyCrafting": Text,
  "whatsappSubscribers": Vec(WhatsappSubscriber),
  "soldOutProductIds": Vec(Text),
  "bundles": Vec(Bundle),
  "featuredProductIds": Vec(Text),
  "productTimers": Vec(ProductTimer),
  "pressEntries": Vec(PressEntry),
  "heroTitle": Text,
  "heroTagline": Text
});
const Review = Record({
  "id": Nat,
  "authorName": Text,
  "reviewText": Text,
  "productId": Text,
  "timestamp": Int,
  "rating": Nat
});
const Product = Record({
  "id": Text,
  "features": Vec(Text),
  "imagePath": Text,
  "name": Text,
  "description": Text,
  "category": Text,
  "price": Nat
});
const ProductImage = Record({
  "productId": Text,
  "imageUrl": Text
});
Service({
  "addReview": Func(
    [Text, Nat, Text, Text],
    [Nat],
    []
  ),
  "adminLogin": Func([Text], [Bool], []),
  "deleteReview": Func([Nat, Text], [Bool], []),
  "execute": Func([Text], [Result], ["query"]),
  "getAdminSettings": Func([], [AdminSettings], ["query"]),
  "getAllReviews": Func([], [Vec(Review)], ["query"]),
  "getApiDoc": Func([], [Text], ["query"]),
  "getProductById": Func([Text], [Opt(Product)], ["query"]),
  "getProductImage": Func([Text], [Opt(Text)], ["query"]),
  "getProductImages": Func([], [Vec(ProductImage)], ["query"]),
  "getProducts": Func([], [Vec(Product)], ["query"]),
  "getProductsByCategory": Func([Text], [Vec(Product)], ["query"]),
  "getReviewsByProduct": Func([Text], [Vec(Review)], ["query"]),
  "schema": Func([], [Text], ["query"]),
  "setBundles": Func([Vec(Bundle)], [], []),
  "setCurrentlyCrafting": Func([Text], [], []),
  "setFeaturedProducts": Func([Vec(Text)], [], []),
  "setPressEntries": Func([Vec(PressEntry)], [], []),
  "setProductImage": Func([Text, Text], [], []),
  "setProductTimers": Func([Vec(ProductTimer)], [], []),
  "setSoldOutProducts": Func([Vec(Text)], [], []),
  "setWhatsappSubscribers": Func([Vec(WhatsappSubscriber)], [], []),
  "updateHeroText": Func([Text, Text], [], [])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const Value2 = IDL2.Variant({
    "int": IDL2.Int,
    "nat": IDL2.Nat,
    "float": IDL2.Float64,
    "bool": IDL2.Bool,
    "null": IDL2.Null,
    "text": IDL2.Text
  });
  const Cell2 = IDL2.Record({ "value": Value2, "name": IDL2.Text });
  const Result2 = IDL2.Record({
    "hasMore": IDL2.Bool,
    "rows": IDL2.Vec(IDL2.Vec(Cell2))
  });
  const WhatsappSubscriber2 = IDL2.Record({
    "id": IDL2.Text,
    "subscribedAt": IDL2.Int,
    "name": IDL2.Text,
    "phone": IDL2.Text
  });
  const Bundle2 = IDL2.Record({
    "id": IDL2.Text,
    "productIds": IDL2.Vec(IDL2.Text),
    "name": IDL2.Text,
    "description": IDL2.Text,
    "imageUrl": IDL2.Text,
    "badge": IDL2.Text,
    "price": IDL2.Nat
  });
  const ProductTimer2 = IDL2.Record({
    "productId": IDL2.Text,
    "caption": IDL2.Text,
    "endTimestamp": IDL2.Int
  });
  const PressEntry2 = IDL2.Record({
    "id": IDL2.Text,
    "url": IDL2.Text,
    "outlet": IDL2.Text,
    "title": IDL2.Text,
    "date": IDL2.Text
  });
  const AdminSettings2 = IDL2.Record({
    "currentlyCrafting": IDL2.Text,
    "whatsappSubscribers": IDL2.Vec(WhatsappSubscriber2),
    "soldOutProductIds": IDL2.Vec(IDL2.Text),
    "bundles": IDL2.Vec(Bundle2),
    "featuredProductIds": IDL2.Vec(IDL2.Text),
    "productTimers": IDL2.Vec(ProductTimer2),
    "pressEntries": IDL2.Vec(PressEntry2),
    "heroTitle": IDL2.Text,
    "heroTagline": IDL2.Text
  });
  const Review2 = IDL2.Record({
    "id": IDL2.Nat,
    "authorName": IDL2.Text,
    "reviewText": IDL2.Text,
    "productId": IDL2.Text,
    "timestamp": IDL2.Int,
    "rating": IDL2.Nat
  });
  const Product2 = IDL2.Record({
    "id": IDL2.Text,
    "features": IDL2.Vec(IDL2.Text),
    "imagePath": IDL2.Text,
    "name": IDL2.Text,
    "description": IDL2.Text,
    "category": IDL2.Text,
    "price": IDL2.Nat
  });
  const ProductImage2 = IDL2.Record({
    "productId": IDL2.Text,
    "imageUrl": IDL2.Text
  });
  return IDL2.Service({
    "addReview": IDL2.Func(
      [IDL2.Text, IDL2.Nat, IDL2.Text, IDL2.Text],
      [IDL2.Nat],
      []
    ),
    "adminLogin": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "deleteReview": IDL2.Func([IDL2.Nat, IDL2.Text], [IDL2.Bool], []),
    "execute": IDL2.Func([IDL2.Text], [Result2], ["query"]),
    "getAdminSettings": IDL2.Func([], [AdminSettings2], ["query"]),
    "getAllReviews": IDL2.Func([], [IDL2.Vec(Review2)], ["query"]),
    "getApiDoc": IDL2.Func([], [IDL2.Text], ["query"]),
    "getProductById": IDL2.Func([IDL2.Text], [IDL2.Opt(Product2)], ["query"]),
    "getProductImage": IDL2.Func([IDL2.Text], [IDL2.Opt(IDL2.Text)], ["query"]),
    "getProductImages": IDL2.Func([], [IDL2.Vec(ProductImage2)], ["query"]),
    "getProducts": IDL2.Func([], [IDL2.Vec(Product2)], ["query"]),
    "getProductsByCategory": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(Product2)],
      ["query"]
    ),
    "getReviewsByProduct": IDL2.Func([IDL2.Text], [IDL2.Vec(Review2)], ["query"]),
    "schema": IDL2.Func([], [IDL2.Text], ["query"]),
    "setBundles": IDL2.Func([IDL2.Vec(Bundle2)], [], []),
    "setCurrentlyCrafting": IDL2.Func([IDL2.Text], [], []),
    "setFeaturedProducts": IDL2.Func([IDL2.Vec(IDL2.Text)], [], []),
    "setPressEntries": IDL2.Func([IDL2.Vec(PressEntry2)], [], []),
    "setProductImage": IDL2.Func([IDL2.Text, IDL2.Text], [], []),
    "setProductTimers": IDL2.Func([IDL2.Vec(ProductTimer2)], [], []),
    "setSoldOutProducts": IDL2.Func([IDL2.Vec(IDL2.Text)], [], []),
    "setWhatsappSubscribers": IDL2.Func([IDL2.Vec(WhatsappSubscriber2)], [], []),
    "updateHeroText": IDL2.Func([IDL2.Text, IDL2.Text], [], [])
  });
};
new TextEncoder().encode("icfs-chunk/");
new TextEncoder().encode("icfs-metadata/");
new TextEncoder().encode("ynode/");
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async addReview(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.addReview(arg0, arg1, arg2, arg3);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addReview(arg0, arg1, arg2, arg3);
      return result;
    }
  }
  async adminLogin(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminLogin(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminLogin(arg0);
      return result;
    }
  }
  async deleteReview(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteReview(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteReview(arg0, arg1);
      return result;
    }
  }
  async execute(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.execute(arg0);
        return from_candid_Result_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.execute(arg0);
      return from_candid_Result_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAdminSettings() {
    if (this.processError) {
      try {
        const result = await this.actor.getAdminSettings();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAdminSettings();
      return result;
    }
  }
  async getAllReviews() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllReviews();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllReviews();
      return result;
    }
  }
  async getApiDoc() {
    if (this.processError) {
      try {
        const result = await this.actor.getApiDoc();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getApiDoc();
      return result;
    }
  }
  async getProductById(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProductById(arg0);
        return from_candid_opt_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProductById(arg0);
      return from_candid_opt_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProductImage(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProductImage(arg0);
        return from_candid_opt_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProductImage(arg0);
      return from_candid_opt_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProductImages() {
    if (this.processError) {
      try {
        const result = await this.actor.getProductImages();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProductImages();
      return result;
    }
  }
  async getProducts() {
    if (this.processError) {
      try {
        const result = await this.actor.getProducts();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProducts();
      return result;
    }
  }
  async getProductsByCategory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProductsByCategory(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProductsByCategory(arg0);
      return result;
    }
  }
  async getReviewsByProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getReviewsByProduct(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getReviewsByProduct(arg0);
      return result;
    }
  }
  async schema() {
    if (this.processError) {
      try {
        const result = await this.actor.schema();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.schema();
      return result;
    }
  }
  async setBundles(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setBundles(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setBundles(arg0);
      return result;
    }
  }
  async setCurrentlyCrafting(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setCurrentlyCrafting(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setCurrentlyCrafting(arg0);
      return result;
    }
  }
  async setFeaturedProducts(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setFeaturedProducts(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setFeaturedProducts(arg0);
      return result;
    }
  }
  async setPressEntries(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setPressEntries(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setPressEntries(arg0);
      return result;
    }
  }
  async setProductImage(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.setProductImage(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setProductImage(arg0, arg1);
      return result;
    }
  }
  async setProductTimers(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setProductTimers(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setProductTimers(arg0);
      return result;
    }
  }
  async setSoldOutProducts(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setSoldOutProducts(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setSoldOutProducts(arg0);
      return result;
    }
  }
  async setWhatsappSubscribers(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setWhatsappSubscribers(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setWhatsappSubscribers(arg0);
      return result;
    }
  }
  async updateHeroText(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateHeroText(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateHeroText(arg0, arg1);
      return result;
    }
  }
}
function from_candid_Cell_n5(_uploadFile, _downloadFile, value) {
  return from_candid_record_n6(_uploadFile, _downloadFile, value);
}
function from_candid_Result_n1(_uploadFile, _downloadFile, value) {
  return from_candid_record_n2(_uploadFile, _downloadFile, value);
}
function from_candid_Value_n7(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n8(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n10(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n9(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n2(_uploadFile, _downloadFile, value) {
  return {
    hasMore: value.hasMore,
    rows: from_candid_vec_n3(_uploadFile, _downloadFile, value.rows)
  };
}
function from_candid_record_n6(_uploadFile, _downloadFile, value) {
  return {
    value: from_candid_Value_n7(_uploadFile, _downloadFile, value.value),
    name: value.name
  };
}
function from_candid_variant_n8(_uploadFile, _downloadFile, value) {
  return "int" in value ? {
    __kind__: "int",
    int: value.int
  } : "nat" in value ? {
    __kind__: "nat",
    nat: value.nat
  } : "float" in value ? {
    __kind__: "float",
    float: value.float
  } : "bool" in value ? {
    __kind__: "bool",
    bool: value.bool
  } : "null" in value ? {
    __kind__: "null",
    null: value.null
  } : "text" in value ? {
    __kind__: "text",
    text: value.text
  } : value;
}
function from_candid_vec_n3(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_vec_n4(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n4(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Cell_n5(_uploadFile, _downloadFile, x));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
const ALL_PRODUCTS = [
  // ── Plushies ──────────────────────────────────────────────────────────────
  {
    id: "plush-002",
    name: "whale plushie",
    category: "plushies",
    price: 299,
    description: "A chubby little whale that fits perfectly in your palm. Deep ocean blue yarn with a soft cream belly and tiny sprouting water droplets on top — utterly adorable.",
    features: [
      "Soft merino-blend yarn",
      "Satin ribbon accent",
      "Approx. 18 cm long",
      "Hypoallergenic stuffing"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "plush-003",
    name: "octopus plushie",
    category: "plushies",
    price: 249,
    description: "Eight wriggly arms and a round squishy body — this crochet octopus is both a toy and a mood booster. Flip the head to reveal a second hidden expression.",
    features: [
      "Reversible happy/grumpy face",
      "8 flexible tentacles",
      "Durable cotton yarn",
      "Approx. 22 cm"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "plush-004",
    name: "bear plushie",
    category: "plushies",
    price: 349,
    description: "A classic teddy silhouette reimagined in crochet. This warm honey-toned bear has a small heart stitched on its chest — a thoughtful handmade gift for any occasion.",
    features: [
      "Warm honey cotton yarn",
      "Heart chest embroidery",
      "Approx. 19 cm tall",
      "Safe wire-free construction"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "plush-006",
    name: "frog plushie",
    category: "plushies",
    price: 249,
    description: "Ribbit! This sage-green crochet frog with its signature wide eyes and tiny smile is perpetually mid-jump and permanently cheerful.",
    features: [
      "Sage green yarn",
      "Wide safety-grade button eyes",
      "Approx. 17 cm",
      "Hypoallergenic fill"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "plush-007",
    name: "cowboy duck plushie",
    category: "plushies",
    price: 299,
    description: "Yeehaw! Your favourite duck now in a tiny crocheted cowboy hat and boots. A collector's piece that makes everyone smile.",
    features: [
      "Removable cowboy hat",
      "Hand-stitched boots detail",
      "Approx. 20 cm tall",
      "Collector's edition colourway"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "plush-001",
    name: "bunny plushie",
    category: "plushies",
    price: 299,
    description: "Meet your new soft companion — this hand-crocheted bunny is stuffed with premium hypoallergenic filling and finished with embroidered features that give her the most endearing expression.",
    features: [
      "100% cotton yarn",
      "Hypoallergenic polyester fill",
      "Embroidered nose & eyes",
      "Approx. 20 cm tall"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "plush-008",
    name: "strawberry costumed bunny",
    category: "plushies",
    price: 399,
    description: "A bunny dressed in a strawberry costume — red body with white seed dots, green leaf ears, and the most innocent face. A seasonal favourite that sells out fast.",
    features: [
      "Red & white cotton yarn",
      "Leaf-shaped ears",
      "Approx. 21 cm",
      "Extra huggable design"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true
  },
  // ── Keychains ─────────────────────────────────────────────────────────────
  {
    id: "key-003",
    name: "mini bouquet keychain",
    category: "keychains",
    price: 149,
    description: "A tiny hand-crocheted flower bouquet keychain — delicate blooms in soft pastels that bring a garden touch to your keys or bag.",
    features: [
      "Mini bouquet design",
      "Pastel yarn blooms",
      "Gold-tone ring",
      "Approx. 7 cm with ring"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "gradient-flower-keychain",
    name: "gradient flower keychain",
    category: "keychains",
    price: 129,
    description: "A gorgeous hand-crocheted flower keychain worked in a gentle colour gradient — each petal blends seamlessly into the next for a truly unique finish.",
    features: [
      "Gradient colour yarn",
      "Full bloom flower shape",
      "Stainless steel ring",
      "Approx. 7 cm with ring"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "cake-roll-keychain",
    name: "cake roll keychain",
    category: "keychains",
    price: 149,
    description: "An irresistibly cute crochet cake roll keychain that looks good enough to eat. A miniature Swiss roll complete with cream filling detail.",
    features: [
      "Cake roll swirl design",
      "Cream fill detailing",
      "Cotton yarn",
      "Approx. 6 cm long"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true
  },
  {
    id: "key-006",
    name: "bow keychain",
    category: "keychains",
    price: 119,
    description: "A sweet oversized bow that makes your keys look like a gift. Available in a range of pastel shades.",
    features: [
      "Oversized bow shape",
      "Pastel colour options",
      "Lightweight cotton",
      "Approx. 8 cm wide"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "bow-keychain-thin",
    name: "bow keychain (thin)",
    category: "keychains",
    price: 99,
    description: "A slender, delicate bow keychain for those who love a subtler look. Dainty proportions, maximum charm.",
    features: [
      "Thin bow silhouette",
      "Fine cotton yarn",
      "Lightweight",
      "Approx. 6 cm wide"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "key-007",
    name: "cherry keychain",
    category: "keychains",
    price: 129,
    description: "Twin cherries on a shared stem — the cutest keychain in the collection. Always sold in pairs.",
    features: [
      "Twin cherry design",
      "Red & green yarn",
      "Shared gold stem",
      "Approx. 9 cm total"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "key-001",
    name: "starfish keychain",
    category: "keychains",
    price: 119,
    description: "A tiny hand-crocheted starfish in warm sandy tones — bring a little beach wherever you go.",
    features: [
      "5-arm starfish shape",
      "Stainless steel ring",
      "Approx. 6 cm",
      "Cotton yarn"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "key-002",
    name: "heart keychain",
    category: "keychains",
    price: 109,
    description: "A plump crochet heart in dusty rose — the most effortless way to carry a little love.",
    features: [
      "Plump heart shape",
      "Dusty rose yarn",
      "Stainless steel clasp",
      "Approx. 5 cm"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "key-004",
    name: "bunny keychain",
    category: "keychains",
    price: 129,
    description: "A miniature bunny with floppy ears. Pick your colour — white, grey, pastel pink, or sage.",
    features: [
      "Floppy ears design",
      "4 colour options",
      "Safety eyes",
      "Approx. 8 cm"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "sunflower-keychain",
    name: "sunflower keychain",
    category: "keychains",
    price: 149,
    description: "A cheerful hand-crocheted sunflower keychain in bright yellow and warm brown — a little ray of sunshine wherever you go.",
    features: [
      "Sunflower bloom shape",
      "Bright yellow & brown yarn",
      "Gold-tone ring",
      "Approx. 7 cm with ring"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "key-005",
    name: "initial letter keychain (custom)",
    category: "keychains",
    price: 159,
    description: "Your initial, hand-crocheted in 3D block lettering. Personalised, practical, and proud.",
    features: [
      "Any letter A–Z",
      "3D block letter",
      "Custom colour on request",
      "Approx. 5 cm"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  // ── Wearables ─────────────────────────────────────────────────────────────
  {
    id: "hairband",
    name: "hairband",
    category: "wearables",
    price: 149,
    description: "A wide crocheted hairband worked in a delicate shell stitch — elegant enough for date night, cozy enough for every day.",
    features: [
      "Wide shell-stitch design",
      "Stretch fit",
      "Soft cotton yarn",
      "Pastel shades available"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "wear-004",
    name: "fingerless gloves",
    category: "wearables",
    price: 299,
    description: "Stay warm while keeping your fingertips free — perfect for typing, scrolling, and everything in between.",
    features: [
      "Fingerless design",
      "Ribbed cuffs",
      "One size (adjustable)",
      "Wool-blend yarn"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "wear-005",
    name: "bucket hat",
    category: "wearables",
    price: 399,
    description: "A wide-brimmed crochet bucket hat in open-weave cotton — perfect for sunny days and festival looks.",
    features: [
      "Wide brim",
      "Open-weave cotton",
      "Adjustable inner tie",
      "Summer colourways"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "bandana",
    name: "bandana",
    category: "wearables",
    price: 249,
    description: "A hand-crocheted bandana in lightweight cotton — wear it as a neck scarf, head wrap, or hair tie for a boho touch.",
    features: [
      "Versatile styling options",
      "Lightweight cotton yarn",
      "One size fits all",
      "Multiple colourways"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "daisy-headband",
    name: "daisy headband",
    category: "wearables",
    price: 299,
    description: "A charming crochet headband adorned with tiny daisy flowers — the perfect finishing touch for summer looks and everyday wear.",
    features: [
      "Daisy flower embellishments",
      "Stretchy & comfortable fit",
      "Cotton yarn",
      "One size fits most"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true
  },
  // ── Home Decor ────────────────────────────────────────────────────────────
  {
    id: "hanging-plant",
    name: "hanging plant",
    category: "home decor",
    price: 349,
    description: "A beautiful macramé-style crochet hanging planter that adds a touch of boho green to any wall or window.",
    features: [
      "Fits pots up to 12 cm diameter",
      "Natural cotton cord",
      "Ready-to-hang loop",
      "Approx. 40 cm drop"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "decor-006",
    name: "heart pillow",
    category: "home decor",
    price: 399,
    description: "A giant crocheted heart pillow in dusty rose — the cosiest declaration of love for your living room or bedroom.",
    features: [
      "Heart shape",
      "30 cm width",
      "Dusty rose yarn",
      "Fiberfill stuffed"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "decor-001",
    name: "coaster set",
    category: "home decor",
    price: 299,
    description: "A set of 4 mandala-style coasters in coordinating pastel tones — protect your surfaces in style.",
    features: ["Set of 4", "Mandala pattern", "10 cm diameter", "100% cotton"],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "decor-002",
    name: "table mat",
    category: "home decor",
    price: 399,
    description: "Rectangular placemats in a classic stripe pattern — natural fibre colours that complement any table setting.",
    features: ["Set of 2", "33 × 45 cm", "Jute-cotton blend", "Heat resistant"],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "decor-003",
    name: "wall hanging",
    category: "home decor",
    price: 499,
    description: "A boho-chic wall hanging with layered fringe and woven rings — handcrafted to be the focal point of any room.",
    features: [
      "Driftwood dowel",
      "Layered fringe",
      "Approx. 60 cm tall",
      "Ready to hang"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  // ── Accessories ───────────────────────────────────────────────────────────
  {
    id: "tulip-hair-accessory",
    name: "tulip hair accessory",
    category: "accessories",
    price: 149,
    description: "A hand-crocheted tulip hair clip that adds a sweet floral accent to any hairstyle — delicate and perfectly spring-ready.",
    features: [
      "Tulip bloom design",
      "Secure clip backing",
      "Cotton yarn",
      "Approx. 5 cm bloom"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true
  },
  {
    id: "acc-001",
    name: "scrunchies",
    category: "accessories",
    price: 99,
    description: "Chunky crochet scrunchies that are gentle on your hair and great as a wrist accessory too.",
    features: [
      "Soft elastic inside",
      "Cotton yarn",
      "One size",
      "Multiple colours"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "acc-002",
    name: "bookmarks",
    category: "accessories",
    price: 79,
    description: "Slender crochet bookmarks with a tiny charm end — because even reading deserves a little handmade love.",
    features: [
      "15 cm length",
      "Charm end (heart/flower/star)",
      "Cotton thread",
      "Customisable"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "acc-003",
    name: "phone charms",
    category: "accessories",
    price: 119,
    description: "Clip a tiny crochet charm to your phone loop — pastel animals, fruits, and shapes to choose from.",
    features: [
      "Universal phone loop clip",
      "Choose from 12 designs",
      "Approx. 6 cm",
      "Cotton yarn"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true
  },
  {
    id: "acc-004",
    name: "mini pouches",
    category: "accessories",
    price: 199,
    description: "A small crochet pouch with a zip closure — use it for coins, earbuds, or tiny treasures.",
    features: ["Zip closure", "10 × 8 cm", "Cotton yarn", "Inner lining"],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  },
  {
    id: "acc-005",
    name: "bag charms",
    category: "accessories",
    price: 149,
    description: "Upgrade any tote or backpack with a statement crochet charm. Mix and match shapes and colours.",
    features: [
      "Lobster clasp",
      "Multiple shapes",
      "Approx. 12 cm with chain",
      "Cotton yarn"
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images"
  }
];
const SAMPLE_BUNDLES = [
  {
    id: "bundle-001",
    name: "plushie + keychain duo",
    description: "a chubby whale plushie paired with a sweet heart keychain — perfect for gifting or treating yourself to a matching set.",
    price: 369,
    productIds: ["plush-002", "key-002"],
    savings: 39,
    isActive: true
  },
  {
    id: "bundle-002",
    name: "gifting set",
    description: "the ultimate handmade gift: a cuddly bunny plushie, a cute bow keychain, and a soft scrunchie — all wrapped up with love.",
    price: 479,
    productIds: ["plush-001", "key-006", "acc-001"],
    savings: 48,
    isActive: true
  },
  {
    id: "bundle-003",
    name: "wearables bundle",
    description: "a charming trio for the crochet lover — a shell-stitch hairband, a cozy scrunchie, and a sweet bow keychain to complete any look.",
    price: 299,
    productIds: ["hairband", "acc-001", "key-006"],
    savings: 68,
    isActive: true
  }
];
const FEATURED_PRODUCT_IDS = [
  "plush-001",
  "plush-007",
  "key-007",
  "decor-006"
];
const CATEGORIES = [
  "plushies",
  "keychains",
  "wearables",
  "home decor",
  "accessories"
];
function getProductsByCategory(category) {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}
function getProductById(id) {
  return ALL_PRODUCTS.find((p) => p.id === id);
}
function getFeaturedProducts(ids) {
  return ids.map((id) => ALL_PRODUCTS.find((p) => p.id === id)).filter(Boolean);
}
const DEFAULT_ADMIN_SETTINGS = {
  heroTitle: "The Cozy Hook",
  heroTagline: "Handmade Crochet with Love",
  featuredProductIds: [
    "plush-001",
    "plush-007",
    "key-007",
    "acc-001",
    "decor-006"
  ],
  soldOutProductIds: [],
  bundles: SAMPLE_BUNDLES,
  pressEntries: [],
  currentlyCrafting: "currently crafting: strawberry costumed bunny plushies this week! 🌸",
  productTimers: {},
  whatsappSubscribers: []
};
function timestampToDateString(timestamp) {
  const date = new Date(Number(timestamp / 1000000n));
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function computeBundleSavings(bundle) {
  const total = bundle.productIds.reduce(
    (sum, pid) => {
      var _a2;
      return sum + (((_a2 = getProductById(pid)) == null ? void 0 : _a2.price) ?? 0);
    },
    0
  );
  return Math.max(0, total - Number(bundle.price));
}
function toPageSettings(backend) {
  const productTimers = {};
  for (const timer of backend.productTimers ?? []) {
    productTimers[timer.productId] = {
      label: timer.caption,
      endDate: timestampToDateString(timer.endTimestamp)
    };
  }
  return {
    heroTitle: backend.heroTitle,
    heroTagline: backend.heroTagline,
    featuredProductIds: backend.featuredProductIds ?? [],
    soldOutProductIds: backend.soldOutProductIds ?? [],
    bundles: (backend.bundles ?? []).map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      price: Number(b.price),
      productIds: b.productIds,
      savings: computeBundleSavings(b),
      isActive: true,
      imageUrl: b.imageUrl,
      badge: b.badge
    })),
    pressEntries: (backend.pressEntries ?? []).map((e) => ({
      id: e.id,
      title: e.title,
      link: e.url,
      date: e.date,
      url: e.url,
      outlet: e.outlet
    })),
    currentlyCrafting: backend.currentlyCrafting ?? "",
    productTimers,
    whatsappSubscribers: backend.whatsappSubscribers ?? []
  };
}
function useAdminSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["adminSettings"],
    queryFn: async () => {
      if (!actor) return DEFAULT_ADMIN_SETTINGS;
      return toPageSettings(await actor.getAdminSettings());
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
const REVIEWS_KEY = "cozy-hook-reviews";
function loadAllReviews() {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveAllReviews(reviews) {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  } catch {
  }
}
function useProductReviews(productId) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const all = loadAllReviews();
      return all.filter((r) => r.productId === productId);
    },
    enabled: !!productId,
    staleTime: 0
  });
}
function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      const all = loadAllReviews();
      const nextId = all.length > 0 ? Math.max(...all.map((r) => r.id)) + 1 : 1;
      const review = {
        id: nextId,
        productId: input.productId,
        rating: input.rating,
        reviewText: input.reviewText,
        authorName: input.authorName,
        timestamp: Date.now(),
        ...input.imageUrls && input.imageUrls.length > 0 ? { imageUrls: input.imageUrls } : {}
      };
      saveAllReviews([...all, review]);
      return nextId;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId]
      });
    }
  });
}
function dateStringToTimestamp(dateStr) {
  const date = /* @__PURE__ */ new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return BigInt(0);
  return BigInt(date.getTime()) * 1000000n;
}
function toBackendBundles(bundles) {
  return bundles.map((b) => ({
    id: b.id,
    productIds: b.productIds,
    name: b.name,
    description: b.description,
    imageUrl: b.imageUrl ?? "",
    badge: b.badge ?? "",
    price: BigInt(Math.round(b.price))
  }));
}
function toBackendPressEntries(entries) {
  return entries.map((e) => ({
    id: e.id,
    url: e.url ?? e.link,
    outlet: e.outlet ?? "",
    title: e.title,
    date: e.date
  }));
}
function toBackendTimers(timers) {
  return Object.entries(timers).map(([productId, timer]) => ({
    productId,
    caption: timer.label,
    endTimestamp: dateStringToTimestamp(timer.endDate)
  }));
}
function useAdmin() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [settings, setSettings] = reactExports.useState(
    DEFAULT_ADMIN_SETTINGS
  );
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const settingsRef = reactExports.useRef(settings);
  reactExports.useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);
  const { data: backendSettings } = useAdminSettings();
  reactExports.useEffect(() => {
    if (backendSettings) setSettings(backendSettings);
  }, [backendSettings]);
  const runSave = reactExports.useCallback(
    async (save) => {
      if (!actor) return;
      try {
        await save();
        void queryClient.invalidateQueries({ queryKey: ["adminSettings"] });
      } catch {
        setError("Could not save changes. Please try again.");
      }
    },
    [actor, queryClient]
  );
  const login = reactExports.useCallback(
    async (password) => {
      setIsLoading(true);
      setError(null);
      try {
        if (!actor) {
          setError("Backend is not available yet. Please try again later.");
          return false;
        }
        const ok = await actor.adminLogin(password);
        if (ok) {
          setIsAuthenticated(true);
        } else {
          setError("Incorrect password. Please try again.");
        }
        return ok;
      } catch {
        setError("Could not reach the backend. Please try again.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [actor]
  );
  const logout = reactExports.useCallback(() => {
    setIsAuthenticated(false);
    setError(null);
  }, []);
  const updateHero = reactExports.useCallback(
    (title, tagline) => {
      setSettings((prev) => ({
        ...prev,
        heroTitle: title,
        heroTagline: tagline
      }));
      const a = actor;
      if (a) void runSave(() => a.updateHeroText(title, tagline));
    },
    [actor, runSave]
  );
  const updateFeaturedProducts = reactExports.useCallback(
    (ids) => {
      setSettings((prev) => ({ ...prev, featuredProductIds: ids }));
      const a = actor;
      if (a) void runSave(() => a.setFeaturedProducts(ids));
    },
    [actor, runSave]
  );
  const toggleSoldOut = reactExports.useCallback(
    (productId) => {
      const ids = settingsRef.current.soldOutProductIds ?? [];
      const nextIds = ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId];
      setSettings((prev) => ({ ...prev, soldOutProductIds: nextIds }));
      const a = actor;
      if (a) void runSave(() => a.setSoldOutProducts(nextIds));
    },
    [actor, runSave]
  );
  const addBundle = reactExports.useCallback(
    (bundle) => {
      const next = [...settingsRef.current.bundles ?? [], bundle];
      setSettings((prev) => ({ ...prev, bundles: next }));
      const a = actor;
      if (a) void runSave(() => a.setBundles(toBackendBundles(next)));
    },
    [actor, runSave]
  );
  const updateBundle = reactExports.useCallback(
    (updated) => {
      const next = (settingsRef.current.bundles ?? []).map(
        (b) => b.id === updated.id ? updated : b
      );
      setSettings((prev) => ({ ...prev, bundles: next }));
      const a = actor;
      if (a) void runSave(() => a.setBundles(toBackendBundles(next)));
    },
    [actor, runSave]
  );
  const removeBundle = reactExports.useCallback(
    (bundleId) => {
      const next = (settingsRef.current.bundles ?? []).filter(
        (b) => b.id !== bundleId
      );
      setSettings((prev) => ({ ...prev, bundles: next }));
      const a = actor;
      if (a) void runSave(() => a.setBundles(toBackendBundles(next)));
    },
    [actor, runSave]
  );
  const addPressEntry = reactExports.useCallback(
    (entry) => {
      const next = [...settingsRef.current.pressEntries ?? [], entry];
      setSettings((prev) => ({ ...prev, pressEntries: next }));
      const a = actor;
      if (a) void runSave(() => a.setPressEntries(toBackendPressEntries(next)));
    },
    [actor, runSave]
  );
  const updatePressEntry = reactExports.useCallback(
    (updated) => {
      const next = (settingsRef.current.pressEntries ?? []).map(
        (e) => e.id === updated.id ? updated : e
      );
      setSettings((prev) => ({ ...prev, pressEntries: next }));
      const a = actor;
      if (a) void runSave(() => a.setPressEntries(toBackendPressEntries(next)));
    },
    [actor, runSave]
  );
  const removePressEntry = reactExports.useCallback(
    (entryId) => {
      const next = (settingsRef.current.pressEntries ?? []).filter(
        (e) => e.id !== entryId
      );
      setSettings((prev) => ({ ...prev, pressEntries: next }));
      const a = actor;
      if (a) void runSave(() => a.setPressEntries(toBackendPressEntries(next)));
    },
    [actor, runSave]
  );
  const updateCurrentlyCrafting = reactExports.useCallback(
    (text) => {
      setSettings((prev) => ({ ...prev, currentlyCrafting: text }));
      const a = actor;
      if (a) void runSave(() => a.setCurrentlyCrafting(text));
    },
    [actor, runSave]
  );
  const setProductTimer = reactExports.useCallback(
    (productId, timer) => {
      const next = {
        ...settingsRef.current,
        productTimers: {
          ...settingsRef.current.productTimers ?? {},
          [productId]: timer
        }
      };
      setSettings(next);
      const a = actor;
      if (a)
        void runSave(
          () => a.setProductTimers(toBackendTimers(next.productTimers))
        );
    },
    [actor, runSave]
  );
  const removeProductTimer = reactExports.useCallback(
    (productId) => {
      const timers = { ...settingsRef.current.productTimers ?? {} };
      delete timers[productId];
      const next = { ...settingsRef.current, productTimers: timers };
      setSettings(next);
      const a = actor;
      if (a)
        void runSave(
          () => a.setProductTimers(toBackendTimers(next.productTimers))
        );
    },
    [actor, runSave]
  );
  const setWhatsappSubscribers = reactExports.useCallback(
    (subscribers) => {
      setSettings((prev) => ({ ...prev, whatsappSubscribers: subscribers }));
      const a = actor;
      if (a) void runSave(() => a.setWhatsappSubscribers(subscribers));
    },
    [actor, runSave]
  );
  return {
    settings,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateHero,
    updateFeaturedProducts,
    toggleSoldOut,
    addBundle,
    updateBundle,
    removeBundle,
    addPressEntry,
    updatePressEntry,
    removePressEntry,
    updateCurrentlyCrafting,
    setProductTimer,
    removeProductTimer,
    setWhatsappSubscribers
  };
}
export {
  ALL_PRODUCTS as A,
  CATEGORIES as C,
  FEATURED_PRODUCT_IDS as F,
  getProductById as a,
  useCreateReview as b,
  useProductReviews as c,
  getProductsByCategory as d,
  useActor as e,
  useAdminSettings as f,
  getFeaturedProducts as g,
  createActor as h,
  loadAllReviews as l,
  useAdmin as u
};
