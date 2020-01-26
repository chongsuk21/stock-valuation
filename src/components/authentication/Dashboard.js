import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import {
    getProfile,
    getPrice,
    getDcf,
    setTicker,
    getQuote,
    getFinancialratio,
    getFinancialGrowth,
    getRating,
    getHistoricalPrices,
    getKeyRatios
} from "../../actions";

const mapStateToProps = state => {
    return {
        profile: state.finance.profile,
        price: state.finance.price,
        dcf: state.finance.dcf,
        ticker:state.finance.ticker,
        quote:state.finance.quote,
        ratios:state.finance.ratios,
        filtered_ratios:state.finance.filtered_ratios,
        growth:state.finance.growth,
        rating:state.finance.rating,
        histoPrices:state.finance.histoPrices,
        keyratios:state.finance.keyratios,
        filtered_ratios_keys:state.finance.filtered_ratios_keys

    }
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            options: {
                chart: {
                    type: 'candlestick',
                    height: 350
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            }
        };

        this.update = this.update.bind(this);
    }
  update = () => {
     this.props.getProfile(this.state.ticker);
     this.props.getPrice(this.state.ticker);
     this.props.getDcf(this.state.ticker);
     this.props.getQuote(this.state.ticker);
     this.props.getFinancialratio(this.state.ticker);
     this.props.getFinancialGrowth(this.state.ticker);
     this.props.getRating(this.state.ticker);
     this.props.getHistoricalPrices(this.state.ticker);
     this.props.getKeyRatios(this.state.ticker);
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


                  <Card className="defaultcard">
                    <h1>Executive Summary</h1>
                    <Card.Img variant="top" className="logo" src={this.props.profile? this.props.profile.profile.image: ""} />
                    <Card.Body>
                      <Card.Title className="title">
                      {this.props.profile? this.props.profile.profile.companyName: ""}

                      </Card.Title>

                      <Card.Text className="description">
                      <br />
                      {this.props.profile? "Price : $" + this.props.profile.profile.price: ""}
                      {this.props.quote && this.props.quote.change > 0? <span class="oi oi-caret-top"></span> : <span class="oi oi-caret-bottom"></span>}
                      {this.props.quote? "  "+this.props.quote.change +"(" +this.props.quote.changesPercentage + ")":""}
                      <br />
                        {this.props.profile? this.props.profile.profile.description: ""}
                        <br />
                        {this.props.profile? "CEO : " + this.props.profile.profile.ceo: ""}
                        <br />
                        {this.props.profile? "Industry : " + this.props.profile.profile.industry: ""}

                      </Card.Text>
                    </Card.Body>
                  </Card>



                  <Card className="defaultcard Growth">
                      <Card.Body>
                          <Card.Title className="title">
                              Financial Growth
                          </Card.Title>
                          <Card.Text className="description">
                              <Line />
                          </Card.Text>
                      </Card.Body>
                  </Card>

                  <hr />

                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      {this.props.profile? <ProgressBar now={60} label={`${"$ "+this.props.profile.profile.price}`} />: ""}
                      {this.props.dcf? <ProgressBar now={60} label={`${"$ "+this.props.dcf.dcf}`} />: ""}

                    </Card.Body>
                  </Card>

                  { this.state.ticker ?
                      <TradingViewWidget theme={Themes.DARK} symbol={this.state.ticker}/>
                      : ''
                  }

                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Columns</Card.Title>
                      <table>
                        <tr>
                          <th>Name</th>
                          <th>Current</th>
                        </tr>
                    {
                      _.map(this.props.filtered_ratios, (data, i) => {
                        console.log(`Key: ${i}, Value: ${data}}`)
                      return (
                        <tr>
                        <td>{i}</td>
                        <td>{data}</td>
                        </tr>
                        )

                      })}
                      </table>

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
    getQuote,
    getFinancialratio,
    getFinancialGrowth,
    getRating,
    getHistoricalPrices,
    getKeyRatios
};

const EPSdata = {
    labels: '',
    datasets: [
        {
            label: 'Revenue',
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointHitRadius: 10,
            data: []
        }
    ]
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
