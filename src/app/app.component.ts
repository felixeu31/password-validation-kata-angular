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
    this.errors = [];
    const password = this.form.value.password;

    if(!password || password.length < 8){
      this.errors.push('Password should not be shorter than 8 characters');
    }
    const regex = /[A-Z]/;
    if(password && !regex.test(password)){
      this.errors.push('Password should contain at least one CAP');
    }

    if (this.errors.length === 0) {
      this.validPasswords.push(password);
    }

    this.form.reset();
  }
}
