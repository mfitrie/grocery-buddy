import { Text, Box, Heading, VStack, HStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainRoutes } from "../../constant/route-types";
import { useDispatch, useSelector } from "react-redux";
import { CollectionGroceryType } from "../../types/collection-grocery-type";
import { faker } from "@faker-js/faker";
import { initGroceryCollection } from "../../store/grocery";

export function HomePage({ navigation }){
    const insets = useSafeAreaInsets();

    // init collection dummy value
    // const { listGroceryCollection } = useSelector((state: any) => state.grocery);
    // const dispatch = useDispatch();
    // const dummyCollectionGrocery: CollectionGroceryType[] = Array(10).fill(null).map(item => {
    //     return {
    //         collectionId: faker.database.mongodbObjectId(),
    //         name: faker.word.words(2),
    //         date: faker.date.anytime(),
    //         isOnNotification: faker.datatype.boolean(),
    //         listGrocery: Array(10).fill(null).map(itemTwo => {
    //             const pricePerItem = +faker.commerce.price({ max: 50 });
    //             return {
    //                 id: faker.database.mongodbObjectId(),
    //                 name: faker.word.words(2),
    //                 detail: faker.word.words(10),
    //                 groceryImageUri: faker.image.urlLoremFlickr({ category: 'food' }),
    //                 quantity: 1,
    //                 date: faker.date.anytime(),
    //                 pricePerItem,
    //                 totalPricePerItem: pricePerItem,
    //                 isCheck: faker.datatype.boolean(),
    //             }
    //         }),
    //     }

    // });

    // dispatch(initGroceryCollection(dummyCollectionGrocery));

    return (
        <VStack 
            width="$full" 
            gap="$5" 
            px="$5"
            style={{
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <VStack width="$3/6" gap="$5" py="$5">
                <Heading size="lg">Welcome to Grocery Buddy</Heading>
                <Text>You have: </Text>
            </VStack>
            <TouchableOpacity onPress={() => navigation.navigate( MainRoutes.Collection.toString() )}>
                <HStack
                    borderWidth={1} 
                    py="$8" 
                    borderRadius={5} 
                    justifyContent="space-around" 
                    alignItems="center"
                >
                    <Text size="3xl" bold="true">10</Text>
                    <Text size="2xl">Collections</Text>
                    <Ionicons name="albums-outline" size={30} color="#000"/>
                </HStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate( MainRoutes.Cart.toString() )}>
                <HStack 
                    borderWidth={1} 
                    py="$8" 
                    borderRadius={5} 
                    justifyContent="space-around" 
                    alignItems="center"
                >
                    <Text size="3xl" bold="true">50</Text>
                    <Text size="2xl">Grocery Item</Text>
                    <Ionicons name="cart-outline" size={30} color="#000"/>
                </HStack>
            </TouchableOpacity>
        </VStack>
    )
}