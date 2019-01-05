import { Component, OnInit } from '@angular/core';
import { OrderService } from './shared/order.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[OrderService]
})
export class ProductsComponent implements OnInit {

  constructor(private orderservice: OrderService) { }

  ngOnInit() {
  }

}
