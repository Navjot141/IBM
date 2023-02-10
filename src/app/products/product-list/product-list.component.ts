import { Component, OnDestroy, OnInit,  AfterViewInit,ViewChild, ViewEncapsulation} from '@angular/core';
import { select,Store } from '@ngrx/store';
import { selectProducts } from '../store/products.selector';
import { Product } from '../store/product';
import { ProductsActionAPI } from '../store/products.action';
import { MatPaginator} from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
    if(this.dataSource){
      this.dataSource.paginator = value;
    }
  }
  products: Product[];
  pageSlice: any;
  pagesize: number = 10;
  pageSizeOptions: number[] = [3, 5, 10];

  public displayedColumns: string[] = [
    "blend_name",
    "origin",
    "variety"
  ];
  public dataSource: MatTableDataSource<Product>;
  
  constructor(private store: Store, private router: Router){

  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActionAPI());
    this.store.pipe(select(selectProducts)).subscribe((products: Product[]) => {
      this.products = products;
      if(this.products){
      this.initializeDataSource(this.products);
      }
     }
     );
     
  }

  private initializeDataSource(products: Product[]): void {
    this.dataSource = new MatTableDataSource(
      products
    );
    this.dataSource.paginator = this.paginator;
  }

  goToDetailsPage(product: Product){
    this.router.navigateByUrl(`details/${product.id}`);
  }

  ngOnDestroy() {
  }
}
