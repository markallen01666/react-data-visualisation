/* Using React and a GraphQL query to display survey data
   M Allen - 2020
*/

import React, { useState, useEffect } from "react";
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

// framework/tool list
const toolList = ["react", "angular", "vuejs", "jest", "reactnative"];

function App() {
  const [data, setData] = useState([]);

  // build and run query on component mount
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.stateofjs.com/graphql";
      let interimArray = [
        {
          name: "best",
          awareness: 84,
          interest: 50.7,
          satisfaction: 45
        },
        {
          name: "test",
          awareness: 75,
          interest: 40.8,
          satisfaction: 39.3
        }
      ];
      for (let i = 0; i < toolList.length; i++) {
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
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query })
        };
        // execute query
        fetch(url, opts)
          .then(res => res.json())
          .then(resJSON => {
            // extract required data
            interimArray.push({
              name: resJSON.data.survey.tool.id,
              awareness: parseFloat(
                resJSON.data.survey.tool.experience.allYears["3"]
                  .awarenessInterestSatisfaction.awareness
              ),
              interest: parseFloat(
                resJSON.data.survey.tool.experience.allYears["3"]
                  .awarenessInterestSatisfaction.interest
              ),
              satisfaction: parseFloat(
                resJSON.data.survey.tool.experience.allYears["3"]
                  .awarenessInterestSatisfaction.satisfaction
              )
            });
          })
          .catch(console.error);
      } // -- end of read and process survey results --
      return interimArray;
    };
    fetchData().then(res => {
      setData([...res]);     
    });
  }, []);

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

const mainChartStyle = {
  paddingTop: 50,
  paddingBottom: 50,
  margin: "0 auto"
};

let textBlockStyle = {
  fontSize: 12
};

export default App;
