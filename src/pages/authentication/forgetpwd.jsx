import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import {Container,Row,Col,Form,FormGroup,Label,Input,Button} from 'reactstrap' 
import { Resend,ResetPassword, SignIn,Send} from "../../constant";
import { useState } from 'react';
import {resetpassRequest} from '../../Actions/AuthActions'
import { ToastContainer,toast } from 'react-toastify';
const signInLink = `${process.env.PUBLIC_URL}/login`;

const Forgetpwd = (props) => {
  let history = useHistory();
    const [email,setEmail] = useState("")

    const handleChange = (e) => {
      setEmail(e.target.value)
    }

    const submitHandler = async (e) => {
      e.preventDefault();
      let response = await resetpassRequest( email);
      console.log(response);
      if (response.status && response.status === "SUCCESS") {
        setTimeout(() => { toast.success(response.message); }, 300);
        setTimeout(() => { toast.success(history.push(signInLink)); }, 500);
      } else {
        toast.error(response.message);
      }
    }

    
    return (
      <Container fluid={true}>
      <Row>
          <Col xs="12">     
            <div className="login-card">
              <div>
                <div><a className="logo" href="#javascript"><img className="img-fluid for-light" src={require("../../assets/images/logo/login.png")} alt="looginpage"/><img className="img-fluid for-dark" src={require("../../assets/images/logo/logo_dark.png")} alt="looginpage"/></a></div>
                <div className="login-main"> 
                <Form className="theme-form" onSubmit={(e) => submitHandler(e)}>
                    <h4>{ResetPassword}</h4>
                    <FormGroup>
                      <Label className="col-form-label">Enter your registered Email Address</Label>
                      <br /><br />
                      <Row>
                        <Col md="12">
                          <Input className="form-control mb-1" type="email"  value={email} onChange={(e) => handleChange(e)} placeholder="Email Address"/>
                        </Col>
                        <br /><br />
                        <Col xs="12">
                          <Button color="primary" className="btn-block m-t-10" type="submit">{Send}</Button>
                        </Col>
                      </Row>
                    </FormGroup>

                    <div className="text-center mt-4 mb-4">
                        <span className="reset-password-link">{"If don't receive OTP?"} 
                         <a className="btn-link text-danger" href="#javascript">{Resend}</a>
                        </span>
                      </div>
                      <p className="mt-4 mb-0">{"Already have an password?   "}<Link to={signInLink}>{SignIn}</Link></p>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <ToastContainer/>
      </Container>
    );
}

export default Forgetpwd;