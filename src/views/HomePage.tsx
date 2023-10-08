import { Text, Box, Heading, VStack, HStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";

export function HomePage(){
    return (
        <VStack width="$full" gap="$5" px="$5">
            <VStack width="$3/6" gap="$5" py="$5">
                <Heading size="lg">Welcome to Grocery Buddy</Heading>
                <Text>You have: </Text>
            </VStack>
            <TouchableOpacity>
                <HStack borderWidth={1} py="$8" borderRadius={5} justifyContent="space-around" alignItems="center">
                    <Text size="3xl" bold="true">10</Text>
                    <Text size="2xl">Collections</Text>
                    <Ionicons name="albums-outline" size={30} color="#000"/>
                </HStack>
            </TouchableOpacity>
            <TouchableOpacity>
                <HStack borderWidth={1} py="$8" borderRadius={5} justifyContent="space-around" alignItems="center">
                    <Text size="3xl" bold="true">50</Text>
                    <Text size="2xl">Grocery Item</Text>
                    <Ionicons name="cart-outline" size={30} color="#000"/>
                </HStack>
            </TouchableOpacity>
        </VStack>
    )
}