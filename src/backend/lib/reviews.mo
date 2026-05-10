import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Types "../types/reviews";

module {
  public type Review = Types.Review;

  public func createReview(
    reviews : Map.Map<Nat, Review>,
    nextId : Nat,
    productId : Text,
    rating : Nat,
    reviewText : Text,
    authorName : Text,
    now : Int,
  ) : Nat {
    Debug.todo()
  };

  public func getProductReviews(
    reviews : Map.Map<Nat, Review>,
    productId : Text,
  ) : [Review] {
    Debug.todo()
  };

  public func deleteReview(
    reviews : Map.Map<Nat, Review>,
    reviewId : Nat,
    adminPassword : Text,
  ) : Bool {
    Debug.todo()
  };
};
