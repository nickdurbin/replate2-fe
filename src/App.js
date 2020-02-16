import React, { useEffect } from "react";
import "./css/App.css";
import BusinessLoginForm from "./components/Business/BusinessLoginForm";
import VolunteerLoginForm from "./components/Volunteer/VolunteerLoginForm";
import BusinessRegisterApp from "./components/Business/BusinessRegisterApp";
import VolunteerRegisterApp from "./components/Volunteer/VolunteerRegisterApp";
import BusinessDashboard from "./components/Business/BusinessDashboard";
import VolunteerDashboard from "./components/Volunteer/VolunteerDashboard";
import Requests from "./components/Requests/Requests";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import decode from 'jwt-decode';
import { setUserId } from './utils/actions';
import { connect } from "react-redux";

function App({ setUserId, business_id }) {

  useEffect(() => {
    if (business_id === '' && localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      const { subject } = decode(token)

      setUserId(subject)
    }
  })

  console.log(business_id)

 return (
  <main>
   <nav>
    <p className="future-image">The "logo" will be here</p>
    <h1>Replate</h1>
   </nav>
   <BrowserRouter>
    <Switch>
     <Route exact path="/" render={props => <SignUp {...props} />} />
     <Route
      path="/business/register"
      render={props => <BusinessRegisterApp {...props} />}
     />
     <Route
      path="/volunteer/register"
      render={props => <VolunteerRegisterApp {...props} />}
     />
     <Route path="/volunteer/login" render={props => <VolunteerLoginForm {...props} />} />
     <Route path="/volunteer/home" render={props => <VolunteerDashboard {...props} />} />
     <Route path="/business/login" render={props => <BusinessLoginForm {...props} />} />
     <Route
      path="/business"
      render={props => <BusinessDashboard {...props} />}
     />
     <PrivateRoute path="/requests" render={props => <Requests {...props} />} />
    </Switch>
   </BrowserRouter>
  </main>
 );
}

const mapStateToProps = ({ business: businessReducer }) => ({
  business_id: businessReducer.business_id
})

console.log(mapStateToProps)

export default connect(mapStateToProps, { setUserId })(withRouter(App));