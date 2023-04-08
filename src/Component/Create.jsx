import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const navigate = useNavigate();
    const[categoryList, setCategoryList] = useState([]);
    const[message, setMessage] = useState("");
    const[loading, setLoading] = useState(false);
    const[showMessage, setShowMessage] = useState(false);
    const idRef = useRef("");
    const nameRef = useRef("");
    const priceRef = useRef("");
    const categoryRef = useRef("");
    const detailsRef = useRef(""); 

    const getAllCategory = async () =>{
        await fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/category")
        .then((res)=>{
            setLoading(true)
            return res.json();
        })
        .then((output)=>{
            setLoading(false)
            setCategoryList(output.data);
        })
    }
    const addProduct = async () =>{
        await fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/product",{
            method : "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body : new URLSearchParams({
                'id' : idRef.current.value ,
                'name' : nameRef.current.value ,
                'price' : priceRef.current.value ,
                'category' : categoryRef.current.value ,
                'details' : detailsRef.current.value 
            })
        })
        .then((res)=>{
            setLoading(true)
            return res.json();
        })
        .then((output)=>{
            setShowMessage(true);
            setLoading(false);
            if(output.result == 1)
                setMessage("Data Added");
            else
                setMessage("Data Added Failed");
        })
    }
    useEffect(()=>{
        getAllCategory();
    },[])
  return (
    <div className='col-md-6'>
        <h3 className='text-center my-3'>Product Add</h3>
        {showMessage &&  <Alert variant={(message=="Data Added") ? "primary" : "danger"} onClose={() => setShowMessage(false)} dismissible>{message}  <Alert.Link href="/">Check View</Alert.Link></Alert>}
        {loading && <h4>Data Loading...</h4>}
        {!loading && 
            <Form method='POST' onSubmit={(e)=>{
                e.preventDefault();
                addProduct();
            }}>
                <Form.Group className="mb-3" controlId="formBasicID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="number" placeholder="Enter ID" ref={idRef} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" ref={nameRef} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price" ref={priceRef} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <div className="category-box d-flex">
                        <Form.Select aria-label="Default select example" ref={categoryRef} required>
                            <option value="">Open this select menu</option>
                            {
                                categoryList.map((singleCategory)=>{
                                    return <option value={singleCategory.name}>{singleCategory.name}</option>
                                })
                            }
                        </Form.Select>
                        <Button className='ms-3' onClick={()=>{
                            navigate("/create-category")
                        }}>Add</Button>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDetails">
                    <Form.Label>Details</Form.Label>
                    <Form.Control type="text" placeholder="Enter Details" ref={detailsRef} required />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Add Product
                </Button>
                <Button variant='secondary' type='reset' className='ms-3'>
                    Reset
                </Button>
            </Form>}
    </div>
  )
}
