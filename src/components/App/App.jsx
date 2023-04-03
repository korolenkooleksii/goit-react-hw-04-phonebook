import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Container, TitleForm, TitleContacts } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const updateState = (userName, userNumber) => {
    if (contacts.some(el => el.name === userName)) {
      toast.warn(`${userName} is already in contacts.`, { theme: 'colored' });
    } else {
      setContacts([
        { name: userName, number: userNumber, id: nanoid() },
        ...contacts,
      ]);
    }
  };

  const updateFilter = date => {
    setFilter(date);
  };

  const filterByName = () => {
    const arr = contacts.filter(el =>
      el.name.toLowerCase().includes(filter.trim())
    );
    return arr;
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <TitleForm>Phonebook</TitleForm>
      <ContactForm updateState={updateState} />
      <TitleContacts>Contacts</TitleContacts>
      <Filter filter={filter} updateFilter={updateFilter} />
      {filter === '' ? (
        <ContactsList contacts={contacts} deleteContact={deleteContact} />
      ) : (
        <ContactsList contacts={filterByName()} deleteContact={deleteContact} />
      )}
      <ToastContainer />
    </Container>
  );
};

export default App;
