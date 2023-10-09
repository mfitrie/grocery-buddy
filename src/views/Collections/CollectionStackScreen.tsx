import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CollectionsPage } from "./CollectionsPage";
import CollectionItem from "./CollectionItem";

const CollectionStack = createNativeStackNavigator();

export default function CollectionStackScreen(){
    return (
        <CollectionStack.Navigator initialRouteName="CollectionHome">
            <CollectionStack.Screen 
                name="CollectionHome"
                component={ CollectionsPage }
                options={{
                    title: "Collections",
                }}
            />
            <CollectionStack.Screen 
                name="CollectionItem"
                component={ CollectionItem }
                options={{
                    title: "Collection Item",
                }}
            />
        </CollectionStack.Navigator>
    )
}