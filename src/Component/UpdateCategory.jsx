import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {Form, Button, Alert} from 'react-bootstrap'

export default function UpdateCategory() {
    const location = useLocation();
    const{id, name} = (location.state !== null) ? location.state.categoryData : "";
    const idRef = useRef("");
    const nameRef = useRef("");
    const[message, setMessage] = useState("");
    const[loading, setLoading] = useState(false);
    const[showMessage, setShowMessage] = useState(false);
    const updateCategory = async () =>{
        await fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/category/"+idRef.current.value,{
            method : "PUT",
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body : new URLSearchParams({
                'name' : nameRef.current.value,
            })
        })
        .then((res)=>{
            setLoading(true)
            return res.json();
        })
        .then((output)=>{
            setShowMessage(true);
            setLoading(false);
            idRef.current.value = "";
            nameRef.current.value = "";
            if(output.data.modifiedCount > 0)
                setMessage("Data Updated");
            else if(output.data.modifiedCount === 0)
                setMessage("Data Not Changed");
            else
                setMessage("Something Wrong")
        })
    }
  return (
    <div className='col-md-6'>
        
        <h3 className='text-center my-3'>Category Update</h3>
        {showMessage &&  <Alert variant={(message==="Data Updated") ? "primary" : "danger"} onClose={() => setShowMessage(false)} dismissible>{message} <Alert.Link href="/category-list">Check View</Alert.Link></Alert>}
        {loading && <h4>Data Loading...</h4>}
        <Form method='POST' onSubmit={(e)=>{
                    e.preventDefault();
                    updateCategory();
                }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="number" placeholder="Enter ID" ref={idRef} defaultValue={id} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" ref={nameRef} defaultValue={name} required />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Update Category
                </Button>
                <Button variant='secondary' type='reset' className='ms-3'>
                    Reset
                </Button>
            </Form>
    </div>
  )
}
