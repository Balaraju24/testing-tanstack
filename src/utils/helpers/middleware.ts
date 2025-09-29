import { redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";

const getIsAuthenticated = () => {
  return Cookies.get("token");
};

const authRoutes = ["/login", "/"];

export const authMiddleware = async ({ location }: any) => {
  if (typeof window == "undefined") return;

  if (!getIsAuthenticated() && !authRoutes.includes(location.pathname)) {
    throw redirect({
      to: "/login",
    });
  }

  if (getIsAuthenticated() && authRoutes.includes(location.pathname)) {
    throw redirect({
      to: "/legal-opinion",
    });
  }
};
