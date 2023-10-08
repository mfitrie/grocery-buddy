import { HStack, Text } from "@gluestack-ui/themed"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"

export function BottomNavigationBar(){
    return (
        <HStack py="$6" justifyContent="space-around">
          <TouchableOpacity>
            <Ionicons name="home-outline" size={30} color="#000"/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={30} color="#000"/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="albums-outline" size={30} color="#000"/>
          </TouchableOpacity>
        </HStack>
    )
}