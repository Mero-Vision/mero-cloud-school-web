import ActiveDashboardIcon from "../assets/activeIcons/dashboard.svg";
import DashboardIcon from "../assets/icon/dashboard.svg";

export const FirmSidebarConstants = [
  {
    header: "MAIN",
    items: [
      {
        label: "Dashboard",
        url: "/firm",
        icon: DashboardIcon,
        activeIcon: ActiveDashboardIcon,
        children: [],
      },
      {
        label: "Company",
        url: "company",
        icon: DashboardIcon,
        activeIcon: ActiveDashboardIcon,
        children: [],
      },
      {
        label: "Users",
        url: "users",
        icon: DashboardIcon,
        activeIcon: ActiveDashboardIcon,
        children: [],
      },
      {
        label: "Documents",
        url: "documents",
        icon: DashboardIcon,
        activeIcon: ActiveDashboardIcon,
        children: [],
      },
    ],
  },
];
