import React, { Fragment, useState, useEffect } from 'react';
import { MENUITEMS } from './menu';
import { ArrowRight, ArrowLeft, Grid } from 'react-feather';
import { Link } from 'react-router-dom'
import { translate } from 'react-switch-lang';
import {  Row, Col, Card, CardBody } from 'reactstrap'
import { getDriveStats } from '../../Actions/Filemanager'

const Sidebar = (props) => {

  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const [sizeStats, setsizeStats] = useState({});

  useEffect(() => {

    document.querySelector(".left-arrow").classList.add("d-none")

    window.addEventListener('resize', handleResize)
    handleResize();
    getDriveStatistics();
    // console.log(sizeStats)
    const currentUrl = window.location.pathname;
    mainmenu.map(items => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl)
          setNavActive(Items)
        if (!Items.children) return false
        Items.children.filter(subItems => {
          if (subItems.path === currentUrl)
            setNavActive(subItems)
          if (!subItems.children) return false
          subItems.children.filter(subSubItems => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems)
              return true
            }
            else {
              return false
            }
          })
          return subItems
        })
        return Items
      })
      return items
    })

    return () => {
      window.removeEventListener('resize', handleResize)
    }

    // eslint-disable-next-line
  }, []);

  const getDriveStatistics = async ()=>{
    let response = await getDriveStats();
    // console.log(response)
    if(response.status === 'SUCCESS'){
      setsizeStats({
        size: convertsizetoMb(response.data.usedSpace), allocated: convertsizetoMb(response.data.allocated),
        trash: convertsizetoMb(response.data.trash), tempSpace: convertsizetoMb(response.data.tempSpace),
        tempAllocate: convertsizetoMb(response.data.tempAllocate), trashAllocate: convertsizetoMb(response.data.trashAllocate)
      })
    }
    else{
      setsizeStats({
        size: convertsizetoMb(0), allocated: convertsizetoMb(50000000), trash: convertsizetoMb(0), tempSpace: convertsizetoMb(0),
        tempAllocate: convertsizetoMb(200000000), trashAllocate: convertsizetoMb(10000000)
      })
    }
  }
  const percentage = (num, per) =>{
    return (num/per)*100;
  }

  const convertsizetoMb = (size) =>{
    return ((parseInt(size)/1000000).toFixed(2));
  }

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  }

  const setNavActive = (item) => {
    MENUITEMS.map(menuItems => {
      menuItems.Items.filter(Items => {
        if (Items !== item)
          Items.active = false
        if (Items.children && Items.children.includes(item))
          Items.active = true
        if (Items.children) {
          Items.children.filter(submenuItems => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true
              submenuItems.active = true
              return true
            }
            else {
              return false
            }
          })
        }
        return Items
      })
      return menuItems
    })
    item.active = !item.active
    setMainMenu({ mainmenu: MENUITEMS })
  }

  const toggletNavActive = (item) => {
    
    if(window.innerWidth <= 991){
      document.querySelector(".page-header").className = "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
      document.querySelector(".mega-menu-container").classList.remove("d-block")
      if(item.type === "sub"){
        document.querySelector(".page-header").className = "page-header ";
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper "
      }
    }

    if (!item.active) {
      MENUITEMS.map(a => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item))
            Items.active = false
          if (!Items.children) return false
          Items.children.forEach(b => {
            if (Items.children.includes(item)) {
              b.active = false
            }
            if (!b.children) return false
            b.children.forEach(c => {
              if (b.children.includes(item)) {
                c.active = false
              }
            })
          })
          return Items
        });
        return a
      });
    }
    item.active = !item.active
    setMainMenu({ mainmenu: MENUITEMS })
  }

  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if(width === 492){
        setMargin(-3570)
      }else{
        setMargin(-3464)
      }
      document.querySelector(".right-arrow").classList.add("d-none")
      document.querySelector(".left-arrow").classList.remove("d-none")
    }else {
      setMargin(margin => margin += (-width));
      document.querySelector(".left-arrow").classList.remove("d-none")
    }
  }

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0)
      document.querySelector(".left-arrow").classList.add("d-none")
      document.querySelector(".right-arrow").classList.remove("d-none")
    } else {
      setMargin(margin => margin += width);
      document.querySelector(".right-arrow").classList.remove("d-none")
    }
  }

  const openCloseSidebar = (toggle) => {
    if (toggle) {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className = "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
    } else {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className = "page-header";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper "
    }
  };

  const responsiveSidebar = () => {
    document.querySelector(".page-header").className = "page-header close_icon";
    document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon"
  }
  
  return (
    <Fragment>
      <div className="sidebar-wrapper">
        <div className="logo-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/app/file-manager`}>
            <img className="img-fluid for-light" src={require("../../assets/images/logo/logo.png")} alt="" />
            <img className="img-fluid for-dark" src={require("../../assets/images/logo/logo_dark.png")} alt="" />
          </Link>
          <div className="back-btn" onClick={() => responsiveSidebar()}><i className="fa fa-angle-left"></i></div>
          <div className="toggle-sidebar" onClick={() => openCloseSidebar(sidebartoogle)}><Grid className="status_toggle middle sidebar-toggle" /></div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/app/file-manager`}><img className="img-fluid" src={require("../../assets/images/logo/logo-icon.png")} alt="" /></Link>
        </div>
        <nav className="sidebar-main">
            <div className="left-arrow" onClick={scrollToLeft}><ArrowLeft /></div>
            <div id="sidebar-menu" style={{ 'marginLeft': margin + 'px' } }>
              <ul className="sidebar-links custom-scrollbar" >
                <li className="back-btn">
                  <div className="mobile-back text-right"><span>{"Back"}</span><i className="fa fa-angle-right pl-2" aria-hidden="true"></i></div>
                </li>
                {
                  MENUITEMS.map((Item, i) =>
                    <Fragment key={i}>
           
                      {Item.Items.map((menuItem, i) =>
                        <li className="sidebar-list" key={i}>
                          {(menuItem.type === 'sub') ?
                            <a className={`sidebar-link sidebar-title  ${menuItem.active ? 'active' : ''}`} href="#javascript" onClick={() => setNavActive(menuItem)}>
                              <menuItem.icon />
                              <span>{props.t(menuItem.title)}</span>
                              {menuItem.badge ? <label className={menuItem.badge}>{menuItem.badgetxt}</label> : ""}
                              <div className="according-menu">
                                {menuItem.active ?
                                  <i className="fa fa-angle-down"></i>
                                  : <i className="fa fa-angle-right"></i>
                                }
                              </div>
                            </a>
                            : ''}

                          {(menuItem.type === 'link') ?
                            <Link  to={menuItem.path} className={`sidebar-link sidebar-title link-nav  ${menuItem.active ? 'active' : ''}`} href="#javascript" onClick={() => toggletNavActive(menuItem)}>
                              <menuItem.icon />
                              <span>{props.t(menuItem.title)}</span>
                              {menuItem.badge ? <label className={menuItem.badge}>{menuItem.badgetxt}</label> : ""}
                            </Link>
                            : ''}

                          {menuItem.children ?

                            <ul className="sidebar-submenu"
                              style={menuItem.active ? sidebartoogle ? { opacity: 1, transition: 'opacity 500ms ease-in' } : { display: "block" } : { display: "none" }}>

                              {menuItem.children.map((childrenItem, index) => {

                                return (
                                  <li key={index}>

                                    {(childrenItem.type === 'sub') ?
                                      <a className={`${childrenItem.active ? 'active' : ''}`} href="#javascript" onClick={() => toggletNavActive(childrenItem)}>{props.t(childrenItem.title)}
                                        <span className="sub-arrow">
                                          <i className="fa fa-chevron-right"></i>
                                        </span>
                                        <div className="according-menu">
                                          {childrenItem.active ?
                                            <i className="fa fa-angle-down"></i>
                                            : <i className="fa fa-angle-right"></i>
                                          }
                                        </div>
                                      </a>
                                      : ''}

                                    {(childrenItem.type === 'link') ?
                                      <Link  to={childrenItem.path} className={`${childrenItem.active ? 'active' : ''}`} onClick={() => toggletNavActive(childrenItem)}>{props.t(childrenItem.title)}</Link>
                                      : ''}

                                    {childrenItem.children ?
                                      <ul className="nav-sub-childmenu submenu-content"
                                        style={childrenItem.active ? { display: "block" } : { display: "none" }}
                                      >
                                        {childrenItem.children.map((childrenSubItem, key) =>
                                          <li key={key}>
                                            {(childrenSubItem.type === 'link') ?
                                              <Link to={childrenSubItem.path} className={`${childrenSubItem.active ? 'active' : ''}`} onClick={() => toggletNavActive(childrenSubItem)}>{props.t(childrenSubItem.title)}</Link>
                                              : ''}
                                          </li>
                                        )}
                                      </ul>
                                      : ""}

                                  </li>
                                )
                              })}
                            </ul>
                            : ''}
                        </li>)}
                        
                    </Fragment>
                  )}
                  <li className="sidebar-list mt-3">
                          <Card className="xs-none" style={{padding:"0px"}}>
                            <CardBody className="ecommerce-widget"  style={{padding:"15px"}}>
                              <Row>
                                  <Col xs="12"><h6 className="total-num counter"> {"Drive Size"} </h6> </Col>
                              </Row>
                              <Row>
                                  <Col xs="12"><span>{`${sizeStats.size} of ${sizeStats.allocated} MB used`}</span> </Col>
                              </Row>
                              <Row>
                                  <Col xs="12">
                                      <div className="progress-showcase" style={{marginTop:"15px"}}>
                                        <div className="progress sm-progress-bar">
                                          <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${percentage(sizeStats.size, sizeStats.allocated )}%` }} aria-valuenow= {percentage(sizeStats.size, sizeStats.allocated )} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                      </div>
                                  </Col>
                              </Row>
                            </CardBody>
                          </Card>
                      </li>

                      <li className="sidebar-list">
                          <Card className="xs-none" style={{padding:"0px"}}>
                            <CardBody className="ecommerce-widget"  style={{padding:"15px"}}>
                              <Row>
                                  <Col xs="12"><h6 className="total-num counter"> {"Trash"} </h6> </Col>
                              </Row>
                              <Row>
                                  <Col xs="12"><span>{`${sizeStats.trash} of ${sizeStats.trashAllocate} MB used`}</span> </Col>
                              </Row>
                              <Row>
                                  <Col xs="12">
                                      <div className="progress-showcase" style={{marginTop:"15px"}}>
                                        <div className="progress sm-progress-bar">
                                          <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${percentage(sizeStats.trash, sizeStats.trashAllocate )}%` }} aria-valuenow= {percentage(sizeStats.trash, sizeStats.trashAllocate )}aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                      </div>
                                  </Col>
                              </Row>
                            </CardBody>
                          </Card>
                      </li>

                      <li className="sidebar-list">
                          <Card className="xs-none" style={{padding:"0px"}}>
                            <CardBody className="ecommerce-widget"  style={{padding:"15px"}}>
                              <Row>
                                  <Col xs="12"><h6 className="total-num counter"> {"Temporary Share"} </h6> </Col>
                              </Row>
                              <Row>
                                  <Col xs="12"><span>{`${sizeStats.tempSpace} of ${sizeStats.tempAllocate} MB used`}</span> </Col>
                              </Row>
                              <Row>
                                  <Col xs="12">
                                      <div className="progress-showcase" style={{marginTop:"15px"}}>
                                        <div className="progress sm-progress-bar">
                                          <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${percentage(sizeStats.tempSpace, sizeStats.tempAllocate )}%` }} aria-valuenow={percentage(sizeStats.tempSpace, sizeStats.tempAllocate )} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                      </div>
                                  </Col>
                              </Row>
                            </CardBody>
                          </Card>
                      </li>
              </ul>
            </div>
            <div className="right-arrow" onClick={scrollToRight}><ArrowRight /></div>
        </nav>
      </div>
    </Fragment>
  );
}
export default translate(Sidebar);