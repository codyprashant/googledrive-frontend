import React from 'react';
import { Link} from 'react-router-dom'
import {Container,Row,Col,Form,FormGroup,Input,Label,Button} from 'reactstrap'
import { Password,SignIn, EmailAddress ,CreateAccount, YourName} from '../../constant';
import {signUp} from '../../Actions/AuthActions'
import { ToastContainer,toast } from 'react-toastify';
const signInLink = `${process.env.PUBLIC_URL}/login`;


class Register extends React.Component {
  state = {
    togglePassword: false,
    password: '',
    email: '',
    Fname: '',
    Lname: ''
  }

  handleChange = (e) => {

    const { name, value } = e.target;
    switch (name) {
      case "email":
        this.setState({ email: value });
        break;

      case "password":
        this.setState({ password: value });
        break;
      
      case "firstName":
        this.setState({ Fname: value });
        break;

      case "lastName":
        this.setState({ Lname: value });
        break;

      default:
        break;
    }
    console.log(e.target.name)
    console.log(e.target.value)
  }

  HideShowPassword  = (tPassword) => {
    this.setState({ togglePassword: !tPassword });
  }

  registerUser = async (e) => {
    e.preventDefault();
    let response = await signUp( this.state.email, this.state.password, this.state.Fname,this.state.Lname );
    console.log(response);
    if (response.status && response.status === "SUCCESS") {
       toast.success(response.message);
      setTimeout(() => { toast.success(this.props.history.push(signInLink)); }, 200);
    } else {
      toast.error(response.message); 
    }
  }

render(){
  return (
    <Container fluid={true} className="p-0">
    <Row>
      <Col xl="12" className="p-0"> 
        <div className="login-card">
          <div>
            <div><a className="logo" href="#javascript"><img className="img-fluid for-light" src={require("../../assets/images/logo/login.png")} alt="looginpage"/><img className="img-fluid for-dark" src={require("../../assets/images/logo/logo_dark.png")} alt="looginpage"/></a></div>
            <div className="login-main"> 
              <Form className="theme-form" onSubmit={this.registerUser}>
                <h4>{"Create your account"}</h4>
                <p>{"Enter your personal details to create account"}</p>
                <FormGroup>
                  <Label className="col-form-label pt-0">{YourName}</Label>
                  <div className="form-row">
                    <Col xs="6">
                      <Input className="form-control" type="text" name="firstName" required="" value={this.state.Fname} onChange={this.handleChange} placeholder="First name" />
                    </Col>
                    <Col xs="6">
                      <Input className="form-control" type="text" name="lastName" required="" value={this.state.Lname} onChange={this.handleChange} placeholder="Last name" />
                    </Col>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">{EmailAddress}</Label>
                  <Input className="form-control" type="email" name="email" required="" value={this.state.email} onChange={this.handleChange} placeholder="Test@gmail.com" />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">{Password}</Label>
                  <Input className="form-control" type={this.state.togglePassword ?  "text" : "password" } name="password" value={this.state.password} onChange={this.handleChange} required="" placeholder="Enter Password"/>
                  <div className="show-hide" onClick={() => this.HideShowPassword(this.state.togglePassword)}><span className={this.state.togglePassword ? "" : "show"}></span></div>
                </FormGroup>
                <div className="form-group mb-0">
                  <hr />
                  <Button color="primary" className="btn-block" type="submit">{CreateAccount}</Button>
                </div>
                
                <p className="mt-4 mb-0">{"Already have an account?   "}<Link to={signInLink}>{SignIn}</Link></p>
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

}

export default Register;