import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListGroceriesToday } from "./ListGroceriesToday";

const CartStack = createNativeStackNavigator();

export default function CartStackScreen(){
    return (
        <CartStack.Navigator initialRouteName="Groceries">
            <CartStack.Screen 
                name="Groceries"
                component={ ListGroceriesToday }
            />
        </CartStack.Navigator>
    )
}