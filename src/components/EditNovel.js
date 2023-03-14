import React, { useEffect, useState } from 'react';
import './EditNovel.css';
import './novel.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {Container, Navbar, Nav } from 'react-bootstrap';

import {useDispatch} from 'react-redux'
import {logout} from '../actions/index'

export default function EditBook() {


    const {id} = useParams();
    const navigate = useNavigate();
    const [inputs , setInputs] = useState("");
    const [file, setFile] = useState(null);
    // const [book , setBook] = useState([]);

    
    // useEffect(()=>{
    //     getUser();
    // } , [])

    // function getUser(){
    //     axios.get(`http://localhost/React/redux-project/backend/books.php/${id}`)
    //     .then(response => {
    //         console.log(response.data , 'sss');
    //         setBook(response.data);
    //         console.log(book);
    //     })
    // }
    const handleEditBook = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs( {...inputs , [name]: value})
      }
      const dispatch=useDispatch();

      const handleEditbooksubmit  = async (e) => {
        e.preventDefault();
    
        const formEditData = new FormData();
  
        formEditData.append("title", inputs['title']);
        formEditData.append("author", inputs['author']);
        formEditData.append("description", inputs['description']);
        formEditData.append("file", file);
      
        try {
          const response = await axios.post(
            `http://localhost/redux_project/backend/editBookProfile.php/${id}`, formEditData
          );
          console.log(response.data);
          navigate(`/Home`);
        //   window.location.assign(`/profile/${id}`);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <>

<Navbar id="navBarContainer">
    <img id='imgNav' src={require('../images/vector-illustration-search-icon-4099347-removebg-preview.png')} alt="" />
      <Container>
        {/* <Navbar.Brand><form onSubmit={getSearch}><input id="search" placeholder="Search Of Your Novel" onChange={handleSearch} type="text"/><br/><button type="submit" id="add" style={{height : "24px" , fontSize : '16px' , width : '226px'}}>Search</button></form></Navbar.Brand> */}
      </Container>
      <Container>
        <div style={{display : 'flex'}}>
            <Nav.Link id="logout" href="/Home"><button id="head" className="home">Home</button></Nav.Link>    
            <Nav.Link id="logout" href="/Profile"><button id="head" className="profile">Profile</button></Nav.Link> 
        </div>
            
      </Container>
        <Nav >
               
            <Nav.Link id="logout"><button id="head" className="out" onClick={()=>dispatch(logout())} >Logout</button></Nav.Link>     
        </Nav>
    </Navbar>

    <div id="landing">
<div className='profileForm' style={{marginTop : '0vw'}}>
    <h1 style={{ marginRight :  '10vw'}}>Edit Book</h1>
    <form onSubmit={handleEditbooksubmit}>
    <label htmlFor="">Name of The Novel</label>
      <input type="text" placeholder="title" name="title" onChange={handleEditBook} />
    {/* <label htmlFor="">Email</label>
      <input /> */}
    <label htmlFor="">Author</label>
      <input type="text"  placeholder="auther"  name="author"  onChange={handleEditBook} />
    <label htmlFor="">Description</label>
      <input  type="text"  placeholder="description" name="description" onChange={handleEditBook} />
      <br/>

      
      <input type="file" style={{border:'none',borderRadius:'0'}}  placeholder="image"   name="file" id="file"onChange={(e) => setFile(e.target.files[0])}/>


      <button  style={{color : 'white' , textDecoration : 'none' , fontSize : '18px'}} className="btn btn-primary btn-block mb-4 form-control diver" type='submit'>Submit</button>
    </form>
   </div>
   </div>
        
    </>
  )
}
