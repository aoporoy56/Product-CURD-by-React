import React from 'react'
import { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react'
import { Table, Alert, Button } from 'react-bootstrap'
import {AiTwotoneEdit, AiFillDelete} from 'react-icons/ai';
import {MdOutlineAdd} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";

export default function Home() {
    const navigate = useNavigate();

    const [getList, setList] = useState([]);
    const[message, setMessage] = useState("");
    const[loading, setLoading] = useState(true);
    const[showMessage, setShowMessage] = useState(false);
    const getProduct = async () => {
        await fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/product/")
        .then((res)=>{
            setLoading(true)
            return res.json();
        })
        .then((output) =>{
            setLoading(false);
            setList(output.data);
        })
    }
    
    const getSearch = async (search) =>{
        if(search.trim()=="" || search=="")
            getProduct();
        else
        //     await fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/product/search/"+search)
        //     .then((res)=>{
        //         return res.json();
        //     })
        //     .then((output)=>{
        //         setList(output.data);
        //     })
        setList(getList.filter((item) => 
            item.id.toString().indexOf(search) !== -1 ||
            item.name.toString().indexOf(search) !== -1 ||
            item.category.toString().indexOf(search) !== -1 ||
            item.price.toString().indexOf(search) !== -1 ||
            item.details.toString().indexOf(search) !== -1
        ))
    }
    const deleteData = async (id) =>{
        await fetch("https://jade-delightful-kangaroo.cyclic.app/api/v1/product/"+id,{
            method : "delete"
        })
        .then((res)=>{
            setLoading(true)
            return res.json();
        })
        .then((output)=>{
            setShowMessage(true);
            setLoading(false);
            getProduct();
            if(output.result == 1)
                setMessage("Data Deleted");
            else if(output.result == 0)
                setMessage("Data Deleted Failed");
            else
                setMessage("Something Wrong")
        })
    }
    useEffect(()=>{
        getProduct();
        // if (!$.fn.DataTable.isDataTable("#myTable")) {
        //     $(document).ready(function () {
        //       setTimeout(function () {
        //         $("#table").DataTable({
        //           pagingType: "full_numbers",
        //           pageLength: 5,
        //           processing: true,
        //           dom: "Bfrtip",
        //           select: {
        //             style: "single",
        //           },
      
        //           buttons: [
        //             {
        //               extend: "pageLength",
        //               className: "btn btn-secondary bg-secondary",
        //             },
        //             {
        //               extend: "copy",
        //               className: "btn btn-secondary bg-secondary",
        //             },
        //             {
        //               extend: "csv",
        //               className: "btn btn-secondary bg-secondary",
        //             },
        //             {
        //               extend: "print",
        //               customize: function (win) {
        //                 $(win.document.body).css("font-size", "10pt");
        //                 $(win.document.body)
        //                   .find("table")
        //                   .addClass("compact")
        //                   .css("font-size", "inherit");
        //               },
        //               className: "btn btn-secondary bg-secondary",
        //             },
        //           ],
      
        //           fnRowCallback: function (
        //             nRow,
        //             aData,
        //             iDisplayIndex,
        //             iDisplayIndexFull
        //           ) {
        //             var index = iDisplayIndexFull + 1;
        //             $("td:first", nRow).html(index);
        //             return nRow;
        //           },
      
        //           lengthMenu: [
        //             [10, 20, 30, 50, -1],
        //             [10, 20, 30, 50, "All"],
        //           ],
        //           columnDefs: [
        //             {
        //               targets: 0,
        //               render: function (data, type, row, meta) {
        //                 return type === "export" ? meta.row + 1 : data;
        //               },
        //             },
        //           ],
        //         });
        //       }, 1000);
        //     });
        //   }
    },[])
  return (
        <div className='col-md-10'>
            <h3 className='text-center my-3'>Product Details</h3>
            {showMessage &&  <Alert variant={(message=="Data Updated") ? "primary" : "danger"} onClose={() => setShowMessage(false)} dismissible>{message}</Alert>}
            <div className='d-flex justify-content-between align-items-center'>
                <Button className='mb-3' variant="primary" onClick={()=>{
                    navigate("/create")
                }}> <MdOutlineAdd className='me-2'/>Add Product </Button>
                <input type="text" onChange={(e)=>getSearch(e.target.value)} placeholder="Search"/>
            </div>
            <Table striped bordered hover id='table'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Details</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getList.map((singleData)=> {
                        return <tr>
                                <td>{singleData.id}</td>
                                <td>{singleData.name}</td>
                                <td>{singleData.price}</td>
                                <td>{singleData.category}</td>
                                <td>{singleData.details}</td>
                                <td style={{fontSize : '25px'}}>
                                    <button onClick={()=>{
                                        navigate("/update",{
                                            state : {
                                                productData :singleData
                                            }
                                        })
                                    }}><AiTwotoneEdit color='#00b4ff'/></button>
                                    <button onClick={()=>{deleteData(singleData.id)}}><AiFillDelete color='red'/></button>
                                </td>
                            </tr>
                        }
                        )
                    }
                </tbody>
            </Table>
            {!loading && getList=="" && <h3 className='text-center mt-3'>Empty List 0️⃣</h3>}
            {loading && <h4 className='text-center mt-2'>Data Loading...</h4>}
            
        </div>
  )
}
