import { Injectable } from "@angular/core";
import { createEffect,Actions, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { map, mergeMap, switchMap, take, withLatestFrom } from "rxjs";
import { setAPIStatus} from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { ProductsService } from "../products.service";
import { ProductsActionAPI, ProductsFetchSuccessAPI, ProductsSaveAPI, ProductsSaveAPISuccess } from "./products.action";
import { selectProducts } from "./products.selector";


@Injectable()
export class ProductsEffects {

    constructor(private actions$:Actions, private productsService:ProductsService, 
      private store: Store, private appStore: Store<Appstate>){
    }

    loadAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionAPI),
      withLatestFrom(this.store.pipe(select(selectProducts))),
      mergeMap(() => {
        return this.productsService
        .getProducts()
        .pipe(map((data) => ProductsFetchSuccessAPI({ allProducts: data })));
      },
      ),
      take(1)
      ),
  );

  saveNewProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsSaveAPI),
    mergeMap((action) => {
      this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage:'', apiStatus: ''}}))
      return this.productsService
      .createProduct(action.payload)
      .pipe(map((data) => {
        this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage:'', apiStatus: 'success'}}))
       return ProductsSaveAPISuccess({ response: data })
      }
      ));
    }),
    ),
);

}


