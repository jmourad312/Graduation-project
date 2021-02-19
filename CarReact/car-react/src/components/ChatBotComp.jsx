import React from 'react'
import { Link } from 'react-router-dom';
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

export default function ChatBotComp() {

    const theme = {
      background: "#f5f8fb",
      fontFamily: "Helvetica Neue",
      headerBgColor: "#EF6C00",
      headerFontColor: "#fff",
      headerFontSize: "15px",
      botBubbleColor: "#EF6C00",
      botFontColor: "#fff",
      userBubbleColor: "#fff",
      userFontColor: "#4a4a4a",
    };

    const steps = [
      {
        id: "1",
        message: "Hi I am Dreksyony Bot \u{1F64B}",
        trigger: "2",
      },
      {
        id: "2",
        message: "How can we help you?",
        trigger: "3",
      },
      {
        id: "3",
        options: [
          { value: 1, label: "Contact Us", trigger: "4" },
          { value: 2, label: "Other Questions", trigger: "5" },
        ],
      },
      {
        id: "4",
        component: (
          <Link to="/ContactUs">
            <span style={{ color: "blue" }}>Click Here to contact us</span>
          </Link>
        ),
        trigger: "2",
      },
      {
        id: "5",
        options: [
          { value: 1, label: "Contact Us", trigger: "4" },
          { value: 2, label: "Other Questions", trigger: "5" },
        ],
        // trigger: "2",
      },
    ];
    return (
      <>
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            floating={true}
            userAvatar={localStorage.getItem("ProfileImage")}
            // botAvatar={localStorage.getItem("ProfileImage")}
          />
          ;
        </ThemeProvider>
      </>
    );
}
