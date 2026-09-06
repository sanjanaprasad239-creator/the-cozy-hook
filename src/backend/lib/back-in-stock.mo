import List "mo:core/List";
import Map "mo:core/Map";
import Types "../types/back-in-stock";

module {
  public type BackInStockSubscription = Types.BackInStockSubscription;

  /// Adds an email subscription for a product, ignoring duplicate emails.
  public func subscribe(
    subscriptions : Map.Map<Text, List.List<BackInStockSubscription>>,
    productId : Text,
    email : Text,
    now : Int,
  ) {
    let subs = subscriptions.get(productId) ?? List.empty<BackInStockSubscription>();
    if (subs.any(func s = s.email == email)) { return };
    subs.add({ email = email; subscribedAt = now });
    subscriptions.add(productId, subs);
  };

  /// Returns all subscriptions for a product.
  public func getSubscribers(
    subscriptions : Map.Map<Text, List.List<BackInStockSubscription>>,
    productId : Text,
  ) : [BackInStockSubscription] {
    switch (subscriptions.get(productId)) {
      case (?subs) { subs.toArray() };
      case null { [] };
    };
  };

  /// Returns and clears all subscriptions for a product (used after notifying).
  public func takeSubscribers(
    subscriptions : Map.Map<Text, List.List<BackInStockSubscription>>,
    productId : Text,
  ) : [BackInStockSubscription] {
    let subs = getSubscribers(subscriptions, productId);
    subscriptions.remove(productId);
    subs
  };
};
