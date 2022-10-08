import React from 'react'
// import {Navigate} from 'react-router-dom'
import Navitem from '../components/NavbarItem'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Item.css'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ModalItem from '../components/ModalItem';

function Items() { 
  const [arrayItem,setArrayItem] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [itemID, setItemId] = useState("");

  useEffect(() => {
    async function GetAllItem() {
      const response1 = await fetch("https://posme.fun:2096/items", {
          method: "GET",
          credentials: "include",
        });
        const alldata = await response1.json();
        console.log(alldata);
        setArrayItem(alldata);
    }
    GetAllItem()
  },[])


  async function GetItem(e) {
    const response2 = await fetch("https://posme.fun:2096/items/filter", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword : e.target.value
        }),
      });
      const data = await response2.json();
      console.log(data);
      setArrayItem(data);
  } 

  function PassName(itemid) {
    setItemId(itemid);
  }

  return (
    <div>
      <Navitem />
      <div className="mid">
        <input className='search' type="text" placeholder="Search..." onChange={GetItem}/>
        {arrayItem.map(eachItem => 
            <button className='item_detail' onClick={() => {
              PassName(eachItem._id);
              setOpenModal(true);
              }}>
              <p className='item_barcode'> Barcode : {eachItem.barcode} </p>
              <h2 className='item_name'> {eachItem.name} </h2> 
              <p className='item_price'> price : {eachItem.price} ฿</p> 
            </button> 
          )}
          {openModal && <ModalItem closeModal={setOpenModal} itemID={itemID}/>}
        </div>
        <Link to={`/store/items/additem`}>
          <img className='add_button' src={require('../image/plus.png')} alt='Add-Item'/>
        </Link>
    </div>
  );
}


export default Items