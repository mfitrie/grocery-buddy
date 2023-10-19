import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CollectionsPage } from "./CollectionsPage";
import CollectionItem from "./CollectionItem";
import { CollectionRoutes } from "../../constant/route-types";

const CollectionStack = createNativeStackNavigator();

export default function CollectionStackScreen(){
    return (
        <CollectionStack.Navigator initialRouteName={ CollectionRoutes.CollectionHome.toString() }>
            <CollectionStack.Screen 
                name={ CollectionRoutes.CollectionHome.toString() }
                component={ CollectionsPage }
                options={{
                    title: "Collections",
                }}
            />
            <CollectionStack.Screen 
                name={ CollectionRoutes.CollectionItem.toString() }
                component={ CollectionItem }
                options={{
                    title: "Collection Item",
                }}
            />
        </CollectionStack.Navigator>
    )
}