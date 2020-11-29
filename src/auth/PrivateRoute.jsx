import React from 'react'
import {Route, Redirect} from "react-router-dom"
import App from '../components/app'
import { CSSTransition,TransitionGroup } from 'react-transition-group'

// const isAuth = true;


const PrivateRoute = ({component: Component, ...rest}) => {
    const jwt_token = () =>{
        if(localStorage.getItem('token') && localStorage.getItem('token') !== null){
            console.log('authenticated')
            return true
        } else{
            console.log('unauthenticated')
            return false
        }
    }

    return (
        <Route 
        {...rest}
            render={(props)=> jwt_token ? 
                <App>          
                    <TransitionGroup>
                        <CSSTransition timeout={100} unmountOnExit>
                          <div><Component {...props}/></div>
                        </CSSTransition> 
                     </TransitionGroup> 
                </App>
         : <Redirect to="/login" />}
        />
    )
}

export default PrivateRoute;
