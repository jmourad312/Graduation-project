import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import Facts from '../assets/js/carFacts';

export default function ChatBotComp() {

  // const [fact, setFact] = useState([Facts]);
  
  // const [userInfo, setUserInfo] = useState({
  //   userKM:0,
  //   userOilType:0,
  // })
  
  useEffect(() => {
    // console.log(Fact);

    // var fact = Facts[Math.floor(Math.random() * Facts.length)];
    // const { fullUserAnswer,fullAnswerOptions } = steps;
    // setUserInfo({ fullUserAnswer, fullAnswerOptions });
    // console.log(steps.fullAnswerOptions);
    // console.log(steps[7].options.value);
    // console.log(userInfo);
    // console.log(fact);
  });


  // const [userKMM, setuserKMM] = useState(5);
  // const [userOIL, setuserOIL] = useState(5);

    Review.propTypes = {
      steps: PropTypes.object,
    };

    Review.defaultProps = {
      steps: undefined,
    };

    const theme = {
      background: "#f5f8fb",
      fontFamily: "Helvetica Neue",
      headerBgColor: "linear-gradient(-45deg, #334d50, #cbcaa5)",
      headerFontColor: "black",
      headerFontSize: "25px",
      botBubbleColor: "linear-gradient(-45deg, #334d50, #cbcaa5)",
      botFontColor: "black",
      userBubbleColor: "#fff",
      userFontColor: "black",
    };
    const {t, i18n} = useTranslation();
    const steps = [
      {
        id: "1",
        message: "Hi \u{1F64B}, \n  I am Dreksyony Bot. \n  أهلا ،أنا المساعد الآلي لدركسيوني",
        trigger: "2",
      },
      {
        id: "2",
        message: "How can I help you? \n كيف يمكنني مساعدتك؟",
        trigger: "3",
      },
      {
        id: "3",
        options: [
          { value: 1, label: "Contact Us \n  تواصل معنا", trigger: "4" },
          { value: 2, label: "Did you know ? \n  هل كنت تعلم؟", trigger: "fact" },
          { value: 3, label: "Full Maintenance \n  فحص كامل", trigger: "full" },
        ],
      },
      {
        id: "fact",
        component: <Trivia />,
        trigger: "2",
      },
      {
        id: "4",
        component: (
          <Link to="/ContactUs">
            <span style={{ color: "blue" }}>
              {t("ChatBot.ClickHereToContactUs")}
            </span>
          </Link>
        ),
        trigger: "2",
      },
      // {
      //   id: "5",
      //   options: [
      //     { value: 1, label: "Oil", trigger: "Oil" },
      //     { value: 2, label: "Spark Plugs", trigger: "Spark" },
      //     { value: 3, label: "Belts", trigger: "Belts" },
      //     { value: 4, label: "Oil Filter", trigger: "OilFilter" },
      //     { value: 5, label: "Air Filter", trigger: "AirFilter" },
      //     { value: 6, label: "Fuel Filter", trigger: "FuelFilter" },
      //     { value: 7, label: "Brake Pad", trigger: "Brake" },
      //     { value: 8, label: "Tires", trigger: "Tires" },
      //   ],
      // },
      // {
      //   id: "Oil",
      //   message: "How can we help you ?",
      //   trigger: "3",
      // },

      {
        id: "full",
        message:
          "How many kilometres were on the odometer during your last maintenance ? \n  كم كيلومتراً في عداد المسافات أثناء فحصك الآخير ؟",
        trigger: "fullUserAnswer",
      },
      {
        id: "fullUserAnswer",
        user: true,
        validator: (value) => {
          if (isNaN(value)) {
            value = "";
            return "value should be a number \n  برجاء إدخال قيمة رقمية";
          }
          if (value > 999999) {
            return "Please enter correct value \n  برجاء إدخال رقم صحيح";
          }
          if (value < 0) {
            return "Please enter correct value \n برجاء إدخال رقم صحيح";
          }
          if (value == 0) {
            return "congrats on the new car \n  مبارك لك للسيارة الجديدة";
          }
          return true;
        },
        trigger: "fullAnswerOptions",
      },
      {
        id: "fullAnswerOptions",
        message: "What type of Oil do you purchase ? \n ما نوع الزيت المستخدم ؟",
        trigger: "fullAnswerOptionsChoices",
      },
      {
        id: "fullAnswerOptionsChoices",
        options: [
          { value: 3, label: "3", trigger: "Check" },
          { value: 5, label: "5", trigger: "Check" },
          { value: 7, label: "7", trigger: "Check" },
          { value: 10, label: "10", trigger: "Check" },
          { value: 15, label: "15", trigger: "Check" },
        ],
      },
      {
        id: "Check",
        message: "Calculating your maintenance... \n  جاري حساب فحصك...",
        trigger: "Final",
      },
      {
        id: "Final",
        component: <Review />,
        trigger: "3",
      },
    ];
    // const { name, gender, age } = steps;

    
    return (
      <>
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            floating={true}
            headerTitle={t("ChatBot.DreksyonyChatBot")}
            bubbleStyle={{ fontSize: "20px" }}
            bubbleOptionStyle={{ fontSize: "20px",padding:"15px",margin:"6px" }}
            // userAvatar={localStorage.getItem("Authorization") ? localStorage.getItem("ProfileImage"):undefined}
            // botAvatar={"../assets/Images/icon.png"}
          />
          ;
        </ThemeProvider>
      </>
    );
}

