import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import {Form, Button, Alert} from 'react-bootstrap'

export default function CreateCategory() {
    const idRef = useRef("");
    const nameRef = useRef("");
    const[message, setMessage] = useState("");
    const[loading, setLoading] = useState(false);
    const[showMessage, setShowMessage] = useState(false);
    const addCategory = async () =>{
        fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/category",{
            method : "post",
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body : new URLSearchParams({
                'id' : idRef.current.value ,
                'name' : nameRef.current.value ,
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
            if(output.result == 1)
                setMessage("Data Added");
            else
                setMessage("Data Added Failed");
        })
    }
  return (
    <div className='col-md-6'>
        
        <h3 className='text-center my-3'>Category Add</h3>
        {showMessage &&  <Alert variant={(message=="Data Added") ? "primary" : "danger"} onClose={() => setShowMessage(false)} dismissible>{message} <Alert.Link href="/category-list">Check View</Alert.Link></Alert>}
        {loading && <h4>Data Loading...</h4>}
        <Form method='POST' onSubmit={(e)=>{
                    e.preventDefault();
                    addCategory();
                }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="number" placeholder="Enter ID" ref={idRef} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" ref={nameRef} required />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Add Category
                </Button>
                <Button variant='secondary' type='reset' className='ms-3'>
                    Reset
                </Button>
            </Form>
    </div>
  )
}
