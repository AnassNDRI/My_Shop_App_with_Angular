import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/security/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;
  user!: User;
  error: string | null = null;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authentificationService: AuthenticationService) {  }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      dateNaissance: [null],
      roleId: [null],
      telephone: [null],
      gsm: [null],
      actif: [ true ]
    });
  }

  register() {
    if (this.formGroup.valid){
      this.authentificationService.register(this.formGroup.value).subscribe( {
        next: res => {
          if(res){
            console.log('register ok', res);
            this.authentificationService.isAuthenticated.next(true);
            this.router.navigate(['/home']);
          }else {
            this.authentificationService.isAuthenticated.next(false);
            console.log(res.message);
            this.router.navigate(['/register']);
          }
        },
        error: (error) => {
          this.error = 'Formulaire invalide. Les champs "nom", "prenom", "adresse email" et "mot de passe" sont obligatoires.';
        }
      });
    }
  }


  askBack() {
    this.router.navigate(['/home'])
  }


  askOrder() {
    this.router.navigate(['/home']);
  }

}
