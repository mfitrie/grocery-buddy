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
import { Ionicons } from "@expo/vector-icons"
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import CardInfo from "./src/components/card-info";
import ButtonIncrement from "./src/components/button-increment";
import axios from "axios";
import useFetch from "./src/hooks/useFetch";
import { useState } from "react";
import { AnimeImage } from "./src/data/AnimeImage";

export default function App() {
  const { data, refetch } = useFetch();

  return (
    <Provider store={ store }>
      <GluestackUIProvider config={config.theme}>
        <ScrollView px="$5" contentContainerStyle={{
          paddingTop: 25,
          paddingBottom: 25,
        }}>
          <VStack gap="$1">
            <Text size="sm">Your location</Text>
            <Box>
              <Text size="md">
                <Ionicons name="location" size={15} />
                Kuala Lumpur, Malaysia
              </Text>
            </Box>
            <Box>
              <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                <InputSlot px="$2">
                  <InputIcon>
                    <Ionicons name="search" size={15}/>
                  </InputIcon>
                </InputSlot>
                <InputField
                  placeholder='Destination '
                />
              </Input>
            </Box>
            <ScrollView horizontal={true}>
              <HStack>
                <CardInfo imageUri={
                  data ? data.data.images.jpg.image_url : "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=70"
                } />
                <CardInfo imageUri={
                  data ? data.data.images.jpg.image_url : "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=70"
                } />
                <CardInfo imageUri={
                  data ? data.data.images.jpg.image_url : "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=70"
                } />
                <CardInfo imageUri={
                  data ? data.data.images.jpg.image_url : "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=70"
                } />
              </HStack>
            </ScrollView>
            <Button onPress={refetch}>
              <ButtonText>Refresh</ButtonText>
            </Button>
          </VStack>
          {/* <ButtonIncrement /> */}
        </ScrollView>
      </GluestackUIProvider>
    </Provider>
  )
}