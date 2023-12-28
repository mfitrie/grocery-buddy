import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
    Text, 
    Box, 
    Button, 
    ButtonText, 
    VStack, 
    HStack, 
    Heading, 
    Icon, 
    ScrollView, 
    ButtonIcon,
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Toast,
    ToastTitle,
    ToastDescription,
    useToast,
    Input,
    InputField,
} from "@gluestack-ui/themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { 
    ShoppingCart, 
    Bell, 
    BellOff, 
    Boxes,
    CalendarDays,
} from "lucide-react-native";
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addCollection } from '../../store/grocery';

export function CollectionsPage({ navigation }){
    const insets = useSafeAreaInsets();
    
    const { listGroceryCollection } = useSelector((state: RootState) => state.grocery);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    // date picker
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    // date picker
    // input collection
    const [collectionName, setCollectionName] = useState<string>(null);
    const [collectionDate, setCollectionDate] = useState<Date>(dayjs().toDate());
    // input collection

    // toast
    const toast = useToast();
    // toast

    const clearInput = () => {
        setCollectionName(null);
        setCollectionDate(dayjs().toDate());
    }

    const dateFormat = "dddd, D MMM YY";

    

    return (
        <VStack
            h="$full"
        >
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
                                    Collection name
                                </Text>
                                <Input>
                                    <InputField 
                                        type="text" 
                                        placeholder='Enter collection name'
                                        onChangeText={ (text: string) => { 
                                            setCollectionName(text);
                                        } }
                                    />
                                </Input>
                            </VStack>
                            <VStack space='xs'>
                                <Text lineHeight="$lg">
                                    Collection date to purchase
                                </Text>
                                <Input
                                    isDisabled={ true }
                                >
                                    <InputField 
                                        type="text" 
                                        placeholder='Enter collection date'
                                        value={ dayjs(collectionDate).format(dateFormat) }
                                    />
                                </Input>
                                <Button
                                    softShadow='1'
                                    display='flex'
                                    gap="$1"
                                    onPress={ () => {
                                        setShow(true);
                                    } }
                                >
                                    <ButtonText>Open Date Picker</ButtonText>
                                    <ButtonIcon as={ CalendarDays }/>
                                </Button>
                                {
                                    show && (
                                        <DateTimePicker
                                            testID='dateTimePicker'
                                            value={collectionDate}
                                            mode={mode}
                                            is24Hour={true}
                                            onChange={ (event, selectedDate) => {
                                                setShow(false);
                                                setCollectionDate(selectedDate);
                                            } }
                                        />
                                    )
                                }
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
                                        if(!collectionName || !collectionDate){
                                            toast.show({
                                                placement: "top right",
                                                render: ({ id }) => {
                                                    return (
                                                        <Toast nativeID={"toast-" + id} action="error" variant="accent">
                                                        <VStack space="xs">
                                                            <ToastTitle>Collection</ToastTitle>
                                                            <ToastDescription>
                                                                Please fill up the input
                                                            </ToastDescription>
                                                        </VStack>
                                                        </Toast>
                                                    )
                                                },
                                            })
                                            return;
                                        }
                                        dispatch(addCollection({
                                            collectionName,
                                            collectionDate,
                                        }));
                                        setShowModal(false);
                                        clearInput();
                                        toast.show({
                                            placement: "top right",
                                            render: ({ id }) => {
                                                return (
                                                    <Toast nativeID={"toast-" + id} action="info" variant="accent">
                                                    <VStack space="xs">
                                                        <ToastTitle>Collection</ToastTitle>
                                                        <ToastDescription>
                                                            Save item successful
                                                        </ToastDescription>
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
            {
                listGroceryCollection.length !== 0 ? 
                <ScrollView
                    h="$5/6"
                >
                    {
                        listGroceryCollection.map(item => (
                            <TouchableOpacity
                                key={ item.collectionId }
                                onPress={() => navigation.push("CollectionItem", { collectionId: item.collectionId })}
                            >
                                <HStack
                                    maxHeight="$56"
                                    justifyContent='space-between'
                                    alignItems='center'
                                    py="$4"
                                    px="$2"
                                    bg='#fff'
                                    borderBottomWidth="$1"
                                >
                                    <VStack
                                        w="$3/6"
                                    >
                                        <Heading>{ item.name }</Heading>
                                        <Text>{ dayjs(item.date).format(dateFormat) }</Text>
                                    </VStack>
                                    <HStack
                                        alignItems='center'
                                        alignSelf='flex-end'
                                    >
                                        <Text>Quantity</Text>
                                        <Icon as={ ShoppingCart } size='md' mr="$2"/>
                                        <Text>{ item.listGrocery.length }</Text>
                                    </HStack>
                                    {
                                        <Icon
                                            as={ item.isOnNotification ? Bell : BellOff}
                                            size='xl'
                                        />
                                    }
                                </HStack>
                            </TouchableOpacity>
                        ))
                        
                    }
                </ScrollView>
                :
                <VStack
                    bgColor='$coolGray300'
                    h="$5/6"
                    mx="$10"
                    alignItems='center'
                    justifyContent='center'
                    borderRadius="$lg"
                    hardShadow='1'
                >
                    <Text bold='true' size='lg'>No list groceries for today</Text>
                </VStack>

            }
            <VStack
                h="$1/6"
                px="$4"
                justifyContent='center'
            >
                <Button
                    bgColor='#E67E22'
                    size='lg'
                    display='flex'
                    gap="$1"
                    onPress={ () => { setShowModal(true); } }
                >
                    <ButtonText>Add new collection</ButtonText>
                    <ButtonIcon as={ Boxes }/>
                </Button>
            </VStack>
        </VStack>
    )
}