import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product

  constructor(
    private productService: ProductService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //capturando el codigo
    const id = this.activateRouter.snapshot.params['codigo'];
    //llamo al servicio enviandole el id para que retorne el producto encontrado
    this.productService.detail(id)
    .subscribe(data => this.product=data);
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

  update(){
    console.log(this.product)
    this.productService.updateProduct(this.product, this.product.codigo)
    .subscribe(response => {
      this.router.navigate(['/list'])

      this.showSuccessMessage(
        'Actualizar',
        'Se actualizo el producto correctamente',
        'success',
        true,
      )
    })
  }

  volver() :void {
    this.router.navigate(['/list']);
  }
}
