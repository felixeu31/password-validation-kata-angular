import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'password-validation-kata-angular';

  form = this.formBuilder.group({
    password: ['', []]
  });

  errors: string[] = [];
  validPasswords: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    
  }

  validatePassword(){
    const password = this.form.value.password;
    
    this.errors = [];
    this.addErrorIfPasswordIsTooShort(password);    
    this.addErrorIfPasswordDoesNotContainCaps(password);

    this.printPasswordIfIsValid(password);

    this.form.reset();
  }

  private printPasswordIfIsValid(password: string | null | undefined) {
    if (this.errors.length === 0) {
      this.validPasswords.push(password);
    }
  }

  private addErrorIfPasswordDoesNotContainCaps(password: string | null | undefined) {
    const regex = /[A-Z]/;
    if (password && !regex.test(password)) {
      this.errors.push('Password should contain at least one CAP');
    }
  }

  private addErrorIfPasswordIsTooShort(password: string | null | undefined) {
    if (!password || password.length < 8) {
      this.errors.push('Password should not be shorter than 8 characters');
    }
  }
}
