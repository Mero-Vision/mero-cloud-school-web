import ActiveDashboardIcon from "../assets/activeIcons/dashboard.svg";
import ActiveEnquiryIcon from "../assets/activeIcons/enquiryActive.svg";
import ActiveEventsIcon from "../assets/activeIcons/eventsActive.svg";
import ActiveHotelBookingIcon from "../assets/activeIcons/HotelBookingActive.svg";
import ActiveHouseKeepingIcon from "../assets/activeIcons/houseKeepingActive.svg";
import ActiveInventoryIcon from "../assets/activeIcons/Inventory.svg";
import ActiveOrderIcon from "../assets/activeIcons/orderActive.svg";
import ActivePayrollIcon from "../assets/activeIcons/Payroll.svg";
// import ActivePosIcon from "../assets/activeIcons/posActive.svg";
import ActiveReportsIcon from "../assets/activeIcons/Reports.svg";
// import ActiveSalesIcon from "../assets/activeIcons/Sales.svg";
import ActiveBookIcon from "../assets/activeIcons/bookActive.png";
import ActiveCustomersIcon from "../assets/activeIcons/customersActive.png";
import ActiveDeliveryIcon from "../assets/activeIcons/deliveryActive.png";
import ActiveHrIcon from "../assets/activeIcons/hrActive.png";
import ActiveMenuIcon from "../assets/activeIcons/menuActive.png";
import ActiveSessionIcon from "../assets/activeIcons/sessionsActive.png";
import ActiveSettingsIcon from "../assets/activeIcons/settings.svg";
import ActiveUserIcon from "../assets/activeIcons/userManagementActive.png";

