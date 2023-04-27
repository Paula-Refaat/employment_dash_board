import image from './images/ApplyNow.jpg'
import React from 'react';
import Header from '../../Shared/Header';
const Home = () => {
    
    return (
        

        <div className='row'>
            <Header/>
        {/* <br></br>
        <br></br>
        <br></br>
        <br></br> */}
       {/*  <h1>Welcome to Admin Page</h1> */}
        <div style={{
            width:'2000px',
            height:'900px',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            backgroundAttachment:'fixed',
            backgroundPosition:'center',
            backgroundImage:`url(${image})`
        }}></div>

        {/* <div class="cont">
        <img className='body' src={image} alt="logo"/>
        </div> */}
        
 
        </div>
    );
};

export default Home;