import { Box, Text } from "@gluestack-ui/themed";

export default function CollectionItem({ route }){
    return (
        <Box>
            <Text>Collection Item { route.params?.id }</Text>
        </Box>
    )
}