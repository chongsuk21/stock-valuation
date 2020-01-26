import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { Bar, Line, Polar } from 'react-chartjs-2';
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
    getFinancialStatements,
    getKeyRatios,
    getCashflow,
    getFreeCashflow,
    getCapitalExpenditure,
    getCompanyRating,
    getBalanceSheet
} from "../../actions";
import {
    filterFinancialsForDate, filterFinancialsForEPS,
    filterFinancialsForNetIncome,
    filterFinancialsForRevenue,
    filterCashflowForNetcashflow,
    filterCashflowForDate,
    filterFreeCashflowForNetcashflow,
    filterCapitalExpenditure,
    filterCompanyRating,
    filterBalanceForPolar
} from "../../utilities/filtering";
import {format} from "../../utilities/CurrencyFormat";

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
        financials: state.finance.financials,
        cashflow: state.finance.cashflow,
        freecashflow:state.finance.freecashflow,
        balanceSheet: state.finance.balanceSheet
        //com_rating:state.company.com_rating
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
     this.props.getFinancialStatements(this.state.ticker);
     this.props.getCashflow(this.state.ticker);
     this.props.getFreeCashflow(this.state.ticker);
     this.props.getCapitalExpenditure(this.state.ticker);
     this.props.getCompanyRating(this.state.ticker);
     this.props.getBalanceSheet(this.state.ticker);
   };



  render() {
      if (this.state.redirectTo)
          return <Redirect push to={{ pathname: this.state.redirectTo }}/>;
      else {
           const Revdata = {
              labels: filterFinancialsForDate(this.props.financials),
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
                      data: filterFinancialsForRevenue(this.props.financials)
                  },
                  {
                      label: 'Net Income',
                      lineTension: 0.1,
                      backgroundColor: 'black',
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
                      data: filterFinancialsForNetIncome(this.props.financials)
                  }
              ]
          };

           const Revoptions = {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true,
                          callback: (value) => {
                              return format('CAD', value);
                          }
                      }
                  }]
              },
          };

           const EPSdata = {
              labels: filterFinancialsForDate(this.props.financials),
              datasets: [
                  {
                      label: 'EPS YoY',
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
                      data: filterFinancialsForEPS(this.props.financials)
                  }
              ]
          };

           const EPSoptions = {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true,
                          callback: (value) => {
                              return format('CAD', value);
                          }
                      }
                  }]
              },
          };
          const Cfdata = {
             labels: filterCashflowForDate(this.props.cashflow),
             datasets: [
                 {
                     label: 'Net Cashflow',
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
                     data: filterCashflowForNetcashflow(this.props.cashflow)
                 },
                 {
                     label: 'Free Cashflow',
                     lineTension: 0.1,
                     backgroundColor: 'black',
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
                     data: filterFreeCashflowForNetcashflow(this.props.cashflow)
                 },
                 {
                     label: 'Capital Expenditure',
                     lineTension: 0.1,
                     backgroundColor: 'red',
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
                     data: filterCapitalExpenditure(this.props.cashflow)
                 }
             ]
         };
         const PolarData = {
             datasets: [{
                 data: filterBalanceForPolar(this.props.balanceSheet),
                 backgroundColor: [
                     '#FF6384',
                     '#4BC0C0',
                     '#FFCE56',
                     '#E7E9ED',
                     '#36A2EB'
                 ],
                 label: 'My dataset' // for legend
             }],
             labels: [
                 'Cash and cash equivalents',
                 'Total Debt',
                 'Total assets',
                 'Total shareholders equity',
                 'Retained earnings (deficit)'
             ]
         };
          const Cfoptions = {
             scales: {
                 yAxes: [{
                     ticks: {
                         beginAtZero: true,
                         callback: (value) => {
                             return format('CAD', value);
                         }
                     }
                 }]
             },
         };

         const CMRdata = {
           datasets: [{
                data: [
                  this.props.rating?this.props.rating.ratingDetails['P/B'].score:"",
                  this.props.rating?this.props.rating.ratingDetails.ROA.score:"",
                  this.props.rating?this.props.rating.ratingDetails.DCF.score:"",
                  this.props.rating?this.props.rating.ratingDetails['P/E'].score:"",
                  this.props.rating?this.props.rating.ratingDetails.ROE.score:"",
                  this.props.rating?this.props.rating.ratingDetails['D/E'].score:""
                ],
                backgroundColor: [
                  '#FF6384',
                  '#4BC0C0',
                  '#FFCE56',
                  '#E7E9ED',
                  '#36A2EB',
                  '#B8860B'
                ],
                label: 'Company Rating' // for legend
                }],
                labels: [
                  'P/B',
                  'ROA',
                  'DCF',
                  'P/E',
                  'ROE',
                  'D/E'
                ]
        };
          return (

              <div className="abc">

              {console.log(this.props.financials)}
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
                              <Bar data={Revdata} options={Revoptions}/>
                              <Line data={EPSdata} options={EPSoptions} />
                              <Bar data={Cfdata} options={Cfoptions}/>
                              <Polar data={CMRdata} />
                              <Polar data={PolarData}/>

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
    getKeyRatios,
    getFinancialStatements,
    getCashflow,
    getFreeCashflow,
    getCapitalExpenditure,
    getCompanyRating,
    getBalanceSheet

};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
