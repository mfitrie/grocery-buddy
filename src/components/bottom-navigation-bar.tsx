import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomePage } from "../views/HomePage";
import { CollectionsPage } from "../views/Collections/CollectionsPage";
import { ListGroceriesToday } from "../views/ListGroceriesToday";
import { Ionicons } from "@expo/vector-icons"

const Tab = createMaterialBottomTabNavigator();

export function BottomNavigationBar(){
    return (
        <Tab.Navigator 
            initialRouteName="HomePage"
        >
            <Tab.Screen 
                name="HomePage" 
                component={ HomePage }
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={ 30 } color={ color }/>
                    )
                }}
            />
            <Tab.Screen 
                name="Groceries" 
                component={ ListGroceriesToday }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={ 30 } color={ color }/>
                    )
                }}
            />
            <Tab.Screen 
                name="Collection" 
                component={ CollectionsPage }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="albums-outline" size={ 30 } color={ color }/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

