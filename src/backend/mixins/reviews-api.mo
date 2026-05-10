import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Types "../types/reviews";

mixin (
  reviews : Map.Map<Nat, Types.Review>,
  nextReviewId : Nat,
) {
  public func createReview(
    productId : Text,
    rating : Nat,
    reviewText : Text,
    authorName : Text,
  ) : async Nat {
    Debug.todo()
  };

  public query func getProductReviews(productId : Text) : async [Types.Review] {
    Debug.todo()
  };

  public func deleteReview(reviewId : Nat, adminPassword : Text) : async Bool {
    Debug.todo()
  };
};
