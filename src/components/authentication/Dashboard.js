import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import ApexCharts from 'apexcharts'
import Card from 'react-bootstrap/Card';

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

              <div className="abc">
                  <form>
                    <input type="text" onChange={evt => {this.setState({...this.state, ticker: evt.target.value.toUpperCase()})}}/>
                    <input type="button" value="Submit" onClick={this.update}/>
                  </form>
                  {JSON.stringify(this.props.profile, null, 2)}
                  <Card className="defaultcard">
                    <Card.Img variant="top" className="logo" src={this.props.profile? this.props.profile.profile.image: ""} />
                    <Card.Body>
                      <Card.Title className="title">
                      {this.props.profile? this.props.profile.profile.companyName: ""}
                      </Card.Title>
                      <Card.Text className="description">
                        {this.props.profile? this.props.profile.profile.description: ""}
                      </Card.Text>
                    </Card.Body>
                  </Card>

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
