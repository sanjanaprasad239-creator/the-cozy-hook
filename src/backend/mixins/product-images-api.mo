import Map "mo:core/Map";
import Types "../types/product-images";
import ProductImagesLib "../lib/product-images";

mixin (productImages : Map.Map<Text, Text>) {

  /// Admin: associate an image URL with a product. The frontend passes the
  /// image path/URL (e.g. /assets/products/whale-plushie.jpg) to store as the
  /// override for that product.
  public func setProductImage(productId : Text, imageUrl : Text) : async () {
    ProductImagesLib.setProductImage(productImages, productId, imageUrl);
  };

  /// Returns all stored (productId, imageUrl) pairs.
  public query func getProductImages() : async [Types.ProductImage] {
    ProductImagesLib.getProductImages(productImages)
  };

  /// Returns the stored image URL for a specific product, or null if none set.
  public query func getProductImage(productId : Text) : async ?Text {
    ProductImagesLib.getProductImage(productImages, productId)
  };
};
