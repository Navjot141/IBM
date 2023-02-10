import * as fromReducer from './products.reducer';
import {Action} from "@ngrx/store";
import { ProductsFetchSuccessAPI } from './products.action';

describe('Books Reducer', () => {
  const {initialState, ProductsReducer } = fromReducer;
  const expectedProduct  = { 
    id: 5310,
    uid: "f066a767-4bb4-4ad8-93af-a7069dec0bc7",
    blend_name: "Pumpkin-spice Blend",
    origin: "Dipilto, Nicaragua",
    variety: "Red Bourbon",
    notes: "sharp, tea-like, toast, nutmeg, hibiscus",
    intensifier: "structured"
  }

  it('should return initial state if the action is unknown', () => {
    const action: Action = { type: 'Unknown' };
    const state = ProductsReducer(initialState, action);
    expect(state).toBe(initialState);
  });

  describe('productsLoaded action', function () {
    it('should have 1 product in products after loading',  () => {
      const action = ProductsFetchSuccessAPI({allProducts: [expectedProduct]});
      const state = ProductsReducer(initialState, action);
      expect(state.length).toEqual(1);
      expect(state[0]).toBe(expectedProduct);
    });
  });

});