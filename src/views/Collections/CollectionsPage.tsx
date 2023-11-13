import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Box, Button, ButtonText, VStack, HStack, Heading, Icon, ScrollView, ButtonIcon } from "@gluestack-ui/themed";
import { TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { ShoppingCart, Bell, BellOff, Boxes } from "lucide-react-native";
import { useState } from 'react';
import { faker } from '@faker-js/faker';

export function CollectionsPage({ navigation }){
    interface CollectionType{
        id: string,
        name: string,
        date: Date,
        quantity: number,
        isOnNotification: boolean,
    }

    const dummyCollections: CollectionType[] = Array(10).fill(null).map(item => ({
        id: faker.database.mongodbObjectId(),
        name: faker.word.words(2),
        date: faker.date.anytime(),
        quantity: faker.number.int({ max: 10 }),
        isOnNotification: faker.datatype.boolean(),
    }))

    const [collections, setCollections] = useState<CollectionType[]>(dummyCollections);

    const insets = useSafeAreaInsets();
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
                    collections.map(item => (
                        <TouchableOpacity
                            key={ item.id }
                            onPress={() => navigation.push("CollectionItem", { id: item.id })}
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
                                    <Text>{ item.quantity }</Text>
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