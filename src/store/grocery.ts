import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CollectionGroceryType } from "../types/collection-grocery-type";
import { GroceryItemType } from "../types/grocery-item-type";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { groceryBuddyApi } from "./api";

interface RemoveGroceryItemActionType {
  collectionId: string,
  groceryId: string,
}
interface RemoveCollectionType extends Omit<RemoveGroceryItemActionType, "groceryId">{}

interface AddCollectionType {
  collectionName: string,
  collectionDate: Date,
}
interface AddGroceryItemType extends Omit<RemoveGroceryItemActionType, "groceryId">{
  collectionName: string,
  collectionDate: Date,
  collectionIsOnNotification: boolean,
  groceryName: string,
  detail: string,
  quantity: number,
  pricePerItem: number,
}
interface MinusGroceryItemActionType extends RemoveGroceryItemActionType{}
interface AddGroceryItemActionType extends RemoveGroceryItemActionType{}
interface TickCheckGroceryItemActionType extends RemoveGroceryItemActionType{}
interface TickAllkGroceryItemDoneActionType extends Omit<RemoveGroceryItemActionType, "groceryId">{}

// // init dummy listCollectionGroceries
// const dummyCollectionGrocery: CollectionGroceryType[] = Array(5).fill(null).map(item => {
//   const collectionId = faker.database.mongodbObjectId();
//   return {
//       collectionId,
//       name: faker.word.words(2),
//       date: faker.date.anytime(),
//       isOnNotification: faker.datatype.boolean(),
//       listGrocery: Array(10).fill(null).map(itemTwo => {
//           const pricePerItem = +faker.commerce.price({ max: 50 });
//           return {
//               id: faker.database.mongodbObjectId(),
//               name: faker.word.words(2),
//               detail: faker.word.words(10),
//               groceryImageUri: faker.image.urlLoremFlickr({ category: 'food' }),
//               quantity: 1,
//               pricePerItem,
//               totalPricePerItem: pricePerItem,
//               isCheck: faker.datatype.boolean(),
//               collectionId, 
//           }
//       }),
//   }

// });


