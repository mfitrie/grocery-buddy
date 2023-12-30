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
import { Provider, useDispatch } from "react-redux";
import CardInfo from "./src/components/card-info";
import ButtonIncrement from "./src/components/button-increment";
import axios from "axios";
import useFetch from "./src/hooks/useFetch";
import { useCallback, useEffect, useState } from "react";
import { HeaderPage } from "./src/components/header-page";
import { BottomNavigationBar } from "./src/components/bottom-navigation-bar";
import { HomePage } from "./src/views/Home/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { CollectionsPage } from "./src/views/Collections/CollectionsPage";
import { ListGroceriesToday } from "./src/views/Cart/ListGroceriesToday";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { faker } from "@faker-js/faker";
import { CollectionGroceryType } from "./src/types/collection-grocery-type";
import { addGroceryItem, initGroceryCollection } from "./src/store/grocery";
import { initCreateTable, getAllCollection, getAllGroceryItem, seedDBGrocery, getAllCollectionWithGrocery, dbAddGroceryItem } from "./src/database/db-service";
import { logger } from "./src/utils/logger";

export default function App() {
  return (
    <Provider store={ store }>
      <GluestackUIProvider config={config.theme}>
        <SafeAreaProvider>
            <NavigationContainer>
              <BottomNavigationBar />
            </NavigationContainer>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </Provider>
  )
}