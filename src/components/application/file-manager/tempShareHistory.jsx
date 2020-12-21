import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
} from "reactstrap";

import { toast } from "react-toastify";
import { fetchAllFiles } from "../../../Actions/TempShare";
import  MyLoader  from '../../spinner/LoadingSpinner'

const TempShareHistory = (props) => {

    const [myfile, setMyFile] = useState([]);
    const [isActive, setisActive] = useState(false);

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

     const filelist = myfile.map((data,i)=>{
        const date1 = new Date(data.creationDate);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        let link = '';
        let fontcolor = '';
        let downLink = '';
       if(((diffTime/3600000).toFixed(0)) < 48 || data.expired === 0){
            link = 'Download Link';
            fontcolor = 'success';
            downLink = data.publicUrl
       } else{
         link = 'Download Link Expired'
         fontcolor = 'secondary'
         downLink = '#';
       }
          return(
                <tr key={i}>
                    <td>
                        <div className="d-inline-block align-middle">
                            <div className="d-inline-block"><span>{`${data.firstName} ${data.lastName}`}</span>
                            <p className="font-roboto">{data.receiveremail}</p></div>
                        </div>
                    </td>
                    <td>{data.origfileName}</td>
                    <td>{(parseInt(data.fileSize)/1000).toFixed(2)} kb</td>
                    <td>{data.creationDate}</td>
                    
                    <td className="text-right"> <i className="fa fa-check-circle"></i><a href={downLink} className={`font-${fontcolor}`}>{link}</a> </td>
                </tr>
            )
        })

  return (
    <Fragment>
      <Breadcrumb parent="Apps" title="Share Files" />
      <MyLoader active={isActive}>
      <Container fluid={true}>
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <div className="best-seller-table responsive-tbl">
                  <div className="item">
                    <div className="table-responsive product-list">
                      <Table borderless>
                        <thead>
                          <tr>
                            <th>{"Receiver Name"}</th>
                            {/* <th>{"Email Id"}</th> */}
                            <th>{"File Name"}</th>
                            <th>{"Size"}</th>
                            <th>{"Shared On"}</th>
                            <th className="text-right">{"Status"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* <tr>
                            <td>
                              <div className="d-inline-block align-middle">
                                <div className="d-inline-block"><span>{"Johnketer"}</span> <p className="font-roboto">{"2019"}</p></div>
                              </div>
                            </td>
                            <td>{"06 August"}</td>
                            <td>{"CAP"}</td>
                            <td><i className="flag-icon flag-icon-gb"></i></td>
                            <td>{" "} <span className="label">{"$5,08,652"}</span> </td>
                            <td className="text-right"> <i className="fa fa-check-circle"></i>{"Done"} </td>
                          </tr> */}
                          {filelist}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      </MyLoader>
    </Fragment>
  );
};

export default TempShareHistory;
