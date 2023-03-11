import React, { useState, useEffect } from "react";
import {Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import {useDispatch} from 'react-redux'
import {logout} from '../actions/index'
import './novel.css'
import './AddNovel.css'

function AddBook() {

    const current_ID = 1 ;
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [auther, setAuther] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const dispatch=useDispatch();
    const [novels, setNovels] = useState([]);

    function getNovels() {
      axios.get(`http://localhost/redux_project/backend/novels.php`).then((response) => { console.log(response.data)
          setNovels(response.data);
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("auther", auther);
        formData.append("description", description);
        formData.append("user_id", current_ID);
        formData.append("file", file);
    
        try {
          const response = await axios.post(
            "http://localhost/redux_project/backend/books.php",
            formData
          );
          console.log(response.data);
          navigate('/home');
        } catch (error) {
          console.error(error);
        }
      };

    

  return (
      <>
        <Navbar id="navBarContainer">
        <img id='imgNav' src={require('../images/vector-illustration-search-icon-4099347-removebg-preview.png')} alt="" />
        <Container>
            <Navbar.Brand href="#home"><form><input type="text"/><br/><button id="add" style={{height : "24px" , fontSize : '16px' , width : '225px'}}>Search</button></form></Navbar.Brand>
        </Container>
        <Container id="diverr">
            <Navbar.Brand href="#home"><a href="/addBook"><button id="add" style={{marginLeft : '5vw' , height : "4vw" , fontSize : '18px' , width : '125px'}}>Add Book</button></a></Navbar.Brand>
        </Container>
            <Nav >
            <Nav.Link id="logout" href="/Home"><button id="head">Home</button></Nav.Link>    
            <Nav.Link id="logout" href="/Profile"><button id="head">Profile</button></Nav.Link>    
            <Nav.Link id="logout" href="#home"><button id="head" onClick={()=>dispatch(logout())} >Logout</button></Nav.Link>    
            </Nav>
        </Navbar>
        <div id="landing">
            <p style={{visibility : "hidden"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, nostrum deserunt mollitia animi omnis explicabo laborum harum eos reprehenderit illum magni dolore quasi, vero consequuntur. Accusantium aut vel ab amet.</p>
            <div id="diver"><h1 className="text-center font-bold text-2xl" id="head">Add New <br/>Novel</h1></div>

            <div id= "formm">
                <section className="section_form">
                    <form id="consultation-form" className="feed-form" onSubmit={handleSubmit}>
                        <input  name="title" placeholder="Novel Title" type="text" id="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br /><br />
                        <input  name="title" placeholder="Novel Auther" type="text" id="text" value={auther} onChange={(e) => setAuther(e.target.value)} /><br /><br />
                        <input name="description" style={{height: '6vw'}}  placeholder="Novel Description"  type="text" id="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br /><br />
                        <input type="file"  name="img" id="file" accept="image/*"  onChange={(e) =>setFile(e.target.files[0])} hidden/>
                        <label className="label" htmlFor="file">
                            <img id="imgAdd" src={require('../images/1000_F_34888532_xfjT9wciy5Le0DO3ZiZT7ds0WkpM6v8t-removebg-preview.png')} alt="" />
                            <p id="imgLabel">Add Image To Your Novel</p>
                        </label>
                        <br/>
                        <button id="addNovelDB" type="submit"><img src={require('../images/add-book-icon_1950624-removebg-preview.png')} alt="" /></button>
                    </form>
                </section>
            </div>
        </div>
        
    </>
  )
}

export default AddBook