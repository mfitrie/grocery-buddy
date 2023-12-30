import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./HomePage";
import { HomeRoutes } from "../../constant/route-types";
import { useDispatch } from "react-redux";
import { initGroceryCollection } from "../../store/grocery";
import { useEffect } from "react";
import { getAllCollection, getAllCollectionWithGrocery, getAllGroceryItem, initCreateTable, seedDBGrocery } from "../../database/db-service";
import { logger } from "../../utils/logger";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen(){
    const dispatch = useDispatch();
    

    useEffect(() => {
        (async () => {
          await initCreateTable();
          await seedDBGrocery();
          const collections = await getAllCollection();
          const groceries = await getAllGroceryItem();
          const collectionWithGrocery = await getAllCollectionWithGrocery();
          
          dispatch(initGroceryCollection(collectionWithGrocery));
          
          logger.info("collections: ", collections);
          logger.info("groceries: ", groceries);
          logger.info("collectionWithGrocery: ", collectionWithGrocery);
        })();
    }, []);


    return (
        <HomeStack.Navigator initialRouteName={ HomeRoutes.HomePage.toString() }>
            <HomeStack.Screen 
                name={ HomeRoutes.HomePage.toString() }
                component={ HomePage }
                options={{
                    title: "Home",
                }}
            />
        </HomeStack.Navigator>
    )
}
