import { Store } from "@tanstack/react-store";
function loadUserState() {
  try {
    if (typeof window == "undefined") return { user: null };
    const savedState = localStorage.getItem("userDetails");
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (error) {
      }
    }
    return { user: null };
  } catch (error) {
    return { user: null };
  }
}
const initialState = loadUserState();
const userStore = new Store(initialState);
const updateUserStore = (updates) => {
  userStore.setState((state) => ({
    ...state,
    ...updates
  }));
  if (typeof window == "undefined") return;
  localStorage.setItem("userDetails", JSON.stringify(userStore.state));
};
export {
  updateUserStore as a,
  userStore as u
};
