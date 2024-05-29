import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
   activeFloor: "",
   tablesWithOrder: [],
   foodOrder: [],
   kotPageId: "",
   botPageId: "",
   kotPage: "",
   orderPageId: "",
   selfDeliveryCreateId: "",
   pickupUserCreateId: "",
   dashboardFloorId: "",
};

const orderSlice = createSlice({
   name: "order",
   initialState,
   reducers: {
      addOrder: (state, action) => {
         state.tablesWithOrder = action.payload;
      },
      appendOrder: (state, { payload }) => {
         const { tableIndex, data } = payload;
         state.tablesWithOrder[tableIndex].orderItem.push(data);
      },
      appendNewOrder: (state, { payload }) => {
         const { data } = payload;
         state.foodOrder.push(data);
      },

      removeOrder: (state, { payload }) => {
         const { tableIndex, id } = payload;
         const filteredItem = state.tablesWithOrder[
            tableIndex
         ].orderItem.filter((item) => item.id != id);
         state.tablesWithOrder[tableIndex].orderItem = filteredItem;
      },
      removeAllOrder: (state, { payload }) => {
         const { tableIndex } = payload;
         state.tablesWithOrder[tableIndex].orderItem = [];
      },

      // decreaseOrder: (state, { payload }) => {
      //    const { tableIndex, id } = payload;
      //    state.tablesWithOrder[tableIndex].orderItem.forEach(
      //       (item) => {
      //          if (item.id == id) {
      //             item.quantity--;
      //          }
      //       }
      //    );
      // },

      decreaseOrder: (state, { payload }) => {
         const { tableIndex, id } = payload;
         const table = state.tablesWithOrder[tableIndex];

         // Find the item in the order
         const itemIndex = table.orderItem.findIndex(
            (item) => item.id === id
         );
         if (itemIndex !== -1) {
            // Decrease the quantity
            table.orderItem[itemIndex].quantity--;

            // Remove the item if quantity becomes 0 or less
            if (table.orderItem[itemIndex].quantity <= 0) {
               table.orderItem.splice(itemIndex, 1);
            }
         }
      },

      increaseOrder: (state, { payload }) => {
         const { tableIndex, id } = payload;
         console.log("lsllsllsllslls", { id });

         state.tablesWithOrder[tableIndex].orderItem.forEach(
            (item) => {
               if (item.id == id) {
                  item.quantity++;
               }
            }
         );
      },
      setQuantity: (state, { payload }) => {
         const { tableIndex, id, quantity } = payload;
         state.tablesWithOrder[tableIndex].orderItem.forEach(
            (item) => {
               if (item.id == id) {
                  item.quantity = quantity;
               }
            }
         );
      },
      setToppingsOrderQuantity: (state, { payload }) => {
         const { toppingsId, tableIndex, variationId, quantity } =
            payload;
         console.log("lsllsllsllslls", {
            toppingsId,
            variationId,
            tableIndex,
            state,
         });

         state.tablesWithOrder[tableIndex].orderItem.forEach(
            (item) => {
               if (
                  item?.toppingParentId == variationId &&
                  item.id == toppingsId
               ) {
                  item.quantity = quantity;
                  item.toppingId = toppingsId;
               }
            }
         );
      },
      increaseToppingsOrder: (state, { payload }) => {
         const { toppingsId, tableIndex, variationId } = payload;
         console.log("lsllsllsllsll---->>s", {
            toppingsId,
            variationId,
            tableIndex,
            state,
         });

         state.tablesWithOrder[tableIndex].orderItem.forEach(
            (item) => {
               console.log(
                  "itemInsideTopping",
                  item?.toppingParentId
               );
               if (
                  item?.toppingParentId == variationId &&
                  item?.id == toppingsId
               ) {
                  item.quantity++;
                  item.toppingId = toppingsId;
               }
            }
         );
      },

      // decreaseToppingsOrder: (state, { payload }) => {
      //    const { tableIndex, toppingsId, variationId } = payload;
      //    state.tablesWithOrder[tableIndex].orderItem.forEach(
      //       (item) => {
      //          if (
      //             item.id == toppingsId &&
      //             item?.toppingParentId == variationId
      //          ) {
      //             item.quantity--;
      //          }
      //       }
      //    );
      // },
      decreaseToppingsOrder: (state, { payload }) => {
         const { tableIndex, toppingsId, variationId } = payload;
         state.tablesWithOrder[tableIndex].orderItem.forEach(
            (item, index) => {
               if (
                  item?.toppingParentId === variationId &&
                  item?.id === toppingsId
               ) {
                  item.quantity--;
                  if (item?.quantity <= 0) {
                     state?.tablesWithOrder[
                        tableIndex
                     ]?.orderItem?.splice(index, 1); // Remove item from order if quantity is 0 or negative
                  }
               }
            }
         );
      },
      setActiveFloor: (state, { payload }) => {
         console.log({ payload });
         state.activeFloor = {
            floorId: payload.floorId,
            floorName: payload.floorName,
         };
      },
      addNote: (state, { payload }) => {
         const { id, tableIndex, itemNote } = payload;
         console.log({ itemNote, id });
         state.tablesWithOrder[tableIndex].orderItem.forEach(
            (item) => {
               if (item.id === id) {
                  item.noteItem = itemNote;
               }
            }
         );
      },
      addToppingsId: (state, { payload }) => {
         const {
            id,
            tableIndex,
            toppingsId,
            toppingsQuantity,
            toppingsPrice,
            toppingParentId,
         } = payload;
         console.log({ toppingsId, id });
         state.tablesWithOrder[tableIndex].orderItem.forEach(
            (item) => {
               if (item.id === id) {
                  item.toppingsId = toppingsId;
                  item.toppingsPrice = toppingsPrice;
                  item.toppingsQuantity = toppingsQuantity;
                  item.toppingParentId = toppingParentId;
               }
            }
         );
      },
      addNoteFavourite: (state, { payload }) => {
         const { id, tableIndex, itemNote } = payload;
         console.log({ itemNote, id });
         state.tablesWithOrder[tableIndex].orderItem.forEach(
            (item) => {
               if (item.product_id === id) {
                  item.noteItem = itemNote;
               }
            }
         );
      },
      setKotPageId: (state, { payload }) => {
         state.kotPageId = {
            kotId: payload.kotId,
         };
      },
      setBotPageId: (state, { payload }) => {
         state.botPageId = {
            botId: payload.botId,
         };
      },
      setKotPage: (state, { payload }) => {
         state.kotPage = {
            kotPage: payload.kotPage,
         };
      },
      setOrdersPageId: (state, { payload }) => {
         state.orderPageId = {
            orderId: payload.orderId,
         };
      },
      setSelfDeliveryCreateId: (state, { payload }) => {
         state.selfDeliveryCreateId = {
            selfDeliveryCreateUserId:
               payload.selfDeliveryCreateUserId,
         };
      },
      removeSelfDeliveryCreateId: (state) => {
         state.selfDeliveryCreateId = null;
      },
      setPickupUserCreateId: (state, { payload }) => {
         state.pickupUserCreateId = {
            pickupUserCreateUserId: payload.pickupUserCreateUserId,
         };
      },
      removePickupUserCreateId: (state) => {
         state.pickupUserCreateId = null;
      },
      setDashboardFloorId: (state, { payload }) => {
         state.dashboardFloorId = {
            dashboardFloorSelectId: payload.dashboardFloorSelectId,
         };
      },
   },
   // extraReducers: (builder) => {
   //   builder.addCase(finishKOT.fulfilled, (state, action) => {
   //     // console.log("actions", action)
   //     const { tableIndex } = action.payload;
   //     state.tablesWithOrder[tableIndex].orderItem = [];
   //   });
   // },
});

