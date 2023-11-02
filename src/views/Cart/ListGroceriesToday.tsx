import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Box, ScrollView, HStack, Image, VStack, Button, ButtonText, Heading, ButtonIcon, Pressable } from "@gluestack-ui/themed";
import { Pencil, PlusSquare, MinusSquare, CheckSquare } from "lucide-react-native";
import { Checkbox } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';

export function ListGroceriesToday(){
    const [quantity, setQuantity] = useState(0);
    const [isCheck, setCheck] = useState(false);
    const insets = useSafeAreaInsets();

    const addQuantity = () => {
        setQuantity(prevValue => prevValue + 1);
    } 
    const minusQuantity = () => {
        setQuantity(prevValue => {
            if(prevValue <= 0){
                return 0;
            }

            return prevValue - 1;
        });
    }

    const checkHandler = () => {
        setCheck(prevValue => prevValue = !prevValue);
    }

    return (
        <ScrollView>
            <HStack 
                h="$40"
                bgColor='$blue200'
                alignItems='center'
                justifyContent='center'
                py="$4"
                px="$2"
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
                    <Heading size='sm'>Basket of Tomatoes</Heading>
                    <Text size="xs">Please buy at Tesco, cause it's cheaper</Text>
                    <Button
                        w="$20"
                        size='xs'
                        bg="#e67e22"
                        onPress={ () => { console.log("button pressed") } }
                    >
                        <ButtonText mr="$2">Edit</ButtonText>
                        <ButtonIcon as={ Pencil } />
                    </Button>
                </VStack>

                <VStack
                    h="$full"
                    w="20%"
                    alignItems='center'
                    justifyContent='space-around'
                >
                    <Heading>RM 20</Heading>
                    <HStack
                        justifyContent='center'
                        gap="$1"
                    >
                        <Box>
                            <TouchableOpacity
                                onPress={ minusQuantity }
                            >
                                <MinusSquare 
                                    color='#000'
                                />
                            </TouchableOpacity>
                        </Box>
                        <Text size='sm'>{ quantity }</Text>
                        <Box>
                            <TouchableOpacity
                                onPress={ addQuantity }
                            >
                                <PlusSquare color='#000'/>
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
                       size="md"
                       status={ isCheck ? "checked" : "unchecked" }
                       onPress={ checkHandler }
                       color='#2ecc71'
                    ></Checkbox>
                </VStack>
            </HStack>
        </ScrollView>
    )
}