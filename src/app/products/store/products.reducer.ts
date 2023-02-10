import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Product } from "./product";
import { ProductsFetchSuccessAPI, ProductsSaveAPISuccess } from "./products.action";

export const initialState: ReadonlyArray<Product> = [ 
];

export const ProductsReducer = createReducer(
    initialState, 
    on(ProductsFetchSuccessAPI, (state, { allProducts } ) => {
       return allProducts;
    }),
    on(ProductsSaveAPISuccess, (state, { response } ) => {
        let newState = [...state];
        newState.unshift(response);
        return newState;
     }),
)
