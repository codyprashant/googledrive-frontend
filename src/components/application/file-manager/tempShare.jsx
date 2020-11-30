import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Label, Button, Spinner } from 'reactstrap'
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone-uploader';
import {uploadFile} from '../../../Actions/TempShare'
import {  useHistory } from 'react-router-dom'

const Checkout = (props) => {
  let history = useHistory();

//   const { register, handleSubmit, errors } = useForm()
  const [selectedDropFile, setSelectedDropFile] = useState(null) 
  const [firstName, setfirstName] = useState('') 
  const [lastName, setlastName] = useState('') 
  const [receiveremail, setreceiveremail] = useState('') 
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  const [isLoading,setisLoading] = useState(false)
  const [uploadingStatus,setisuploadingStatus] = useState(false)

  const onDropFileChange =  ({ file }, status) => {
    setSelectedDropFile(file);
    if(status === 'done') {
      setisuploadingStatus(true)
      toast.info("File selected as queue. Please click on Send button when ready")
    }
  };


const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true)
    if (e !== "" && firstName !== "" && lastName !== "" && receiveremail !== "") {
      if (selectedDropFile !== null) {
        if(selectedDropFile.size <5000000 ){
        const data = new FormData();
        data.append("file", selectedDropFile);
        data.append("firstName", firstName);
        data.append("lastName", lastName);
        data.append("receiveremail", receiveremail);
        let response = await uploadFile(data);
        if (response.status === "SUCCESS") {
          toast.success("File Sent Successfully !");
          history.push(`/app/tempShareHistory`)
        } else {
          toast.error("Something Went wrong");
          setisuploadingStatus(false)
          setisLoading(false)
        }
      }else{
        toast.error("Select lesser size file");
        setisuploadingStatus(false)
        setisLoading(false)
      }
      } else {
        toast.error("File not Selected");
        setisuploadingStatus(false)
        setisLoading(false)
      }
    } else {
        toast.error("Form is not filled");
        setisLoading(false)
        setisuploadingStatus(false)
    }
  };

  return (
    <Fragment>
      <Breadcrumb parent="Apps" title="Share Files" />
      <Container fluid={true}>
        <Row>
          <Col>
            <Card className="checkout">
              <CardHeader>
                <h5>{'Share your files free to anyone, anywhere'}</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xl="12" sm="12">
                    <Form onSubmit={(e) => onSubmit(e)} className="needs-validation">
                      <div className="form-row">
                        <FormGroup className="col-sm-6">
                          <Label>{`Receivers First Name`}</Label>
                          <Input type="text" name="receiverfirstName" value={firstName} onChange={(e) => setfirstName(e.target.value)} required />

                        </FormGroup>
                        <FormGroup className="col-sm-6">
                          <Label>{`Receivers Last Name`}</Label>
                          <Input type="text" name="receiverlastName" value={lastName} onChange={(e) => setlastName(e.target.value)} required />

                        </FormGroup>
                      </div>
                      <div className="form-row">
                        <FormGroup className="col-sm-6">
                          <Label>{`Receivers Email Address(Only one email can be added)`}</Label>
                          <Input type="email" name="receiverEmail" value={receiveremail} onChange={(e) => setreceiveremail(e.target.value)} required />
            
                        </FormGroup>
                        
                      </div>
                      <div className="dz-message needsclick mt-3 mb-3">
                            <Dropzone
                                getUploadParams={getUploadParams}
                                onChangeStatus={onDropFileChange}
                                maxFiles={1}
                                maxSize = {1}
                                inputContent="Drop files here or click to upload"
                            />
                       </div>
                      

                      {/* <Button color="primary" type="submit" className="mt-2 pull-right">{'Send File'}</Button> */}
                      { isLoading ?             
                          <Button color="primary" type="submit" className="mt-2 pull-right" disabled>
                              Sending File <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                          </Button> : 
                          (uploadingStatus ?
                            <Button  color="primary" type="submit" className="mt-2 pull-right" >{'Send File'}</Button>
                             : <Button  color="primary" type="submit" className="mt-2 pull-right" disabled>{'Send File'}</Button>
                          
                          )
                        }
                    </Form>
                  </Col>
                  <Col xl="6" sm="12">
                    
                  </Col>
                </Row >
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Checkout;