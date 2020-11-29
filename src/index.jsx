
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {ToastContainer} from 'react-toastify'
import PrivateRoute from './auth/PrivateRoute'


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
import FileManager from './components/application/file-manager/file-manager'

const Root = (props) =>  {

    return(

      <Fragment>
        <ToastContainer/>
        <BrowserRouter basename={`/`}>
        <Switch>
          <Route  exact path={`/login`} component={Signin} />
          <Route  exact path={`/pages/auth/signup`} component={Register}></Route>

          <Route  exact path={`/pages/auth/forgetPwd`} component={Forgetpwd}></Route>
          <Route  exact path={`/pages/auth/unlockUser/:encryptedText`} component={UnlockUser}></Route>
          <Route  exact path={`/pages/auth/resetPwd/:encryptedText`} component={Resetpwd}></Route>

          <Route  exact path={`/pages/errors/error400`} component={Error400}></Route>
          <Route  exact path={`/pages/errors/error401`} component={Error401}></Route>
          <Route  exact path={`/pages/errors/error403`} component={Error403}></Route>
          <Route  exact path={`/pages/errors/error404`} component={Error404}></Route>
          <Route  exact path={`/pages/errors/error500`} component={Error500}></Route>
          <Route  exact path={`/pages/errors/error503`} component={Error503}></Route>
          
          <Route  exact path={`/pages/maintenance`} component={Maintenance}></Route>
          <PrivateRoute exact path={`/app/file-manager`} component={FileManager}></PrivateRoute>
          <Redirect from="/" to="/login" />
        </Switch>
        </BrowserRouter>

      </Fragment>
      )
}

ReactDOM.render(<Root/>,
  document.getElementById('root')
);
serviceWorker.unregister();
