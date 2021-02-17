import React, { useState } from 'react'
import { Toast } from 'react-bootstrap';

export default function ToastMessage(props) {

    // const [showA, setShowA] = useState(true);
    // const toggleShowA = () => setShowA(!showA);
    return (
      <div
        // aria-live="polite"
        // aria-atomic="true"
        // style={{
        //   position: "absolute",
        //   minHeight: "100px",
        //   top: "200px",
        //   right: "200px",
      >
        <Toast
          style={{
            position: "absolute",
            // bottom: "50%",
            // left: "0%",
            zIndex:"100"
          }}
          show={props.status}
          onClose={props.showFunction}
        >
          <Toast.Header>
            <strong className="mr-auto">DREKSYONY</strong>
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </div>
    );
}
