import { ChangeEvent, Component, FormEvent } from 'react';

import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContsctList';
import Container from '../Styled/Container.styled';
import Title from '../Styled/Title.styled';
import MiniTitle from '../Styled/MiniTitle.styled';
import { nanoid } from 'nanoid';

type Contact = {
  name: string;
  id: string;
  number: string;
};

interface PhonebookState {
  contacts: Contact[];
  filter: string;
  name: string;
  number: string;
  showDeleted: boolean;
}

type StringsKeys = 'name' | 'number' | 'filter';

class Phonebook extends Component<{}, PhonebookState> {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
    showDeleted: false,
  };

  // Викликається відразу після монтування компонента в DOM
  componentDidMount() {
    const contact = localStorage.getItem('contact');

    if (contact) {
      this.setState({ contacts: JSON.parse(contact) });
    }
  }

  // Викликається відразу після оновлення компонента в DOM
  // Не викликається при початковому рендері компонента
  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as Pick<PhonebookState, StringsKeys>);
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, contacts } = this.state;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  deleteContact = (id: string) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filter = (value: string) => {
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter, showDeleted, name, number } = this.state;
    const filteredContacts = showDeleted
      ? contacts
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );

    return (
      <Container>
        <Title>Phonebook</Title>
        <Form
          name={name}
          number={number}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />

        <MiniTitle>Contacts</MiniTitle>
        <Filter value={filter} onChange={this.filter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default Phonebook;
