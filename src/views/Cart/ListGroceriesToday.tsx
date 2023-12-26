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
import { ChangeEvent, FormEvent, useState } from 'react';
import { CheckSquare, PlusSquare } from "lucide-react-native";
import LottieView from 'lottie-react-native';
import { TodayGroceryItem } from '../../components/today-grocery-item';
import { GroceryItemType } from '../../types/grocery-item-type';
import { useDispatch, useSelector } from 'react-redux';
import { addGroceryItem, addGroceryQuantity, minusGroceryQuantity, tickCheckGroceryItem, tickAllGroceryItemAsDone } from '../../store/grocery';
import { RootState } from '../../store/store';

export function ListGroceriesToday(){

    const { listGroceryCollection } = useSelector((state: RootState) => state.grocery);
    const collectionGrocery = listGroceryCollection[0];
    const listGroceryItem = collectionGrocery.listGrocery;
    const dispatch = useDispatch();

    // modal
    const [showModal, setShowModal] = useState<boolean>(false);
    // -- modal input
    const [groceryName, setGroceryName] = useState<string>("");
    const [detail, setDetail] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(null);
    const [pricePerItem, setPricePerItem] = useState<number>(null);
    // -- modal input
    // modal





    // toast
    const toast = useToast();
    // toast

    const insets = useSafeAreaInsets();


    return (
        <VStack
            h="$full"
        >
            {
                listGroceryItem.length !== 0 ? 
                <>
                    <Modal
                        isOpen={showModal}
                        onClose={() => {
                            setShowModal(false);
                        }}
                    >
                        <ModalBackdrop />
                        <ModalContent>
                            <ModalHeader>
                                <VStack space="sm">
                                    <Heading size="lg">Item information</Heading>
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
                                                onChangeText={ (text: string) => { 
                                                    setGroceryName(text)
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
                                                onChangeText={ (text: string) => { 
                                                    setDetail(text)
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
                                                placeholder='Enter quantity'
                                                onChangeText={ (text: string) => { 
                                                    if(!Number(+text)){
                                                        setQuantity(null)
                                                        return;
                                                    }
                                                    setQuantity(+text)
                                                } }
                                            />
                                        </Input>
                                    </VStack>
                                    <VStack space='xs'>
                                        <Text lineHeight="$lg">
                                            Price Per Item (RM)
                                        </Text>
                                        <Input>
                                            <InputField 
                                                type="text" 
                                                placeholder='Enter price per item'
                                                onChangeText={ (text: string) => { 
                                                    if(!Number(+text)){
                                                        setPricePerItem(null)
                                                        return;
                                                    }
                                                    setPricePerItem(+text)
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
                                                const { collectionId, name, date, isOnNotification } = collectionGrocery;
                                                setShowModal(false);
                                                if(!groceryName || !detail || !quantity || !pricePerItem){
                                                    return;
                                                }
                                                dispatch(addGroceryItem({ 
                                                    collectionId, 
                                                    collectionName: name,
                                                    collectionDate: date,
                                                    collectionIsOnNotification: isOnNotification,
                                                    groceryName,
                                                    detail,
                                                    quantity,
                                                    pricePerItem,
                                                }));
                                                toast.show({
                                                    placement: "top right",
                                                    render: ({ id }) => {
                                                    return (
                                                        <Toast nativeID={"toast-" + id} action="info" variant="accent">
                                                        <VStack space="xs">
                                                            <ToastTitle>Save item successful</ToastTitle>
                                                            {/* <ToastDescription>
                                                                Save item successful
                                                            </ToastDescription> */}
                                                        </VStack>
                                                        </Toast>
                                                    )
                                                    },
                                                })
                                                }
                                        }
                                    >
                                            <ButtonText>Save</ButtonText>
                                        </Button>
                                    <Button
                                        action='secondary'
                                        onPress={ () => setShowModal(false) }
                                    >
                                        <ButtonText>Close</ButtonText>
                                    </Button>
                                </HStack>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                    <ScrollView
                        h="$4/6"
                    >
                        {
                            listGroceryItem.map((item, index) => (
                                <TodayGroceryItem 
                                    id={ item.id }
                                    addGroceryQuantity={ () => dispatch(addGroceryQuantity({ collectionId: collectionGrocery.collectionId, groceryId: item.id })) }
                                    minusGroceryQuantity={ () => dispatch(minusGroceryQuantity({ collectionId: collectionGrocery.collectionId, groceryId: item.id })) }
                                    checkGroceryItem={ () => dispatch(tickCheckGroceryItem({ collectionId: collectionGrocery.collectionId, groceryId: item.id })) }
                                    name={ item.name }
                                    detail={ item.detail }
                                    groceryImageUri={ item.groceryImageUri }
                                    quantity={item.quantity}
                                    pricePerItem={ item.pricePerItem }
                                    totalPricePerItem={ item.totalPricePerItem }
                                    isCheck={item.isCheck}
                                    isHaveDeleteButton={ false }
                                    key={index}
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