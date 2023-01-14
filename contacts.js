const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("./db/contacts.json");

const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const updateContacts = async (body) =>
  fs.writeFile(contactsPath, JSON.stringify(body, null, 2));

const listContacts = async () => {
  const contacts = await getAllContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  return contacts[index];
};

const removeContact = async (contactId) => {
  const contacts = await getAllContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const deletedContact = contacts.splice(index, 1);
  await updateContacts(contacts);

  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
