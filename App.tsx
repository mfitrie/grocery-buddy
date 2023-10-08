import { 
  GluestackUIProvider, 
  Text, 
  Box, 
  config, 
  View, 
  HStack, 
  VStack, 
  ScrollView, 
  Input, 
  InputField,
  InputIcon,
  InputSlot,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import CardInfo from "./src/components/card-info";
import ButtonIncrement from "./src/components/button-increment";
import axios from "axios";
import useFetch from "./src/hooks/useFetch";
import { useState } from "react";
import { HeaderPage } from "./src/components/header-page";
import { BottomNavigationBar } from "./src/components/bottom-navigation-bar";
import { HomePage } from "./src/views/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Provider store={ store }>
        <GluestackUIProvider config={config.theme}>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home" 
                component={ HomePage }
              />
          </Stack.Navigator>
          <BottomNavigationBar />
        </GluestackUIProvider>
      </Provider>
    </NavigationContainer>
  )
}