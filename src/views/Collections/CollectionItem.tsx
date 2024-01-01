import { Box, Button, ButtonText, ButtonIcon, ScrollView, Text, VStack, Modal, ModalBackdrop, ModalContent, ModalHeader, Heading, ModalBody, Input, InputField, ModalFooter, HStack, useToast, Toast, ToastTitle, ToastDescription } from "@gluestack-ui/themed";
import { TodayGroceryItem } from "../../components/today-grocery-item";
import { GroceryItemType } from "../../types/grocery-item-type";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Trash2, Bell, BellOff, PlusSquare } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeGroceryItemFromCollection, turnOnNotificationCollection, turnOffNotificationCollection, updateGroceryItemInfo, addGroceryQuantity, minusGroceryQuantity } from "../../store/grocery";
import { CollectionGroceryType } from "../../types/collection-grocery-type";
import { RootState } from "../../store/store";
import { ModalAddGrocery } from "../../components/modal-add-grocery";
import { removeCollection } from "../../store/grocery";
import { CollectionRoutes } from "../../constant/route-types";
import { dbDeleteCollection, dbUpdateGroceryItemInfo } from "../../database/db-service";


export default function CollectionItem({ route, navigation }){
    const { listGroceryCollection } = useSelector((state: RootState) => state.grocery);
    const dispatch = useDispatch();
    const collectionId = route.params?.collectionId;
    const collectionItem = listGroceryCollection
    .find((item: CollectionGroceryType) => item.collectionId === collectionId);
    const { name, date, isOnNotification, listGrocery } = collectionItem;
    const [showModal, setShowModal] = useState<boolean>(false);

    
    // modal edit grocery
    const [showModalEditGrocery, setShowModalEditGrocery] = useState<boolean>(false);
    const initValueItemEditGrocery = {
        id: "",
        name: "",
        detail: "",
        quantity: 0,
        pricePerItem: 0,
    }
    const [itemEditGrocery, setItemEditGrocery] = useState<Pick<GroceryItemType, "id" | "name" | "detail" | "quantity" | "pricePerItem">>(initValueItemEditGrocery);
    const clearItemEditGrocery = () => {
        setItemEditGrocery(initValueItemEditGrocery);
    }
    // modal edit grocery

    const toast = useToast();


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
            {/*----- modal edit grocery -----*/}
            <Modal
                isOpen={showModalEditGrocery}
                onClose={() => {
                    clearItemEditGrocery();
                    setShowModalEditGrocery(false);
                }}
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <VStack space="sm">
                            <Heading size="lg">Edit grocery information</Heading>
                        </VStack>
                    </ModalHeader>
                    <ModalBody>
                        <VStack space='xl'>
                            <VStack space='xs'>
                                <Text lineHeight="$lg">
                                    Grocery Name
                                </Text>
                                <Input>
                                    <InputField
                                        type="text" 
                                        placeholder='Enter grocery name'
                                        value={ itemEditGrocery.name }
                                        onChangeText={ (text: string) => {
                                            setItemEditGrocery((prevGrocery) => ({
                                                ...prevGrocery,
                                                name: text,
                                            }));
                                        } }
                                    />
                                </Input>
                            </VStack>
                            <VStack space='xs'>
                                <Text lineHeight="$lg">
                                    Detail
                                </Text>
                                <Input>
                                    <InputField
                                        type="text" 
                                        placeholder='Enter detail'
                                        value={ itemEditGrocery.detail }
                                        onChangeText={ (text: string) => { 
                                            setItemEditGrocery((prevGrocery) => ({
                                                ...prevGrocery,
                                                detail: text,
                                            }));
                                        } }
                                    />
                                </Input>
                            </VStack>
                            <VStack space='xs'>
                                <Text lineHeight="$lg">
                                    Price Per Item
                                </Text>
                                <Input>
                                    <InputField
                                        type="text"
                                        keyboardType='numeric'
                                        placeholder='Enter price per item'
                                        value={ itemEditGrocery.pricePerItem + "" }
                                        onChangeText={ (text: string) => { 
                                            setItemEditGrocery((prevGrocery) => ({
                                                ...prevGrocery,
                                                pricePerItem: +text,
                                            }));
                                        } }
                                    />
                                </Input>
                            </VStack>
                            <VStack space='xs'>
                                <Text lineHeight="$lg">
                                    Quantity
                                </Text>
                                <Input>
                                    <InputField
                                        type="text"
                                        keyboardType='numeric'
                                        placeholder='Enter quantity'
                                        value={ itemEditGrocery.quantity + "" }
                                        onChangeText={ (text: string) => {
                                            setItemEditGrocery((prevGrocery) => ({
                                                ...prevGrocery,
                                                quantity: +text,
                                            }));
                                        } }
                                    />
                                </Input>
                            </VStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <HStack
                            gap="$4"
                        >
                            <Button
                                action='positive'
                                onPress={ () => {
                                        dbUpdateGroceryItemInfo(itemEditGrocery);
                                        dispatch(updateGroceryItemInfo({
                                            ...itemEditGrocery,
                                            groceryId: itemEditGrocery.id,
                                            collectionId,
                                        }));
                                        clearItemEditGrocery();
                                        setShowModalEditGrocery(false);
                                        toast.show({
                                            placement: "top right",
                                            render: ({ id }) => {
                                            return (
                                                    <Toast nativeID={"toast-" + id} action="info" variant="accent">
                                                        <VStack space="xs">
                                                            <ToastTitle>Grocery</ToastTitle>
                                                            <ToastDescription>
                                                                Edit item successful
                                                            </ToastDescription>
                                                        </VStack>
                                                    </Toast>
                                                )
                                            },
                                        });
                                    }
                                }
                            >
                                <ButtonText>Save</ButtonText>
                            </Button>
                            <Button
                                action="secondary"
                                onPress={ () => {
                                    clearItemEditGrocery();
                                    setShowModalEditGrocery(false);
                                } }
                            >
                                <ButtonText>Close</ButtonText>
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/*----- modal edit grocery -----*/}
            <ScrollView
                h="$4/6"
            >
                {
                    listGrocery.length !== 0 ?
                    listGrocery.map((item, index) => (
                        <TodayGroceryItem 
                            id={ item.id }
                            setItemEditGrocery={ setItemEditGrocery }
                            setShowModalEditGrocery={ setShowModalEditGrocery }
                            addGroceryQuantity={ () => dispatch(addGroceryQuantity({ collectionId, groceryId: item.id })) }
                            minusGroceryQuantity={ () => dispatch(minusGroceryQuantity({ collectionId, groceryId: item.id })) }
                            name={ item.name }
                            detail={ item.detail }
                            groceryImageUri={ item.groceryImageUri ?? "https://placehold.jp/150x150.png" }
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
                        dbDeleteCollection(collectionId);
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