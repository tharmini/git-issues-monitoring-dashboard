import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";
//import { LineChart } from 'react-chartkick';
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
  height:'100%'
};

class IssuesForlabelsChart extends Component {
  // initially data is empty in state
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      chartSummary: []
    };
  }

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
      .then(res => res.data)
      .then(data => {
        this.setState({ IssueData: data, isLoaded: true });
        console.log(this.state.IssueData);
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
      <div className="App" >
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <PageWrapper>
          <div>
            <h1>Created VS Closed Issue Chart</h1>
          </div>
          <div style={DivBoarder}  >

            <MaterialTable

              title="Total number of Issues By team"
              columns={[
                { title: "Teams", field: "name",cellStyle: {
                    backgroundColor: '#E1E7EF',
                    color: 'black'
                  },
                  headerStyle: {
                    backgroundColor: '#05376F',
                  } },
                { title: "Num Of Issues", field: "totalIssueCount" ,cellStyle: {
                    backgroundColor: '#E1E7EF',
                    color: 'black'
                  },
                  headerStyle: {
                    backgroundColor: '#05376F',
                  }}
              ]}
              data={this.state.IssueData}

              options={{
                responsive:true,
                exportButton: false,
                grouping: false,
                sorting: true,
                search: true,
                 headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                  }
              }}
            />
          </div>
        </PageWrapper>
      </div>
    );
  }
}
export default IssuesForlabelsChart;