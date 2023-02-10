import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { ProductsSaveAPI } from '../store/products.action';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  constructor(private store: Store, private appStore: Store<Appstate>, private router: Router) {
  }

  ProductForm = {
    blend_name: '',
    origin: '',
    variety: '',
    notes: '',
    intensifier: ''
  }

  ngOnInit(): void {
  }

  save(){
    this.store.dispatch(ProductsSaveAPI({payload:{...this.ProductForm}}));
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) =>
    {
      if(data.apiStatus === 'success') {
        this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage:'', apiStatus: ''}}))
         this.router.navigate(['/'])
      }
    })
  }
}
