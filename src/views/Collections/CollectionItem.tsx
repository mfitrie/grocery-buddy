import { Box, Button, ButtonText, ButtonIcon, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { TodayGroceryItem } from "../../components/today-grocery-item";
import { GroceryItemType } from "../../types/grocery-item-type";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Trash2, Bell, BellOff } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeGroceryItemFromCollection, turnOnNotificationCollection, turnOffNotificationCollection } from "../../store/grocery";
import { CollectionGroceryType } from "../../types/collection-grocery-type";


export default function CollectionItem({ route }){
    const { listGroceryCollection } = useSelector((state: any) => state.grocery);
    const dispatch = useDispatch();
    
    const collectionId = route.params?.collectionId;
    
    const collectionItem = listGroceryCollection
    .find((item: CollectionGroceryType) => item.collectionId === collectionId);
    
    const listGrocery = collectionItem.listGrocery;
    

    return (
        <VStack>
            <ScrollView
                h="$5/6"
            >
                {
                    listGrocery.length !== 0 ?
                    listGrocery.map((item, index) => (
                        <TodayGroceryItem 
                            id={ item.id }
                            addGroceryQuantity={ () => {} }
                            minusGroceryQuantity={ () => {} }
                            name={ item.name }
                            detail={ item.detail }
                            groceryImageUri={ item.groceryImageUri }
                            quantity={item.quantity}
                            pricePerItem={ item.pricePerItem }
                            totalPricePerItem={ item.totalPricePerItem }
                            isCheck={item.isCheck}
                            isHaveDeleteButton={ true }
                            removeGroceryItem={ () => dispatch(removeGroceryItemFromCollection({ collectionId, groceryId: item.id })) }
                            key={ index }
                        />    
                    ))
                    :
                    <VStack
                        h="$96"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text
                            bold="true"
                            fontSize="$2xl"
                        >No Data</Text>
                    </VStack>
                }
            </ScrollView>
            <VStack
                h="$1/6"
                justifyContent='center'
                gap="$3"
                px="$4"
            >
                <Button
                    softShadow='1'
                    display='flex'
                    gap="$1"
                    action="positive"
                    onPress={() => {
                        dispatch(collectionItem.isOnNotification ? turnOffNotificationCollection({ collectionId }) : turnOnNotificationCollection({ collectionId }));
                    }}
                >
                    <ButtonText> { collectionItem.isOnNotification ? "Disable" : "Enable" } Notification Reminder </ButtonText>
                    <ButtonIcon as={ collectionItem.isOnNotification ? Bell : BellOff }/>
                </Button>
                
                <Button
                    softShadow='1'
                    display='flex'
                    gap="$1"
                    action="negative"
                    onPress={ () => console.log("Im clicked!!") }
                >
                    <ButtonText>Delete collection</ButtonText>
                    <ButtonIcon as={ Trash2 }/>
                </Button>
            </VStack>

        </VStack>
    )
}