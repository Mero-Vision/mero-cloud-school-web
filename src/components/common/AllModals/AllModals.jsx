import {
   InsertChartOutlined,
   Inventory2Outlined,
   ManageAccountsOutlined,
   Person,
} from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";
import AddCompany from "../../local/firmDashboard/company/AddCompany";
import DepartmentForm from "../../local/humanResources/departments/DepartmentForm";
import EmployeeForm from "../../local/humanResources/employees/EmployeeForm";
import PositionForm from "../../local/humanResources/positions/PositionForm";
import InventoryProductsModal from "../../local/inventory/inventoryProducts/InventoryProductsModal";
import ProductCategoriesModal from "../../local/inventory/productCategories/ProductCategoriesModal";
import ServicesModal from "../../local/inventory/products/ServicesModal";
import UnitsOfMeasurementsModal from "../../local/inventory/unitsOfMeasurements/UnitsOfMeasurementsModal";
import CategoryForm from "../../local/restaurant/manageMenu/category/CategoryForm";
import MenuItemForm from "../../local/restaurant/manageMenu/category/MenuItemsForm";
import AddItemAddons from "../../local/restaurant/manageMenu/itemAddons/AddItemAddons";
import CategoryItemForm from "../../local/restaurant/manageMenu/menuItems/CategoryItemForm";
import ToppingItemForm from "../../local/restaurant/manageMenu/toppings/ToppingItemForm";
import CashInOutForm from "../../local/restaurant/restaurantPOS/cashier/CashInOutForm";
import EditableTable from "../../local/roster/roster/restaurantRoster/EditableTable";
import EventRosterTaskForm from "../../local/roster/rosterTasks/eventRosterTask.jsx/EventRosterTaskForm";
import HotelRosterTaskForm from "../../local/roster/rosterTasks/hotelRosterTask/HotelRosterTaskForm";
import RestaurantRosterTaskForm from "../../local/roster/rosterTasks/restaurantRosterTask/RestaurantRosterTaskForm";
import EventRosterTimeForm from "../../local/roster/rosterTime/eventRosterTime.jsx/EventRosterTimeForm";
import HotelRosterTimeForm from "../../local/roster/rosterTime/hotelRosterTime/HotelRosterTimeForm";
import RestaurantRosterTimeForm from "../../local/roster/rosterTime/restaurantRosterTime/RestaurantRosterTimeForm";
import CustomersModal from "../../local/sales/customers/CustomersModal";
import PrinterForm from "../../local/settings/addPrinter/PrinterForm";
import DeliveryPartnerForm from "../../local/settings/deliveryPartners/DeliveryPartnerForm";
import PaymentModeForm from "../../local/settings/paymentModes/PaymentModeForm";
import QRPaymentForm from "../../local/settings/qrPayment/QRPaymentForm";
import FloorForm from "../../local/settings/tableManagement/FloorForm";
import TableFormEdit from "../../local/settings/tableManagement/TableEditForm";
import TableForm from "../../local/settings/tableManagement/TableForm";
import AddCompanyUser from "../../local/users/AddCompanyUser";
import AddCompanyUserRole from "../../local/users/userRoles/AddCompanyUserRole";
import CustomDeleteModal from "../CustomModal/CustomDeleteModal";
import CustomModal from "../CustomModal/CustomModal";

