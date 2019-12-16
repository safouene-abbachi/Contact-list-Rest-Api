import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input
} from "reactstrap";

class AddContact extends Component {
  click = () => {
    this.props.action();
    this.props.toggle();
  };

  render() {
    return (
      <div>
        {/* <Button className="green" onClick={this.toggle}>
          ADDING CONTACT
        </Button> */}
        <Modal className="modulus" isOpen={this.props.modal}>
          <ModalHeader>
            {this.props.edit ? "Edit contact" : "New contact"}
          </ModalHeader>
          <ModalBody>
            <Label for="contact Name">
              {this.props.edit ? "Edit contact" : "Adding contact"}
            </Label>
            <Input
              type="text"
              name="name"
              value={this.props.contact.name}
              placeholder="name..."
              onChange={this.props.changeHandler}
            />
            <Input
              type="tel"
              name="phone"
              value={this.props.contact.phone}
              placeholder="phone number..."
              onChange={this.props.changeHandler}
            />
            <Input
              type="email"
              name="email"
              value={this.props.contact.email}
              placeholder="valid email..."
              onChange={this.props.changeHandler}
            />
          </ModalBody>
          <ModalFooter className="buttons">
            <Link to="/contacts">
              <Button
                className="submit-btn"
                color="success"
                onClick={() => this.click()}
              >
                Submit
              </Button>{" "}
            </Link>
            <Link to="/contacts">
              <Button
                className="cancel-btn"
                color="danger"
                onClick={() => {
                  this.props.toggle();
                  this.props.add();
                }}
              >
                Cancel
              </Button>
            </Link>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default AddContact;
