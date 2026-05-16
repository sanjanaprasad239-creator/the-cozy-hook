import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Types "../types/product-images";

module {
  public type ProductImage = Types.ProductImage;

  /// Stores or replaces the image URL for the given product ID.
  /// Updates the in-memory product map's imagePath field when the product exists.
  public func setProductImage(
    productImages : Map.Map<Text, Text>,
    productId : Text,
    imageUrl : Text,
  ) : () {
    Debug.todo()
  };

  /// Returns all (productId, imageUrl) pairs currently stored.
  public func getProductImages(
    productImages : Map.Map<Text, Text>,
  ) : [ProductImage] {
    Debug.todo()
  };

  /// Looks up the stored image URL for a single product, returning null when none is set.
  public func getProductImage(
    productImages : Map.Map<Text, Text>,
    productId : Text,
  ) : ?Text {
    Debug.todo()
  };
};
