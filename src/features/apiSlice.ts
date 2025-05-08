import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

interface Product{
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
}

interface Products{
    products : Product[]
}

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com/'}),
    endpoints: (builder) => ({
        getAllProducts:builder.query<Products[],void>({
            query: () => "products",
        }),

        getProduct: builder.query({
            query:({search,limit,skip}) => `products/search?q=${search}&limit=${limit}&skip=${skip}`,
        }),

        listPages : builder.query({
            query:(pagination) => `products?limit=${pagination.limit}&skip=${pagination.skip}`, 
        })
    }),
});

export const {useGetAllProductsQuery,useGetProductQuery,useListPagesQuery} = productsApi
