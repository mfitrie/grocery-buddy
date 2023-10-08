import { HStack, Text } from "@gluestack-ui/themed"
import { Ionicons } from "@expo/vector-icons"

export function BottomNavigationBar(){
    return (
        <HStack py="$6" borderTopWidth={1} borderColor="#000" justifyContent="space-around">
          <Ionicons name="home-outline" size={30} color="#000"/>
          <Ionicons name="cart-outline" size={30} color="#000"/>
          <Ionicons name="albums-outline" size={30} color="#000"/>
        </HStack>
    )
}