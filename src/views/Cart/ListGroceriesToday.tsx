import { faker } from '@faker-js/faker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    useToast,
    Toast,
    Modal,
    ModalBackdrop,
    ModalHeader, 
    ModalBody,
    ModalFooter,
    Text, 
    Box, 
    ScrollView, 
    HStack, 
    Image, 
    VStack, 
    Button, 
    ButtonText, 
    Heading, 
    ButtonIcon, 
    Pressable, 
    ModalContent,
    Input,
    InputField,
    ToastTitle,
    ToastDescription, 
} from "@gluestack-ui/themed";
import { Checkbox } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CheckSquare, PlusSquare } from "lucide-react-native";
import LottieView from 'lottie-react-native';
import { TodayGroceryItem } from '../../components/today-grocery-item';
import { GroceryItemType } from '../../types/grocery-item-type';
import { useDispatch, useSelector } from 'react-redux';
import { addGroceryItem, addGroceryQuantity, minusGroceryQuantity, tickCheckGroceryItem, tickAllGroceryItemAsDone, updateGroceryItemInfo } from '../../store/grocery';
import { RootState } from '../../store/store';
import { ModalAddGrocery } from '../../components/modal-add-grocery';
import { dbUpdateGroceryItemInfo } from '../../database/db-service';


export function ListGroceriesToday(){
    const { listGroceryCollection } = useSelector((state: RootState) => state.grocery);
    const collectionGrocery = listGroceryCollection[0];
    
    const dispatch = useDispatch();

    // modal
    const [showModal, setShowModal] = useState<boolean>(false);
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
    // modal

    const insets = useSafeAreaInsets();
    const toast = useToast();


    return (
        <VStack
            h="$full"
        >
            {
                collectionGrocery && collectionGrocery.listGrocery.length !== 0 ? 
                <>
                    {
                        <>
                            <ModalAddGrocery
                                isShowModal={ showModal }
                                setShowModal={ setShowModal }
                                collectionId={ collectionGrocery.collectionId }
                                collectionName={ collectionGrocery.name }
                                collectionDate={ collectionGrocery.date }
                                collectionIsOnNotification={ collectionGrocery.isOnNotification }
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
                                                            collectionId: collectionGrocery.collectionId,
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
                        </>
                    }

                    <ScrollView
                        h="$4/6"
                    >
                        {
                            collectionGrocery.listGrocery.map((item, index) => (
                                <TodayGroceryItem 
                                    id={ item.id }
                                    setItemEditGrocery={ setItemEditGrocery }
                                    setShowModalEditGrocery={ setShowModalEditGrocery }
                                    addGroceryQuantity={ () => dispatch(addGroceryQuantity({ collectionId: collectionGrocery.collectionId, groceryId: item.id })) }
                                    minusGroceryQuantity={ () => dispatch(minusGroceryQuantity({ collectionId: collectionGrocery.collectionId, groceryId: item.id })) }
                                    checkGroceryItem={ () => dispatch(tickCheckGroceryItem({ collectionId: collectionGrocery.collectionId, groceryId: item.id })) }
                                    name={ item.name }
                                    detail={ item.detail }
                                    groceryImageUri={ item.groceryImageUri ?? "https://placehold.jp/150x150.png" }
                                    quantity={ item.quantity }
                                    pricePerItem={ item.pricePerItem }
                                    totalPricePerItem={ item.totalPricePerItem }
                                    isCheck={ item.isCheck }
                                    isHaveDeleteButton={ false }
                                    key={ index }
                                />
                            ))
                        }
                    </ScrollView>
                    <VStack
                        h="$1/6"
                        justifyContent='center'
                        gap="$3"
                        px="$4"
                    >
                        <Button
                            bgColor='#E67E22'
                            softShadow='1'
                            display='flex'
                            gap="$1"
                            onPress={ () => setShowModal(true) }
                        >
                            <ButtonText>Add list to buy</ButtonText>
                            <ButtonIcon as={ PlusSquare }/>
                        </Button>
                        <Button
                            bgColor='#2ECC71'
                            softShadow='1'
                            display='flex'
                            gap="$1"
                            onPress={ () => dispatch(tickAllGroceryItemAsDone({ collectionId: collectionGrocery.collectionId })) }
                        >
                            <ButtonText>Mark all as done</ButtonText>
                            <ButtonIcon as={ CheckSquare }/>
                        </Button>
                    </VStack>    
                </>
                :
                <VStack
                    bgColor='$coolGray300'
                    h="$3/6"
                    mt="$32"
                    mx="$10"
                    alignItems='center'
                    justifyContent='center'
                    borderRadius="$lg"
                    hardShadow='1'
                >
                    {/* <LottieView
                        source={ require("../../assets/LottieAnimation/no-data-two.json") }
                        autoPlay
                        loop
                        resizeMode='cover'
                    /> */}
                    <Text bold='true' size='lg'>No list groceries for today</Text>
                </VStack>
            }
            
        </VStack>
    )
}