export interface GroceryItemType{
    id: string,
    name: string,
    detail: string,
    groceryImageUri: string,
    quantity: number,
    date: Date,
    pricePerItem: number,
    totalPricePerItem: number
    isCheck: boolean,
}