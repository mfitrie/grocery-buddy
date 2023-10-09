import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./HomePage";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen(){
    return (
        <HomeStack.Navigator initialRouteName="HomePage">
            <HomeStack.Screen 
                name="HomePage"
                component={ HomePage }
                options={{
                    title: "Home",
                }}
            />
        </HomeStack.Navigator>
    )
}