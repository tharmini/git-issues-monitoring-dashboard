import React, { Component } from 'react';
import { ColumnChart } from 'react-chartkick';
import 'chart.js';
import Paper from '@material-ui/core/es/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';

const PageWrapper = withStyles({
  root: {
    margin: '20px',
    fontSize: '14px',
    padding: '10px',
    background: 'transparent',
    boxShadow: 'none',
    textAlign: 'center',
    color: '#3f51b5'
  }
})(Paper);

const DivBoarder = {
  border: '2px solid #aaa',
  overflowX: 'auto',
  borderColor: '#3f51b5'
};

class IssuesAgingGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      ChartData: [],
      value: 0
    };
  }
  componentDidMount() {
    fetch('http://localhost:7777/issues/agingDetails')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            ChartData: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    if (!this.state.isLoaded) {
      return <p>Loading...</p>;
    }
    return (
      <PageWrapper>
        <div>
          <div>
            <h1>Issues Aging Graph</h1>
          </div>
          <div style={DivBoarder}>
            <ColumnChart
              data={this.state.ChartData}
              stacked={true}
              width={'650px'}
              height={'250px'}
              xtitle="Time Period"
              ytitle="No of issues"
              messages={{ empty: 'Data is not available' }}
              colors={[
                'maroon',
                'orange',
                'yellow',
                'blue',
                'maroon',
                'purple'
              ]}
              library={{
                legend: {
                  labels: {
                    fontColor: '#3f51b5'
                  }
                },
                scales: {
                  yAxes: [
                    {
                      ticks: { fontColor: '#3f51b5' },
                      scaleLabel: { fontColor: '#3f51b5' }
                    }
                  ],
                  xAxes: [
                    {
                      ticks: { fontColor: '#3f51b5' },
                      scaleLabel: { fontColor: '#3f51b5' }
                    }
                  ]
                }
              }}
            />
          </div>
        </div>
      </PageWrapper>
    );
  }
}

export default IssuesAgingGraph;
