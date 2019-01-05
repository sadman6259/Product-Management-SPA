import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import  {Order} from './order.model';
import { throwError } from 'rxjs';
import{ catchError,tap } from 'rxjs/operators'
import { Product } from './product.model';


//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';
//import  {Order} from './order.model'

@Injectable({
  providedIn: 'root'
}
)
export class OrderService {
  productlist:Product[];
  list:Order[];
  formData : Order ;
  readonly rootUrl="http://localhost:8488/api"
  //selectedOrder:Order;
  constructor(private http:HttpClient) {  }
  postOrder(formData:Order){
  return this.http.post(this.rootUrl+'/Order',formData).pipe(catchError(this.handleError));
  }
  refreshOrder(){
    this.http.get(this.rootUrl+'/Order').toPromise().then(res => this.list = res as Order[]);
  }
  refreshProduct(){
    this.http.get(this.rootUrl+'/Product').toPromise().then(res => this.productlist = res as Product[]);
  }
  PutOrder(formData:Order){
    return this.http.put(this.rootUrl+'/Order/'+formData.OrderId,formData).pipe(catchError(this.handleError));

  }
  DeleteOrder(id:number){
    return this.http.delete(this.rootUrl+'/Order/'+id).pipe(catchError(this.handleError));

  }
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}