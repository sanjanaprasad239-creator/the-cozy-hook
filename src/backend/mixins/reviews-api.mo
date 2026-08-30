import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/reviews";
import ReviewsLib "../lib/reviews";

mixin (
  reviews : List.List<Types.Review>,
  counter : { var nextReviewId : Nat },
) {
  public func addReview(productId : Text, rating : Nat, reviewText : Text, authorName : Text) : async Nat {
    ReviewsLib.createReview(reviews, counter, productId, rating, reviewText, authorName, Time.now())
  };

  public query func getReviewsByProduct(productId : Text) : async [Types.Review] {
    ReviewsLib.getProductReviews(reviews, productId)
  };

  public query func getAllReviews() : async [Types.Review] {
    ReviewsLib.getAllReviews(reviews)
  };

  public func deleteReview(reviewId : Nat, adminPassword : Text) : async Bool {
    ReviewsLib.deleteReview(reviews, reviewId, adminPassword)
  };
};
