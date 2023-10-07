import { useDispatch, useSelector } from "react-redux";
import { Box, Button, ButtonText, HStack, Text, VStack } from "@gluestack-ui/themed";
import { decrement, increment, incrementByAmount } from "../store/message";

export default function ButtonIncrement(){
    const { value } = useSelector((state: any) => state.message);
    const dispatch = useDispatch();

    return (
        <Box>
            <Text mb="$5">The count is: { value }</Text>
            <VStack gap="$5">
                <Button size="sm" onPress={() => dispatch(increment())}>
                    <ButtonText>Increment</ButtonText>
                </Button>
                <Button size="sm" onPress={() => dispatch(decrement())}>
                    <ButtonText>Decrement</ButtonText>
                </Button>
                <Button size="sm" onPress={() => dispatch(incrementByAmount(33))}>
                    <ButtonText>Increment 33</ButtonText>
                </Button>
            </VStack>
        </Box>
    )
}