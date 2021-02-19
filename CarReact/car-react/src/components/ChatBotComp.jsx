import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";


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


function Review(props) {
  const [userCarInfo, setUserCarInfo] = useState({
    fullAnswerOptionsChoices: 0,
    fullUserAnswer: 0,
  });
  useEffect(() => {
    const { steps } = props;
    const { fullAnswerOptionsChoices, fullUserAnswer } = steps;
    setUserCarInfo({ fullAnswerOptionsChoices, fullUserAnswer });
    // this.setState({ name, gender, age });
    // console.log(props);
    // console.log(steps);
    // console.log(fullAnswerOptionsChoices);
    // console.log(fullAnswerOptionsChoices.value);
    // console.log(fullUserAnswer);
    // console.log(fullUserAnswer.value);
    // console.log(userCarInfo);
  }, [])
  const { fullAnswerOptionsChoices, fullUserAnswer } = userCarInfo;
  const {t, i18n} = useTranslation();

  return (
    <div style={{ width: "100%" }}>
      <h3>{t("ChatBot.Summary")}</h3>
      <table>
        <tbody>
          <tr>
            <td>{t("ChatBot.YourMeters")}</td>
            <td>{parseInt(fullUserAnswer.value) + "m"}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeOil")}</td>
            <td>{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + (parseInt(fullAnswerOptionsChoices.value) * 1000) + "m"}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeOilFilter")}</td>
            <td>{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + 10000 + "m"}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeAirFilter")}</td>
            <td>{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + 20000 + "m"}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeFuelFilter")}</td>
            <td>{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + 20000 + "m"}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeSparkPlugs")}</td>
            <td>{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + 20000 + "m"}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeTires")}</td>
            <td>{t("ChatBot.at")} {parseInt(fullUserAnswer.value) + 50000 + "m"}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.CheckBrakePads")}</td>
            <td>{t("ChatBot.at")} {parseInt(fullUserAnswer.value) + 20000 + "m"}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.CheckBelts")}</td>
            <td>{t("ChatBot.From")} {(parseInt(fullUserAnswer.value) + 60000) + "m" + " \nTo " + (parseInt(fullUserAnswer.value) + 100000) + "m"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

