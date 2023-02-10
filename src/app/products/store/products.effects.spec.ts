import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of } from "rxjs";
import { provideMockStore } from "@ngrx/store/testing";
import { Store } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";
import { ProductsEffects } from "./products.effects";
import { ProductsService } from "../products.service";
import { Product } from "./product";
import { initialState } from "./products.reducer";
import { ProductsFetchSuccessAPI } from "./products.action";

describe("Effects", () => {
  let actions$: Observable<any>
  let effects: ProductsEffects
  let store: Store
  let productsService: ProductsService

  const expectedProds: Product[] = [
    { 
      id: 5310,
      uid: "f066a767-4bb4-4ad8-93af-a7069dec0bc7",
      blend_name: "Pumpkin-spice Blend",
      origin: "Dipilto, Nicaragua",
      variety: "Red Bourbon",
      notes: "sharp, tea-like, toast, nutmeg, hibiscus",
      intensifier: "structured"
    },
    { 
      id: 5311,
      uid: "f066a767-4bb4-4ad8-93af-a7069dec0bc8",
      blend_name: "red-spice Blend",
      origin: "Dipilto, Nicaragua",
      variety: "Red Bourbon Test",
      notes: "unbalanced, juicy, sugar cane, almond, fresh wood",
      intensifier: "unstructured"
    }
   ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState}),
      ],
      imports: [HttpClientModule]
    })
    productsService = TestBed.inject(ProductsService)
    effects = TestBed.inject(ProductsEffects)
    store = TestBed.inject(Store)
  })

  describe('getProducts action', function () {
    it("should call getProducts and redirect to productsLoaded action", (done) => {
      spyOn(productsService, "getProducts").and.returnValue(of(expectedProds))
      actions$ = of(ProductsFetchSuccessAPI);
      effects.loadAllProducts$.subscribe(res => {
        expect(productsService.getProducts).toHaveBeenCalled()
        expect(res).toEqual(ProductsFetchSuccessAPI({allProducts: expectedProds}))
        done()
      })
    })
  });
})