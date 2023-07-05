const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const data = await listContacts();
  const index = data.findIndex(el => el.id === contactId);
  if (index === -1) return null;
  const contact = data[index];
  return contact;
};

const removeContact = async contactId => {
  const data = await listContacts();
  const index = data.findIndex(el => el.id === contactId);
  if (index === -1) return null;

  const contactDeleted = data.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contactDeleted[0];
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  const newData = [...data, newContact];
  fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
