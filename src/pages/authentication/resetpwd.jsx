import React from 'react';
// import queryString from 'query-string';
import {Container,Row,Col,Form,FormGroup,Label,Input,Button} from 'reactstrap' 
import { NewPassword,RetypePassword,Done, RememberPassword, CreateAccount,SignIn} from "../../constant";
import {resetpassword, verifyResetRequest} from '../../Actions/AuthActions'
import { toast } from 'react-toastify';
import {  useParams} from "react-router-dom";

  class Resetpwd extends React.Component {
    state={
      togglePassword: false,
      password: '',
      confirmPassword:'',
      emailVerified: false,
      encryptedTxt:''
    }

    handleChange = (e) => {

      if(e.target.name === 'newPassword'){
        this.setState({password: e.target.value})
      } else if(e.target.name === 'newConfirmPassword'){
        this.setState({confirmPassword: e.target.value})
      }
    }

    HideShowPassword  = (tPassword) => {
      this.setState({togglePassword: !tPassword})
    }

    async onSubmitHandler(e){
      e.preventDefault();
      console.log(this.state);
      if(this.state.password === this.state.confirmPassword){
        let response = await resetpassword(this.state.encryptedTxt, this.state.password);
        if(response.status === 'SUCCESS' && response.message){
          toast.success(response.message)
          this.props.history.push('/login')
        } else if(response.status === 'ERROR' && response.message){
          toast.error(response.message)
        }else{
          toast.error('SOmething went wrong')
        }
      } else{
        toast.error('SOmething went wrong')
      }
      
    }

    async componentDidMount(){
      // let url = this.props.location.search;
      // let params = queryString.parse(url);
      let { encryptedText } = useParams();
      if(encryptedText){
        let response = await verifyResetRequest(encryptedText);
        if(response.status === 'SUCCESS' && response.message){
          this.setState({emailVerified: true, encryptedTxt:encryptedText })
        } else if(response.status === 'ERROR' && response.message){
          this.setState({emailVerified: false})
        }else{
          this.setState({emailVerified: false })
        }
      } else{
        this.setState({emailVerified: false })
      }
    }

    

render(){
    return (
      <Container fluid={true}>
      <Row>
          <Col xs="12">     
            <div className="login-card">
              <div>
                <div><a className="logo" href="#javascript"><img className="img-fluid for-light" src={require("../../assets/images/logo/login.png")} alt="looginpage"/><img className="img-fluid for-dark" src={require("../../assets/images/logo/logo_dark.png")} alt="looginpage"/></a></div>
                {this.state.emailVerified === true ?
                <div className="login-main"> 
                  <Form className="theme-form" onSubmit={(e) =>this.onSubmitHandler(e)}>
                    <h4>{"Create Your Password"}</h4>
                    <FormGroup>
                      <Label className="col-form-label">{NewPassword}</Label>
                      <Input className="form-control" type={this.togglePassword ?  "text" : "password" } name="newPassword" value={this.state.password} onChange={this.handleChange} required="" placeholder="New Password"/>
                      <div className="show-hide" onClick={() => this.HideShowPassword(this.state.togglePassword)}><span className={this.state.togglePassword ? "" : "show"}></span></div>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">{RetypePassword}</Label>
                      <Input className="form-control" type="password" name="newConfirmPassword" required="" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="Confirm Password"/>
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <div className="checkbox ml-3">
                        <Input id="checkbox1" type="checkbox"/>
                        <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                      </div>
                      <Button color="primary" className="btn-block" type="submit">{Done}</Button>
                    </FormGroup>
                    <p className="mt-4 mb-0">{"Don't have account?"}<a className="ml-2" href="/pages/auth/signup">{CreateAccount}</a></p>
                  </Form>
                </div> 
                :
                <div className="login-main">
                    <h4>Invalid URL</h4>
                    <hr />
                    <h6>We are not able to verify Your account with provided URL.</h6>
                    <p className="mt-4 mb-0">{"Already Have an account?"}<a className="ml-2" href="/login">{SignIn}</a></p>
                  </div>
                  }
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
}
}

export default Resetpwd;