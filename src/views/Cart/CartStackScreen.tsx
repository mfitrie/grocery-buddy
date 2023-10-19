import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListGroceriesToday } from "./ListGroceriesToday";
import { CartRoutes } from "../../constant/route-types";

const CartStack = createNativeStackNavigator();

export default function CartStackScreen(){
    return (
        <CartStack.Navigator initialRouteName={ CartRoutes.CartHome.toString() }>
            <CartStack.Screen 
                name={ CartRoutes.CartHome.toString() }
                component={ ListGroceriesToday }
            />
        </CartStack.Navigator>
    )
}