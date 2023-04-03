import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  FormInput,
  ButtonForm,
  LabelForm,
  InputForm,
} from './ContactForm.styled';

const ContactForm = ({ updateState }) => {
  const [userName, setUserName] = useState('');
  const [userNumber, setNumber] = useState('');

  const idName = nanoid();
  const idNumber = nanoid();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    if (name === 'name') {
      setUserName(value);
    } else {
      setNumber(value);
    }
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    updateState(userName, userNumber);
    reset();
  };

  const reset = () => {
    setUserName('');
    setNumber('');
  };

  return (
    <FormInput onSubmit={handleSubmitForm}>
      <LabelForm htmlFor={idName}>
        Name
        <InputForm
          id={idName}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={userName}
        />
      </LabelForm>
      <LabelForm htmlFor={idNumber}>
        Number
        <InputForm
          id={idNumber}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={userNumber}
        />
      </LabelForm>
      <ButtonForm type="submit" disabled={!(userName && userNumber)}>
        Add contact
      </ButtonForm>
    </FormInput>
  );
};

export default ContactForm;
