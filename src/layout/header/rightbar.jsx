import React, { Fragment, useState, useEffect } from 'react';
import {  LogIn } from 'react-feather';
import { useHistory } from 'react-router-dom'
import { setDefaultLanguage,  setLanguageCookie,  translate,} from 'react-switch-lang';
import {LogOut} from '../../constant'

setDefaultLanguage('en');
setLanguageCookie();

const Rightbar = (props) => {    
 
  const history = useHistory();
  const [name, setName] = useState('')
 
  
  useEffect(() => {
    setName(localStorage.getItem('name'))
  }, []);

  const  Logout = () =>  {
    localStorage.clear()
    history.push(`${process.env.PUBLIC_URL}/login`)
  }

  const UserMenuRedirect = (redirect) => {
    history.push(redirect)
  }

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={'https://ui-avatars.com/api/?name='+name} alt="" />
              <div className="media-body"><span>{name}</span>
                <p className="mb-0 font-roboto">User <i className="middle fa fa-angle-down"></i></p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              {/* <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/users/userProfile`)}><User /><span>{Account} </span></li> */}
              <li onClick={() => Logout()}><LogIn /><span>{LogOut}</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>

  );
}
export default translate(Rightbar);