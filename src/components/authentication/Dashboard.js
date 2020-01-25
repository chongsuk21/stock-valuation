import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import ApexCharts from 'apexcharts'

import {
    getProfile,
    getPrice,
    getDcf,
    setTicker,
    getHistoricalPrices
} from "../../actions";

const mapStateToProps = state => {
    return {
        profile: state.finance.profile,
        price: state.finance.price,
        dcf: state.finance.dcf,
        ticker:state.finance.ticker,
        histoPrices: state.finance.histoPrices
    }
};

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ticker: ''
        };

        this.update = this.update.bind(this);
    }

  update = () => {
     this.props.getProfile(this.state.ticker);
     this.props.getPrice(this.state.ticker);
     this.props.getDcf(this.state.ticker);
     this.props.getHistoricalPrices(this.state.ticker);
   };

  render() {
      if (this.state.redirectTo)
          return <Redirect push to={{ pathname: this.state.redirectTo }}/>;
      else {
          return (

              <div className="container">
                  <form>
                    <input type="text" onChange={evt => {this.setState({...this.state, ticker: evt.target.value.toUpperCase()})}}/>
                    {console.log(this.state.ticker)}
                    <input type="button" value="Submit" onClick={this.update}/>
                  </form>

                  
              </div>
          );
      }
  }
}

const mapDispatchToProps = {
    getProfile,
    getPrice,
    getDcf,
    setTicker,
    getHistoricalPrices
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
