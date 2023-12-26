import { Text, Box, Heading, VStack, HStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainRoutes } from "../../constant/route-types";
import { useSelector } from "react-redux";
import { CollectionGroceryType } from "../../types/collection-grocery-type";
import { faker } from "@faker-js/faker";
import { initGroceryCollection } from "../../store/grocery";
import { RootState } from "../../store/store";

export function HomePage({ navigation }){
    const insets = useSafeAreaInsets();
    const { listGroceryCollection } = useSelector((state: RootState) => state.grocery);
    

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
                    <Text size="3xl" bold="true">{ listGroceryCollection.length }</Text>
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
                    <Text size="3xl" bold="true">{ listGroceryCollection[0].listGrocery.length }</Text>
                    <Text size="2xl">Grocery Item</Text>
                    <Ionicons name="cart-outline" size={30} color="#000"/>
                </HStack>
            </TouchableOpacity>
        </VStack>
    )
}