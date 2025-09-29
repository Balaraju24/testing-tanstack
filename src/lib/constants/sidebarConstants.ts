import AdvocateIcon from "@/components/icons/advocate-icon";
import DashboardIcon from "@/components/icons/dashboard-icon";
import paymentIcon from "@/components/icons/Dashboard/payment-icon";
import RevenueStatisticsIcon from "@/components/icons/Dashboard/revenue-statistics-icon";
import ReviewIcon from "@/components/icons/Dashboard/review-icon";
import EngineerValuationIcon from "@/components/icons/engineer-property-valuation-icon";
import LegalOpinionIcon from "@/components/icons/legal-opinion-icon";
import Litigation from "@/components/icons/litigation-icon";
import LocationIcon from "@/components/icons/location-icon";
import ManagerIcon from "@/components/icons/ManagerIcon";
import OrganizationIcon from "@/components/icons/organization-icon";

const items = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: DashboardIcon,
      activePaths: ["/dashboard"],
      userTypes: ["MANAGER", "ADMIN", "ADVOCATE", "CUSTOMER"],
    },
    {
      title: "Legal Opinion",
      url: "/legal-opinion",
      activePaths: ["/legal-opinion", "/create-legal-opinion"],
      icon: LegalOpinionIcon,
      userTypes: ["MANAGER", "ADVOCATE", "CUSTOMER", "ADMIN"],
    },
    {
      title: "Engineer Property Valuation",
      fullTitle: "Engineer Property Valuation",
      url: "/engineer-property-valuation",
      icon: EngineerValuationIcon,
      activePaths: ["/engineer-property-valuation"],
      userTypes: ["MANAGER", "ADVOCATE", "CUSTOMER", "ADMIN"],
    },
    {
      title: "Litigation",
      url: "/litigations",
      icon: Litigation,
      activePaths: ["/litigation", "/create-litigation"],
      userTypes: ["MANAGER", "ADVOCATE", "CUSTOMER", "ADMIN"],
    },
    {
      title: "Organizations",
      url: "/organizations",
      icon: OrganizationIcon,
      activePaths: [
        "/organizations",
        "/create-organization",
        "/edit-organization",
      ],
      userTypes: ["MANAGER", "ADMIN"],
    },
    {
      title: "Advocates",
      url: "/advocates",
      icon: AdvocateIcon,
      activePaths: [
        "/advocates",
        "/view-advocate",
        "/edit-advocate",
        "/create-advocate",
      ],
      userTypes: ["MANAGER", "ADMIN"],
    },
    {
      title: "Managers",
      url: "/managers",
      icon: ManagerIcon,
      activePaths: [
        "/managers",
        "/create-manager",
        "/edit-manager",
        "/view-manager",
      ],
      userTypes: ["ADMIN"],
    },
    {
      title: "Locations",
      url: "/locations",
      icon: LocationIcon,
      activePaths: ["/locations"],
      userTypes: ["ADMIN"],
    },
    {
      title: "Reviews",
      url: "/reviews",
      icon: ReviewIcon,
      activePaths: ["/reviews"],
      userTypes: ["MANAGER", "ADMIN"],
    },
    {
      title: "Payments",
      url: "/payments",
      icon: paymentIcon,
      activePaths: ["/payments"],
      userTypes: ["MANAGER", "ADMIN"],
    },
    {
      title: "Revenue and Statistics",
      url: "/revenue-statistics",
      icon: RevenueStatisticsIcon,
      activePaths: ["/revenue-statistics"],
      userTypes: ["ADMIN"],
    },
  ],
};

export default items;
