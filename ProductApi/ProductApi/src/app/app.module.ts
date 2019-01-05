import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { OrderComponent } from './products/order/order.component';
import { ProductComponent } from './products/product/product.component';
import {HttpClientModule} from '@angular/common/http';
import { OrderService } from './products/shared/order.service';
import { ProductListComponent } from './products/product-list/product-list.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
//import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrderComponent,
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
    //BrowserAnimationsModule,
    //ToastrModule
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
