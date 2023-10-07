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
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons"
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import CardInfo from "./src/components/card-info";

export default function App() {
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
                <CardInfo />
                <CardInfo />
              </HStack>
            </ScrollView>
          </VStack>
        </ScrollView>
      </GluestackUIProvider>
    </Provider>
  )
}