const grocerySlice = createSlice({
  name: "message",
  initialState: {
    listGroceryCollection: [],

  },
  reducers: {
    initGroceryCollection: (state, action) => {
      state.listGroceryCollection = action.payload;
    },
    addCollection: (state, action: PayloadAction<AddCollectionType>) => {
      const { collectionName, collectionDate } = action.payload;
      const newCollection: CollectionGroceryType  = {
        collectionId: faker.database.mongodbObjectId(),
        name: collectionName,
        date: collectionDate,
        isOnNotification: false,
        listGrocery: [],
      }

      state.listGroceryCollection.push(newCollection);

    },
    addGroceryItem: (state, action: PayloadAction<AddGroceryItemType>) => {
      const { 
        collectionId, 
        collectionName,
        collectionDate,
        collectionIsOnNotification,
        groceryName,
        detail,
        quantity,
        pricePerItem 
      } = action.payload;


      const { listGrocery } = state.listGroceryCollection
      .find(item => item.collectionId === collectionId);

      listGrocery
      .push({
        id: faker.database.mongodbObjectId(),
        name: groceryName,
        detail,
        quantity,
        pricePerItem,
        groceryImageUri: faker.image.urlLoremFlickr({ category: 'food' }),
        isCheck: false,
        totalPricePerItem: pricePerItem * quantity,
        collectionId,
      });

      state.listGroceryCollection = state.listGroceryCollection
      .map(item => {
        if(item.collectionId === collectionId){
          return {
            collectionId,
            date: collectionDate,
            isOnNotification: collectionIsOnNotification,
            listGrocery,
            name: collectionName,    
          }
        }

        return item;
      });

    },
    removeCollection: (state, action: PayloadAction<RemoveCollectionType>) => {
      const { collectionId } = action.payload;
      state.listGroceryCollection = state.listGroceryCollection.filter(item => item.collectionId !== collectionId);

    },
    removeGroceryItemFromCollection: (state, action: PayloadAction<RemoveGroceryItemActionType>) => {
      const { collectionId, groceryId } = action.payload;

      state.listGroceryCollection = state.listGroceryCollection
        .map((item: CollectionGroceryType) => {
          if (item.collectionId === collectionId) {
            return {
              ...item,
              listGrocery: item.listGrocery.filter(itemGrocery => itemGrocery.id !== groceryId),
            }
          }

          return item;

        });

    },
    addGroceryQuantity(state, action: PayloadAction<AddGroceryItemActionType>){
      const { collectionId, groceryId } = action.payload;
      const listGroceryItem = state.listGroceryCollection
      .find(item => item.collectionId === collectionId)
      .listGrocery;
      const modifyListGroceryItem = handleAddAndMinusQuantityInItem(listGroceryItem, groceryId, true);

      state.listGroceryCollection = state.listGroceryCollection
      .map(item => ({
        ...item,
        listGrocery: modifyListGroceryItem,
      }));

    },
    minusGroceryQuantity(state, action: PayloadAction<MinusGroceryItemActionType>){
      const { collectionId, groceryId } = action.payload;
      const listGroceryItem = state.listGroceryCollection
      .find(item => item.collectionId === collectionId)
      .listGrocery;
      const modifyListGroceryItem = handleAddAndMinusQuantityInItem(listGroceryItem, groceryId, false);

      state.listGroceryCollection = state.listGroceryCollection
      .map(item => ({
        ...item,
        listGrocery: modifyListGroceryItem,
      }));

    },
    tickCheckGroceryItem(state, action: PayloadAction<TickCheckGroceryItemActionType>){
      const { collectionId, groceryId } = action.payload;
      const listGroceryItem = state.listGroceryCollection
      .find(item => item.collectionId === collectionId)
      .listGrocery;
      const modifyListGroceryItem =  listGroceryItem.map(item => {
          if(item.id == groceryId){
              return {
                  ...item,
                  isCheck: item.isCheck = !item.isCheck, 
              }
          }else {
              return item;
          }
      });
      
      state.listGroceryCollection = state.listGroceryCollection
      .map(item => ({
        ...item,
        listGrocery: modifyListGroceryItem,
      }));


    },
    tickAllGroceryItemAsDone(state, action: PayloadAction<TickAllkGroceryItemDoneActionType>){
      const { collectionId } = action.payload;
      const listGroceryItem = state.listGroceryCollection
      .find(item => item.collectionId === collectionId)
      .listGrocery;
      const modifyListGroceryItem =  listGroceryItem.map(item => {
        return {
            ...item,
            isCheck: true, 
        }
      });
      
      state.listGroceryCollection = state.listGroceryCollection
      .map(item => ({
        ...item,
        listGrocery: modifyListGroceryItem,
      }));
       
    },
    turnOnNotificationCollection(state, action: PayloadAction<TickAllkGroceryItemDoneActionType>){
      const { collectionId } = action.payload;
      
      state.listGroceryCollection = state.listGroceryCollection
      .map(item => {
        if(item.collectionId === collectionId){
          return {
            ...item,
            isOnNotification: true,
          }
        }

        return {
          ...item,
        }

      });

    },
    turnOffNotificationCollection(state, action: PayloadAction<TickAllkGroceryItemDoneActionType>){
      const { collectionId } = action.payload;
      
      state.listGroceryCollection = state.listGroceryCollection
      .map(item => {
        if(item.collectionId === collectionId){
          return {
            ...item,
            isOnNotification: false,
          }
        }

        return {
          ...item,
        }

      });

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
  },
  // extraReducers(builder) {
  //     builder.addMatcher(groceryBuddyApi.endpoints.getAllCollectionWithGrocery.matchFulfilled, (state, action) => {
  //       state.listGroceryCollection = action.payload;
  //     });
  // },
});


function handleAddAndMinusQuantityInItem(
    listGroceryItem: GroceryItemType[], 
    groceryId: string, 
    isAddQuantity: boolean
  ): GroceryItemType[]{

    return listGroceryItem
    .map(item => {
      if(item.id == groceryId){
          const quantity = item.quantity > 0 ? (isAddQuantity ? item.quantity + 1 : item.quantity - 1) : (isAddQuantity ? item.quantity + 1 : item.quantity);
          const totalPricePerItem = item.pricePerItem * quantity; 

          return {
              ...item,
              quantity,
              totalPricePerItem,
          }
      }else {
          return item;
      }
    });
  }

export const { 
  initGroceryCollection, 
  addCollection,
  addGroceryItem,
  removeCollection,
  removeGroceryItemFromCollection, 
  addGroceryQuantity, 
  minusGroceryQuantity,
  tickCheckGroceryItem,
  tickAllGroceryItemAsDone,
  turnOnNotificationCollection,
  turnOffNotificationCollection,
} = grocerySlice.actions;
export default grocerySlice.reducer;