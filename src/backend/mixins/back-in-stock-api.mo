import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import EmailClient "mo:caffeineai-email/emailClient";
import Types "../types/back-in-stock";
import BackInStockLib "../lib/back-in-stock";

mixin (backInStockSubscriptions : Map.Map<Text, List.List<Types.BackInStockSubscription>>) {
  /// Registers a buyer's email to be notified when a sold-out product returns.
  public func subscribeBackInStock(productId : Text, email : Text) : async () {
    BackInStockLib.subscribe(backInStockSubscriptions, productId, email, Time.now());
  };

  /// Returns all emails subscribed to a product's back-in-stock notification.
  public query func getBackInStockSubscribers(productId : Text) : async [Types.BackInStockSubscription] {
    BackInStockLib.getSubscribers(backInStockSubscriptions, productId);
  };

  /// Admin: sends a notification email to every subscriber of a product and
  /// clears the subscription list. Requires the admin password.
  public func notifyBackInStock(productId : Text, adminPassword : Text) : async () {
    if (adminPassword != "cozyhook2025") { return };
    let subscribers = BackInStockLib.takeSubscribers(backInStockSubscriptions, productId);
    if (subscribers.size() == 0) { return };
    let emails = subscribers.map(func s = s.email);
    let result = await EmailClient.sendServiceEmail(
      "no-reply",
      emails,
      "Back in stock: " # productId,
      "Good news! The item you were waiting for is back in stock at The Cozy Hook.",
    );
    switch (result) {
      case (#ok) {};
      case (#err(error)) { Runtime.trap("Failed to send back-in-stock emails: " # error) };
    };
  };
};
