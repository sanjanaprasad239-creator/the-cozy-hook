import Map "mo:core/Map";
import Types "../types/product-images";

module {
  public type ProductImage = Types.ProductImage;

  /// Stores or replaces the image URL for the given product ID.
  public func setProductImage(
    productImages : Map.Map<Text, Text>,
    productId : Text,
    imageUrl : Text,
  ) : () {
    productImages.add(productId, imageUrl);
  };

  /// Returns all (productId, imageUrl) pairs currently stored.
  public func getProductImages(
    productImages : Map.Map<Text, Text>,
  ) : [ProductImage] {
    productImages.toArray().map(func (productId, imageUrl) = { productId; imageUrl })
  };

  /// Looks up the stored image URL for a single product, returning null when none is set.
  public func getProductImage(
    productImages : Map.Map<Text, Text>,
    productId : Text,
  ) : ?Text {
    productImages.get(productId)
  };
};
