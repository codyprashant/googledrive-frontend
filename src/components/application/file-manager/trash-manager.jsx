import React, { Fragment, useState,useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input} from 'reactstrap'
import { Download, Eye, Trash2,RefreshCcw } from 'react-feather';
import { toast } from 'react-toastify'

import errorImg from '../../../assets/images/search-not-found.png';
import {AllFiles} from '../../../constant'
import {fetchAllFiles, deleteFile,restoreFile } from '../../../Actions/Trashmanager'

const Trashmanager = (props) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [myfile, setMyFile] = useState([])


  // const [selectedDeleteFile, setselectedDeleteFile] = useState([]) 

  useEffect(() => {
     getAllData () 
  },[])

  async function getAllData () {
    const response = await fetchAllFiles();
    if(response.status === 'SUCCESS'){
      setMyFile(response.data);
    } else{
      toast.error("Something Went wrong")
    }
  }

  const handleChange = event => {
    event.preventDefault();
    setSearchTerm(event.target.value)
  };

  function getFontAwesomeIconFromMIME(mimeType) {
    var icon_classes = {
      // Media
      image: "fa-file-image-o",
      audio: "fa-file-audio-o",
      video: "fa-file-video-o",
      // Documents
      "application/pdf": "fa-file-pdf-o",
      "application/msword": "fa-file-word-o",
      "application/vnd.ms-word": "fa-file-word-o",
      "application/vnd.oasis.opendocument.text": "fa-file-word-o",
      "application/vnd.openxmlformats-officedocument.wordprocessingml":
        "fa-file-word-o",
      "application/vnd.ms-excel": "fa-file-excel-o",
      "application/vnd.openxmlformats-officedocument.spreadsheetml":
        "fa-file-excel-o",
      "application/vnd.oasis.opendocument.spreadsheet": "fa-file-excel-o",
      "application/vnd.ms-powerpoint": "fa-file-powerpoint-o",
      "application/vnd.openxmlformats-officedocument.presentationml":
        "fa-file-powerpoint-o",
      "application/vnd.oasis.opendocument.presentation": "fa-file-powerpoint-o",
      "text/plain": "fa-file-text-o",
      "text/html": "fa-file-code-o",
      "application/json": "fa-file-code-o",
      // Archives
      "application/gzip": "fa-file-archive-o",
      "application/zip": "fa-file-archive-o"
    };
  
    for (var key in icon_classes) {
      if (icon_classes.hasOwnProperty(key)) {
        if (mimeType.includes(key)) {
          return icon_classes[key];
        }
      } else {
        return "fa-file-o";
      }
    }
  }

  const deleteMarkedFile = async (itemId) => {
    if(itemId){
        let response = await deleteFile(itemId);
        if(response.status === 'SUCCESS' && response.status){
          setMyFile(response.data);
          toast.success(`File deleted`);
        } else{
          toast.error(`File not deleted`);
        }
    } else{
        toast.error(`Something went wrong. Please try again`);
    }
  }

  const viewMarkedFile = async (itemId) => {
    if(itemId){
      toast.success(`File view clicked`);
    }
  }

  const restoreMarkedFile = async (itemId) =>{
    if(itemId){
      let response = await restoreFile(itemId);
      if(response.status ==='SUCCESS' && response.status ){
        setMyFile(response.data);
        toast.success(`File restored Successfully`);
      } else{
        toast.error(`Restoring File Failed`);
      }
    } else{
      toast.error(`Something went wrong. Please try again`);
    }
  }

  // eslint-disable-next-line
  const filelist = myfile.filter((data) => {
    if(searchTerm == null)
        return data
    else if(data.s3FileName.toLowerCase().includes(searchTerm.toLowerCase())){
        return data
    }
    }).map((data,i)=>{
      return(
        <li className="file-box" key={i}>
          <div className="file-top"><i className={`fa ${getFontAwesomeIconFromMIME(data.fileType)}  txt-primary`} ></i>
          </div>
          <div className="file-bottom">
            <h6 style={{textOverflow:"ellipsis"}}>{(data.s3FileName).replace(`${data.userId}/trash/`, '')} </h6>
            <p className="mb-1">{parseInt(data.fileSize)/1000 + 'kb'}</p>
            <Row>
               <Col xl="8" md="8" className="box-col-12">
                 <div className="text-left mt-1 mb-1">
                   <Eye className="btn-link text-grey mr-2" size={15}  onClick={() => viewMarkedFile(data._id)}/>
                   <Trash2 className="btn-link text-grey mr-3" size={15} onClick={() => deleteMarkedFile(data._id)}/>
                   <RefreshCcw className="btn-link text-grey mr-2" size={15} onClick={() => restoreMarkedFile(data._id)}/>
                 </div>
               </Col>
               <Col xl="4" md="4" className="box-col-12">
                 <div className="text-right mt-1 mb-1">
                   <a className="btn-link text-primary" href={data.publicUrl}><Download   size={15}/></a>
                 </div>
               </Col>
            </Row>
          </div>
        </li>
      )
    })

 return (
    <Fragment>
      <Breadcrumb parent="Apps" title="Trash" />
      <Container fluid={true}>
        <Row>
          <Col xl="12" md="12" className="box-col-12">
            <div className="file-content">
              <Card>
                <CardHeader>
                <div className="media float-left mt-3 text-danger"><h6>Files will be automatically removed after 30 days of deletion</h6></div>
                  <div className="media float-right">
                    <Form className="form-inline">
                      <FormGroup>
                        <i className="fa fa-search"></i>
                        <Input
                          className="form-control-plaintext"
                          type="text"
                          value={searchTerm}
                          onChange={(e) => handleChange(e)}
                          placeholder="Search..." />
                      </FormGroup>
                    </Form>
                  </div>
                </CardHeader>
                {filelist.length > 0 ?
                  <CardBody className="file-manager">
                    <h4 className="mb-3">{AllFiles}</h4>
                    <ul className="files">
                      {filelist}
                    </ul>
                  </CardBody>
                  :
                  <CardBody className="file-manager m-auto">
                    <img className="img-fluid m-auto" src={errorImg} alt="" />
                     <h4 className="mb-3 text-center">No Files available...</h4>
                </CardBody>
                }
              </Card>
            </div>

          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Trashmanager;