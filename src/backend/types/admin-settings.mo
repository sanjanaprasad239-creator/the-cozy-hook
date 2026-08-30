import List "mo:core/List";

module {
  public type Bundle = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    productIds : [Text];
    badge : Text;
  };

  public type PressEntry = {
    id : Text;
    outlet : Text;
    title : Text;
    url : Text;
    date : Text;
  };

  public type ProductTimer = {
    productId : Text;
    caption : Text;
    endTimestamp : Int;
  };

  public type WhatsappSubscriber = {
    id : Text;
    phone : Text;
    name : Text;
    subscribedAt : Int;
  };

  public type AdminSettings = {
    heroTitle : Text;
    heroTagline : Text;
    featuredProductIds : [Text];
    soldOutProductIds : [Text];
    bundles : [Bundle];
    pressEntries : [PressEntry];
    currentlyCrafting : Text;
    productTimers : [ProductTimer];
    whatsappSubscribers : [WhatsappSubscriber];
  };

  public type AdminSettingsState = {
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
};
