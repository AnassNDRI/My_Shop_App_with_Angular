import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {Product} from "../../../models/product";
import { Category } from 'src/app/models/category';
import { TvaService } from '../../services/tva.service';
import { CategorieService } from '../../services/categorie.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements  OnInit{

  @Input() titre = '';
  @Input() editionMode = true;


  products: Product[] = [];
  categoryList: Category [] = [];

  categoryIdSelected: number | null = null;

  filtre = '';

  constructor( private productService: ProductService,
               private cartService: CartService,
               private categoryService: CategorieService,
               private tvaService: TvaService,
               private router: Router

  ) { }

  ngOnInit(): void {
    this.categoryService.list().subscribe( result => this.categoryList = result );
    this.refresh();
  }

   refresh() {
     this.productService.list().subscribe( products => {
       this.tvaService.list().subscribe( tvaList =>  {
         for(let product of products) {
           const tva = tvaList.find( tva => tva.id === product.tvaId );
           if (tva) {
             product.tva = tva;
             product.prixTVAC = product.prix * (1+product.tva.pct);
           }
         }
         this.products = products;
       });
     });
  }

  filtrerProducts(products: Product[]){

    return products.filter ( art => {

      return (art.categorieId === this.categoryIdSelected || this.categoryIdSelected === null) &&
        art.intitule.toUpperCase().includes( this.filtre.trim().toUpperCase())});
  }

  getLabelCategorie(categorieId: number) {
    const cat = this.categoryList.find( cat => cat.id === categorieId);
    if( cat ) {
      return cat.libelle;
    }
    return 'Pas de catégorie';
  }


  askDetail(id: number) {
    this.router.navigate(['/products', 'detail', id]);
  }

  askDelete(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.productService.delete(id).subscribe( () => {
      alert('Product supprimé');
      this.refresh();
    });
  }


  askBack() {
    this.router.navigate(['/admin']);
  }


  askAddToCart(product: Product, event: MouseEvent) {
    event.stopPropagation();
    this.cartService.add(product);
  }


  askEdit(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/products', 'form', id]);
  }


  askAdd() {
    this.router.navigate(['/products', 'form']);
  }
}