// export const finishKOT = createAsyncThunk(
//   "orders/finishKOT",
//   async ({ tableIndex, tableId, note, pickupId }, { getState }) => {
//     const { order } = getState();
//     const { orderItem } =
//       tableIndex === -1 ? [] : order.tablesWithOrder[tableIndex];
//
//     const productDetails = orderItem?.map((item) => {
//       return {
//         product_variation_id: item.id,
//         price: item.price,
//         quantity: item.quantity,
//       };
//     });
//
//     const postData = {
//       table_id: tableId ?? "",
//       // customer_id: 11,
//       pickup_user_id: pickupId ?? "",
//       description: note,
//       productDetails: productDetails,
//     };
//
//     const token = JSON.parse(localStorage?.getItem("restaurant_access_token"));
//
//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/admin/orders`,
//       { ...postData },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//
//     return { response: response.data, tableIndex: tableIndex };
//   },
// );

export const {
   addOrder,
   removeOrder,
   decreaseOrder,
   decreaseToppingsOrder,
   increaseOrder,
   setQuantity,
   setToppingsOrderQuantity,
   increaseToppingsOrder,
   appendOrder,
   appendNewOrder,
   appendToppingsOrder,
   setActiveFloor,
   setKotPageId,
   setBotPageId,
   setOrdersPageId,
   setKotPage,
   removeAllOrder,
   addNote,
   addNoteFavourite,
   addToppingsId,
   setSelfDeliveryCreateId,
   removeSelfDeliveryCreateId,
   setPickupUserCreateId,
   removePickupUserCreateId,
   setDashboardFloorId,
} = orderSlice.actions;

export default orderSlice.reducer;
