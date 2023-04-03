import { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  FormInput,
  ButtonForm,
  LabelForm,
  InputForm,
} from './ContactForm.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  idName = nanoid();
  idNumber = nanoid();

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.updateState(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <FormInput onSubmit={this.handleSubmitForm}>
        <LabelForm htmlFor={this.idName}>
          Name
          <InputForm
            id={this.idName}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            value={name}
          />
        </LabelForm>
        <LabelForm htmlFor={this.idNumber}>
          Number
          <InputForm
            id={this.idNumber}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            value={number}
          />
        </LabelForm>
        <ButtonForm type="submit" disabled={!(name || number)}>
          Add contact
        </ButtonForm>
      </FormInput>
    );
  }
}

export default ContactForm;
