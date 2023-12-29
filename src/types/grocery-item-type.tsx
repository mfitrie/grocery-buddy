export interface GroceryItemType{
    id: string,
    name: string,
    detail: string,
    groceryImageUri: string,
    quantity: number,
    pricePerItem: number,
    totalPricePerItem: number
    isCheck: boolean,
    collectionId: string,
}