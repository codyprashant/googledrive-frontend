import React, { Fragment, useState,useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Modal, Button,ModalHeader,ModalBody,Label,ModalFooter } from 'reactstrap'
import { Upload, PlusSquare } from 'react-feather';
import { toast } from 'react-toastify'
import Dropzone from 'react-dropzone-uploader';
import errorImg from '../../../assets/images/search-not-found.png';
import {AllFiles,AddNew, AddFolder} from '../../../constant'
import {uploadFile, fetchAllFiles, createFolder} from '../../../Actions/Filemanager'

const Filemanager = (props) => {

  const [selectedFile, setSelectedFile] = useState(null)   // Initially, no file is selected  
  const [searchTerm, setSearchTerm] = useState("");
  const [folderName, setfolderName] = useState("");
  const [myfile, setMyFile] = useState([])
  const [VaryingContentthree, setVaryingContentthree] = useState(false);
  const VaryingContentthreetoggle = () => setVaryingContentthree(!VaryingContentthree);
  const [selectedDropFile, setSelectedDropFile] = useState(null) 

  useEffect(() => {
     getAllData () 
  },[])

  async function getAllData () {
    const response = await fetchAllFiles();
    if(response.status === 'SUCCESS'){
      setMyFile(response.data);
    } else{
      toast.error("Smething Went wrong")
    }
  }

  const handleChange = event => {
    event.preventDefault();
    setSearchTerm(event.target.value)
  };

  const addFolder = async(e) =>{
    e.preventDefault();
    let response = await createFolder(folderName);
    if(response.status === 'SUCCESS'){
      setMyFile(response.data);
      toast.success("File Upload Successfully !")
    }
    else{
      toast.error("Smething Went wrong")
    }
  }

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
          <div className="file-top"><i className={`fa ${getFontAwesomeIconFromMIME(data.fileType)}  txt-primary`} ></i><i className="fa fa-ellipsis-v f-14 ellips"></i></div>
          <div className="file-bottom">
            <h6 style={{textOverflow:"ellipsis"}}>{(data.s3FileName).replace(`${data.userId}/uploads/`, '')} </h6>
            <p className="mb-1">{parseInt(data.fileSize)/1000 + 'kb'}</p>
            <div className="text-right mt-1 mb-1">
             <a className="btn-link text-danger" href={data.publicUrl}>Download File</a>
              </div>
          </div>
        </li>
      )
    })

  const getFile = () => {
    document.getElementById("upfile").click();
  }

  const onFileChange = event => {
    // Update the state 
    setSelectedFile(event.target.files[0]);
    toast.info("File selected as queue. Please click on Upload button to save")
  };

  const onDropFileChange =  ({ file }, status) => {
    // Update the state 

    setSelectedDropFile(file);
    toast.info("File selected as queue. Please click on Upload button to save")
  };

  const handleSubmit = async (files, allFiles) => {
     allFiles.forEach(f => f.remove())
      if (selectedDropFile !== null) {
       const data = new FormData();
       data.append('file', selectedDropFile);
       let response = await uploadFile( data);
       if(response.status === 'SUCCESS'){
         
         setMyFile(response.data);
         toast.success("File Upload Successfully !")
       }
       else{
         toast.error("Something Went wrong")
       }
     } else{
       toast.error("Plese Select at least one file !")
     }
}

  const onFileUpload = async () => {
    if (selectedFile !== null) {
    const data = new FormData();
    data.append('file', selectedFile);
    let response = await uploadFile( data);
    if(response.status === 'SUCCESS'){
      setMyFile(response.data);
      toast.success("File Upload Successfully !")
    }
    else{
      toast.error("Smething Went wrong")
    }
  } else{
    toast.error("Plese Select at least one file !")
  }
  }

 return (
    <Fragment>
      <Breadcrumb parent="Apps" title="File Manager" />
      <Container fluid={true}>
        <Row>
          
          <Col xl="12" md="12" className="box-col-12">

            <div className="file-content">
                           
                <Modal isOpen={VaryingContentthree} toggle={VaryingContentthreetoggle}>
                     <ModalHeader toggle={VaryingContentthreetoggle}>
                        Specify your New Folder Name
                     </ModalHeader>
                     <Form onSubmit={(e) => addFolder(e)}>
                      <ModalBody>
                          <FormGroup>
                            <Label className="col-form-label" for="recipient-name">{"Folder Name"}</Label>
                            <Input className="form-control" type="text" name="FolderName" value={folderName} onChange={(e) => {e.preventDefault(); setfolderName(e.target.value)}} placeholder="Name"/>
                          </FormGroup>
                       </ModalBody>
                      <ModalFooter>
                            <Button color="secondary" onClick={VaryingContentthreetoggle}>Cancel</Button>
                            <Button color="primary" onClick={VaryingContentthreetoggle}>Create</Button>
                      </ModalFooter>
                      </Form>
                </Modal>
           

              <Card>
                <CardHeader>
                  <div className="media">
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
                    <div className="media-body text-right">
                      <Form className="d-inline-flex">
                      <div className="btn btn-primary mr-1" onClick={VaryingContentthreetoggle}> <PlusSquare />{AddFolder}</div>
                        <div className="btn btn-primary" onClick={getFile}> <PlusSquare />{AddNew}</div>
                        <div style={{ height: "0px", width: "0px", overflow: "hidden" }}>
                          <input id="upfile" multiple type="file" onChange={(e) => onFileChange(e)} />
                        </div>

                      </Form>
                      <div className="btn btn-outline-primary ml-1" onClick={onFileUpload}><Upload />{"Upload"}</div>
                    </div>
                  </div>
                </CardHeader>
                <Card>
                            
                            <CardBody>
                                <Form>
                                    <div className="dz-message needsclick">
                                       <Dropzone
                                            onChangeStatus={onDropFileChange}
                                            onSubmit={handleSubmit}
                                            maxFiles={1}
                                            inputContent="Drop or drop Files"
                                            inputWithFilesContent={"Drag or Drop a file"}
                                            
                                        />
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
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

export default Filemanager;