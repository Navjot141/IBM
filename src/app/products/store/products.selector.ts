import { createFeatureSelector } from "@ngrx/store";
import { Product } from "./product";

export const selectProducts = createFeatureSelector<Product[]>("myproducts")