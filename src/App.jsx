import React, { Component } from 'react';
import './App.css';
import IssuesPerTeamTable from './components/IssuesPerTeamTable';
import IssuesForlabelsChart from './components/IssuesForlabelsChart';
import CreatedVsClosedGraph from './components/CreatedVSclosedChart';
import IssuesAgingGraph from './components/IssuesAgingGraph';
import IssuesForlabelsChartpopup from './components/IssuesForlabelsChartpopup';
import IssuesPerTeamTablepopup from './components/IssuesPerTeamTablepopup';
import Paper from '@material-ui/core/es/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import Popup from './components/Popup';

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


  constructor(props){
    super(props);
    this.state = { showPopup: false,content:null };
    this.togglePopup = this.togglePopup.bind(this);

    }

      togglePopup(data) {
    this.setState({
         showPopup: !this.state.showPopup  ,
         content:data
    });
     }

     togglePopupClose() {
      this.setState({
           showPopup: false  ,
      });
       }

  render() {
    return (
      <PageWrapper>
        <h1> Git Issues Monitoring Dashboard</h1>

        <React.Fragment>

        {this.state.showPopup ?
              <Popup
                        text={this.state.content}
                        closePopup={this.togglePopupClose.bind(this)}
              />
              : null
              }

          <div className='rowC' >
            <div  onClick={(e) => this.togglePopup(<IssuesPerTeamTablepopup />)}>
            <IssuesPerTeamTable />
            </div>
            <div  onClick={(e) => this.togglePopup(<IssuesForlabelsChartpopup />)}>
            <IssuesForlabelsChart />
            </div>
          </div>
          <div className='rowC'>
            <div  onClick={(e) => this.togglePopup(<CreatedVsClosedGraph />)}>
            <CreatedVsClosedGraph />
            </div>
            <div  onClick={(e) => this.togglePopup(<IssuesAgingGraph />)}>
            <IssuesAgingGraph />
            </div>
          </div>
        </React.Fragment>
      </PageWrapper>
    );
  }
}
export default App;
