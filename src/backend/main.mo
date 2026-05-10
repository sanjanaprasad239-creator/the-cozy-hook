import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";

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

  public type AdminSettings = {
    heroTitle : Text;
    heroTagline : Text;
    featuredProductIds : [Text];
  };

  // ─── State ───────────────────────────────────────────────────────────────

  let products : Map.Map<Text, Product> = Map.empty<Text, Product>();

  var heroTitle : Text = "The Cozy Hook";
  var heroTagline : Text = "Handmade Crochet with Love";
  let featuredProductIds : List.List<Text> = List.empty<Text>();

  let reviews : List.List<Review> = List.empty<Review>();
  var nextReviewId : Nat = 1;

  // ─── Seed helper ─────────────────────────────────────────────────────────

  func seed(p : Product) {
    products.add(p.id, p);
  };

  // ─── Seed data ───────────────────────────────────────────────────────────

  do {
    // ── Plushies (7) ──────────────────────────────────────────────────────
    seed({
      id = "whale-plushie";
      name = "Whale Plushie";
      category = "Plushies";
      price = 520;
      description = "A charming teal-blue whale plushie, lovingly crocheted stitch by stitch. A delightful addition to any collection.";
      features = ["100% handmade", "Teal soft yarn", "Child-safe stuffing", "Approx 20 cm long", "Embroidered eyes"];
      imagePath = "/assets/products/whale-plushie.jpg";
    });
    seed({
      id = "octopus-plushie";
      name = "Octopus Plushie";
      category = "Plushies";
      price = 599;
      description = "A whimsical crocheted octopus with eight wiggly tentacles. Unique, playful, and full of personality.";
      features = ["100% handmade", "Wiggly stuffed tentacles", "Child-safe stuffing", "Approx 15 cm tall", "Reversible happy/sad face option"];
      imagePath = "/assets/products/octopus-plushie.jpg";
    });
    seed({
      id = "bear-plushie";
      name = "Bear Plushie";
      category = "Plushies";
      price = 570;
      description = "A classic teddy bear crocheted with warm, cozy yarn. A timeless companion that never goes out of style.";
      features = ["100% handmade", "Warm beige yarn", "Child-safe stuffing", "Approx 17 cm tall", "Movable limbs"];
      imagePath = "/assets/products/bear-plushie.jpg";
    });
    seed({
      id = "frog-plushie";
      name = "Frog Plushie";
      category = "Plushies";
      price = 490;
      description = "A cute green frog plushie with big round eyes. Perfect for frog lovers of all ages.";
      features = ["100% handmade", "Sage green yarn", "Child-safe stuffing", "Approx 13 cm tall", "Bulging embroidered eyes"];
      imagePath = "/assets/products/frog-plushie.jpg";
    });
    seed({
      id = "cowboy-duck-plushie";
      name = "Cowboy Duck Plushie";
      category = "Plushies";
      price = 620;
      description = "A sassy duck wearing a tiny crocheted cowboy hat. Because every duck deserves to be a cowboy.";
      features = ["100% handmade", "Removable cowboy hat", "Child-safe stuffing", "Approx 16 cm tall", "Hand-stitched details"];
      imagePath = "/assets/products/cowboy-duck-plushie.jpg";
    });
    seed({
      id = "bunny-plushie";
      name = "Bunny Plushie";
      category = "Plushies";
      price = 550;
      description = "An adorable hand-crocheted bunny plushie made with premium soft yarn. Perfect as a gift or a cuddly companion.";
      features = ["100% handmade", "Soft premium yarn", "Child-safe stuffing", "Approx 18 cm tall", "Available in multiple colors"];
      imagePath = "/assets/products/bunny-plushie.jpg";
    });
    seed({
      id = "strawberry-costumed-bunny";
      name = "Strawberry Costumed Bunny";
      category = "Plushies";
      price = 650;
      description = "An irresistibly sweet bunny dressed in a strawberry costume. A fan-favourite and the perfect kawaii gift.";
      features = ["100% handmade", "Red and green yarn combo", "Child-safe stuffing", "Approx 19 cm tall", "Detachable strawberry cap"];
      imagePath = "/assets/products/strawberry-costumed-bunny.jpg";
    });

    // ── Keychains (11) ────────────────────────────────────────────────────
    seed({
      id = "mini-bouquet-keychain";
      name = "Mini Bouquet Keychain";
      category = "Keychains";
      price = 169;
      description = "A tiny crocheted flower bouquet keychain — a pocket-sized arrangement of tulips and sunflowers you can carry everywhere.";
      features = ["100% handmade", "Durable metal keyring", "Approx 7 cm", "Mixed flower designs", "Great as a gift"];
      imagePath = "/assets/products/mini-bouquet-keychain.jpg";
    });
    seed({
      id = "gradient-flower-keychain";
      name = "Gradient Flower Keychain";
      category = "Keychains";
      price = 145;
      description = "A delicate crocheted flower keychain with a beautiful gradient color effect. Wear your garden on your keys.";
      features = ["100% handmade", "Durable metal keyring", "Approx 6 cm", "Gradient pastel colors", "Lightweight"];
      imagePath = "/assets/products/gradient-flower-keychain.jpg";
    });
    seed({
      id = "cake-roll-keychain";
      name = "Cake Roll Keychain";
      category = "Keychains";
      price = 155;
      description = "An adorable crocheted Swiss roll cake keychain — sweet, detailed, and impossible not to love.";
      features = ["100% handmade", "Durable metal keyring", "Approx 5 cm", "Realistic cake roll design", "Lightweight"];
      imagePath = "/assets/products/cake-roll-keychain.jpg";
    });
    seed({
      id = "bow-keychain";
      name = "Bow Keychain";
      category = "Keychains";
      price = 125;
      description = "A dainty crocheted bow keychain that adds a charming feminine touch to your accessories.";
      features = ["100% handmade", "Durable metal keyring", "Approx 6 cm wide", "Multiple colors", "Lightweight"];
      imagePath = "/assets/products/bow-keychain.jpg";
    });
    seed({
      id = "bow-keychain-thin";
      name = "Bow Keychain (Thin)";
      category = "Keychains";
      price = 115;
      description = "A slender, elegant crocheted bow keychain with a refined silhouette — delicate and perfectly proportioned.";
      features = ["100% handmade", "Durable metal keyring", "Approx 5 cm wide", "Thin elegant bow shape", "Lightweight"];
      imagePath = "/assets/products/bow-keychain-thin.jpg";
    });
    seed({
      id = "cherry-keychain";
      name = "Cherry Keychain";
      category = "Keychains";
      price = 145;
      description = "A cute crocheted cherry keychain — two little cherries on a delicate stem. Sweet as can be.";
      features = ["100% handmade", "Durable metal keyring", "Approx 8 cm with stem", "Vibrant red yarn", "Lightweight"];
      imagePath = "/assets/products/cherry-keychain.jpg";
    });
    seed({
      id = "starfish-keychain";
      name = "Starfish Keychain";
      category = "Keychains";
      price = 149;
      description = "A tiny crocheted starfish keychain that brings a touch of the ocean to your keys or bag.";
      features = ["100% handmade", "Durable metal keyring", "Approx 5 cm", "Multiple color options", "Great as a gift"];
      imagePath = "/assets/products/starfish-keychain.jpg";
    });
    seed({
      id = "heart-keychain";
      name = "Heart Keychain";
      category = "Keychains";
      price = 120;
      description = "A sweet little crocheted heart keychain — the perfect token of love and affection.";
      features = ["100% handmade", "Durable metal keyring", "Approx 4 cm", "Dusty rose color", "Great as a couple's gift"];
      imagePath = "/assets/products/heart-keychain.jpg";
    });
    seed({
      id = "bunny-keychain";
      name = "Bunny Keychain";
      category = "Keychains";
      price = 155;
      description = "A mini crocheted bunny keychain with floppy ears. Adorable enough to show off every day.";
      features = ["100% handmade", "Durable metal keyring", "Approx 7 cm", "Soft pastel colors", "Lightweight"];
      imagePath = "/assets/products/bunny-keychain.jpg";
    });
    seed({
      id = "sunflower-keychain";
      name = "Sunflower Keychain";
      category = "Keychains";
      price = 140;
      description = "A cheerful crocheted sunflower keychain that brings a little sunshine wherever you go.";
      features = ["100% handmade", "Durable metal keyring", "Approx 6 cm", "Bright yellow yarn", "Lightweight"];
      imagePath = "/assets/products/sunflower-keychain.jpg";
    });
    seed({
      id = "initial-letter-keychain";
      name = "Initial Letter Keychain (Custom)";
      category = "Keychains";
      price = 199;
      description = "A personalised crocheted letter keychain — customise with any letter of the alphabet.";
      features = ["100% handmade", "Custom letter on request", "Durable metal keyring", "Approx 5 cm", "Perfect personalised gift"];
      imagePath = "/assets/products/initial-letter-keychain.jpg";
    });

    // ── Wearables (5) ─────────────────────────────────────────────────────
    seed({
      id = "hairband";
      name = "Hairband";
      category = "Wearables";
      price = 350;
      description = "A wide crocheted hairband that's both functional and fashionable. Keep hair out of your face in style.";
      features = ["100% handmade", "Stretchy elastic back", "Approx 8 cm wide", "Soft cotton yarn", "Multiple colors"];
      imagePath = "/assets/products/hairband.jpg";
    });
    seed({
      id = "fingerless-gloves";
      name = "Fingerless Gloves";
      category = "Wearables";
      price = 549;
      description = "Chic crocheted fingerless gloves that keep your hands warm while leaving your fingers free.";
      features = ["100% handmade", "Stretchy fit", "Soft wool-blend yarn", "One size fits most", "Thumb opening"];
      imagePath = "/assets/products/fingerless-gloves.jpg";
    });
    seed({
      id = "bucket-hat";
      name = "Bucket Hat";
      category = "Wearables";
      price = 699;
      description = "A trendy crocheted bucket hat that adds a boho-chic touch to any summer or casual look.";
      features = ["100% handmade", "Breathable cotton yarn", "Flexible brim", "One size fits most", "Multiple colors"];
      imagePath = "/assets/products/bucket-hat.jpg";
    });
    seed({
      id = "bandana";
      name = "Bandana";
      category = "Wearables";
      price = 299;
      description = "A versatile crocheted bandana that can be worn around the neck, in your hair, or on your wrist. Effortlessly boho.";
      features = ["100% handmade", "Soft cotton yarn", "Triangular design", "Adjustable tie", "Multiple colors"];
      imagePath = "/assets/products/bandana.jpg";
    });
    seed({
      id = "daisy-flower-belt";
      name = "Daisy Flower Belt";
      category = "Wearables";
      price = 449;
      description = "A whimsical crocheted belt adorned with daisy flowers. Add a cottagecore finishing touch to any outfit.";
      features = ["100% handmade", "Daisy floral detail", "Adjustable length", "Soft cotton yarn", "Multiple color combos"];
      imagePath = "/assets/products/daisy-flower-belt.jpg";
    });

    // ── Home Decor (5) ────────────────────────────────────────────────────
    seed({
      id = "hanging-plant";
      name = "Hanging Plant";
      category = "HomeDecor";
      price = 499;
      description = "A beautiful crocheted plant hanger that showcases your favourite potted plant in boho style.";
      features = ["100% handmade", "Natural cotton rope", "Adjustable knots", "Fits pots up to 15 cm", "Fringe detail"];
      imagePath = "/assets/products/hanging-plant.jpg";
    });
    seed({
      id = "heart-pillow";
      name = "Heart Pillow";
      category = "HomeDecor";
      price = 450;
      description = "A heart-shaped crocheted pillow that's as cozy as it is cute. The perfect handmade gift for a loved one.";
      features = ["100% handmade", "Heart-shaped design", "Approx 35 cm wide", "Soft filling included", "Dusty rose color"];
      imagePath = "/assets/products/heart-pillow.jpg";
    });
    seed({
      id = "coaster-set";
      name = "Coaster Set";
      category = "HomeDecor";
      price = 299;
      description = "A set of four hand-crocheted coasters in coordinating pastel colors. Pretty, practical, and planet-friendly.";
      features = ["100% handmade", "Set of 4 coasters", "Approx 10 cm diameter", "Cotton yarn", "Washable"];
      imagePath = "/assets/products/coaster-set.jpg";
    });
    seed({
      id = "table-mat";
      name = "Table Mat";
      category = "HomeDecor";
      price = 399;
      description = "Elegant crocheted table mats that protect your surfaces while adding a handmade touch to your dining space.";
      features = ["100% handmade", "Set of 2 mats", "Approx 30 cm diameter", "Cotton yarn", "Washable"];
      imagePath = "/assets/products/table-mat.jpg";
    });
    seed({
      id = "wall-hanging";
      name = "Wall Hanging";
      category = "HomeDecor";
      price = 549;
      description = "A beautiful boho crocheted wall hanging that transforms any wall into a statement piece.";
      features = ["100% handmade", "Natural cotton yarn", "Wooden dowel included", "Approx 40 cm wide", "Fringe detail"];
      imagePath = "/assets/products/wall-hanging.jpg";
    });

    // ── Accessories (6) ───────────────────────────────────────────────────
    seed({
      id = "tulip-hair-accessory";
      name = "Tulip Hair Accessory";
      category = "Accessories";
      price = 149;
      description = "A delicate crocheted tulip hair accessory that adds a floral flourish to any hairstyle.";
      features = ["100% handmade", "Hair clip or pin base", "Approx 5 cm flower", "Soft pastel colors", "Lightweight"];
      imagePath = "/assets/products/tulip-hair-accessory.jpg";
    });
    seed({
      id = "scrunchies";
      name = "Scrunchies";
      category = "Accessories";
      price = 99;
      description = "Soft crocheted scrunchies that are gentle on your hair and look adorable on your wrist too.";
      features = ["100% handmade", "Set of 3 scrunchies", "Elastic core", "Soft cotton yarn", "Mixed pastel colors"];
      imagePath = "/assets/products/scrunchies.jpg";
    });
    seed({
      id = "bookmarks";
      name = "Bookmarks";
      category = "Accessories";
      price = 89;
      description = "Charming crocheted bookmarks that make reading even more delightful. Perfect as a gift for book lovers.";
      features = ["100% handmade", "Set of 2 bookmarks", "Approx 15 cm long", "Tassel finish", "Multiple designs"];
      imagePath = "/assets/products/bookmarks.jpg";
    });
    seed({
      id = "phone-charms";
      name = "Phone Charms";
      category = "Accessories";
      price = 199;
      description = "Adorable crocheted phone charms to personalise your device and show off your style.";
      features = ["100% handmade", "Universal lanyard loop", "Approx 8 cm charm", "Multiple character options", "Lightweight"];
      imagePath = "/assets/products/phone-charms.jpg";
    });
    seed({
      id = "mini-pouches";
      name = "Mini Pouches";
      category = "Accessories";
      price = 249;
      description = "Tiny crocheted pouches perfect for coins, earrings, or small trinkets. Cute and surprisingly useful.";
      features = ["100% handmade", "Zipper or drawstring closure", "Approx 10 x 8 cm", "Cotton yarn", "Multiple colors"];
      imagePath = "/assets/products/mini-pouches.jpg";
    });
    seed({
      id = "bag-charms";
      name = "Bag Charms";
      category = "Accessories";
      price = 229;
      description = "Whimsical crocheted bag charms that dress up any tote, backpack, or handbag instantly.";
      features = ["100% handmade", "Carabiner clip included", "Approx 10 cm charm", "Multiple character styles", "Lightweight"];
      imagePath = "/assets/products/bag-charms.jpg";
    });

    // Default featured products
    featuredProductIds.add("strawberry-costumed-bunny");
    featuredProductIds.add("cowboy-duck-plushie");
    featuredProductIds.add("initial-letter-keychain");
    featuredProductIds.add("bucket-hat");
    featuredProductIds.add("heart-pillow");
  };

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

  public query func getAdminSettings() : async AdminSettings {
    {
      heroTitle = heroTitle;
      heroTagline = heroTagline;
      featuredProductIds = featuredProductIds.toArray();
    }
  };

  // ─── Admin Updates ────────────────────────────────────────────────────────

  public func adminLogin(password : Text) : async Bool {
    password == "cozyhook2025"
  };

  public func updateHeroText(title : Text, tagline : Text) : async () {
    heroTitle := title;
    heroTagline := tagline;
  };

  public func setFeaturedProducts(ids : [Text]) : async () {
    featuredProductIds.clear();
    for (id in ids.vals()) {
      featuredProductIds.add(id);
    };
  };

  // ─── Reviews ─────────────────────────────────────────────────────────────

  public func addReview(productId : Text, rating : Nat, reviewText : Text, authorName : Text) : async Nat {
    let id = nextReviewId;
    nextReviewId += 1;
    reviews.add({
      id = id;
      productId = productId;
      rating = rating;
      reviewText = reviewText;
      authorName = authorName;
      timestamp = Time.now();
    });
    id
  };

  public query func getReviewsByProduct(productId : Text) : async [Review] {
    reviews.filter(func(r : Review) : Bool { r.productId == productId }).toArray()
  };

  public query func getAllReviews() : async [Review] {
    reviews.toArray()
  };

  public func deleteReview(reviewId : Nat, adminPassword : Text) : async Bool {
    if (adminPassword != "cozyhook2025") { return false };
    let before = reviews.size();
    reviews.retain(func(r : Review) : Bool { r.id != reviewId });
    reviews.size() < before
  };
};
