import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Create from './Component/Create';
import Navbars from './Component/Navbar';
import Home from './Component/Home';
import './App.css'
import Update from './Component/Update';
import CreateCategory from './Component/CreateCategory';
import ViewCategory from './Component/ViewCategory';
import UpdateCategory from './Component/UpdateCategory';


export default function App() {
  return (
    <div>
      <Navbars />
      <div className='container'>
          <div className='row justify-content-center'>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/category-list' element={<ViewCategory />} />
                <Route path='/create' element={<Create />} />
                <Route path='/update' element={<Update />} />
                <Route path='/create-category' element={<CreateCategory />} />
                <Route path='/update-category' element={<UpdateCategory />} />
              </Routes>
            </BrowserRouter>
          </div>
      </div>
    </div>
  )
}
