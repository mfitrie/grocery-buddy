import { GluestackUIProvider, Text, Box, config, View, HStack } from "@gluestack-ui/themed";

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <View h="100%">
        <HStack h="100%" justifyContent="center">
          <Box justifyContent="center" alignItems="center">
            <Text>New Glue Stack Ui</Text>
          </Box>
        </HStack>
      </View>
    </GluestackUIProvider>
  )
}