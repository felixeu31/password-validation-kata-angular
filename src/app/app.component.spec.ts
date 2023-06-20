import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

function buildComponent() {
  return render(AppComponent, {
    imports: [ReactiveFormsModule]
  });
}

describe('Password validation kata', () => {
  it('should render password input', async () => {
    const { getByPlaceholderText } = await buildComponent();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });
});
