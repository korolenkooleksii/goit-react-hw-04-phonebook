import React from 'react';
import {
  ItemContacts,
  ListContacts,
  ButtonDelete,
} from './ContactsList.styled';
import { TbPoint } from 'react-icons/tb';
import PropTypes from 'prop-types';

const ContactsList = ({ state, deleteContact }) => {
  return (
    <ListContacts>
      {state.map(({ name, number, id }) => (
        <ItemContacts key={id}>
          <TbPoint />
          {name}: {number}
          <ButtonDelete
            type="button"
            onClick={() => {
              deleteContact(id);
            }}
          >
            Delete
          </ButtonDelete>
        </ItemContacts>
      ))}
    </ListContacts>
  );
};

ContactsList.propTypes = {
  state: PropTypes.array,
  name: PropTypes.string,
  number: PropTypes.string,
  id: PropTypes.string,
  deleteContact: PropTypes.func,
};

export default ContactsList;
