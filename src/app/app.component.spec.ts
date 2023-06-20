import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import '@testing-library/jest-dom'

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

  it('should render save button', async () => {
    const { getByText } = await buildComponent();
    expect(getByText('Save')).toBeInTheDocument();
  });
});
