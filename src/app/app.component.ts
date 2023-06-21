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

  constructor(private formBuilder: FormBuilder) {
    
  }
}
