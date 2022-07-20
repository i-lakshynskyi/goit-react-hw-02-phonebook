import React from 'react';
import PropTypes from 'prop-types';

import s from './contact-list.module.scss';

const ContactList = ({ contacts, onRemoveContact, filter, onHandlerChange }) => {
  return (
    <>
      <div className={s.contactListWrapper}>
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <input type='text' placeholder={'search by name'} onChange={onHandlerChange}
               value={filter} />
        {
          contacts?.length > 0 &&
          <ul>
            {contacts.map(({ id, name, number }) =>
              <li key={id}>
                <span>{name}: </span>
                <span>{number}</span>
                <span className={s.delete} onClick={() => onRemoveContact(id)}> Delete </span>
              </li>,
            )}
          </ul>
        }
      </div>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })).isRequired,
  filter: PropTypes.string,
  onRemoveContact: PropTypes.func.isRequired,
  onHandlerChange: PropTypes.func.isRequired,
};

export default ContactList;
