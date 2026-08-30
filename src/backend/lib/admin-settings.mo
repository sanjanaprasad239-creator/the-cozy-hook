import List "mo:core/List";
import Types "../types/admin-settings";

module {
  public type AdminSettings = Types.AdminSettings;
  public type AdminSettingsState = Types.AdminSettingsState;

  public func toPublic(state : AdminSettingsState) : AdminSettings {
    {
      heroTitle = state.heroTitle;
      heroTagline = state.heroTagline;
      featuredProductIds = state.featuredProductIds.toArray();
      soldOutProductIds = state.soldOutProductIds.toArray();
      bundles = state.bundles.toArray();
      pressEntries = state.pressEntries.toArray();
      currentlyCrafting = state.currentlyCrafting;
      productTimers = state.productTimers.toArray();
      whatsappSubscribers = state.whatsappSubscribers.toArray();
    }
  };

  public func replaceAll<T>(list : List.List<T>, items : [T]) {
    list.clear();
    for (item in items.values()) { list.add(item) };
  };
}
