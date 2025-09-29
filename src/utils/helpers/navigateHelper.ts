export const VIEW_KEYS = {
  LEGAL_OPINION: "legal-opinion-view",
  LITIGATION: "litigation-view",
} as const;

export type ViewType = "grid" | "table";
export type ViewKey = (typeof VIEW_KEYS)[keyof typeof VIEW_KEYS];

class ViewStateHelper {
  getViewState(key: ViewKey, defaultView: ViewType = "grid"): ViewType {
    try {
      const stored = localStorage.getItem(key);
      return (stored as ViewType) || defaultView;
    } catch {
      return defaultView;
    }
  }

  setViewState(key: ViewKey, view: ViewType): void {
    try {
      localStorage.setItem(key, view);
    } catch {}
  }
}

export const viewStateHelper = new ViewStateHelper();
