import { useLocation } from "@tanstack/react-router";
import { VIEW_KEYS, viewStateHelper, ViewType } from "./navigateHelper";

export const getInitialView = (): ViewType => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlView = searchParams.get("view") as ViewType;
  if (urlView && (urlView === "grid" || urlView === "table")) {
    return urlView;
  }
  return viewStateHelper.getViewState(VIEW_KEYS.LITIGATION, "grid");
};
