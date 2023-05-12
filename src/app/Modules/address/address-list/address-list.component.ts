import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { AddressType } from 'src/app/models/address-type';
import { AuthenticationService } from 'src/app/security/services/authentication.service';
import { AddressService } from '../../services/address.service';
import { AddressTypeService } from '../../services/addressType.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  address!: Address;
  addressList: Address[] = [];
  formGroup!: FormGroup;
  currentUserId!: number| null;
  addressTypeList: AddressType[] = [];

  addressSelected: Address | null = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private addressService: AddressService,
              private authService: AuthenticationService,
              private addressTypeService: AddressTypeService) {
    this.currentUserId = this.authService.userId;
  }

  ngOnInit(): void {
    this.refresh();
  }

  askBack() {
    this.router.navigate(['/profile'])
  }

  getAddressType(addressTypeId: number) {
    return this.addressTypeList.find( type => type.id === addressTypeId )
  }


  refresh() {
    this.addressSelected = null;
    this.addressService.findByUtilisateur().subscribe(addresss => this.addressList = addresss);
    this.addressTypeService.list().subscribe( list => this.addressTypeList = list );
  }

  askAddAddress() {
    this.addressSelected = {
      id: (null as any),
      utilisateurId: this.currentUserId!,
      rue: '',
      numero: '',
      boite: '',
      codePostal: '',
      ville: '',
      pays: '',
      adresseTypeId: (null as any)
    };
  }

  askDelete(event: MouseEvent, id: number) {
    if (event) {
      event.stopPropagation();
    }
    this.addressService.delete(id).subscribe(res => {
      this.refresh();
    });
  }

}
