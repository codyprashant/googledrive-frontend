import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button,FormFeedback} from 'reactstrap'
import {login} from '../Actions/AuthActions'
import {withRouter} from 'react-router-dom'
import { toast } from 'react-toastify';
import {Password, EmailAddress,RememberPassword,ForgotPassword ,CreateAccount,LoginWithJWT} from '../constant';

const forgotPassLink = `${process.env.PUBLIC_URL}/pages/auth/forgetPwd`;
const createAccountLink = `${process.env.PUBLIC_URL}/pages/auth/signup`;

const Logins = (props) => {
    let history = useHistory();
    const [user,setUser] = useState({email:"",password:""})
    const [togglePassword,setTogglePassword] = useState(false)

    const handleChange = (e) => {
      const {name,value} = e.target
      setUser({...user,[name]:value})
      if(!(user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))){
          document.querySelector(".email_valid").classList.add("is-invalid")
      }else{
          document.querySelector(".email_valid").classList.remove("is-invalid")
          document.querySelector(".email_valid").classList.add("is-valid")
      }
      if(user.password.length < 3){
          document.querySelector(".password_valid").classList.add("is-invalid")
      }else{
          document.querySelector(".password_valid").classList.remove("is-invalid")
          document.querySelector(".password_valid").classList.add("is-valid")
      }
  }

  const HideShowPassword  = (tPassword) => {
      setTogglePassword(!tPassword)
  }


  const loginWithJwt = async (email,password) => {
      let response = await login( email, password );
      if (response.status && response.status === "SUCCESS") {
          localStorage.setItem('token', response.token);
          localStorage.setItem('name', `${response.userData.Fname} ${response.userData.Lname}`);
          localStorage.setItem('email', `${response.userData.email}`);
          localStorage.setItem('authenticated', true)
          history.push(`/app/file-manager`)
      } else{
          toast.error(response.message);
      }
  }

    return (
      <Container fluid={true} className="p-0">
      <Row>

        <Col xl="12" className="p-0">     
            <div className="login-card">
            <div>
                <div>
                    <a className="logo text-left" href="#javascript">
                    <img className="img-fluid for-light" src={require("../assets/images/logo/login.png")} alt="looginpage"/>
                    <img className="img-fluid for-dark" src={require("../assets/images/logo/logo_dark.png")} alt="looginpage"/></a>
                </div>
                <div className="login-main login-tab">
                        <Form className="theme-form">
                            <h4>{"Sign In"}</h4>
                            <p>{"Enter your email & password to login"}</p>
                            
                            <FormGroup>
                                <Label className="col-form-label">{EmailAddress}</Label>
                                <Input className="email_valid"  type="email" name="email" value={user.email} onChange={(e) => handleChange(e)} placeholder="Email Address" required/>
                                <FormFeedback>{"Please enter proper email."}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">{Password}</Label>
                                <Input className="password_valid"  type={togglePassword ?  "text" : "password" } name="password" value={user.password} onChange={(e) => handleChange(e)}  placeholder="Password" required/>
                                <FormFeedback>{"Please enter password."}</FormFeedback>
                                <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                                
                            </FormGroup>
                            <FormGroup className="mb-0">
                                <div className="checkbox ml-3">
                                <Input id="checkbox1" type="checkbox"/>
                                <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                                </div>
                                <Link to={forgotPassLink}>{ForgotPassword}</Link>
                                <br /> <br />
                                <Button color="primary" className="btn-block"  onClick={() => loginWithJwt(user.email,user.password)}>{LoginWithJWT}</Button>
                             
                            </FormGroup>
                            
                            <p className="mt-4 mb-0">{"Don't have account?  "}<Link to={createAccountLink}>{CreateAccount}</Link></p>
                            
                        </Form>
                </div>
            </div>
            </div>
        </Col>
      </Row>
    </Container>
    );
}

export default withRouter(Logins);