import List "mo:core/List";
import Map "mo:core/Map";
import OQL "mo:caffeineai-oql";
import Expose "mo:caffeineai-oql/Expose";
import MapEntity "mo:caffeineai-oql/MapEntity";
import ListEntity "mo:caffeineai-oql/ListEntity";
import Entity "mo:caffeineai-oql/Entity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import IntValue "mo:caffeineai-oql/IntValue";
import Types "types/admin-settings";
import AdminSettingsApi "mixins/admin-settings-api";
import ReviewsApi "mixins/reviews-api";
import ProductImagesApi "mixins/product-images-api";
import ApiDocMixin "mixins/api-doc";

actor {

  // ─── Types ───────────────────────────────────────────────────────────────

  public type Review = {
    id : Nat;
    productId : Text;
    rating : Nat;
    reviewText : Text;
    authorName : Text;
    timestamp : Int;
  };

  public type Product = {
    id : Text;
    name : Text;
    category : Text;
    price : Nat;
    description : Text;
    features : [Text];
    imagePath : Text;
  };

  // ─── State ───────────────────────────────────────────────────────────────

  let products : Map.Map<Text, Product>;

  let adminSettings : Types.AdminSettingsState;

  let reviews : List.List<Review>;
  let reviewCounter : { var nextReviewId : Nat };

  let productImages : Map.Map<Text, Text>;

  include AdminSettingsApi(adminSettings);
  include ReviewsApi(reviews, reviewCounter);
  include ProductImagesApi(productImages);

  // ─── OQL exposure ─────────────────────────────────────────────────────────
  // Every persisted collection that holds queryable data is exposed as an OQL
  // entity. Public catalogue/review data is world-readable; admin-managed
  // content is controller-only (readable by the Data Intelligence agent, which
  // calls as the controller, but not by end users).

  include Expose({
    entities = [
      products.toEntityManual("product", "Product", "id")
        .sample({ id = ""; name = ""; category = ""; price = 0; description = ""; features = []; imagePath = "" })
        .payload("id", func p = p.id)
        .payload("name", func p = p.name)
        .payload("category", func p = p.category)
        .payload("price", func p = p.price)
        .payload("description", func p = p.description)
        .payload("features", func p = p.features.values().join(", "))
        .payload("imagePath", func p = p.imagePath)
        .public_()
        .build(),
      reviews.toEntity("review", "Review", "id")
        .sample({ id = 0; productId = ""; rating = 0; reviewText = ""; authorName = ""; timestamp = 0 })
        .public_()
        .build(),
      adminSettings.bundles.toEntityManual("bundle", "Bundle", "id")
        .sample({ id = ""; name = ""; description = ""; price = 0; imageUrl = ""; productIds = []; badge = "" })
        .payload("id", func b = b.id)
        .payload("name", func b = b.name)
        .payload("description", func b = b.description)
        .payload("price", func b = b.price)
        .payload("imageUrl", func b = b.imageUrl)
        .payload("productIds", func b = b.productIds.values().join(", "))
        .payload("badge", func b = b.badge)
        .controllerOnly()
        .build(),
      adminSettings.pressEntries.toEntity("pressEntry", "PressEntry", "id")
        .sample({ id = ""; outlet = ""; title = ""; url = ""; date = "" })
        .controllerOnly()
        .build(),
      adminSettings.productTimers.toEntity("productTimer", "ProductTimer", "productId")
        .sample({ productId = ""; caption = ""; endTimestamp = 0 })
        .controllerOnly()
        .build(),
      adminSettings.whatsappSubscribers.toEntity("whatsappSubscriber", "WhatsappSubscriber", "id")
        .sample({ id = ""; phone = ""; name = ""; subscribedAt = 0 })
        .controllerOnly()
        .build(),
      OQL.Entity.manual<Text>("featuredProduct", func () = adminSettings.featuredProductIds.values(), "FeaturedProduct", "productId")
        .sample("")
        .payload("productId", func pid = pid)
        .controllerOnly()
        .build(),
      OQL.Entity.manual<Text>("soldOutProduct", func () = adminSettings.soldOutProductIds.values(), "SoldOutProduct", "productId")
        .sample("")
        .payload("productId", func pid = pid)
        .controllerOnly()
        .build(),
    ];
  });

  include ApiDocMixin();

  // ─── Public Queries ───────────────────────────────────────────────────────

  public query func getProducts() : async [Product] {
    products.values().toArray()
  };

  public query func getProductById(id : Text) : async ?Product {
    products.get(id)
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.values().filter(func(p : Product) : Bool { p.category == category }).toArray()
  };
};
