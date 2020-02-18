/* Using React and a GraphQL query to display survey data
   M Allen - 2020
*/

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Text,
  Tooltip,
  Legend
} from "recharts";

import Header from "./components/Header";
import TextBlock from "./components/TextBlock";
import "./App.css";

function App() {
  const [data, setData] = useState([
    {
      name: "React",
      awareness: 100,
      interest: 60.8,
      satisfaction: 89.3
    },
    {
      name: "Angular",
      awareness: 99.8,
      interest: 23.1,
      satisfaction: 38
    },
    {
      name: "Vue JS",
      awareness: 99.6,
      interest: 64.3,
      satisfaction: 87.1
    },
    {
      name: "Jest",
      awareness: 91.5,
      interest: 81.6,
      satisfaction: 96.4
    },
    {
      name: "React Native",
      awareness: 98.5,
      interest: 67.8,
      satisfaction: 82.1
    }
  ]);

  return (
    <div className="App" style={{ ...appStyle }}>
      <Header title="The State of Javascript 2019" />
      <div style={{ ...mainChartStyle }}>
        <AreaChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 30,
            bottom: 10
          }}
        >
          <Legend verticalAlign="top" height={36} />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "%", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="awareness"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="satisfaction"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
        <Text>Fig.1 - Overall results</Text>
      </div>
      <TextBlock style={{ ...textBlockStyle }}>
        This app uses data taken from The State of Javascript survey which
        collected responses from over 22,000 developers in 2019. Participants
        were asked a series of questions about different aspects of JavaScript,
        including front and back-end frameworks, ES6, mobile development, and
        testing. The final results are summarised in a report and changes from
        previous surveys analysed and visualised using a variety of tools.{" "}
        <span>
          Full results are available at the{" "}
          <a href={"https://2019.stateofjs.com/"}>
            2019 State of Java website.
          </a>
        </span>
      </TextBlock>
      <TextBlock style={{ ...textBlockStyle }}>
        The State of JavaScript Survey is created and maintained by Sacha Greif
        (Design, writing, coding) and Raphaël Benitte (Data analysis, data
        visualizations). Through their website stateofjs.com the raw data is
        made available through a GraphQL API. This app uses GraphQL queries to
        access and display the 2019 results for a selection of JavaScript tools
        and frameworks.
      </TextBlock>
    </div>
  );
}

const appStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  maxWidth: "100%"
};

const mainChartStyle = {
  paddingTop: 50,
  paddingBottom: 50,
  margin: "0 auto"
};

let textBlockStyle = {
  fontSize: 12
};

export default App;
