import React, { Fragment, useState,useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input,Modal,ModalHeader,Media,ModalBody} from 'reactstrap'
import { Download, Eye, Trash2,RefreshCcw } from 'react-feather';
import { toast } from 'react-toastify'

import errorImg from '../../../assets/images/search-not-found.png';
import {AllFiles} from '../../../constant'
import SweetAlert from 'sweetalert2'
import {fetchAllFiles, deleteFile,restoreFile } from '../../../Actions/Trashmanager'
import  MyLoader  from '../../spinner/LoadingSpinner'

const Trashmanager = (props) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [myfile, setMyFile] = useState([])
  const [isActive, setisActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedViewFile, setselectedViewFile] = useState([]) 
  const [selectedViewFileName, setselectedViewFileName] = useState('') 


  // const [selectedDeleteFile, setselectedDeleteFile] = useState([]) 

  useEffect(() => {
     getAllData () 
  },[])

  async function getAllData () {
    setisActive(true)
    const response = await fetchAllFiles();
    if(response.status === 'SUCCESS'){
      setMyFile(response.data);
      setisActive(false)
    } else{
      toast.error("Something Went wrong")
      setisActive(false)
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
      setisActive(true)
        let response = await deleteFile(itemId);
        if(response.status === 'SUCCESS' && response.status){
          setMyFile(response.data);
          toast.success(`File deleted`);
          setisActive(false)
        } else{
          toast.error(`File not deleted`);
          setisActive(false)
        }
    } else{
        toast.error(`Something went wrong. Please try again`);
        setisActive(false)
    }
  }

  // const viewMarkedFile = async (itemId) => {
  //   if(itemId){
  //     toast.success(`File view clicked`);
  //   }
  // }
  
  const onOpenModal = (fileId) => {
    myfile.forEach((file, i) => {
      if (file._id === fileId) {
        if((file.fileType).includes('image')){
          setOpen(true);
            setselectedViewFileName((file.s3FileName).replace(`${file.userId}/uploads/`, ''))
            setselectedViewFile(file)
        } else{
          SweetAlert.fire({
            title: "File is not Image",
            text: "Currently, we supports image view functionality only. Please click download icon and then view the file",
            icon: "info",
          });
        }
      }
    })
  };

  const onCloseModal = () => {
    setOpen(false)
  };

  const restoreMarkedFile = async (itemId) =>{
    if(itemId){
      setisActive(true)
      let response = await restoreFile(itemId);
      if(response.status ==='SUCCESS' && response.status ){
        setMyFile(response.data);
        toast.success(`File restored Successfully`);
        setisActive(false)
      } else{
        toast.error(`Restoring File Failed`);
        setisActive(false)
      }
    } else{
      toast.error(`Something went wrong. Please try again`);
      setisActive(false)
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
                   <Eye className="btn-link text-grey mr-2" size={15}  onClick={() => onOpenModal(data._id)}/>
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
      <MyLoader active={isActive}>
      <Container fluid={true}>
        <Row>
          <Col xl="12" md="12" className="box-col-12">
            <div className="file-content">
            <Modal className="modal-lg modal-dialog-centered product-modal" isOpen={open}>
                  <ModalBody>
                    <ModalHeader toggle={onCloseModal}>
                      <div className="product-box row">
                        <Row>
                            <Col lg="12" className="product-img">
                              <Media className="img-fluid" src={selectedViewFile.publicUrl} alt="" />
                            </Col>
                     
                            <Col lg="12" className=" mt-3">
                                <h6>{selectedViewFileName} </h6>
                            </Col>
                        </Row>
                      </div>
                    </ModalHeader>
                  </ModalBody>
                </Modal>
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
      </MyLoader>
    </Fragment>
  );
}

export default Trashmanager;