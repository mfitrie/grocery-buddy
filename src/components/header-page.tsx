import { HStack, Text } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons"
import dayjs from "dayjs";
import { useState } from "react";

export function HeaderPage(){
    const DATE_FORMAT = "dddd, D/M/YYYY";
    const todaysDate = dayjs().format(DATE_FORMAT);

    return (
        <>
            <HStack justifyContent="space-between">
                <Text size="md">Grocery Buddy</Text>
                <HStack alignItems="center" gap="$2">
                    <Text size="md">Hello, Fitrie</Text>
                    <Ionicons name="hand-right-outline" size={15}/>
                </HStack>
            </HStack>
            {/* <Text size="xs">Wednesday, 20/9/2023</Text> */}
            <Text size="xs">{ todaysDate }</Text>
        </>
    )
}