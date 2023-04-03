import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { Container, TitleForm, TitleContacts, Info } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import { save, load } from '../Utils/Utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const testContacts = [
  { id: 'id-1', name: 'Adam Sandler', number: '459-12-56' },
  { id: 'id-2', name: 'Jennifer Aniston', number: '443-89-12' },
  { id: 'id-3', name: 'Brad Pitt', number: '645-17-79' },
  { id: 'id-4', name: 'Angelina Jolie', number: '227-91-26' },
];

const KEY_CONTACTS = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const isContacts = load(KEY_CONTACTS);

    isContacts === [] ? setContacts(isContacts) : setContacts(testContacts);
  }, []);

  useEffect(() => {
    save(KEY_CONTACTS, contacts);
  }, [contacts]);

  const updateState = (userName, userNumber) => {
    if (contacts.some(el => el.name === userName)) {
      toast.warn(`${userName} is already in contacts.`, { theme: 'colored' });
    } else {
      setContacts(prevState => [
        { name: userName, number: userNumber, id: nanoid() },
        ...prevState,
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
      {contacts.length === 0 ? (
        <Info>No contacts.</Info>
      ) : (
        <>
          <TitleContacts>Contacts</TitleContacts>
          <Filter filter={filter} updateFilter={updateFilter} />
        </>
      )}

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
