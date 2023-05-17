import {Component, Input, OnInit, Provider} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Tva } from 'src/app/models/tva';
import { TvaService } from '../../services/tva.service';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand.service';
import { SupplierService } from '../../services/supplier.service';
import { Brand } from 'src/app/models/brand';
import { Supplier } from 'src/app/models/supplier';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements  OnInit {

  productId!: number;
  editionMode = false;
  product!: Product;
  formGroup!: FormGroup;

  tvaList: Tva[] = [];
  categoryList: Category[] = [];
  brandList: Brand[] = [];
  supplierList: Supplier[] = [];



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private tvaService: TvaService,
    private brandService: BrandService,
    private supplierService: SupplierService) {
    this.productId = this.route.snapshot.params['id'];

  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      id: [null],
      intitule: ['', Validators.required],
      codeBarre: [''],
      prix: [null, Validators.required],
      tvaId: [null, Validators.required],
      marque:[null, Validators.required],
      categorieId: [null, Validators.required],
      description: [''],
      poids: [''],
      longueur: [''],
      largeur: [''],
      hauteur: [''],
      actif: [true],

    });

    if( this.productId ) {
      this.editionMode = true;
      this.refreshArticle();
    }

    this.tvaService.list().subscribe( result => this.tvaList = result );
    this.categoryService.list().subscribe( result => this.categoryList = result );
    this.brandService.list().subscribe( result => this.brandList = result );
    this.supplierService.list().subscribe( result => {this.supplierList = result});

  }

  refreshArticle() {
    this.productService.findById(this.productId).subscribe( product => {
      this.product = product;
      this.formGroup.patchValue(this.product);
      console.log(product);
    } );
  }

  askSave() {
    this.product = this.formGroup.getRawValue();
    this.productService.save( this.product ).subscribe( prod => {
      this.askBack();
    })

  }

  askBack() {
    this.router.navigate(['/products'])
  }

}
