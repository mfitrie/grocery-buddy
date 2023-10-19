import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ListGroceriesToday } from "../views/Cart/ListGroceriesToday";
import { Ionicons } from "@expo/vector-icons"
import CollectionStackScreen from '../views/Collections/CollectionStackScreen';
import HomeStackScreen from '../views/Home/HomeStackScreen';
import CartStackScreen from '../views/Cart/CartStackScreen';
import { MainRoutes } from '../constant/route-types';

const Tab = createMaterialBottomTabNavigator();

export function BottomNavigationBar(){
    return (
        <Tab.Navigator 
            initialRouteName={MainRoutes.Home.toString()}
        >
            <Tab.Screen 
                name={ MainRoutes.Home.toString() } 
                component={ HomeStackScreen }
                options={{
                    title: MainRoutes.Home.toString(),
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={ 30 } color={ color }/>
                    )
                }}
            />
            <Tab.Screen 
                name={ MainRoutes.Cart.toString() } 
                component={ CartStackScreen }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={ 30 } color={ color }/>
                    )
                }}
            />
            <Tab.Screen 
                name={ MainRoutes.Collection.toString() } 
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

