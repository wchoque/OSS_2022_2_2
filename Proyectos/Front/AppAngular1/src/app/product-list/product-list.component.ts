import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[]

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
  this.reloadData()
}

showSuccessMessage(title: string, message: string, iconText: SweetAlertIcon, showCancelButton: boolean = true){
  Swal.fire({
    position: 'top-end',
    icon: iconText,
    title: title,
    text: message,
    showConfirmButton: showCancelButton,
    timer: 1500
  })
}

  reloadData(){
    console.log("Reload!");
    this.productService.getProductList().subscribe(products => this.products=products);
  }

  onDelete(codigo: number){

    Swal.fire({
      title: 'Are you sure?',
      text: "Estas seguro de eliminar el producto con codigo " + codigo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(codigo).subscribe(response => {
          this.reloadData();
  
          this.showSuccessMessage(
            'Eliminar',
            'Se elimino el producto correctamente',
            'success',
            true,
          )
        });
      }
    })
  }
}
