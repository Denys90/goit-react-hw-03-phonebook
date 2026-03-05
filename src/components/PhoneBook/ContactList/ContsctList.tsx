import List from '../Styled/List.srtled';
import { MdDeleteForever } from 'react-icons/md';

type Contact = {
  name: string;
  id: string;
  number: string;
};

type ContactListProps = {
  contacts: Contact[];
  deleteContact: (id: string) => void;
};

function ContactList({ contacts, deleteContact }: ContactListProps) {
  return (
    <List>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button onClick={() => deleteContact(contact.id)}>
            <MdDeleteForever />
          </button>
        </li>
      ))}
    </List>
  );
}

export default ContactList;
