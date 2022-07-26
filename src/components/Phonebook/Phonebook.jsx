import React, { Component } from 'react';
import s from './phonebook.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';


class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts.length > 0) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = (data) => {
    const { name, number } = data;
    const id = nanoid();
    const checkName = this.state.contacts.find(contact => contact.name.trim().toUpperCase() === name.trim().toUpperCase());

    if (checkName) {
      alert(name + ' is already in contacts');
      return;
    }
    this.setState(prevState =>
      ({
        contacts: [...prevState.contacts, { id, name, number }],
      }),
    );
  };

  onRemoveContact = (removeID) => {
    const newContacts = this.state.contacts.filter(({ id }) => id !== removeID);
    this.setState({ contacts: newContacts });
  };

  onHandlerChange = (event) => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    if (this.state.filter.length > 0) {
      return this.state.contacts?.filter(({ name }) => {
        let nameItem = name?.toLowerCase();
        return nameItem.indexOf(this.state.filter.toLowerCase()) !== -1;
      });
    }
    return this.state.contacts;
  };

  render() {
    const { filter } = this.state;

    return (
      <div className={s.phonebookWrapper}>
        <h2>Phonebook</h2>
        <ContactForm onAddContact={this.onAddContact} />
        <ContactList contacts={this.getFilteredContacts()} onRemoveContact={this.onRemoveContact} filter={filter}
                     onHandlerChange={this.onHandlerChange} />
      </div>
    );
  }
};

export default Phonebook;
