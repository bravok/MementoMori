import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faUser, faColumns, faChartLine, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router'
import Cookies from 'js-cookie';
import './Navbar.css'

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.logout = this.logout.bind(this)
    }

    logout() {
        this.props.logout();
    }


    render() {
        


        return (
            <div className="appNavbar">
                <div className="navEl nav1"><FontAwesomeIcon icon={faCalendar} className="navIcon" onClick={() => this.props.history.push("/dashboard")}/></div>
                <div className="navEl nav4"><FontAwesomeIcon icon={faChartLine} className="navIcon" onClick={() => this.props.history.push("/stats")}/></div>
                <div className="navEl nav2"><FontAwesomeIcon icon={faUser} className="navIcon" /></div>
                <div className="navEl nav3"><FontAwesomeIcon icon={faPowerOff} className="navIcon" onClick={this.logout}/></div>
            </div>
        )
    }
}