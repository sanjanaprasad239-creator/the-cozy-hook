import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Types "../types/product-images";

mixin (productImages : Map.Map<Text, Text>) {

  /// Admin: upload the image URL returned by object-storage for a given product.
  /// The frontend should call the object-storage uploadFile first, then pass
  /// the resulting URL here to associate it with the product.
  public func setProductImage(productId : Text, imageUrl : Text) : async () {
    Debug.todo()
  };

  /// Returns all stored (productId, imageUrl) pairs.
  public query func getProductImages() : async [Types.ProductImage] {
    Debug.todo()
  };

  /// Returns the stored image URL for a specific product, or null if none uploaded yet.
  public query func getProductImage(productId : Text) : async ?Text {
    Debug.todo()
  };
};
