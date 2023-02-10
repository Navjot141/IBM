import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select,Store } from '@ngrx/store';
import { Product } from '../store/product';
import { selectProducts } from '../store/products.selector';
import {Location} from '@angular/common';
import { NavigationService } from 'src/app/navigation.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit, OnDestroy{
  products: Product[];
  productDetail: any;
  constructor(private navigationService: NavigationService, private router: Router, private route: ActivatedRoute, private store: Store, private location: Location,
    ){
  }

  ngOnInit(): void {
   
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    this.store.pipe(select(selectProducts)).subscribe((products) => {
      this.products = products;
      if(this.products) {
        this.productDetail = this.products.find(product => 
        product.id === productIdFromRoute
      );
      }
     
    });
    
  }

  ngOnDestroy(){
  }

  goBack() {
    this.navigationService.back();
  }
}
