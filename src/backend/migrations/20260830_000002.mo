import Map "mo:core/Map";
import List "mo:core/List";

module {
  type Product = {
    id : Text;
    name : Text;
    category : Text;
    price : Nat;
    description : Text;
    features : [Text];
    imagePath : Text;
  };

  type Review = {
    id : Nat;
    productId : Text;
    rating : Nat;
    reviewText : Text;
    authorName : Text;
    timestamp : Int;
  };

  type Bundle = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    productIds : [Text];
    badge : Text;
  };

  type PressEntry = {
    id : Text;
    outlet : Text;
    title : Text;
    url : Text;
    date : Text;
  };

  type ProductTimer = {
    productId : Text;
    caption : Text;
    endTimestamp : Int;
  };

  type WhatsappSubscriber = {
    id : Text;
    phone : Text;
    name : Text;
    subscribedAt : Int;
  };

  type OldActor = {
    products : Map.Map<Text, Product>;
    var heroTitle : Text;
    var heroTagline : Text;
    featuredProductIds : List.List<Text>;
    reviews : List.List<Review>;
    var nextReviewId : Nat;
  };

  type NewActor = {
    products : Map.Map<Text, Product>;
    adminSettings : {
      var heroTitle : Text;
      var heroTagline : Text;
      var adminPassword : Text;
      var currentlyCrafting : Text;
      featuredProductIds : List.List<Text>;
      soldOutProductIds : List.List<Text>;
      bundles : List.List<Bundle>;
      pressEntries : List.List<PressEntry>;
      productTimers : List.List<ProductTimer>;
      whatsappSubscribers : List.List<WhatsappSubscriber>;
    };
    reviews : List.List<Review>;
    reviewCounter : { var nextReviewId : Nat };
    productImages : Map.Map<Text, Text>;
  };

  public func migration(old : OldActor) : NewActor {
    {
      products = old.products;
      adminSettings = {
        var heroTitle = old.heroTitle;
        var heroTagline = old.heroTagline;
        var adminPassword = "cozyhook2025";
        var currentlyCrafting = "";
        featuredProductIds = old.featuredProductIds;
        soldOutProductIds = List.empty();
        bundles = List.empty();
        pressEntries = List.empty();
        productTimers = List.empty();
        whatsappSubscribers = List.empty();
      };
      reviews = old.reviews;
      reviewCounter = { var nextReviewId = old.nextReviewId };
      productImages = Map.empty();
    }
  };
}
