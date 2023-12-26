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
import { ShoppingCart, Bell, BellOff, Boxes } from "lucide-react-native";
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function CollectionsPage({ navigation }){
    const insets = useSafeAreaInsets();
    
    const { listGroceryCollection } = useSelector((state: RootState) => state.grocery);
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
                                        value={ dayjs(collectionDate).format("D/M/YYYY") }
                                    />
                                </Input>
                                <Button onPress={ () => {
                                    setShow(true);
                                } }>
                                    <ButtonText>Open Date Picker</ButtonText>
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
                                        setShowModal(false);
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
                                    <Text>{ dayjs(item.date).format("dddd, D MMM YY") }</Text>
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