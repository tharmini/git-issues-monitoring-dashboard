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

class IssuesPerTeamTable extends Component {

}

export default IssuesPerTeamTable;