import React, { useState, useEffect } from "react";
import {Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import {useDispatch} from 'react-redux'
import {logout} from '../actions/index'
import './novel.css'






function Novels() {
    const dispatch=useDispatch();
    const [novels, setNovels] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      getNovels();
    }, []);

    function getNovels() {
      axios.get(`http://localhost/redux_project/backend/novels.php`).then((response) => {
          setNovels(response.data);
        })
    }
    
    const deleteBook = (id) => {
      axios.delete(`http://localhost:80/REACT_REDUX/book_app_redux/back_end/books.php/${id}/delete`).then((response)=>{
        navigate('/home')
      })
    }

    function getSearch(e) {
      e.preventDefault();
      axios.get(`http://localhost/redux_project/backend/search.php/${search}`).then((response)=>{

          setNovels(response.data)
        
      })
      
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value)
    }

    return (
   <>
    <Navbar id="navBarContainer">
    <img id='imgNav' src={require('../images/vector-illustration-search-icon-4099347-removebg-preview.png')} alt="" />
      <Container>
        <Navbar.Brand><form onSubmit={getSearch}><input id="search" placeholder="Search Of Your Novel" onChange={handleSearch} type="text"/><br/><button type="submit" id="add" style={{height : "24px" , fontSize : '16px' , width : '226px'}}>Search</button></form></Navbar.Brand>
      </Container>
      <Container id="diverr">
        <Navbar.Brand><a href="/addBook"><button id="add" style={{marginLeft : '5vw' , height : "4vw" , fontSize : '18px' , width : '125px'}}>Add Book</button></a></Navbar.Brand>
      </Container>
        <Nav >
            <Nav.Link id="logout" href="/Home"><button id="head" className="home">Home</button></Nav.Link>    
            <Nav.Link id="logout" href="/Profile"><button id="head" className="profile">Profile</button></Nav.Link>    
            <Nav.Link id="logout"><button id="head" className="out" onClick={()=>dispatch(logout())} >Logout</button></Nav.Link>     
        </Nav>
    </Navbar>
    <div><img src={require(`../images/Screenshot 2023-03-10 160248.png`)} style={{height : '90vh'}} alt="" /></div>
    <div id="landing">
      <p style={{visibility : "hidden"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, nostrum deserunt mollitia animi omnis explicabo laborum harum eos reprehenderit illum magni dolore quasi, vero consequuntur. Accusantium aut vel ab amet.</p>
      <div id="diver">
        <h1 className="text-center font-bold text-2xl" id="head">Novels</h1>
      </div>
      <div className="align-item center figureWEB">
        {novels.map((item , index)=>{
          return(
            <div style={{marginBottom: '4vw'}}>
              <img src={require(`../images/${item.image}`)} class="figure-img img-fluid rounded imagees" alt="..." />
              <p class="figure-caption" style={{width : '18vw' , direction : 'ltr' , color : '#f9a504'}}>{item['name']} - {item.author}</p>
              {/* <div style={{display : 'grid' , gridTemplateColumns : '1fr 1fr'}}>
                  <button>Edit</button>
                  <button>Delete</button>
              </div> */}
              <p class="figure-caption" style={{width : '18vw' , direction : 'ltr' , color : 'white'}}>{item['description']}</p>
            </div>
            )
        })}
      </div>   
   </div>
   </>
    )
}

export default Novels;