/* Using React and a GraphQL query to display survey data
   M Allen - 2020
*/

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Sector,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import Header from "./components/Header";
import TextBlock from "./components/TextBlock";
import "./App.css";

function App() {
  const [data, setData] = useState([
    {
      name: "Angular",
      awareness: 99.8,
      interest: 23.1,
      satisfaction: 38
    },
    {
      name: "Cordova",
      awareness: 81.4,
      interest: 20.6,
      satisfaction: 28
    },
    {
      name: "Ember",
      awareness: 90.9,
      interest: 18.1,
      satisfaction: 30.5
    },
    {
      name: "Expo",
      awareness: 38.6,
      interest: 43.9,
      satisfaction: 73.8
    },
    {
      name: "Express",
      awareness: 95.6,
      interest: 66,
      satisfaction: 92.6
    },
    {
      name: "Jest",
      awareness: 91.5,
      interest: 81.6,
      satisfaction: 96.4
    },
    {
      name: "React",
      awareness: 100,
      interest: 60.8,
      satisfaction: 89.3
    },
    {
      name: "Redux",
      awareness: 97.4,
      interest: 61.8,
      satisfaction: 70.7
    },
    {
      name: "Typescript",
      awareness: 99.7,
      interest: 65.6,
      satisfaction: 88.9
    },
    {
      name: "Vue JS",
      awareness: 99.6,
      interest: 64.3,
      satisfaction: 87.1
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
            stroke="#f6b93b"
            fill="#f6b93b"
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke="#e55039"
            fill="#e55039"
          />
          <Area
            type="monotone"
            dataKey="satisfaction"
            stackId="1"
            stroke="#1e3799"
            fill="#1e3799"
          />
        </AreaChart>
        <p>Fig.1 - Overall results</p>
      </div>
      <div style={{ ...mainChartStyle }}>
        <BarChart
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "%", angle: -90, position: "insideLeft" }} />
          <Bar dataKey="satisfaction" fill="#b71540" />
          <Tooltip />
        </BarChart>
        <p>Fig.2 - Satisfaction %</p>
      </div>
      <div style={{ ...mainChartStyle }}>
        <PieChart width={450} height={450}>
          <Pie
            data={data}
            dataKey="awareness"
            cx={225}
            cy={225}
            outerRadius={200}
            fill="#e58e26"
          />
          <Tooltip />
        </PieChart>
        <p>Fig. 3 - Awareness %</p>
      </div>
      <div style={{ ...mainChartStyle }}>
        <RadarChart
          cx={300}
          cy={300}
          outerRadius={200}
          width={600}
          height={600}
          data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="Awareness"
            dataKey="awareness"
            stroke="#1e3799"
            fill="#1e3799"
            fillOpacity={0.5}
          />
          <Radar
            name="Interest"
            dataKey="interest"
            stroke="#f6b93b"
            fill="#f6b93b"
            fillOpacity={0.9}
          />
          <Radar
            name="Satisfaction"
            dataKey="satisfaction"
            stroke="#eb2f06"
            fill="#eb2f06"
            fillOpacity={0.5}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
        <p>Fig. 4 - Awareness %</p>
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
  margin: "auto"
};

let textBlockStyle = {
  fontSize: 12
};

export default App;
