import ActiveDashboardIcon from "../assets/activeIcons/dashboard.svg";
import ActiveEnquiryIcon from "../assets/activeIcons/enquiryActive.svg";
import ActiveEventsIcon from "../assets/activeIcons/eventsActive.svg";
import ActiveHotelBookingIcon from "../assets/activeIcons/HotelBookingActive.svg";
import ActiveHouseKeepingIcon from "../assets/activeIcons/houseKeepingActive.svg";
import ActiveOrderIcon from "../assets/activeIcons/orderActive.svg";
// import ActivePosIcon from "../assets/activeIcons/posActive.svg";
import ActiveReportsIcon from "../assets/activeIcons/Reports.svg";
// import ActiveSalesIcon from "../assets/activeIcons/Sales.svg";
import ActiveBookIcon from "../assets/activeIcons/bookActive.png";
import ActiveDeliveryIcon from "../assets/activeIcons/deliveryActive.png";
import ActiveMenuIcon from "../assets/activeIcons/menuActive.png";
import ActiveSettingsIcon from "../assets/activeIcons/settings.svg";
import ActiveUserIcon from "../assets/activeIcons/userManagementActive.png";

import DashboardIcon from "../assets/icon/dashboard.svg";
import EnquiryIcon from "../assets/icon/enquiryIcon.svg";
import EventsIcon from "../assets/icon/eventsIcon.svg";
import HotelIcon from "../assets/icon/hotelIcon.svg";
import HouseKeepingIcon from "../assets/icon/houseKeepingIcon.svg";
import OrdersIcon from "../assets/icon/ordersIcon.svg";
// import PosIcon from "../assets/icon/posIcon.svg";
import ReportsIcon from "../assets/icon/reports.svg";
// import SalesIcon from "../assets/icon/sales.svg";
import BookIcon from "../assets/icon/book.png";
import DeliveryIcon from "../assets/icon/delivery.png";
import MenuIcon from "../assets/icon/menu.png";
import SettingsIcon from "../assets/icon/settings.svg";
import UserIcon from "../assets/icon/userManagement.png";

export const SidebarConstants = [
   {
      header: "",
      items: [
         {
            label: "Dashboard",
            url: "/dashboard",
            icon: DashboardIcon,
            activeIcon: ActiveDashboardIcon,
            children: [],
            permission: "company-dashboard-view",
         },
         // {
         //    label: "Customers",
         //    url: "/sales/customers",
         //    icon: CustomersIcon,
         //    activeIcon: ActiveCustomersIcon,
         //    permission: "customer-list",
         //    children: [],
         // },

         // {
         //    label: "Sessions",
         //    url: "/session",
         //    icon: SessionIcon,
         //    activeIcon: ActiveSessionIcon,
         //    permission: "business-service-session-list",
         //    children: [],
         // },
         {
            label: "User Management",
            url: "/user-managmement",
            icon: UserIcon,
            activeIcon: ActiveUserIcon,
            children: [
               {
                  label: "Users",
                  url: "/users",
                  pageUrl: "/users",
                  permission: "company-list-user",
               },
               // {
               //    label: "Roles",
               //    url: "/roles",
               //    pageUrl: "/roles",
               //    permission: "role-list",
               // },
            ],
         },
      ],
   },

   {
      header: "Hotel",
      roleName: "hotel",
      items: [
         {
            label: "Hotel Booking",
            url: "/hotel-booking",
            icon: HotelIcon,
            activeIcon: ActiveHotelBookingIcon,
            children: [],
            permission: "setting-view",
         },

         {
            label: "Enquiry",
            url: "/enquiry",
            icon: EnquiryIcon,
            activeIcon: ActiveEnquiryIcon,
            children: [],
            permission: "setting-view",
         },

         {
            label: "House Keeping",
            url: "/house-keeping",
            icon: HouseKeepingIcon,
            activeIcon: ActiveHouseKeepingIcon,
            children: [],
            permission: "setting-view",
         },
      ],
   },

   {
      header: "Restaurant",
      roleName: "restaurant",
      items: [
         // {
         //   label: "Table Booking",
         //   url: "/table-booking",
         //   icon: TableIcon,
         //   activeIcon: ActiveTableBookingIcon,
         //   children: [],
         //   permission: "setting-view",
         // },
         {
            label: "Orders",
            url: "/orders",
            icon: OrdersIcon,
            activeIcon: ActiveOrderIcon,
            children: [],
            permission: "order-detail-list",
         },
         {
            label: "Delivery Partners",
            url: "/delivery-partners",
            icon: DeliveryIcon,
            activeIcon: ActiveDeliveryIcon,
            children: [],
         },
         {
            label: "Day Book",
            url: "/day-book",
            icon: BookIcon,
            activeIcon: ActiveBookIcon,
            children: [],
            permission: "day-book-list",
         },

         // {
         //    label: "POS",
         //    url: "/pos",
         //    icon: PosIcon,
         //    activeIcon: ActivePosIcon,
         //    children: [],
         //    permission: "company-pos-view",
         // },

         {
            label: "Manage menu",
            url: "/manage-menu",
            icon: MenuIcon,
            activeIcon: ActiveMenuIcon,
            children: [
               {
                  label: "Category",
                  url: "/manage-menu/category",
                  permission: "product-category-list",
                  pageUrl: "/manage-menu/category",
               },
               {
                  label: "Menu Items",
                  url: "/manage-menu/items",
                  // pageUrl: "/sales/quotations/add",
                  permission: "product-category-list",
                  pageUrl: "/manage-menu/items",
               },
               {
                  label: "Topping Items",
                  url: "/manage-menu/topping-items",
                  // pageUrl: "/sales/quotations/add",
                  permission: "topping-item-list",
                  pageUrl: "/manage-menu/topping-items",
               },
            ],
            // permission: "setting-view",
         },
      ],
   },

   {
      header: "Events",
      roleName: "event",
      items: [
         {
            label: "Event Booking",
            url: "/events",
            icon: EventsIcon,
            activeIcon: ActiveEventsIcon,
            children: [],
            permission: "setting-view",
         },
      ],
   },

   {
      header: "Setup",
      items: [
         // {
         //    label: "Human resources",
         //    url: "/human-resources",
         //    icon: HrIcon,
         //    activeIcon: ActiveHrIcon,
         //    children: [
         //       {
         //          label: "Positions",
         //          url: "/human-resources/positions",
         //          permission: "position-list",
         //          pageUrl: "/human-resources/positions",
         //       },

         //       {
         //          label: "Departments",
         //          url: "/human-resources/departments",
         //          permission: "department-list",
         //          pageUrl: "/human-resources/departments",
         //       },
         //       {
         //          label: "Employees",
         //          url: "/human-resources/employees",
         //          permission: "employee-list",
         //          pageUrl: "/human-resources/employees",
         //       },
         //    ],
         // },

         {
            label: "Reports",
            url: "/reports",
            icon: ReportsIcon,
            activeIcon: ActiveReportsIcon,
            children: [],
         },
         {
            label: "Settings",
            url: "/settings",
            icon: SettingsIcon,
            activeIcon: ActiveSettingsIcon,
            children: [],
            permission: "setting-view",
         },
      ],
   },
];
