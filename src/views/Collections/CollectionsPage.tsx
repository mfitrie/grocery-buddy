import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Box } from "@gluestack-ui/themed";

export function CollectionsPage(){
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
        </Box>
    )
}