import DashboardIcon from "../assets/icon/dashboard.svg";
import EnquiryIcon from "../assets/icon/enquiryIcon.svg";
import EventsIcon from "../assets/icon/eventsIcon.svg";
import HotelIcon from "../assets/icon/hotelIcon.svg";
import HouseKeepingIcon from "../assets/icon/houseKeepingIcon.svg";
import InventoryIcon from "../assets/icon/Inventory.svg";
import OrdersIcon from "../assets/icon/ordersIcon.svg";
import PayrollIcon from "../assets/icon/payroll.svg";
// import PosIcon from "../assets/icon/posIcon.svg";
import ReportsIcon from "../assets/icon/reports.svg";
// import SalesIcon from "../assets/icon/sales.svg";
import BookIcon from "../assets/icon/book.png";
import CustomersIcon from "../assets/icon/customers.png";
import DeliveryIcon from "../assets/icon/delivery.png";
import HrIcon from "../assets/icon/hr.png";
import MenuIcon from "../assets/icon/menu.png";
import SessionIcon from "../assets/icon/sessions.png";
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
         {
            label: "Customers",
            url: "/dashboard/sales/customers",
            icon: CustomersIcon,
            activeIcon: ActiveCustomersIcon,
            permission: "customer-list",
            children: [],
         },

         {
            label: "Sessions",
            url: "/dashboard/session",
            icon: SessionIcon,
            activeIcon: ActiveSessionIcon,
            permission: "business-service-session-list",
            children: [],
         },
         {
            label: "User Management",
            url: "/dashboard/user-managmement",
            icon: UserIcon,
            activeIcon: ActiveUserIcon,
            children: [
               {
                  label: "Users",
                  url: "/dashboard/users",
                  pageUrl: "/users",
                  permission: "company-list-user",
               },
               {
                  label: "Roles",
                  url: "/dashboard/roles",
                  pageUrl: "/roles",
                  permission: "role-list",
               },
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
            url: "/dashboard/hotel-booking",
            icon: HotelIcon,
            activeIcon: ActiveHotelBookingIcon,
            children: [],
            permission: "setting-view",
         },

         {
            label: "Enquiry",
            url: "/dashboard/enquiry",
            icon: EnquiryIcon,
            activeIcon: ActiveEnquiryIcon,
            children: [],
            permission: "setting-view",
         },

         {
            label: "House Keeping",
            url: "/dashboard/house-keeping",
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
            url: "/dashboard/orders",
            icon: OrdersIcon,
            activeIcon: ActiveOrderIcon,
            children: [],
            permission: "order-detail-list",
         },
         {
            label: "Delivery Partners",
            url: "/dashboard/delivery-partners",
            icon: DeliveryIcon,
            activeIcon: ActiveDeliveryIcon,
            children: [],
         },
         {
            label: "Day Book",
            url: "/dashboard/day-book",
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
            url: "/dashboard/manage-menu",
            icon: MenuIcon,
            activeIcon: ActiveMenuIcon,
            children: [
               {
                  label: "Category",
                  url: "/dashboard/manage-menu/category",
                  permission: "product-category-list",
                  pageUrl: "/manage-menu/category",
               },
               {
                  label: "Menu Items",
                  url: "/dashboard/manage-menu/items",
                  // pageUrl: "/sales/quotations/add",
                  permission: "product-category-list",
                  pageUrl: "/manage-menu/items",
               },
               {
                  label: "Topping Items",
                  url: "/dashboard/manage-menu/topping-items",
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
            url: "/dashboard/events",
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
         {
            label: "Human resources",
            url: "/dashboard/human-resources",
            icon: HrIcon,
            activeIcon: ActiveHrIcon,
            children: [
               {
                  label: "Positions",
                  url: "/dashboard/human-resources/positions",
                  permission: "position-list",
                  pageUrl: "/human-resources/positions",
               },

               {
                  label: "Departments",
                  url: "/dashboard/human-resources/departments",
                  permission: "department-list",
                  pageUrl: "/human-resources/departments",
               },
               {
                  label: "Employees",
                  url: "/dashboard/human-resources/employees",
                  permission: "employee-list",
                  pageUrl: "/human-resources/employees",
               },
            ],
         },

         {
            label: "Duty Roster",
            url: "/dashboard/duty-roster",
            icon: PayrollIcon,
            activeIcon: ActivePayrollIcon,
            children: [
               {
                  label: "Roster time",
                  url: "/dashboard/duty-roster/roster-time",
                  permission: "roster-time-list",
                  pageUrl: "/duty-roster/roster-time",
               },

               {
                  label: "Roster tasks",
                  url: "/dashboard/duty-roster/roster-tasks",
                  permission: "roster-task-list",
                  pageUrl: "/duty-roster/roster-tasks",
               },
               {
                  label: "Rosters",
                  url: "/dashboard/duty-roster/rosters",
                  pageUrl: "/duty-roster/rosters",
               },

               // {
               //    label: "Restaurent Roster",
               //    url: "/duty-roster/restaurant-roster",
               // },

               // {
               //    label: "Hotel Roster",
               //    url: "/duty-roster/hotel-roster",
               // },
               // {
               //    label: "Event Roster",
               //    url: "/duty-roster/event-roster",
               // },
            ],
         },
         {
            label: "Inventory",
            url: "/dashboard/inventory",
            icon: InventoryIcon,
            activeIcon: ActiveInventoryIcon,
            children: [
               {
                  label: "Units of Measurement",
                  url: "/dashboard/inventory/units-of-measurement",
                  permission: "units-of-measurement-list",
                  pageUrl: "/inventory/units-of-measurement",
               },

               {
                  label: "Products",
                  url: "/dashboard/inventory/products",
                  pageUrl: "/inventory/products",
                  permission: "inventory-product-list",
               },

               {
                  label: "Inventory Adjustment",
                  url: "/dashboard/inventory/inventory-adjustment",
                  pageUrl: "/inventory/inventory-adjustment",
                  permission: "inventory-adjustment-list",
               },
            ],
         },

         {
            label: "Reports",
            url: "/dashboard/reports",
            icon: ReportsIcon,
            activeIcon: ActiveReportsIcon,
            children: [],
         },
         {
            label: "Settings",
            url: "/dashboard/settings",
            icon: SettingsIcon,
            activeIcon: ActiveSettingsIcon,
            children: [],
            permission: "setting-view",
         },
      ],
   },
];
