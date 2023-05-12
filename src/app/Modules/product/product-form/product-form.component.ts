import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements  OnInit {

  /// lorsqu'on veut utiliser l'App-PokemonFormComponent
  // (l'on veut editer ou afficher) => il faut passer une propriété d'entrée qui sera un un pokemon
  @Input() product : Product | undefined; // pokemon courant
  //////////////////////////////////////////////////////////////////////////
  categorie: string[] | undefined;

  IsAddForm: boolean | undefined;// cette propriété permet de verifier si l'utilisateur veut bien faire un ajout

  constructor(
    private productService : ProductService,
    private route : Router
  ) {}

  ngOnInit() {
    // la liste de tous les produits
     //this.categorie = this.productService.getProductCategorieList();
    //this.IsAddForm = this.route.url.includes('product/add');

  }

}
