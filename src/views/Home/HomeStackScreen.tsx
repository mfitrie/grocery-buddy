import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./HomePage";
import { HomeRoutes } from "../../constant/route-types";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen(){
    return (
        <HomeStack.Navigator initialRouteName={ HomeRoutes.HomePage.toString() }>
            <HomeStack.Screen 
                name={ HomeRoutes.HomePage.toString() }
                component={ HomePage }
                options={{
                    title: "Home",
                }}
            />
        </HomeStack.Navigator>
    )
}
