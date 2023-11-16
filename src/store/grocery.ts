import { createSlice } from "@reduxjs/toolkit"
import { CollectionGroceryType } from "../types/collection-grocery-type";
import { GroceryItemType } from "../types/grocery-item-type";

const grocerySlice = createSlice({
  name: "message",
  initialState: { 
    // listGroceryItem: [
    //     {
    //         collectionId: "12345",
    //         name: "test one",
    //         date: new Date(),
    //         isOnNotification: false,
    //         listGrocery: [
    //             {
    //                 id: "123",
    //                 name: "john",
    //                 detail: "lorem",
    //                 groceryImageUri: "http://loremipsum",
    //                 quantity: 12,
    //                 date: new Date(),
    //                 pricePerItem: 12,
    //                 totalPricePerItem: 12,
    //                 isCheck: false,
    //             },
    //         ],
    //     },
    // ]
    listGroceryCollection: [],

  },
  reducers: {
    initGroceryCollection: (state, action) => {
        state.listGroceryCollection = action.payload;
    },
    removeGroceryItemFromCollection: (state, action) => {
        const { collectionId, groceryId } = action.payload;

        state.listGroceryCollection = state.listGroceryCollection
        .map((item: CollectionGroceryType) => {
            if(item.collectionId === collectionId){
                return {
                    ...item,
                    listGrocery: item.listGrocery.filter(itemGrocery => itemGrocery.id !== groceryId),
                }
            }

            return item;

        })

    },
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // }
  }
})

export const { initGroceryCollection, removeGroceryItemFromCollection } = grocerySlice.actions;
export default grocerySlice.reducer;