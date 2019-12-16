import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardContact extends Component {
  render() {
    const { contact, getPerson } = this.props;
    return (
      <div>
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body">
            <p class="card-text">{contact.name}</p>
            <p class="card-text">{contact.phone}</p>
            <p class="card-text">{contact.email}</p>
            <button type="button" class="btn btn-danger" value="Delete">
              DELETE
            </button>
            <Link to="/edit_contact">
              <button
                type="button"
                class="btn btn-warning"
                value="Edit"
                onClick={() => getPerson(contact, true)}
              >
                EDIT
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CardContact;
