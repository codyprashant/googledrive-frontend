import React, { Fragment,useState,useEffect,useCallback } from 'react';
import {Row} from 'reactstrap'

import LeftHeader from './leftbar'
import RightHeader from './rightbar'


const Header = (props) => {
  // eslint-disable-next-line
  const [searchValue, setsearchValue] = useState('');
    const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      setsearchValue('')
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
        document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

 

  return (
      <Fragment>
      <div className="page-header">
      <Row className="header-wrapper m-0">
      
      <LeftHeader/>
      <RightHeader/>
      </Row>
    </div>
    </Fragment>
  );
}

export default Header;