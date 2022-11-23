import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'//1ro a mano
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL_SERVICES = "http://localhost:8080";
  private urlBase = this.URL_SERVICES + "/api";
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});


  constructor(private http: HttpClient) { }

  getProductList() : Observable<any> {
    console.log("Llamando a REST:"+ this.urlBase + "/productosTotal");
    return this.http.get(this.urlBase+"/productosTotal").pipe(
      map(response => response as Product[])
    );
  }

  createProduct(product:Object) : Observable<Object>{
    return this.http.post(this.urlBase+"/producto", product,
    {headers:this.httpHeaders});
  }

  public detail(codigo: number): Observable<Product> {
    return this.http.get<Product>(this.urlBase+ "/producto/" + codigo);
  }

  updateProduct(product:Object, codigo: number) : Observable<Object>{
    return this.http.put(this.urlBase + `/producto/${codigo}`, product,
    {headers:this.httpHeaders});
  }

  deleteProduct(codigo: number): Observable<Object>{
    console.log("Llamando a REST:"+ this.urlBase + `/producto/${codigo}`);
    return this.http.delete(this.urlBase + `/producto/${codigo}`,
    {headers:this.httpHeaders});
  }
}
