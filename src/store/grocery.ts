import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CollectionGroceryType } from "../types/collection-grocery-type";
import { GroceryItemType } from "../types/grocery-item-type";
import { faker } from "@faker-js/faker";


interface RemoveGroceryItemActionType {
  collectionId: string,
  groceryId: string,
}

interface MinusGroceryItemActionType extends RemoveGroceryItemActionType{}
interface AddGroceryItemActionType extends RemoveGroceryItemActionType{}
interface TickCheckGroceryItemActionType extends RemoveGroceryItemActionType{}
interface TickAllkGroceryItemDoneActionType extends Omit<RemoveGroceryItemActionType, "groceryId">{}

// init dummy listCollectionGroceries
const dummyCollectionGrocery: CollectionGroceryType[] = Array(10).fill(null).map(item => {
  return {
      collectionId: faker.database.mongodbObjectId(),
      name: faker.word.words(2),
      date: faker.date.anytime(),
      isOnNotification: faker.datatype.boolean(),
      listGrocery: Array(10).fill(null).map(itemTwo => {
          const pricePerItem = +faker.commerce.price({ max: 50 });
          return {
              id: faker.database.mongodbObjectId(),
              name: faker.word.words(2),
              detail: faker.word.words(10),
              groceryImageUri: faker.image.urlLoremFlickr({ category: 'food' }),
              quantity: 1,
              date: faker.date.anytime(),
              pricePerItem,
              totalPricePerItem: pricePerItem,
              isCheck: faker.datatype.boolean(),
          }
      }),
  }

});


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
    listGroceryCollection: dummyCollectionGrocery,

  },
  reducers: {
    initGroceryCollection: (state, action) => {
      state.listGroceryCollection = action.payload;
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
  }
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
  removeGroceryItemFromCollection, 
  addGroceryQuantity, 
  minusGroceryQuantity,
  tickCheckGroceryItem,
  tickAllGroceryItemAsDone,
  turnOnNotificationCollection,
  turnOffNotificationCollection,
} = grocerySlice.actions;
export default grocerySlice.reducer;