import {
    useToast,
    Toast,
    Modal,
    ModalBackdrop,
    ModalHeader, 
    ModalBody,
    ModalContent,
    ModalFooter,
    Heading,
    VStack,
    HStack,
    Text,
    Input,
    InputField,
    ToastTitle,
    ToastDescription,
    Button,
    ButtonText,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGroceryItem } from "../store/grocery";


type propsModalAddGrocery = {
    isShowModal: boolean,
    setShowModal(item: boolean): void,
    collectionId: string,
    collectionName: string, 
    collectionDate: Date
    collectionIsOnNotification: boolean,
}


export function ModalAddGrocery({ 
    isShowModal, 
    setShowModal,
    collectionId,
    collectionName, 
    collectionDate,
    collectionIsOnNotification,
}: propsModalAddGrocery){
    const toast = useToast();
    const dispatch = useDispatch();

    const [groceryName, setGroceryName] = useState<string>("");
    const [detail, setDetail] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(null);
    const [pricePerItem, setPricePerItem] = useState<number>(null);


    const clearInput = () => {
        setGroceryName("");
        setDetail("");
        setQuantity(null);
        setPricePerItem(null);
    }

    return (
        <Modal
            isOpen={isShowModal}
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
                                    keyboardType='numeric'
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
                                    keyboardType='numeric'
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
                                    // const { collectionId, name, date, isOnNotification } = collectionGrocery;
                                    if(!groceryName || !detail || !quantity || !pricePerItem){
                                        toast.show({
                                            placement: "top right",
                                            render: ({ id }) => {
                                            return (
                                                    <Toast nativeID={"toast-" + id} action="error" variant="accent">
                                                    <VStack space="xs">
                                                        <ToastTitle>Grocery</ToastTitle>
                                                        <ToastDescription>
                                                            Please fill up the input
                                                        </ToastDescription>
                                                    </VStack>
                                                    </Toast>
                                                )
                                            },
                                        });
                                        return;
                                    }
                                    dispatch(addGroceryItem({ 
                                        collectionId, 
                                        collectionName,
                                        collectionDate,
                                        collectionIsOnNotification,
                                        groceryName,
                                        detail,
                                        quantity,
                                        pricePerItem,
                                    }));
                                    setShowModal(false);
                                    clearInput();
                                    toast.show({
                                        placement: "top right",
                                        render: ({ id }) => {
                                        return (
                                                <Toast nativeID={"toast-" + id} action="info" variant="accent">
                                                <VStack space="xs">
                                                    <ToastTitle>Grocery</ToastTitle>
                                                    <ToastDescription>
                                                        Save item successful
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
                            onPress={ () => setShowModal(false) }
                        >
                            <ButtonText>Close</ButtonText>
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}