import { HStack, VStack, Image, Heading, Text, Button, ButtonText, ButtonIcon, Box, Icon } from "@gluestack-ui/themed";
import { Pressable, TouchableOpacity } from "react-native";
import { Checkbox } from 'react-native-paper';
import { Pencil, PlusSquare, MinusSquare, CheckSquare, Trash2 } from "lucide-react-native";
import { GroceryItemType } from "../types/grocery-item-type";
import { dbDeleteGroceryItem, dbUpdateQuantityAndTotalPrice, dbUpdateTickGroceryItem } from "../database/db-service";

interface GroceryProps extends GroceryItemType{
    addGroceryQuantity(id: string): void,
    minusGroceryQuantity(id: string): void,
    checkGroceryItem(id: string): void,
    removeGroceryItem(id: string): void,
    setShowModalEditGrocery(isShow: boolean): void,
    setItemEditGrocery(item: Pick<GroceryItemType, "id" | "name" | "detail" | "quantity" | "pricePerItem">): void,
    isHaveDeleteButton: boolean,
}

export function TodayGroceryItem({ 
    id, 
    name, 
    detail, 
    groceryImageUri,
    quantity,
    pricePerItem,
    totalPricePerItem, 
    isCheck, 
    isHaveDeleteButton,
    setShowModalEditGrocery,
    setItemEditGrocery, 
    minusGroceryQuantity, 
    addGroceryQuantity, 
    checkGroceryItem, 
    removeGroceryItem
}: GroceryProps) {

    return (
        <HStack
            maxHeight="$56"
            alignItems='center'
            justifyContent='center'
            py="$4"
            px="$2"
            borderBottomWidth={"$1"}
        >
            <Box
                w="20%"
            >
                <Image
                    size='md'
                    borderRadius="$md"
                    source={{
                        uri: groceryImageUri,
                    }}
                    alt='grocery picture'
                />
            </Box>

            <VStack
                w="50%"
                gap="$3"
                px="$5"
            >
                <Heading size='sm'>{ name }</Heading>
                <Text size="xs">{ detail }</Text>
                <Button
                    w="$20"
                    size='xs'
                    bg="#e67e22"
                    onPress={() => {
                        setItemEditGrocery({
                            id,
                            name,
                            detail,
                            quantity,
                            pricePerItem,
                        });
                        setShowModalEditGrocery(true);            
                    }}
                >
                    <ButtonText mr="$2">Edit</ButtonText>
                    <ButtonIcon as={Pencil} />
                </Button>
            </VStack>

            <VStack
                h="$full"
                w="20%"
                alignItems='center'
                justifyContent='space-around'
            >
                <Heading>RM { totalPricePerItem }</Heading>
                <HStack
                    justifyContent='center'
                    gap="$1"
                >
                    <Box>
                        <TouchableOpacity
                            onPress={() => {
                                dbUpdateQuantityAndTotalPrice({
                                    id,
                                    quantity,
                                    pricePerItem,
                                    isAddingQuantity: false,
                                });
                                minusGroceryQuantity(id);
                            }}
                        >
                            <MinusSquare
                                color='#000'
                            />
                        </TouchableOpacity>
                    </Box>
                    <Text size='sm'>{ quantity }</Text>
                    <Box>
                        <TouchableOpacity
                            onPress={ () => {
                                dbUpdateQuantityAndTotalPrice({
                                    id,
                                    quantity,
                                    pricePerItem,
                                    isAddingQuantity: true,
                                });
                                addGroceryQuantity(id)
                            } }
                        >
                            <PlusSquare color='#000' />
                        </TouchableOpacity>
                    </Box>
                </HStack>
            </VStack>

            {
                isHaveDeleteButton ? 
                <VStack
                    h="$full"
                    w="10%"
                    justifyContent='center'
                    alignItems='center'
                >
                    <TouchableOpacity
                        onPress={ () => {
                            dbDeleteGroceryItem(id);
                            removeGroceryItem(id)
                        } }
                    >
                        <Icon as={ Trash2 } color="$red600"/>
                    </TouchableOpacity>
                </VStack>
                :
                <VStack
                    h="$full"
                    w="10%"
                    justifyContent='center'
                    alignItems='center'
                >
                    <Checkbox
                        bgColor="$blue400"
                        size="md"
                        status={isCheck ? "unchecked" : "checked"}
                        onPress={ () => {
                            dbUpdateTickGroceryItem({
                                id,
                                isCheck,
                            });
                            checkGroceryItem(id);
                        }}
                        color='#2ecc71'
                    ></Checkbox>
                </VStack>

            }
        </HStack>
    )
}