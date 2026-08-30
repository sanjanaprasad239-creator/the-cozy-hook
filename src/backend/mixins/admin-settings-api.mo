import Types "../types/admin-settings";
import AdminSettingsLib "../lib/admin-settings";

mixin (state : Types.AdminSettingsState) {
  public query func getAdminSettings() : async Types.AdminSettings {
    AdminSettingsLib.toPublic(state)
  };

  public func adminLogin(password : Text) : async Bool {
    password == state.adminPassword
  };

  public func updateHeroText(title : Text, tagline : Text) : async () {
    state.heroTitle := title;
    state.heroTagline := tagline;
  };

  public func setFeaturedProducts(ids : [Text]) : async () {
    AdminSettingsLib.replaceAll(state.featuredProductIds, ids);
  };

  public func setSoldOutProducts(ids : [Text]) : async () {
    AdminSettingsLib.replaceAll(state.soldOutProductIds, ids);
  };

  public func setBundles(bundles : [Types.Bundle]) : async () {
    AdminSettingsLib.replaceAll(state.bundles, bundles);
  };

  public func setPressEntries(entries : [Types.PressEntry]) : async () {
    AdminSettingsLib.replaceAll(state.pressEntries, entries);
  };

  public func setProductTimers(timers : [Types.ProductTimer]) : async () {
    AdminSettingsLib.replaceAll(state.productTimers, timers);
  };

  public func setCurrentlyCrafting(text : Text) : async () {
    state.currentlyCrafting := text;
  };

  public func setWhatsappSubscribers(subscribers : [Types.WhatsappSubscriber]) : async () {
    AdminSettingsLib.replaceAll(state.whatsappSubscribers, subscribers);
  };
}
