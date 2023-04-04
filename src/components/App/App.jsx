import { nanoid } from 'nanoid';
import { useState } from 'react';
import useLocalStorage from 'components/Hooks/useLocalStorage';
import { Container, TitleForm, TitleContacts, Info } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KEY_CONTACTS = 'contacts';

const App = () => {
  const [contacts, setContacts] = useLocalStorage(KEY_CONTACTS, []);
  const [filter, setFilter] = useState('');


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
