/*
 *  Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the 'License'); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */
import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import "chart.js";
import Paper from "@material-ui/core/es/Paper/Paper";
import { withStyles } from "@material-ui/core/styles";

const PageWrapper = withStyles({
  root: {
    margin: "20px",
    fontSize: "14px",
    padding: "10px",
    //background: "transparent",
    boxShadow: "none",
    textAlign: "center",
    color: "#3f51b5"
  }
})(Paper);

const DivBoarder = {
  border: "2px solid #aaa",
  overflowX: "auto",
  borderColor: "#3f51b5",
  width:"100%",
  height:"100%"
};

//var randomColor = require('randomcolor'); // import the script
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      timeStamp: "",
      isLoaded: false
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
    chartName: "Git Issue"
  };

  componentDidMount() {
    const getProductNamesURL =
      "http://" +
      process.env.REACT_APP_HOST +
      ":" +
      process.env.REACT_APP_PORT +
      "/gitIssues/issueCount";
    axios
      .create({
        withCredentials: false
      })
      .get(getProductNamesURL)
      .then(res => {
        var response = res.data;
        console.log("response", response);
        var ProductName = response.map(function(e) {
          return e.name;
        });
        var L1IssueCount = response.map(function(e) {
          return e.L1IssueCount;
        });
        var L2IssueCount = response.map(function(e) {
          return e.L2IssueCount;
        });
        var L3IssueCount = response.map(function(e) {
          return e.L3IssueCount;
        });

        this.setState({

          isLoaded: true,
          chartData: {
            labels: ProductName,
            datasets: [
              {
                label: "Severity/Blocker",
                data: L1IssueCount,
                backgroundColor: "#8d0f06"
              },
              {
                label: "Severity/Critical",
                data: L2IssueCount,
                backgroundColor: "#d45810"
              },
              {
                label: "Severity/Major",
                data: L3IssueCount,
                backgroundColor: "#d4c70e"
              }
            ]
          }
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return <p>Loading...</p>;
    }
    return (
      <div className="App">

          <div>
            <h1 backgroundColor='white'>Created VS Closed Issue Chart</h1>
          </div>
          <PageWrapper>
          <div style={DivBoarder}>
            <div className="chart">
              <Bar
                data={this.state.chartData}
                stacked={true}
                width={"100%"}
                height={"50%"}
                responsive={true}
                maintainAspectRatio={false}

                options={{
                  hover: {
                    animationDuration: 0
                  },
                  responsive: true,
                  animation: {
                    duration: 1,
                    onComplete: function() {
                      var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                      ctx.textAlign = "center";
                      ctx.textBaseline = "bottom";
                      this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                          var data = dataset.data[index];
                          if (data !== 0) {
                            ctx.fillText(data, bar._model.x, bar._model.y - 0);
                          }
                        });
                      });
                    }
                  },
                  title: {
                    width: 120
                  },
                  dataset: {
                    xAxisId: "bjbhjbhbghjv"
                  },

                  scales: {
                    xAxes: [
                      {
                        display: true,
                        ticks: {
                          fontColor: "#05376F",
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                            beginAtZero: true,


                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Teams',
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            fontColor: "#05376F ",
                            fontSize:"20"


                          },
                        // barPercentage: 1,
                        minBarLength: 0,
                        gridLines: {
                          //display: true,
                          drawBorder: true,
                          offsetGridLines: true,
                          color: " #d5dee2",
                          drawTicks: true,
                          drawOnChartArea: true,
                          circular: true
                        }
                      }
                    ],
                    yAxes: [
                      {
                        display: true,
                        ticks: {
                          fontColor: "black",
                          beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of Issues',
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            fontColor: "#05376F ",
                            fontSize:"20"
                          },
                        // barPercentage: 1.5,
                        maxBarThickness: 43,
                        minBarLength: 0,
                        fontColor: "red",
                        gridLines: {
                          //display: true,
                          drawBorder: true,
                          offsetGridLines: true,
                          color: " #d5dee2",
                          drawTicks: true,
                          drawOnChartArea: true,
                          circular: true
                        }
                      }
                    ]
                  },
                  legend: {
                    labels: {
                      fontColor: "#3f51b5"
                    },
                    display: "true",
                    position: "top"
                  }
                }}
              />
            </div>
          </div>
        </PageWrapper>
      </div>
    );
  }
}

export default Chart;
