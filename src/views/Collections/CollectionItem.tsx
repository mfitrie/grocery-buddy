import { Box, Button, ButtonText, ButtonIcon, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { TodayGroceryItem } from "../../components/today-grocery-item";
import { GroceryItemType } from "../../types/grocery-item-type";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Trash2, Bell, BellOff, PlusSquare } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeGroceryItemFromCollection, turnOnNotificationCollection, turnOffNotificationCollection } from "../../store/grocery";
import { CollectionGroceryType } from "../../types/collection-grocery-type";
import { RootState } from "../../store/store";
import { ModalAddGrocery } from "../../components/modal-add-grocery";
import { removeCollection } from "../../store/grocery";
import { CollectionRoutes } from "../../constant/route-types";


export default function CollectionItem({ route, navigation }){
    const { listGroceryCollection } = useSelector((state: RootState) => state.grocery);
    const dispatch = useDispatch();
    const collectionId = route.params?.collectionId;
    const collectionItem = listGroceryCollection
    .find((item: CollectionGroceryType) => item.collectionId === collectionId);
    const { name, date, isOnNotification, listGrocery } = collectionItem;
    const [showModal, setShowModal] = useState<boolean>(false);
    

    return (
        <VStack>
            <ModalAddGrocery
                isShowModal={ showModal }
                setShowModal={ setShowModal }
                collectionId={ collectionId }
                collectionName={ name }
                collectionDate={ date }
                collectionIsOnNotification={ isOnNotification }
            />
            <ScrollView
                h="$4/6"
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
                h="$2/6"
                justifyContent='center'
                gap="$3"
                px="$4"
            >
                <Button
                    softShadow='1'
                    bgColor='#E67E22'
                    display='flex'
                    gap="$1"
                    action="positive"
                    onPress={ () => {
                        setShowModal(true);
                    } }
                >
                    <ButtonText>Add list to buy</ButtonText>
                    <ButtonIcon as={ PlusSquare }/>
                </Button>
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
                    onPress={ () => {
                        dispatch(removeCollection({
                            collectionId,
                        }));
                        navigation.navigate(CollectionRoutes.CollectionHome.toString());
                    } }
                >
                    <ButtonText>Delete collection</ButtonText>
                    <ButtonIcon as={ Trash2 }/>
                </Button>
            </VStack>

        </VStack>
    )
}