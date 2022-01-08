import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from '../components/Login';
import ForgotPassword from "../components/ForgotPassword";
import Home from "../components/Home";
import Post from "../components/post/Post";
import CreateEditPost from "../components/post/CreateEditPost";
import AuthService from "../service/authservice";
import Menu from "../components/Menu";

function Web(props) {

    const historyBrowser = createBrowserHistory()
    let isLogin = localStorage.getItem('token')
    let history = useHistory()

    const Logout = async () => {
        const data = {
            token: isLogin
        }
        await AuthService.Logout(data).then((e) => {
            localStorage.removeItem('token')
            window.location.href = "/"
        })
    }

    return (
        <div className="container">
            {isLogin ? 
                <div className="row">
                    <Router>
                    <Menu onLogout={Logout} />
                    <div className="col-11">
                            <Route path="/home" exact component={Home} />
                            <Route
                                path="/posts" 
                                render={({ match: { url }}) => (
                                <>
                                    <Route path={`${url}/`} render={() => <Post token={isLogin} />} exact />
                                    <Route path={`${url}/create`} render={() => <CreateEditPost title={"Create Post"} token={isLogin} />} />
                                    <Route path={`${url}/edit/:id`} render={() => <CreateEditPost title={"Edit Post"} token={isLogin} />} />
                                </>
                            )} />    
                    </div>
                    </Router>
                </div>
            :
                <Router>
                        <Route path="/" exact  component={Login} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                </Router>
            }
        </div>
    )
}

export default Web;

if (document.getElementById('main')) {
    ReactDOM.render(<Web />, document.getElementById('main'));
}