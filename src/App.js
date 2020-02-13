/* Using React and a GraphQL query to display survey data
   M Allen - 2020
*/

import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import Card from "./components/Card";
import Header from "./components/Header";
import TextBlock from "./components/TextBlock";
import "./App.css";

// read and process survey results
let toolList = ["react", "angular", "vuejs", "jest", "reactnative"];
let surveyResults = {
  none: {
    total: 0,
    awareness: 0,
    interest: 0,
    satisfaction: 0
  }
};

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
      // extract required data into surveyResults
      surveyResults[resJSON.data.survey.tool.id] = {
        total: resJSON.data.survey.tool.experience.allYears["3"].total,
        awareness:
          resJSON.data.survey.tool.experience.allYears["3"]
            .awarenessInterestSatisfaction.awareness,
        interest:
          resJSON.data.survey.tool.experience.allYears["3"]
            .awarenessInterestSatisfaction.interest,
        satisfaction:
          resJSON.data.survey.tool.experience.allYears["3"]
            .awarenessInterestSatisfaction.satisfaction
      };
    })
    .catch(console.error);
} // -- end of read and process survey results --

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

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  // values displayed in cards
  const [displayData, setdisplayData] = useState({
    card1: {
      tool: "none",
      awareness: 0,
      interest: 0,
      satisfaction: 0,
      total: 0
    },
    card2: {
      tool: "none",
      awareness: 0,
      interest: 0,
      satisfaction: 0,
      total: 0
    },
    card3: {
      tool: "none",
      awareness: 0,
      interest: 0,
      satisfaction: 0,
      total: 0
    }
  });

  // change displayed values based on Picker choice
  const changeDisplayHandler = newTool => {
    for (let key in newTool) {
      setdisplayData({
        ...displayData,
        [key]: {
          tool: newTool[key],
          awareness: surveyResults[newTool[key]].awareness,
          interest: surveyResults[newTool[key]].interest,
          satisfaction: surveyResults[newTool[key]].satisfaction,
          total: surveyResults[newTool[key]].total
        }
      });
    }
  };

  // Chart setup
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const chartWidth = 460 - margin.left - margin.right;
  const chartHeight = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", chartHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // get the data
  d3.csv(
    "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv",
    function(data) {
      // X axis: scale and draw:
      var x = d3
        .scaleLinear()
        .domain([0, 1000]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, chartWidth]);
      svg
        .append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(x));

      // set the parameters for the histogram
      var histogram = d3
        .histogram()
        .value(function(d) {
          return d.price;
        }) // I need to give the vector of value
        .domain(x.domain()) // then the domain of the graphic
        .thresholds(x.ticks(70)); // then the numbers of bins

      // And apply this function to data to get the bins
      var bins = histogram(data);

      // Y axis: scale and draw:
      var y = d3.scaleLinear().range([chartHeight, 0]);
      y.domain([
        0,
        d3.max(bins, function(d) {
          return d.length;
        })
      ]); // d3.hist has to be called before the Y axis obviously
      svg.append("g").call(d3.axisLeft(y));

      // append the bar rectangles to the svg element
      svg
        .selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) {
          return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function(d) {
          return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function(d) {
          return chartHeight - y(d.length);
        })
        .style("fill", "#69b3a2");
    }
  );

  return (
    <div className="App" style={{ ...appStyle }}>
      <Header title="GraphQL test" />
      <div id="my_dataviz"></div>
      <TextBlock style={{ ...textBlockStyle }}>
        The State of Javascript survey collected responses from over 22,000
        developers in 2019. Participants were asked a series of questions about
        different aspects of JavaScript, including front and back-end
        frameworks, ES6, mobile development, and testing. The final results are
        summarised in a report and changes from previous surveys analysed and
        visualised using a variety of tools.
      </TextBlock>
      <div style={{ ...linkStyle, ...textBlockStyle }}>
        Full results are available at the{" "}
        <a href={"https://2019.stateofjs.com/"}>2019 State of Java website.</a>
      </div>
      <Card
        id="card1"
        style={{ maxWidth: "100%" }}
        results={displayData}
        changeHandler={changeDisplayHandler}
        width={width}
      />
      <Card
        id="card2"
        results={displayData}
        changeHandler={changeDisplayHandler}
        width={width}
      />
      <Card
        id="card3"
        results={displayData}
        changeHandler={changeDisplayHandler}
        width={width}
      />
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
  padding: 5
};

let textBlockStyle = {
  fontSize: 16
};

export default App;
