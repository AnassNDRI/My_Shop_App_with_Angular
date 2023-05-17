import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Tva } from 'src/app/models/tva';
import { CategoryService } from '../../services/category.service';
import { TvaService } from '../../services/tva.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  prod!: Product;
  prodId: number;
  categoryList: Category[] = [];
  tvaList: Tva[] = [];

  constructor( private route: ActivatedRoute,
               private router: Router,
               private categoryService: CategoryService,
               private cartService: CartService,
               private tvaService: TvaService,
               private productService: ProductService) {
    this.prodId = this.route.snapshot.params['id']; }

  ngOnInit(): void {
    this.categoryService.list().subscribe( result => this.categoryList = result );
    this.refreshProd();
  }

  refreshProd() {
    this.tvaService.list().subscribe( listTva => {
      this.tvaList = listTva;

      this.productService.findById(this.prodId).subscribe( prod => {
        this.prod = prod;

        const tva = this.tvaList.find( tva => tva.id === this.prod.tvaId );
        if(tva) {
          this.prod.tva = tva;
          this.prod.prixTVAC = this.prod.prix * ( 1 + tva.pct );
        }


      } );

    } );
  }

  getLabelCategorie(categorieId: number) {
    const cat = this.categoryList.find( cat => cat.id === categorieId);
    if( cat ) {
      return cat.libelle;
    }
    return 'Pas de catégorie';
  }


  askBack() {
    this.router.navigate(['/products'])
  }

  returnToProduct() {
    this.router.navigate(['/home']);
  }


  getTVA(TVAId: number) {
    const tva = this.tvaList.find( tva => tva.id === TVAId);
    if( tva ) {
      return tva.libelle;
    }
    return 'Pas de catégorie';
  }

  askAddToCart(product: Product, event: MouseEvent) {
    event.stopPropagation();
    this.cartService.add(product);
  }


}
