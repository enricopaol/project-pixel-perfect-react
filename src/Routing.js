import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Properties Paths
import properties from "./utils/properties";

// Screen
import Login from "./screens/login/Login";
import Registration from "./screens/registration/Registration";
import ForgotPassword from "./screens/forgotpassword/ForgotPassword";
import Welcome from "./screens/welcome/Welcome";

const Routing = () => {
    return ( 
        <Router>
            <Switch>
                <Route exact path={properties.ROUTING.LOGIN_PAGE} component={Login} />
                <Route path={properties.ROUTING.REGISTRATION_PAGE} component = {Registration}/>
                <Route path={properties.ROUTING.FORGOT_PSWD_PAGE} component = {ForgotPassword}/> 
                <Route path={properties.ROUTING.WELCOME_PAGE} component={Welcome}/>
            </Switch>
        </Router>
    )

}

export default Routing