const AllModals = ({
   modalType,
   open,
   value,
   handleClose,
   row,
   handleConfirm,
   isLoading,
   isService,
   id,
   inputValue = "",
   uuid,
   account_type,
   modalTitle,
   parentCategory,
   rosterTime,
   initialRow,
   employees,
   isEditMode,
   selectedDate,
   closeModal,
   pos,
   deliveryForm,
}) => {
   const returnModal = () => {
      console.log("llcllcllvlllll", { initialRow });

      switch (modalType) {
         case "edit_customer":
         case "add_customer":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New customer"}`}
                  icon={<Person />}
                  width={"500px"}
                  deliveryForm={deliveryForm}
               >
                  {
                     <CustomersModal
                        pos={pos}
                        type={value}
                        handleClose={handleClose}
                        row={row}
                        uuid={uuid}
                        inputValue={inputValue}
                     />
                  }
               </CustomModal>
            );
         case "delete_customer":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "add_table":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New table"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <TableForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "edit_table":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New table"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <TableFormEdit
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_table":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_floor":
         case "add_floor":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New floor"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <FloorForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_floor":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_category":
         case "add_category":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "Add New Group"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <CategoryForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                        parentCategory={parentCategory}
                        uuid={uuid}
                     />
                  }
               </CustomModal>
            );
         case "delete_category":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_menu_item":
         case "add_menu_item":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "Add New Category"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <MenuItemForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                        parentCategory={parentCategory}
                     />
                  }
               </CustomModal>
            );
         case "delete_menu_item":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_category_item":
         case "add_category_item":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${
                     modalTitle ?? "Add New Menu Items"
                  }`}
                  icon={<Person />}
                  width={"800px"}
               >
                  {
                     <CategoryItemForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_category_item":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );

         case "units-of-measurement":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Unit of Measurement`}
                  icon={<InsertChartOutlined />}
                  width={"480px"}
               >
                  {
                     <UnitsOfMeasurementsModal
                        type={value}
                        handleClose={handleClose}
                        inputValue={inputValue}
                        uuid={uuid}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "add_inventory":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Inventory Products`}
                  icon={<InsertChartOutlined />}
                  width={"480px"}
               >
                  {
                     <InventoryProductsModal
                        type={value}
                        handleClose={handleClose}
                        inputValue={inputValue}
                        uuid={uuid}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "product-categories":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Product Category`}
                  icon={<Inventory2Outlined />}
                  width={"400px"}
               >
                  {
                     <ProductCategoriesModal
                        type={value}
                        handleClose={handleClose}
                        inputValue={inputValue}
                        uuid={uuid}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "products":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={
                     isService ? `New Service` : `New Product`
                  }
                  icon={
                     isService ? (
                        <ManageAccountsOutlined />
                     ) : (
                        <Inventory2Outlined />
                     )
                  }
                  width={"700px"}
               >
                  {
                     <ServicesModal
                        type={value}
                        handleClose={handleClose}
                        isService={isService}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "services":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Service`}
                  icon={<ManageAccountsOutlined />}
                  width={"700px"}
               >
                  {
                     <ServicesModal
                        type={value}
                        handleClose={handleClose}
                        isService={true}
                        row={row}
                     />
                  }
               </CustomModal>
            );

         case "add_company":
         case "edit_company":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`Add Company`}
                  icon={<InsertChartOutlined />}
                  width={"1000px"}
               >
                  <AddCompany
                     type={value}
                     handleClose={handleClose}
                     row={row}
                  />
               </CustomModal>
            );

         case "edit_user":
         case "add_user":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New user"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  <AddCompanyUser
                     type={value}
                     handleClose={handleClose}
                     row={row}
                  />
               </CustomModal>
            );
         case "delete_user":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );

         case "edit_cash_in_out":
         case "add_cash_in_out":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New Cash In Out"}`}
                  icon={<Person />}
                  width={"500px"}
                  deliveryForm={deliveryForm}
               >
                  {
                     <CashInOutForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_cash_in_out":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_user_role":
         case "add_user_role":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New user role"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  <AddCompanyUserRole
                     type={value}
                     handleClose={handleClose}
                     row={row}
                  />
               </CustomModal>
            );
         case "delete_user_role":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_item_addons":
         case "add_item_addons":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "Add New Toppings"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <AddItemAddons
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_item_addons":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );

         case "edit_toppings":
         case "add_toppings":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "Add New Toppings"}`}
                  icon={<Person />}
                  width={"700px"}
               >
                  {
                     <ToppingItemForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_toppings":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );

         case "edit_department":
         case "add_department":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New department"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <DepartmentForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_department":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_position":
         case "add_position":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New position"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <PositionForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_position":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_employee":
         case "add_employee":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New employee"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <EmployeeForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_employee":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_hotel_roster_time":
         case "add_hotel_roster_time":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${
                     modalTitle ?? "New hotel Roster Time"
                  }`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <HotelRosterTimeForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_hotel_roster_time":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_restaurant_roster_time":
         case "add_restaurant_roster_time":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${
                     modalTitle ?? "New Restaurant Roster Time"
                  }`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <RestaurantRosterTimeForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_restaurant_roster_time":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_event_roster_time":
         case "add_event_roster_time":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${
                     modalTitle ?? "New Event Roster Time"
                  }`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <EventRosterTimeForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_event_roster_time":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_hotel_roster_task":
         case "add_hotel_roster_task":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${
                     modalTitle ?? "New Hotel Roster Task"
                  }`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <HotelRosterTaskForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_hotel_roster_task":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_restaurant_roster_task":
         case "add_restaurant_roster_task":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${
                     modalTitle ?? "New Restaurant Roster Task"
                  }`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <RestaurantRosterTaskForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_restaurant_roster_task":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_event_roster_task":
         case "add_event_roster_task":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${
                     modalTitle ?? "New Event Roster Task"
                  }`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <EventRosterTaskForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_event_roster_task":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );

         case "edit_restaurant_roster":
         case "add_restaurant_roster":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${
                     modalTitle ?? "New Restaurant Roster"
                  }`}
                  icon={<Person />}
                  width={"1000px"}
               >
                  {
                     <EditableTable
                        type={value}
                        handleClose={handleClose}
                        row={row}
                        rosterTime={rosterTime}
                        initialRow={initialRow}
                        employees={employees}
                        isEditMode={isEditMode}
                        selectedDate={selectedDate}
                        closeModal={closeModal}
                     />
                  }
               </CustomModal>
            );
         case "edit_payment_mode":
         case "add_payment_mode":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New payment mode"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <PaymentModeForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_payment_mode":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_printer":
         case "add_printer":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New Printer"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <PrinterForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_printer":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_qr_payment":
         case "add_qr_payment":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New QR Payment"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <QRPaymentForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_qr_payment":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );
         case "edit_delivery_partner":
         case "add_delivery_partner":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${
                     modalTitle ?? "New delivery partner"
                  }`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <DeliveryPartnerForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                     />
                  }
               </CustomModal>
            );
         case "delete_delivery_partner":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );

         default:
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Account`}
                  icon={<PeopleIcon />}
               >
                  NICE{" "}
               </CustomModal>
            );
      }
   };
   return <div>{returnModal()}</div>;
};

export default AllModals;
