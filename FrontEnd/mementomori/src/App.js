import React from 'react';
import compose from 'recompose/compose'
import './App.css';
import Calendario from "./components/Calendario"
import LoginPage from "./components/LoginPage"
import DocsPage from "./components/DocsPage"
import StatsPage from "./components/StatsPage"
import ProfilePage from "./components/ProfilePage"
import Admin from "./components/Admin"
import { Route, Switch, withRouter } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import Cookies from 'js-cookie';
import constants from './constants.js'
import isAuthenticated from './services/authService';
import checkLifeExpectancySet from './services/checkLifeExpectancySet'
import PrivateRoute from './components/PrivateRoute'
import LifeExpectancyRoute from './components/LifeExpectancyRoute'
import LifeExpectancy from './components/LifeExpectancy'
import { connect } from "react-redux";
import { lifeExpectancySet } from "./redux/actions/reduxActions.js"
import API from './services/axiosObject';

function mapDispatchToProps(dispatch) {
  return {
    lifeExpectancySet: element => dispatch(lifeExpectancySet(element))
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticationChecked: false,
      isAuthenticated: false
    }
  }

  componentDidMount() {

    //calls the auth service to decide the auth state value
    isAuthenticated().then((result) => {
      if (result === true) {
        this.setState(
          {
            isAuthenticated: true,
            authenticationChecked: true
          }, () => {
            if (checkLifeExpectancySet()) {
              //the lifeExpectancy is yet to set
              this.props.lifeExpectancySet(true)
            } else {
              //the lifeExpectancy is set
              this.props.lifeExpectancySet(false)
            }
          }
        )
      } else {
        this.setState({ isAuthenticated: false, authenticationChecked: true })
      }
    });
  } trade

  logout = () => {
    API.post(constants.urlBackend + "/auth/logout").then(res => {
      Cookies.remove('accesstoken')
      this.setState({
        isAuthenticated: false,
        authenticationChecked: true
      }, () => {
        this.props.lifeExpectancySet(true)
        this.props.history.push("/login")
      })
    }).catch(err =>{

    })


  }

  login = (email, password, direction) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: constants.urlBackend + "/auth/login",
        data: qs.stringify({ email, password }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then((res) => {

        if (res.data.accesstoken != undefined) {
          Cookies.set('accesstoken', res.data.accesstoken)
        }

        if (direction == "login") {

          isAuthenticated().then((result) => {

            if (result === true) {
              this.setState({ isAuthenticated: true, authenticationChecked: true }, () => {
                this.props.history.push('/dashboard');
              })
              resolve(true);
            } else {
              this.setState({ isAuthenticated: false, authenticationChecked: true })
              if (res.data == "error") {
                reject("error");
              } else if (res.data.code == "ETIMEDOUT") {
                reject("Network error");
              }
            }
          });
        } else if (direction == "register") {

          this.props.history.push("/lifeExpectancy")
        }

      }).catch(err => {

        if (err == "Error: Network Error") {
          reject("Network error");
        }else if(err == "Error: Request failed with status code 400"){
          reject("error: 400")
        }else if(err == "Error: Request failed with status code 401"){
          reject("error: 401")
        }
      })

    })

  }

  setYearsRedirect = () => {

    isAuthenticated().then((result) => {

      if (result === true) {
        this.setState({ isAuthenticated: true, authenticationChecked: true }, () => {
          this.props.history.push('/dashboard');
        })

      } else {
        this.setState({ isAuthenticated: false, authenticationChecked: true })

      }
    })
  }

  render() {
    //isAuthticated() is async, so we block the rendering until we have the result.
    if (!this.state.authenticationChecked) return null;
    return (
      <div>
        <Switch>
          <PrivateRoute name={"dashboard"} authed={this.state.isAuthenticated} path="/dashboard" render={(props) => <Calendario {...props} logout={this.logout} />} />
          <LifeExpectancyRoute name={"life_expectancy"} path="/lifeExpectancy" render={(props) => <LifeExpectancy {...props} setYearsRedirect={this.setYearsRedirect} />} />
          <Route path="/login" render={(props) => <LoginPage login={this.login} authed={this.state.isAuthenticated} {...props} />} />
          <PrivateRoute path="/admin" name={"admin"} authed={this.state.isAuthenticated} render={(props) => <Admin authed={this.state.isAuthenticated} logout={this.logout} {...props} />} />
          <PrivateRoute path="/stats" name={"stats"} authed={this.state.isAuthenticated} render={(props) => <StatsPage  {...props} logout={this.logout} />} />
          <PrivateRoute path="/profile" name={"profile_info"} authed={this.state.isAuthenticated} render={(props) => <ProfilePage {...props} logout={this.logout} />} />
          <Route path="/docs" render={(props) => <DocsPage />} />
          <Route path="/" render={(props) => this.props.history.push("/login")} />

        </Switch>
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(App);
