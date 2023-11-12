import { faker } from '@faker-js/faker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Box, ScrollView, HStack, Image, VStack, Button, ButtonText, Heading, ButtonIcon, Pressable } from "@gluestack-ui/themed";
import { Pencil, PlusSquare, MinusSquare, CheckSquare } from "lucide-react-native";
import { Checkbox } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { TodayGroceryItem } from '../../components/today-grocery-item';
import { GroceryItemType } from '../../types/grocery-item-type';

export function ListGroceriesToday(){
    

    const dummyGroceryItem: GroceryItemType[] = Array(10).fill(null).map(item => (
        {
            id: faker.database.mongodbObjectId(),
            name: faker.word.words(2),
            detail: faker.word.words(10),
            quantity: faker.number.int({ max: 10 }),
            date: faker.date.anytime(),
            pricePerItem: +faker.commerce.price(),
            isCheck: faker.datatype.boolean(),
        }
    ))

    const [listGroceryItem, setListGroceryItem] = useState<GroceryItemType[]>(dummyGroceryItem);
    const handleAddAndMinusQuantityInItem = (id: string, isAddQuantity: boolean) => {
        setListGroceryItem(prevValue => prevValue.map(item => {
            if(item.id == id){
                return {
                    ...item,
                    quantity: item.quantity > 0 ? (isAddQuantity ? item.quantity + 1 : item.quantity - 1) : (isAddQuantity ? item.quantity + 1 : item.quantity),
                }
            }else {
                return item;
            }
        }));
    }
    const addGroceryQuantity = (id: string) => {
        handleAddAndMinusQuantityInItem(id, true);
    }
    const minusGroceryQuantity = (id: string) => {
        handleAddAndMinusQuantityInItem(id, false);
    }
    const checkGroceryItem = (id: string) => {
        setListGroceryItem(prevValue => prevValue.map(item => {
            if(item.id == id){
                return {
                    ...item,
                    isCheck: item.isCheck = !item.isCheck, 
                }
            }else {
                return item;
            }
        }));
    }

    const [isCheck, setCheck] = useState(false);
    const insets = useSafeAreaInsets();

    const checkHandler = () => {
        setCheck(prevValue => prevValue = !prevValue);
    }

    return (
        <ScrollView>
            {
                listGroceryItem.map((item, index) => (
                    <TodayGroceryItem 
                        id={ item.id }
                        addGroceryQuantity={ addGroceryQuantity }
                        minusGroceryQuantity={ minusGroceryQuantity }
                        checkGroceryItem={ checkGroceryItem }
                        name={ item.name }
                        detail={ item.detail }
                        quantity={item.quantity}
                        pricePerItem={ item.pricePerItem }
                        isCheck={item.isCheck}
                        key={index}
                    />    
                ))
            }
        </ScrollView>
    )
}