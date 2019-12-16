import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ContactList from "./contactList";
import AddContact from "./addContact";

import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { Button } from "reactstrap";

class App extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    list: [],
    id: "",
    edit: false,
    modal: false
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggle = () =>
    this.setState({
      modal: !this.state.modal
    });

  componentDidMount() {
    this.getContacts();
  }

  add = () => {
    this.setState({
      name: "",
      phone: "",
      email: "",
      edit: false
    });
  };

  getContacts = () => {
    axios.get("http://localhost:5000/contacts").then(res =>
      this.setState({
        list: res.data
      })
    );
  };

  addContact = contact => {
    axios
      .post("http://localhost:5000/add_contact", {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(this.getContacts);
    this.add();
  };

  editContact = () => {
    axios
      .put("http://localhost:5000/modify_contact/" + this.state.id, {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(this.getContacts);
    this.add();
  };

  deleteContact = id => {
    axios
      .delete("http://localhost:5000/delete_contact/" + id)
      .then(() => this.getContacts());
  };

  getPerson = contact => {
    this.setState({
      id: contact._id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      edit: true
    });
  };

  render() {
    return (
      <Router>
        <center>
          <Link to="/">
            <h1>MY Contact List</h1>
          </Link>
          <div className="principle-buttons">
            <Link to="/contacts">
              <Button className="blue">Contact List</Button>
            </Link>

            <Link to="/add_contact">
              <Button className="green" onClick={this.toggle}>
                ADDING CONTACT
              </Button>
            </Link>
          </div>
        </center>
        <Route
          exact
          path="/contacts"
          render={() => (
            <ContactList
              // modal={this.state.modal}
              toggle={this.toggle}
              list={this.state.list}
              getPerson={this.getPerson}
              deleteContact={this.deleteContact}
            />
          )}
        />

        <Route
          exact
          path="/(add_contact|edit-contact)/"
          render={() => (
            <AddContact
              modal={this.state.modal}
              toggle={this.toggle}
              action={this.state.edit ? this.editContact : this.addContact}
              contact={this.state}
              changeHandler={this.changeHandler}
              add={this.add}
              edit={this.state.edit}
            />
          )}
        />
      </Router>
    );
  }
}

export default App;
