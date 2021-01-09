import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginTrackerError } from 'src/app/helpers/LoginTrackerError';
import { User } from 'src/app/models/User';
import { LocalStoragePersistenceService } from 'src/app/services/local-storage-persistence.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  passwordEnrcrypt = "17132a0b-5ae9-4dcf-abbb-8ab8ea41831f";

  validations_form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public route: Router,
    private loginService: LoginService,
    private localStorageService: LocalStoragePersistenceService
  ) { }

  ngOnInit(): void {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  login(values) {
    const requestLoginUser: User = {
      email: values.email,
      password: values.password
    }

    this.loginService.login(requestLoginUser)
      .subscribe(
        (user: User) => this.validUserConfirmed(user),
        (error: LoginTrackerError) => this.errorMessageModal(error)
      );
  }

  validUserConfirmed(user: User) {
    this.localStorageService.set("username", user.nome);
    
    this.loginService.saveJWTtokenInLocalStorage(user.token);

    this.route.navigate(['/homepage/homepage']);
  }

  errorMessageModal(error: LoginTrackerError) {
    console.log(error.friendlyMessage);
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };
}
