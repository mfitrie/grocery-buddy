import { HStack, VStack, Image, Heading, Text, Button, ButtonText, ButtonIcon, Box } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { Checkbox } from 'react-native-paper';
import { Pencil, PlusSquare, MinusSquare, CheckSquare } from "lucide-react-native";
import { GroceryItemType } from "../types/grocery-item-type";

interface GroceryProps extends GroceryItemType{
    addQuantity(): void,
    minusQuantity(): void,
    checkHandler(): void,
}

export function TodayGroceryItem({ id, name, detail, quantity, date, pricePerItem, isCheck, minusQuantity, addQuantity, checkHandler }: GroceryProps) {
    return (
        <HStack
            maxHeight="$56"
            bgColor='$blue200'
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
                    source={{
                        uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
                    onPress={() => { console.log("button pressed") }}
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
                <Heading>RM { pricePerItem }</Heading>
                <HStack
                    justifyContent='center'
                    gap="$1"
                >
                    <Box>
                        <TouchableOpacity
                            onPress={minusQuantity}
                        >
                            <MinusSquare
                                color='#000'
                            />
                        </TouchableOpacity>
                    </Box>
                    <Text size='sm'>{ quantity }</Text>
                    <Box>
                        <TouchableOpacity
                            onPress={addQuantity}
                        >
                            <PlusSquare color='#000' />
                        </TouchableOpacity>
                    </Box>
                </HStack>
            </VStack>

            <VStack
                h="$full"
                w="10%"
                justifyContent='center'
                alignItems='center'
            >
                <Checkbox
                    bgColor="$blue400"
                    size="md"
                    status={isCheck ? "checked" : "unchecked"}
                    onPress={checkHandler}
                    color='#2ecc71'
                ></Checkbox>
            </VStack>
        </HStack>
    )
}