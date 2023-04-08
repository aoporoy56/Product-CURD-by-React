import React from 'react'
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Update() {
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
    const location = useLocation();
    const {id, name, price, category, details} = (location.state !== null) ? location.state.productData : "";
    const updateProduct = async () =>{
        await fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/product/"+idRef.current.value,{
            method : "PUT",
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body : new URLSearchParams({
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
            console.log(output.message)
            if(output.data.modifiedCount === 1)
                setMessage("Data Updated");
            else if(output.data.modifiedCount === 0)
                setMessage("Data Not Changed");
            else
                setMessage("Something Wrong")
        })
    }
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

    useEffect(()=>{
        getAllCategory();
    },[])
  return (
    <div className='col-md-6'>
        <h3 className='text-center my-3'>Product Update</h3>
        {showMessage &&  <Alert variant={(message==="Data Updated") ? "primary" : "danger"} onClose={() => setShowMessage(false)} dismissible>{message}  <Alert.Link href="/">Check View</Alert.Link></Alert>}
        {loading && <h4>Data Loading...</h4>}
        {!loading && 
            <Form method='PUT' onSubmit={(e)=>{
                e.preventDefault();
                updateProduct();
            }}>
                <Form.Group className="mb-3" controlId="formBasicID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="number" placeholder="Enter ID" ref={idRef} defaultValue={id} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" ref={nameRef} defaultValue={name} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price" ref={priceRef} defaultValue={price} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <div className="category-box d-flex">
                        <Form.Select aria-label="Default select example" ref={categoryRef} required>
                            {category && <option value={category.name}>{category}</option>}
                            <option value="">Select One</option>
                            {
                                categoryList.map((singleCategory)=>{
                                    return <option value={singleCategory.id}>{singleCategory.name}</option>
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
                    <Form.Control type="text" placeholder="Enter Details" defaultValue={details} ref={detailsRef} required />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Update Product
                </Button>
                <Button variant='secondary' type='reset' className='ms-3'>
                    Reset
                </Button>
            </Form>}
    </div>
  )
}
