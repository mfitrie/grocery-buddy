import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Box, Button, ButtonText, VStack, HStack, Heading, Icon, ScrollView, ButtonIcon } from "@gluestack-ui/themed";
import { TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { ShoppingCart, Bell, BellOff, Boxes } from "lucide-react-native";
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';

export function CollectionsPage({ navigation }){
    const insets = useSafeAreaInsets();
    
    const { listGroceryCollection } = useSelector((state: any) => state.grocery);

    
    return (
        // <Box
        //     px="$5"
        //     style={{
        //         // Paddings to handle safe area
        //         paddingTop: insets.top,
        //         paddingBottom: insets.bottom,
        //     }}
        // >
        //     <Text>Collections Page</Text>
        //     <Button onPress={() => navigation.push("CollectionItem")}>
        //         <ButtonText>Move to Collection Item</ButtonText>
        //     </Button>
        // </Box>

        <VStack
            h="$full"
        >
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
                                    item.isOnNotification ? 
                                    <Icon
                                        as={ Bell }
                                        size='xl'
                                    />
                                    :
                                    <Icon
                                        as={ BellOff }
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
                    onPress={ () => console.log("Add new collection pressed!") }
                >
                    <ButtonText>Add new collection</ButtonText>
                    <ButtonIcon as={ Boxes }/>
                </Button>
            </VStack>
        </VStack>
    )
}