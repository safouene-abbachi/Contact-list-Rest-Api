import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default class ContactList extends Component {
  render() {
    return (
      <div className="list-section">
        {this.props.list.map((el, key) => (
          <div key={key} className="card">
            <div className="card-body">
              <p className="card-text">NAME: {el.name}</p>
              <p className="card-text">PHONE : {el.phone}</p>
              <p className="card-text"> MAIL ADRESS : {el.email}</p>
              <Button
                type="button"
                className="delete-btn"
                onClick={() => {
                  this.props.deleteContact(el._id);
                }}
              >
                DELETE
              </Button>

              <Link to="/edit-contact">
                <Button
                  className="green"
                  onClick={() => {
                    this.props.toggle();
                    this.props.getPerson(el);
                  }}
                >
                  EDIT CONTACT
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
