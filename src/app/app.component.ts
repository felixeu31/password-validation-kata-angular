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

  error = '';

  constructor(private formBuilder: FormBuilder) {
    
  }

  validatePassword(){
    const password = this.form.value.password;

    if(!password || password.length < 8){
      this.error = 'Password should not be shorter than 8 characters';
    }
  }
}
