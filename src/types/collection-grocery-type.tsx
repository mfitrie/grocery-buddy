import { GroceryItemType } from "./grocery-item-type";

export interface CollectionGroceryType{
    collectionId: string,
    name: string,
    date: Date,
    isOnNotification: boolean,
    listGrocery: GroceryItemType[],
}