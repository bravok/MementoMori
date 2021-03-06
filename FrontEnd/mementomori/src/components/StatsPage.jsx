import React from 'react'
import Navbar from './Navbar'
import MyResponsiveLine from './charts/MyResponsiveLine'
import MyResponsivePie from './charts/MyResponsivePie'
import API from '../services/axiosObject.js';
import constants from '../constants.js'
import { CircularProgress } from '@material-ui/core';
import './styles/StatsPage.scss'
/**
 * Component that renders the stats page.
 * 
 * @component
 * @prop {function} logout Prop received by the StatsPage and passed down to the navbar, it allows to perform a logout
 */


class StatsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLinealEmotion: [],
            loadedDataLinealEmotion: false,
            dataCumulativeEmotion : [],
            loadedDataCumulativeEmotion: false,
            dataCumulativeMaxPotentialEmotion: [],
            loadedDataCumulativeMaxPotentialEmotion: false,
            dataPie: [],
            loadedDataPie: false
        }
    }

    componentDidMount() {

        API.get(constants.urlBackend +'/chart/lineal/emotion').then(response => {

            this.setState({
                dataLinealEmotion: response.data
            }, () => {
                this.setState({
                    loadedDataLinealEmotion: true
                })
            }
            )
        })
        API.get(constants.urlBackend +'/chart/cumulative/emotion').then(response => {

            this.setState({
                dataCumulativeEmotion: response.data
            }, () => {
                this.setState({
                    loadedDataCumulativeEmotion: true
                })
            }
            )
        })
        API.get(constants.urlBackend +'/chart/cumulative-maxpotential/emotion').then(response => {

            this.setState({
                dataCumulativeMaxPotentialEmotion: response.data
            }, () => {

                this.setState({
                    loadedDataCumulativeMaxPotentialEmotion: true
                })
            }
            )
        })
        API.get(constants.urlBackend +'/chart/pie/emotion').then(response =>{

            this.setState({
                dataPie: response.data
            }, () => {

                this.setState({
                    loadedDataPie: true
                })
            }
            )
        })
    }



    render() {

        return (

            <div>
                <Navbar {...this.props} logout={this.props.logout} />
                <div className="nivoChart">
                    
                    {/* <p className="welcomecolor">welcome</p> */}
                    {this.state.loadedDataLinealEmotion ? <MyResponsiveLine id="lineal-emotion-chart" data={this.state.dataLinealEmotion} axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Lineal emotion',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }} /> : <div className="gridLoadingContainer2"><CircularProgress color="secondary" iconStyle={"width: 1000, height:1000"} />
                    <p className="loadingText1">Loading...</p></div>}
                    {this.state.loadedDataCumulativeEmotion ? <MyResponsiveLine id="cumulative-emotion-chart" data={this.state.dataCumulativeEmotion} axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Cumulative emotion',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }} /> : <div className="gridLoadingContainer2"><CircularProgress color="secondary" iconStyle={"width: 1000, height:1000"} />
                    <p className="loadingText1">Loading...</p></div>}
                    {this.state.loadedDataCumulativeMaxPotentialEmotion ? <MyResponsiveLine id="cumulative-emotion-max-portential-chart" data={this.state.dataCumulativeMaxPotentialEmotion} axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Cumulative emotion vs max potential cumulative emotion',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }} /> : <div className="gridLoadingContainer2"><CircularProgress color="secondary" iconStyle={"width: 1000, height:1000"} />
                    <p className="loadingText1">Loading...</p></div>}
                    {this.state.loadedDataPie ?<MyResponsivePie data={this.state.dataPie}/> : <div className="gridLoadingContainer2"><CircularProgress color="secondary" iconStyle={"width: 1000, height:1000"} />
                <p className="loadingText1">Loading...</p></div>}
                    
                </div>
            </div>


        )
    }
}

export default StatsPage