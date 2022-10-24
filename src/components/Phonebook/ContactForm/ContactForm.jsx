import React, { Component } from 'react'
import css from "../Phonebook.module.css"
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'

export default class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };
    
    handlePhonebook = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value });
        
    };

    nameId = nanoid();
    numberId = nanoid();

    handleSubmite = (e) => {
        e.preventDefault()
        const { name, number } = this.state;
        this.props.onSubmit({ name, number });
        this.setState({
            name: '',
            number: '',
        });
    };    

    render() {
        const { nameId, numberId, handleSubmite } = this;
    return (
        <form onSubmit={handleSubmite}>
            <div>
                <label htmlFor={nameId}> Name </label>
                <input
                    className={css.input}
                    id={nameId}
                    type="text"
                    name="name"
                    value={this.state.name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required onChange={this.handlePhonebook} />
            </div>
            <div>
                <label htmlFor={numberId} > Number </label>
                <input
                    className={css.input}
                    id={numberId}
                    type="tel"
                    name="number"
                    value={this.state.number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required onChange={this.handlePhonebook} />
            </div>
            <button>Add contact</button>
                </form>
     


    )
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

