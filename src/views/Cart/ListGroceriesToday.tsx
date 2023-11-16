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
import { useState } from 'react';
import { CheckSquare, PlusSquare } from "lucide-react-native";
import LottieView from 'lottie-react-native';
import { TodayGroceryItem } from '../../components/today-grocery-item';
import { GroceryItemType } from '../../types/grocery-item-type';

export function ListGroceriesToday(){
    

    const dummyGroceryItem: GroceryItemType[] = Array(10).fill(null).map(item => {
        const pricePerItem = +faker.commerce.price({ max: 50 });

        return {
                id: faker.database.mongodbObjectId(),
                name: faker.word.words(2),
                detail: faker.word.words(10),
                groceryImageUri: faker.image.urlLoremFlickr({ category: 'food' }),
                quantity: 1,
                date: faker.date.anytime(),
                pricePerItem,
                totalPricePerItem: pricePerItem,
                isCheck: faker.datatype.boolean(),
            }
    });

    const [listGroceryItem, setListGroceryItem] = useState<GroceryItemType[]>(dummyGroceryItem);
    const handleAddAndMinusQuantityInItem = (id: string, isAddQuantity: boolean) => {
        setListGroceryItem(prevValue => prevValue.map(item => {
            if(item.id == id){
                const quantity = item.quantity > 0 ? (isAddQuantity ? item.quantity + 1 : item.quantity - 1) : (isAddQuantity ? item.quantity + 1 : item.quantity);
                const totalPricePerItem = item.pricePerItem * quantity; 

                return {
                    ...item,
                    quantity,
                    totalPricePerItem,
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

    const markListChecked = () => {
        setListGroceryItem(prevValue => prevValue.map(item => ({
            ...item,
            isCheck: true,
        })));
    }

    // modal
    const [showModal, setShowModal] = useState<boolean>(false);
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
                                            <InputField type="text" placeholder='Enter grocery name' />
                                        </Input>
                                    </VStack>
                                    <VStack space='xs'>
                                        <Text lineHeight="$lg">
                                            Detail
                                        </Text>
                                        <Input>
                                            <InputField type="text" placeholder='Enter detail'/>
                                        </Input>
                                    </VStack>
                                    <VStack space='xs'>
                                        <Text lineHeight="$lg">
                                            Quantity
                                        </Text>
                                        <Input>
                                            <InputField type="text" placeholder='Enter quantity'/>
                                        </Input>
                                    </VStack>
                                    <VStack space='xs'>
                                        <Text lineHeight="$lg">
                                            Price Per Item (RM)
                                        </Text>
                                        <Input>
                                            <InputField type="text" placeholder='Enter price per item'/>
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
                                                setShowModal(false);
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
                                    addGroceryQuantity={ addGroceryQuantity }
                                    minusGroceryQuantity={ minusGroceryQuantity }
                                    checkGroceryItem={ checkGroceryItem }
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
                            onPress={ () => markListChecked() }
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