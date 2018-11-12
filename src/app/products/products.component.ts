import { Component, OnInit } from '@angular/core';

import {IProduct} from './product';
import { ProductService } from './products.service';


@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  _listFilter: string = 'cart';
  filteredProducts: IProduct[];
  errorMessage: string;
  //listFilter: string = 'cart';

  showImage: boolean = false;
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter): this.products;
  }
  
  get listFilter(): string {
    return this._listFilter;
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }



  
  products: IProduct[] = [];

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: any) => 
           product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  constructor(private productService: ProductService) { 
   // this.filteredProducts = this.products;
   // this.listFilter = 'cart';
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
    
  }

}
