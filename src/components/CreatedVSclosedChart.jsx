import React, { Component } from 'react';
import { LineChart } from 'react-chartkick';
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

export let getChartData = chartSummary => {
    let IssueCountDetails = [];
    for (let i = 0; i < chartSummary.length; i++) {
        let IssueCount = {};
        IssueCount.name = chartSummary[i].name;
        IssueCount.data = {};

        let summaryData = chartSummary[i].data;

        for (let key in summaryData) {
            if (summaryData.hasOwnProperty(key)) {
                let sumDate = summaryData[key].date;
                IssueCount.data[sumDate] = summaryData[key].count;
            }
        }
        IssueCountDetails.push(IssueCount);
    }
    return IssueCountDetails;
};

class CreatedVSclosedChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            chartSummary: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:7777/issues/count')
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        chartSummary: result
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
        var chartData = getChartData(this.state.chartSummary);
        return (
            <div className="App">
                <PageWrapper>
                    <div>
                        <h1>Created VS Closed Issue Chart</h1>
                    </div>
                    <div style={DivBoarder}>
                        <LineChart
                            data={chartData}
                            colors={['#B80000', '#2E7442']}
                            curve={false}
                            width={'650px'}
                            height={'250px'}
                            messages={{ empty: 'No data' }}
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
                                            ticks: { fontColor: '#3f51b5' }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                </PageWrapper>
            </div>
        );
    }
}

export default CreatedVSclosedChart;