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
  Tooltip,
  Legend
} from "recharts";

import Header from "./components/Header";
import TextBlock from "./components/TextBlock";
import "./App.css";

// read and process survey results
let toolList = ["react", "angular", "vuejs", "jest", "reactnative"];
// chart data
let data = [
  { name: "React", awareness: 100, interest: 60.8, satisfaction: 89.3 },
  { name: "Vue", awareness: 99.6, interest: 64.3, satisfaction: 87.1 },
  { name: "Angular", awareness: 99.8, interest: 23.1, satisfaction: 38 },
  { name: "Jest", awareness: 91.5, interest: 81.6, satisfaction: 96.4 },
  { name: "React Native", awareness: 98.5, interest: 67.8, satisfaction: 82.1 }
];
// areaChart
let areaChart;

for (let i = 0; i < toolList.length; i++) {
  // build query
  let query = `
  query {
    survey(survey: js) {
      tool(id: ${toolList[i]}) {
        id
        experience {
          allYears{
            year
            total
            awarenessInterestSatisfaction {
              awareness
              interest
              satisfaction
            }
          }
        }
      }
    }
  }`;

  // execute query
  const url = "https://api.stateofjs.com/graphql";
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  };
  fetch(url, opts)
    .then(res => res.json())
    .then(resJSON => {
      // extract required data
      data.push({
        name: resJSON.data.survey.tool.id,
        awareness:
          resJSON.data.survey.tool.experience.allYears["3"]
            .awarenessInterestSatisfaction.awareness,
        interest:
          resJSON.data.survey.tool.experience.allYears["3"]
            .awarenessInterestSatisfaction.interest,
        satisfaction:
          resJSON.data.survey.tool.experience.allYears["3"]
            .awarenessInterestSatisfaction.satisfaction
      });
    })
    .catch(console.error);
} // -- end of read and process survey results --

console.log(data);

function App() {
  // responsive sizing
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    if (width < 400) {
      textBlockStyle["fontSize"] = 8;
    } else if (width < 600) {
      textBlockStyle["fontSize"] = 10;
    } else {
      textBlockStyle["fontSize"] = 16;
    }
  };

  return (
    <div className="App" style={{ ...appStyle }}>
      <Header title="The State of Javascript 2019" />
      <div style={{ ...mainChartStyle }}>
        {" "}
        <AreaChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 30,
            bottom: 100
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Legend verticalAlign="top" height={36}/>
          <XAxis label={{ value: 'Results: Aware of / Interested in using / Satisfaction with using %', position: 'bottom'}} dataKey="name" />
          <YAxis label={{ value: '%', angle: -90, position: 'insideLeft'}} />
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
      </div>
      <TextBlock style={{ ...textBlockStyle }}>
        The State of Javascript survey collected responses from over 22,000
        developers in 2019. Participants were asked a series of questions about
        different aspects of JavaScript, including front and back-end
        frameworks, ES6, mobile development, and testing. The final results are
        summarised in a report and changes from previous surveys analysed and
        visualised using a variety of tools.{" "}
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

const linkStyle = {
  color: "#555",
  padding: 20
};

const mainChartStyle = {
  margin: "0 auto"
};

let textBlockStyle = {
  fontSize: 12
};

export default App;
