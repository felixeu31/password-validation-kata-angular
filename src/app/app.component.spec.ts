import { render, fireEvent } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import '@testing-library/jest-dom'
import  userEvent  from '@testing-library/user-event'

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

  it('should print error message when password is shorter than 8 characters', async () => {
    const { getByText, getByPlaceholderText } = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), '1');
    fireEvent.click(getByText('Save'));

    expect(getByText('Password should not be shorter than 8 characters')).toBeInTheDocument();
  });
});
