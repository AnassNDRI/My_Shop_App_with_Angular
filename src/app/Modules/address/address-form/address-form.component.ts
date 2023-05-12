import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { AddressType } from 'src/app/models/address-type';
import { AuthenticationService } from 'src/app/security/services/authentication.service';
import { AddressService } from '../../services/address.service';
import { AddressTypeService } from '../../services/addressType.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  @Input() address!: Address;
  @Input() addressTypeList: AddressType[] = [];

  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  formGroup!: FormGroup;
  useur!: User;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private addressTypeService: AddressTypeService,
    private authentificationService: AuthenticationService,
    router : Router) {
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      id: [null],
      utilisateurId: [],
      rue: [''],
      numero: [''],
      boite: [''],
      codePostal: [''],
      ville: [''],
      pays: [''],
      addressTypeId: [null],
    });

    this.refreshFormGroupAddress();
    this.addressTypeService.list().subscribe( result => this.addressTypeList = result );

  }

  refreshFormGroupAddress() {
    this.formGroup.patchValue(this.address);
  }

  askSave() {
    this.authentificationService.isAuthenticated.next(true);
    this.address = this.formGroup.getRawValue();
    this.addressService.save(this.address).subscribe(address => {
      this.askBack();
    })
  }

  askBack() {
    this.back.emit();
  }


}
