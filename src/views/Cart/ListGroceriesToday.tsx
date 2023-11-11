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
            quantity: faker.number.int({ max: 100 }),
            date: faker.date.anytime(),
            pricePerItem: +faker.commerce.price(),
            isCheck: faker.datatype.boolean(),
        }
    ))

    const [listGroceryItem, setListGroceryItem] = useState<GroceryItemType[]>(dummyGroceryItem);
    
    const [quantity, setQuantity] = useState<number>(0);
    const [isCheck, setCheck] = useState(false);
    const insets = useSafeAreaInsets();

    const addQuantity = () => {
        setQuantity(prevValue => prevValue + 1);
    } 
    const minusQuantity = () => {
        setQuantity(prevValue => {
            if(prevValue <= 0){
                return 0;
            }

            return prevValue - 1;
        });
    }

    const checkHandler = () => {
        setCheck(prevValue => prevValue = !prevValue);
    }

    return (
        <ScrollView>
            {
                listGroceryItem.map((item, index) => (
                    <TodayGroceryItem 
                        addQuantity={addQuantity}
                        minusQuantity={minusQuantity}
                        checkHandler={checkHandler}
                        name={ item.name }
                        detail={ item.detail }
                        quantity={item.quantity}
                        pricePerItem={ item.pricePerItem }
                        isCheck={item.isCheck}
                        key={index}
                    />    
                ))
            }
            {/* <TodayGroceryItem 
                addQuantity={addQuantity}
                minusQuantity={minusQuantity}
                checkHandler={checkHandler}
                isCheck={isCheck}
                quantity={quantity} 
            /> */}
        </ScrollView>
    )
}