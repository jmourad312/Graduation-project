import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";


export default function ChatBotComp() {
  
  const [userInfo, setUserInfo] = useState({
    userKM:0,
    userOilType:0,
  })

  useEffect(() => {
    // const { fullUserAnswer,fullAnswerOptions } = steps;
    // setUserInfo({ fullUserAnswer, fullAnswerOptions });
    // console.log(steps.fullAnswerOptions);
    // console.log(steps[7].options.value);
    console.log(userInfo);
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
          { value: 2, label: "Specific Maintenance", trigger: "5" },
          { value: 3, label: "Full Maintenance", trigger: "full" },
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
          { value: 1, label: "Oil", trigger: "4" },
          { value: 2, label: "Spark Plugs", trigger: "5" },
          { value: 2, label: "Belts", trigger: "5" },
          { value: 2, label: "Oil Filter", trigger: "5" },
          { value: 2, label: "Air Filter", trigger: "5" },
          { value: 2, label: "Fuel Filter", trigger: "5" },
          { value: 2, label: "Brake Pad", trigger: "5" },
          { value: 2, label: "Tires", trigger: "5" },
        ],
        // trigger: "2",
      },
      {
        id: "full",
        message: "How many kilometres are on the odometer?",
        trigger: "fullUserAnswer",
      },
      {
        id: "fullUserAnswer",
        user: true,
        validator: (value) => {
          if (isNaN(value)) {
            value = "";
            return "value should be a number";
          }
          else{
            // setuserKMM(value);
            // console.log(userKMM);
            localStorage.setItem("UserKiloMeters",value)
            setUserInfo((previous) => {
            console.log(userInfo);
  
              return {
                ...previous,
                userKM: value,
              };
            });
            console.log(userInfo);
          }
          return true;
        },
        trigger: "fullAnswerOptions",
      },
      {
        id: "fullAnswerOptions",
        message: "What type of Oil do you purchase ?",
        trigger: "fullAnswerOptionsChoices",
      },
      {
        id: "fullAnswerOptionsChoices",
        options: [
          { value: 3, label: "3 Km", trigger: "Check" },
          { value: 5, label: "5 Km", trigger: "Check" },
          { value: 7, label: "7 Km", trigger: "Check" },
          { value: 10, label: "10 Km", trigger: "Check" },
          { value: 15, label: "15 Km", trigger: "Check" },
        ],
      },
      {
        id: "Check",
        // message: `hhweaj {previousValue}`,
        message: ({ previousValue, steps }) => {
          setUserInfo((previous) => {
            console.log(userInfo);
            return {
              ...previous,
              userOilType: previousValue,
            };
          });
          // setuserOIL(previousValue);
          // console.log(userOIL);
          // console.log(userInfo);
          return "Calculating your maintenance...";
        },
        trigger: "Final",
      },
      {
        id: "Final",
        component: (<Review />),
        end: true,
      },
    ];
    // const { name, gender, age } = steps;

    
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
    kilo:0,
    oilType:0
  })
  useEffect(() => {
    const { steps } = props;
    const { fullAnswerOptionsChoices, fullUserAnswer } = steps;
    setUserCarInfo({ fullAnswerOptionsChoices, fullUserAnswer });
    // this.setState({ name, gender, age });
  }, [])
  const { fullAnswerOptionsChoices, fullUserAnswer } = userCarInfo;
  return (
    <div style={{ width: "100%" }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Your Km</td>
            <td>{userCarInfo.kilo}</td>
          </tr>
          <tr>
            <td>Change Oil at</td>
            <td>{userCarInfo.oilType}</td>
          </tr>
          {/* <tr>
            <td>Change Oil Filter at</td>
            <td>{+10000}</td>
          </tr>
          <tr>
            <td>Change Air Filter at</td>
            <td>{+20000}</td>
          </tr>
          <tr>
            <td>Change Fuel Filter at</td>
            <td>{+20000}</td>
          </tr>
          <tr>
            <td>Change Spark Plugs at</td>
            <td>{+20000}</td>
          </tr>
          <tr>
            <td>Change Tires at</td>
            <td>{+50000}</td>
          </tr>
          <tr>
            <td>Check Brake Pads at</td>
            <td>{+20000}</td>
          </tr>
          <tr>
            <td>Check Belts from</td>
            <td>{+60000 + " To " + +100000}</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
