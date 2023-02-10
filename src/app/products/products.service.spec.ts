import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { Product } from './store/product';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  const getProductUrl = "http://random-data-api.com/api/coffee/random_coffee?size=50";
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService
      ]
    });

    productsService = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
   
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('shoud return products from API via GET', () => {
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

     productsService.getProducts().subscribe(products => {
      expect(products.length).toBe(50);
      expect(products).toEqual(expectedProds);
     })

     const request = httpTestingController.expectOne(getProductUrl);
     expect(request.request.method).toBe('GET');
     request.flush(expectedProds);

  })

});
