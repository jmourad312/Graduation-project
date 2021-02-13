import React from 'react'
import {Button,Modal} from 'react-bootstrap';
export default function VerticalModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            <p style={{ direction: "rtl", textAlign: "right" }}>
              {props.heading}
            </p>
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {/* <h4 style={{ direction: "rtl", textAlign: "right" }}>
            {props.title}
          </h4> */}
          <div style={{ direction: "rtl", textAlign: "right" }}>
            {props.content}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
}
