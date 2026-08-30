import List "mo:core/List";
import Types "../types/reviews";

module {
  public type Review = Types.Review;

  /// Adds a new review and returns its assigned id.
  public func createReview(
    reviews : List.List<Review>,
    counter : { var nextReviewId : Nat },
    productId : Text,
    rating : Nat,
    reviewText : Text,
    authorName : Text,
    now : Int,
  ) : Nat {
    let id = counter.nextReviewId;
    counter.nextReviewId += 1;
    reviews.add({
      id = id;
      productId = productId;
      rating = rating;
      reviewText = reviewText;
      authorName = authorName;
      timestamp = now;
    });
    id
  };

  /// Returns all reviews for a single product.
  public func getProductReviews(
    reviews : List.List<Review>,
    productId : Text,
  ) : [Review] {
    reviews.filter(func r = r.productId == productId).toArray()
  };

  /// Returns every review stored.
  public func getAllReviews(
    reviews : List.List<Review>,
  ) : [Review] {
    reviews.toArray()
  };

  /// Deletes a review by id when the admin password matches.
  public func deleteReview(
    reviews : List.List<Review>,
    reviewId : Nat,
    adminPassword : Text,
  ) : Bool {
    if (adminPassword != "cozyhook2025") { return false };
    let before = reviews.size();
    reviews.retain(func r = r.id != reviewId);
    reviews.size() < before
  };
};
