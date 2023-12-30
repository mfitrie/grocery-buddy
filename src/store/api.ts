import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAllCollectionWithGrocery } from "../database/db-service";

export const groceryBuddyApi = createApi({
    // reducerPath: "groceryBuddyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    endpoints: (builder) => ({
        getAllCollectionWithGrocery: builder.query<any, void>({
            queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
                return await getAllCollectionWithGrocery();
            }
        })
    }),

});

export const { useGetAllCollectionWithGroceryQuery } = groceryBuddyApi;