import { createAction, props } from "@ngrx/store";
import { Product } from "./product";

export const ProductsActionAPI = createAction (
    "[Products API] invoke Products Fetch API"
)

export const ProductsFetchSuccessAPI = createAction (
    "[Products API] invoke Products Fetch API",
    props<{ allProducts: Product[] }>()
)

export const ProductsSaveAPI = createAction (
    "[Products API] invoke Products Save API",
    props<{ payload: Product }>()
)

export const ProductsSaveAPISuccess = createAction (
    "[Products API] Products Save API success",
    props<{ response: Product }>()
)

export const loadProductsFailure = createAction (
    "[Products] Loaded Failure",
    props<{ error: any }>()
  );