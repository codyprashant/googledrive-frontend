import React, { Fragment,useState,useEffect } from 'react'
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store'
import App from './components/app'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import {routes} from './route';


// Signin page
import Signin from './auth/signin'
import Register from "./pages/authentication/register"

import UnlockUser from "./pages/authentication/unlockUser"
import Forgetpwd from "./pages/authentication/forgetpwd"
import Resetpwd from "./pages/authentication/resetpwd"

// Error page
import Error400 from "./pages/errors/error400"
import Error401 from "./pages/errors/error401"
import Error403 from "./pages/errors/error403"
import Error404 from "./pages/errors/error404"
import Error500 from "./pages/errors/error500"
import Error503 from "./pages/errors/error503"

// Maintenanc
import Maintenance from "./pages/maintenance"
import Callback from './auth/callback'

const Root = (props) =>  {
  const abortController = new AbortController();
  const [authenticated,setAuthenticated] = useState(false)
  const jwt_token = localStorage.getItem('token');
 

  useEffect(() => {
      setAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
      
      return function cleanup() {
          abortController.abort();
      }
      
      // eslint-disable-next-line 
    }, []);

    return(

      <Fragment>

        <BrowserRouter basename={`/`}>
        <Switch>

          <Route  path={`/login`} component={Signin} />
          <Route  path={`/pages/auth/signup`} component={Register}></Route>

          <Route  path={`/pages/auth/forgetPwd`} component={Forgetpwd}></Route>
          <Route  path={`/pages/auth/unlockUser`} component={UnlockUser}></Route>
          <Route  path={`/pages/auth/resetPwd`} component={Resetpwd}></Route>

          <Route  path={`/pages/errors/error400`} component={Error400}></Route>
          <Route  path={`/pages/errors/error401`} component={Error401}></Route>
          <Route  path={`/pages/errors/error403`} component={Error403}></Route>
          <Route  path={`/pages/errors/error404`} component={Error404}></Route>
          <Route  path={`/pages/errors/error500`} component={Error500}></Route>
          <Route  path={`/pages/errors/error503`} component={Error503}></Route>
          
          <Route  path={`/pages/maintenance`} component={Maintenance}></Route>
          
          <Route  path={`/callback`} render={() => <Callback/>} />
          {jwt_token !==  null  ?
          
          <App>
            <Route exact path={`/`} render={() => {
              return (<Redirect to={`/app/file-manager`} />)
            }} /> 
          <TransitionGroup>
              {routes.map(({ path, Component }) => (
                <Route key={path}  exact  path={`${path}`}>
                    {({ match }) => (
                        <CSSTransition 
                          in={match != null}
                          timeout={100}
                           unmountOnExit>
                          <div><Component/></div>
                        </CSSTransition> 
                    )}
                </Route>
                ))}
          </TransitionGroup> 
          
          </App>
          :
          <Redirect to={`${process.env.PUBLIC_URL}/login`} />
          }      
        </Switch>
        </BrowserRouter>

      </Fragment>
      )
}

ReactDOM.render(<Root/>,
  document.getElementById('root')
);
serviceWorker.unregister();
