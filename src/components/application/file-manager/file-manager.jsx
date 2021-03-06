import React, { Fragment, useState,useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Modal, Button,ModalHeader,Media,ModalBody,Label,ModalFooter } from 'reactstrap'
import { 
  // Upload, PlusSquare, 
  Download, Eye, Trash2 } from 'react-feather';
import { toast } from 'react-toastify'
import Dropzone from 'react-dropzone-uploader';
import errorImg from '../../../assets/images/search-not-found.png';
import {AllFiles
  // ,AddNew
} from '../../../constant'
import SweetAlert from 'sweetalert2'
import {uploadFile, fetchAllFiles, createFolder, deleteFile} from '../../../Actions/Filemanager'
import  MyLoader  from '../../spinner/LoadingSpinner'

const Filemanager = (props) => {

  // const [selectedFile, setSelectedFile] = useState(null)   
  const [searchTerm, setSearchTerm] = useState("");
  const [folderName, setfolderName] = useState("");
  const [myfile, setMyFile] = useState([])
  const [VaryingContentthree, setVaryingContentthree] = useState(false);
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  const VaryingContentthreetoggle = () => setVaryingContentthree(!VaryingContentthree);
  const [selectedDropFile, setSelectedDropFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedViewFile, setselectedViewFile] = useState([]) 
  const [selectedViewFileName, setselectedViewFileName] = useState('') 
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
     getAllData () 
  },[])

  async function getAllData () {
    // setisActive(true)
    const response = await fetchAllFiles();
    if(response.status === 'SUCCESS'){
      setMyFile(response.data);
      // setisActive(false)
    } else{
      // setisActive(false)
      toast.error("Something Went wrong")
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

  // const viewMarkedFile = (itemId) => {
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
          {/* <i className="fa fa-ellipsis-v f-14 ellips"  onClick={() => handleMarkedFile(data._id)}></i> */}
          </div>
          <div className="file-bottom">
            <h6 style={{textOverflow:"ellipsis"}}>{(data.s3FileName).replace(`${data.userId}/uploads/`, '')} </h6>
            <p className="mb-1">{parseInt(data.fileSize)/1000 + 'kb'}</p>
            <Row>
               <Col xl="8" md="8" className="box-col-12">
                 <div className="text-left mt-1 mb-1">
                   <Eye className="btn-link text-grey mr-2" size={15}  onClick={() => onOpenModal(data._id)}/>
                   <Trash2 className="btn-link text-grey mr-2" size={15} onClick={() => deleteMarkedFile(data._id)}/>
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

  const onDropFileChange =  ({ file }, status) => {
    setSelectedDropFile(file);
    if(status === 'done') toast.info("File selected as queue. Please click on Upload button to save")
  };

  const handleSubmit = async (files, allFiles) => {
    setisActive(true)
     allFiles.forEach(f => f.remove())
      if (selectedDropFile !== null) {
        if(selectedDropFile.size <5000000 ){
       const data = new FormData();
       data.append('file', selectedDropFile);
       let response = await uploadFile( data);
       if(response.status === 'SUCCESS'){
         
         setMyFile(response.data);
         setisActive(false)
         toast.success("File Upload Successfully !")
       }
       else{
        setisActive(false)
         toast.error("Something Went wrong")
       }
      }else{
        setisActive(false)
        toast.error("Select lesser size file");
      }
     } else{
       toast.error("Plese Select at least one file !")
       setisActive(false)
     }
}

 return (
    <Fragment>
      <Breadcrumb parent="Apps" title="File Manager" />
      <MyLoader active={isActive}>
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
                  <Row>
                  <Col sm="6" >
                    <h4 className="mb-3">{AllFiles}</h4>
                    </Col>
                    <Col sm="6" >
                    <div className="text-right">
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
                    </Col>
        </Row>
                  {/* </div> */}
                </CardHeader>
                <Card>
                            
                            <CardBody>
                                <Form>
                                    <div className="dz-message needsclick">
                                       <Dropzone
                                            // onChangeStatus={onDropFileChange}
                                            // onSubmit={handleSubmit}
                                            // minFiles={1}
                                            // maxFiles={1}
                                            // inputContent="Drop files here or click to upload"
                                            // inputWithFilesContent={"Drop files here or click to upload"}
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={onDropFileChange}
                                            onSubmit={handleSubmit}
                                            maxFiles={1}
                                            maxSize = {1}
                                            inputContent="Drop files here or click to upload"
                                            
                                        />
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                {filelist.length > 0 ?

                  <CardBody className="file-manager">
                    
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

export default Filemanager;