import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  storeSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.errorMessage = authState.authError;
      if (this.errorMessage) {
        this.showErrorAlert(this.errorMessage);
      }
    });
  }

  showErrorAlert(errorMessage: string) {
    console.log(errorMessage);
    // Todo: add alert
  }

  onSignUp() { this.isLoginMode = false; }

  onLogin() { this.isLoginMode = true; }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
}
