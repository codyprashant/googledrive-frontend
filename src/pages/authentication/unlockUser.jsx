import React from 'react';
import {Container,Row,Col} from 'reactstrap'
import { SignIn} from "../../constant";
import { withRouter } from "react-router";
import {verifyAccount} from '../../Actions/AuthActions'
import { toast } from 'react-toastify';

class UnlockUser extends React.Component {
  state={
    title:'',
    description:''
  }

  async componentDidMount(){
    console.log(this.props.match)
    let {encryptedText}= this.props.match.params
    if(encryptedText){
      let response = await verifyAccount(encryptedText);
      if(response.status === 'SUCCESS' && response.message){
        toast.success('Account Verified Successfully')
        this.setState({title: response.message, description: 'Email Verification completed successfully and account has been activated.' })
      } else if(response.status === 'ERROR' && response.message){
        toast.error('Invalid Request')
        this.setState({title: 'Invalid Request', description: `${response.message}` })
      }else{
        toast.error('Invalid URL')
        this.setState({title: 'Invalid URL', description: 'Requested URL is invalid. Please reach out to admin, if you think its a mistake.' })
      }
    } else{
      toast.error('Invalid URL')
      this.setState({title: 'Invalid URL', description: 'Requested URL is invalid. Please reach out to admin, if you think its a mistake.' })
    }
  }

  render(){
    return (
        <Container fluid={true}>
        <div className="authentication-main mt-0">
          <Row>
            <Col xs="12">
              <div className="login-card">
                <div>
                  <div><a className="logo" href="#javascript"><img className="img-fluid for-light" src={require("../../assets/images/logo/login.png")} alt="looginpage"/><img className="img-fluid for-dark" src={require("../../assets/images/logo/logo_dark.png")} alt="looginpage"/></a></div>
                  <div className="login-main">
                    <h4>{this.state.title}</h4>
                    <hr />
                    <h6>{this.state.description}</h6>
                    <p className="mt-4 mb-0">{"Already Have an account?"}<a className="ml-2" href="/login">{SignIn}</a></p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        </Container>
    );
  }
}

export default withRouter(UnlockUser);