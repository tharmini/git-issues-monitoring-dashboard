import React, { Component } from 'react';
import './App.css';
import IssuesPerTeamTable from './components/IssuesPerTeamTable';
import IssuesForlabelsChart from './components/IssuesForlabelsChart';
import CreatedVsClosedGraph from './components/CreatedVSclosedChart';
import IssuesAgingGraph from './components/IssuesAgingGraph';
import Paper from '@material-ui/core/es/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';

const PageWrapper = withStyles({
  root: {
    margin: '20px',
    padding: '10px',
    background: 'transparent',
    boxShadow: 'none',
    textAlign: 'center',
    color: '#3f51b5'
  }
})(Paper);

class App extends Component {
  render() {
    return (
      <PageWrapper>
        <h1> Git Issues Monitoring Dashboard</h1>
        <React.Fragment>
          <div className='rowC'>
            <IssuesPerTeamTable />
            <IssuesForlabelsChart />
          </div>
          <div className='rowC'>
            <CreatedVsClosedGraph />
            <IssuesAgingGraph />
          </div>
        </React.Fragment>
      </PageWrapper>
    );
  }
}
export default App;
