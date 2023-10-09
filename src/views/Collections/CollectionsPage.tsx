import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Box, Button, ButtonText } from "@gluestack-ui/themed";

export function CollectionsPage({ navigation }){
    const insets = useSafeAreaInsets();
    return (
        <Box
            px="$5"
            style={{
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <Text>Collections Page</Text>
            <Button onPress={() => navigation.push("CollectionItem")}>
                <ButtonText>Move to Collection Item</ButtonText>
            </Button>
        </Box>
    )
}