import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {AiTwotoneEdit} from 'react-icons/ai';
import {MdOutlineAdd} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'

export default function ViewCategory() {
    const navigate = useNavigate();
    const[categoryList, setCategoryList] =useState([]);
    // const[message, setMessage] = useState("");
    const[loading, setLoading] = useState(true);
    // const[showMessage, setShowMessage] = useState(false);
    const getAllCategory = async () =>{
        fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/category")
        .then((res)=>{
            setLoading(true);
            return res.json();
        })
        .then((output)=>{
            setCategoryList(output.data);
            setLoading(false);
        })
    }
    // const deleteCategory = async (id) =>{
    //     fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/category/"+id,{
    //         method:'delete'
    //     })
    //     .then((res)=>{
    //         setLoading(true)
    //         return res.json();
    //     })
    //     .then((output)=>{
    //         setShowMessage(true);
    //         setLoading(false);
    //         getAllCategory();
    //         if(output.result === 1)
    //             setMessage("Data Deleted");
    //         else if(output.result === 0)
    //             setMessage("Data Deleted Failed");
    //         else
    //             setMessage("Something Wrong")
    //     })
    // }
    useEffect(()=>{
        getAllCategory();
    },[])
  return (
    <div className='col-md-6'>
        <h3 className='text-center my-3'>Category List</h3>
        {/* {showMessage &&  <Alert variant={(message==="Data Updated") ? "primary" : "danger"} onClose={() => setShowMessage(false)} dismissible>{message}</Alert>} */}
        <Button className='mb-3' variant="primary" onClick={()=>{
            navigate("/create-category")
        }}> <MdOutlineAdd className='me-2'/>Add Category </Button>
        <Table striped bordered hover >
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    categoryList.map((singleData)=> {
                    return <tr>
                            <td>{singleData.id}</td>
                            <td>{singleData.name}</td>
                            <td style={{fontSize : '25px'}}>
                                <button onClick={()=>{
                                    navigate("/update-category",{
                                        state : {
                                            categoryData :singleData
                                        }
                                    })
                                }}><AiTwotoneEdit color='#00b4ff'/></button>
                            </td>
                        </tr>

                    }
                    
                    )
                }
                
            </tbody>
        </Table>
        { !loading && categoryList==="" && <h3 className='text-center mt-3'>Empty List 0️⃣</h3> }
        {loading && <h4 className='text-center mt-3'>Data Loading...</h4>}
        
    </div>
  )
}
