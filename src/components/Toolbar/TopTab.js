import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link,HashRouter,withRouter,useLocation } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});


function TopTab() {
  const classes = useStyles();

  // console.log("mmmmmmmmmmmmmmm"+localStorage.getItem('currentTab'))
  
  // localStorage.setItem('currentTab', 0);
  const [value, setValue] = React.useState(Number(localStorage.getItem('currentTab')));
  // console.log("/////////////",value)
  
  const handleChange = (event, newValue) => {
    localStorage.setItem('currentTab', newValue);
    setValue(Number(localStorage.getItem('currentTab')));
  };



  window.addEventListener("hashchange",(e) => {
    // localStorage.setItem('currentTab', e.newValue);
  //  handleChange(null, e.newValue);  
    // localStorage.setItem('currentTab', e.newValue);
    // setValue(Number(localStorage.getItem('currentTab')));
    //TODO: just read the local storage value and change the tabs
    setValue(Number(localStorage.getItem('currentTab')));
  });



  return (
    <div className={classes.root} >
       {/* I HAVE USED HashRouter THEN ONLY IT WORKED FINE HERE BELOW AND ASLO IN APP.JS COMPONENT*/}
      <HashRouter>
      <CssBaseline />
      <AppBar position="fixed"  style={{borderBottomRightRadius:'70px',backgroundColor:'white'}}>
      {/* <Typography variant="h6" noWrap style={{textShadow: '2px 2px 5px yellow',paddingLeft: '15px', paddingTop: '5px', color:'black'}}>
            {"< CapsCode />"}
      </Typography> */}
      <a href="https://www.capscode.in" target="_blank" style={{textDecoration: 'none',width:'5.5em', height:'3em'}}>
        <img style={{width:'5em', height:'2.5em', paddingLeft:'20px',paddingTop:'3px'}} src={require('./cap.png')} alt="capscode" />
      </a>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="primary"
        // variant="scrollable" //this is commented as both varient:scrollable and centered will not work together
        scrollButtons="auto"  //on
        aria-label="scrollable auto tabs example"   
        centered     

      >
        <Tab label="Home" component={Link} to='/' value={0} />
        <Tab label="Courses" component={Link} to='/course' value={1}/>
        <Tab label="Career" component={Link} to='/career'value={2}/>
        <Tab label="About Us" component={Link} to='/aboutus' value={3}/>
        <Tab label="Contact" component={Link} to='/contact' value={4}/>
        {/* <Tab label="Blog" component={Link} to='/blog' value={5}/>
        <Tab label="Gallery" component={Link} to='/gallery' value={6}/>
        <Tab label="Services" component={Link} to='/services' value={7}/> */}
      </Tabs>
      
      </AppBar>

      </HashRouter>
    </div>
  );
}


export default TopTab;