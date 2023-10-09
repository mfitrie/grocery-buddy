import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ListGroceriesToday } from "../views/Cart/ListGroceriesToday";
import { Ionicons } from "@expo/vector-icons"
import CollectionStackScreen from '../views/Collections/CollectionStackScreen';
import HomeStackScreen from '../views/Home/HomeStackScreen';
import CartStackScreen from '../views/Cart/CartStackScreen';

const Tab = createMaterialBottomTabNavigator();

export function BottomNavigationBar(){
    return (
        <Tab.Navigator 
            initialRouteName="Home"
        >
            <Tab.Screen 
                name="Home" 
                component={ HomeStackScreen }
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={ 30 } color={ color }/>
                    )
                }}
            />
            <Tab.Screen 
                name="Cart" 
                component={ CartStackScreen }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={ 30 } color={ color }/>
                    )
                }}
            />
            <Tab.Screen 
                name="Collection" 
                component={ CollectionStackScreen }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="albums-outline" size={ 30 } color={ color }/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

