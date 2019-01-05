import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private orderservice:OrderService) { }

  ngOnInit() {
    this.orderservice.refreshOrder();
  }
  populateForm (emp : Order){
this.orderservice.formData = Object.assign({},emp) ;
  }
 onDelete(id :number){
   if(confirm('Are you sure to dele this Order')){
  this.orderservice.DeleteOrder(id).subscribe(res =>{
this.orderservice.refreshOrder();
  });
 }
}
getTotal() {
  let total = 0;
  for (var i = 0; i < this.orderservice.list.length; i++) {
      if (this.orderservice.list[i].TotalPrice) {
          total += this.orderservice.list[i]. TotalPrice;
         // this.orderservice.list[i].TotalPrice = total;

      }
  }
  return total;
}
getTotalRendered(){
  let totalrendered = 20000;
  return totalrendered;
}
getRemaining(){
  let totalremaining;
 totalremaining = this.getTotalRendered()-this.getTotal();
 return totalremaining;
}
}