function Trivia() {
  let fact;
  const [Fact, setFact] = useState({
    factTitle: "",
    factContent: "",
  });

  const getFact = () => {
    fact = Facts[Math.floor(Math.random() * Facts.length)];
    setFact({ factTitle: fact.title, factContent: fact.content });
    // console.log(Fact);
  };
  // getFact();
  useEffect(() => {
    getFact()
  }, [])
  return(
    <div>
      <h3>{Fact.factTitle}</h3>
      <h5>{Fact.factContent}</h5>
    </div>
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
      <table style={{fontSize:"18px",fontWeight:"600"}}>
        <tbody>
          {/* <tr>
            <td>{t("ChatBot.YourMeters")}</td>
            <td>{ t("ChatBot.km") + parseInt(fullUserAnswer.value)}</td>
          </tr> */}
          {/* <br /> */}
          <tr>
            <td>{t("ChatBot.ChangeOil")}</td>
            <td className="pl-3">{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + (parseInt(fullAnswerOptionsChoices.value)*1000) +" "+ t("ChatBot.km")}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeOilFilter")}</td>
            <td className="pl-3">{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + 10000 +" "+ t("ChatBot.km")}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeAirFilter")}</td>
            <td className="pl-3">{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + 20000 +" "+ t("ChatBot.km")}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeFuelFilter")}</td>
            <td className="pl-3">{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + 20000 +" "+ t("ChatBot.km")}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeSparkPlugs")}</td>
            <td className="pl-3">{t("ChatBot.at")}{parseInt(fullUserAnswer.value) + 20000 +" "+ t("ChatBot.km")}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.ChangeTires")}</td>
            <td className="pl-3">{t("ChatBot.at")} {parseInt(fullUserAnswer.value) + 50000 +" "+ t("ChatBot.km")}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.CheckBrakePads")}</td>
            <td className="pl-3">{t("ChatBot.at")} {parseInt(fullUserAnswer.value) + 20000 +" "+ t("ChatBot.km")}</td>
          </tr>
          <br />
          <tr>
            <td>{t("ChatBot.CheckBelts")}</td>
            <td className="pl-3">{t("ChatBot.From")} {(parseInt(fullUserAnswer.value) + 60000) +" "+ t("ChatBot.km")} <br/> {t("ChatBot.To") + (parseInt(fullUserAnswer.value) + 100000) +" "+ t("ChatBot.km")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
