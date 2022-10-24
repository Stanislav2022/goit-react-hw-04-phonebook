import { Component } from 'react';
import css from "./Phonebook.module.css";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm/ContactForm";
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default class Phonebook extends Component {
    state = {
        contacts: [],
        filter: ''
    };

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem("contacts"));
        if (contacts?.length) {
            this.setState({ contacts });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { contacts } = this.state;
        if (prevState.contacts !== contacts) {
            localStorage.setItem("contacts", JSON.stringify(contacts));
        }
    };

    addContats = (data) => {
          if (this.isDuplicate(data)) {
            return alert(`${data.name} - is already in contacts`)
        }
        this.setState((prev) => {
            const newData = { id: nanoid(), ...data}
            return {
                contacts: [...prev.contacts, newData]
            }
        })
    };

    removeContact = (id) => {
        this.setState((prev) => {
            const newContacts = prev.contacts.filter((item) =>
                item.id !== id);
            return {
                contacts: newContacts
            }
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    };

    isDuplicate ({name}) {
        const { contacts } = this.state;
        const result = contacts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase())
        return result
    }

    getFiltereContacts() {
        const { contacts, filter } = this.state;
        if (!filter) {
            return contacts;
        }
        const normalizedFilter = filter.toLocaleLowerCase();
        const filteredContacts = contacts.filter(({ name, number }) => {
            const normalizedName = name.toLocaleLowerCase();
            const normalizedNumber = number.toLocaleLowerCase();
            const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
            return result;
        })
        return filteredContacts;
    }

    render() {
        const { addContats, removeContact, handleChange } = this;
        const { filter } = this.state;
        const contacts = this.getFiltereContacts();
    return (
        <>
            <div className={css.form}>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={addContats} />
            </div>
            <div className={css.form}>
                <h2>Contacts</h2>
                <Filter filter={ filter} handleChange={handleChange}  />
                <ContactList items={contacts} removeContact={removeContact} />
            </div>
       </>
    )
  }
}
