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

export default function App() {

  return (
    <Provider store={ store }>
      <GluestackUIProvider config={config.theme}>
        <ScrollView px="$5" contentContainerStyle={{
          paddingTop: 40,
          paddingBottom: 25,
        }}>
          <HeaderPage />
          <HomePage />
        </ScrollView>
        <BottomNavigationBar />
      </GluestackUIProvider>
    </Provider>
  )
}