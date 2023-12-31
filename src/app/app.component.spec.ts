import { render, fireEvent } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import '@testing-library/jest-dom'
import  userEvent  from '@testing-library/user-event'
import { waitFor } from '@testing-library/dom';

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

  it.each([
    '1',
    '12',
    '123',
    '1234',
    '12345',
    '123456',
    '1234567'
  ])('should print error message when password is shorter than 8 characters (%s)', async (password: string) => {
    const { getByText, getByPlaceholderText } = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), password);
    fireEvent.click(getByText('Save'));

    expect(getByText('Password should not be shorter than 8 characters')).toBeInTheDocument();
  });

  it('should not print error message when password greater or equal than 8', async () => {
    const { getByText, getByPlaceholderText, queryByText } = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), '12345678');
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(queryByText('Password should not be shorter than 8 characters')).not.toBeInTheDocument();
    });
  });

  it('should print error message when password have not CAP', async () => {
    const { getByText, queryByText, getByPlaceholderText } = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), '12345678');
    fireEvent.click(getByText('Save'));

    expect(queryByText('Password should contain at least one CAP')).toBeInTheDocument();
  });

  it('should not print error message when password have CAP', async () => {
    const { getByText, queryByText, getByPlaceholderText } = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), '12345678A');
    fireEvent.click(getByText('Save'));

    expect(queryByText('Password should contain at least one CAP')).not.toBeInTheDocument();
  });

  
  it('should print password when is valid', async () => {
    const { getByText, queryByText, getByPlaceholderText } = await buildComponent();

    const newPassword = '12345678A';
    await userEvent.type(getByPlaceholderText('Password'), newPassword);
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(queryByText(newPassword)).toBeInTheDocument();
    });
  });

  
  it('should print a list of valid passwords', async () => {
    const { getByText, queryByText, getByPlaceholderText } = await buildComponent();

    const newPassword1 = '12345678A1';
    const newPassword2 = '12345678A2';
    await userEvent.type(getByPlaceholderText('Password'), newPassword1);
    fireEvent.click(getByText('Save'));
    await userEvent.type(getByPlaceholderText('Password'), newPassword2);
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(queryByText(newPassword1)).toBeInTheDocument();
      expect(queryByText(newPassword2)).toBeInTheDocument();
    });
  });

  
  it('should not print password when is not valid', async () => {
    const { getByText, queryByText, getByPlaceholderText } = await buildComponent();

    const newPassword = 'invalid';
    await userEvent.type(getByPlaceholderText('Password'), newPassword);
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(queryByText(newPassword)).not.toBeInTheDocument();
    });
  });

});
