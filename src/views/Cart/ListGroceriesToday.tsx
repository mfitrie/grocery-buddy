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
import { ModalAddGrocery } from '../../components/modal-add-grocery';


export function ListGroceriesToday(){
    const { listGroceryCollection } = useSelector((state: RootState) => state.grocery);
    const collectionGrocery = listGroceryCollection[0];
    // const listGrocery = collectionGrocery.listGrocery;
    const { collectionId, name, date, isOnNotification, listGrocery } = collectionGrocery;
    const dispatch = useDispatch();

    // modal
    const [showModal, setShowModal] = useState<boolean>(false);
    // modal
    

    const insets = useSafeAreaInsets();

    return (
        <VStack
            h="$full"
        >
            {
                listGrocery.length !== 0 ? 
                <>
                    {
                        <ModalAddGrocery
                            isShowModal={ showModal }
                            setShowModal={ setShowModal }
                            collectionId={ collectionId }
                            collectionName={ name }
                            collectionDate={ date }
                            collectionIsOnNotification={ isOnNotification }
                        />
                    }

                    <ScrollView
                        h="$4/6"
                    >
                        {
                            listGrocery.map((item, index) => (
                                <TodayGroceryItem 
                                    id={ item.id }
                                    addGroceryQuantity={ () => dispatch(addGroceryQuantity({ collectionId: collectionGrocery.collectionId, groceryId: item.id })) }
                                    minusGroceryQuantity={ () => dispatch(minusGroceryQuantity({ collectionId: collectionGrocery.collectionId, groceryId: item.id })) }
                                    checkGroceryItem={ () => dispatch(tickCheckGroceryItem({ collectionId: collectionGrocery.collectionId, groceryId: item.id })) }
                                    name={ item.name }
                                    detail={ item.detail }
                                    groceryImageUri={ item.groceryImageUri }
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