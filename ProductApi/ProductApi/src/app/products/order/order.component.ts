import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { NgForm } from '@angular/forms';
import { summaryFileName } from '@angular/compiler/src/aot/util';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderservice:OrderService ) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.orderservice.formData = {
      OrderId: null,
      ProductName: '',
      CustomerCode: '',
      ProductCode: '',
      Price: null,
      Quantity:null,
      Date:null,
      TotalPrice:null,
      C_sum_TotalPrice___as_TotalOrder:null
      
    }
  
}
onSubmit(form: NgForm) {
  if(form.value.OrderId == null)
 this.insertRecord(form);
else
this.updateRecord(form);
}
insertRecord(form:NgForm){
 this.orderservice.postOrder(form.value).subscribe(res => {
  // this.toastr.success('Inserted Succesfully','Product Management');
   this.resetForm(form);
   this.orderservice.refreshOrder();
 });
}
updateRecord(form:NgForm){
  this.orderservice.PutOrder(form.value).subscribe(res => {
    // this.toastr.success('Inserted Succesfully','Product Management');
     this.resetForm(form);
     this.orderservice.refreshOrder();

});
}
}