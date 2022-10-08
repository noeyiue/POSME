import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import ModalEdit from './ModalEdit';
import "./styles/modalitem.css"

function ModalItem(props) {
  const {closeModal,itemID} = props;
  const [arrayData,setArrayData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editItemID, setEditItemID] = useState("");
  
  useEffect(() => {
    async function GetItemDetail() {
      const response = await fetch("htttps://posme.fun:2096/items"+itemID, {
        method: "GET",
        credentials: "include",
      });
      const alldata = await response.json();
      console.log(alldata);
      if (alldata.description === "") {
        alldata.description = "ไม่มีข้อมูล";
      }
      if (alldata.type_id === null) {
        alldata.type_id = "none";
      }
      else {
        const response2 = await fetch("https://posme.fun:2096/types/"+alldata.type_id, {
          method: "GET",
          credentials: "include",
        });
        const typeres = await response2.json();
        alldata.type_id = typeres.type_name;
      }
      setArrayData(alldata);
      setEditItemID(alldata._id);
    }
    GetItemDetail();
  },[])

  return (
    <div className='background'>
        <div className="modal_container">
            <button onClick={() => {
                  closeModal(false);
                  }}>
                {/* <img src={require('../image/logo_err.png')} alt="close" /> */}
                X
            </button>
            <div className="title">
                <h1>รายละเอียดสินค้า</h1>
            </div>
            <div className="modal_detail">
              <p className="item_label">หมายเลขบาร์โค้ด</p> 
              <p className="item_data">{arrayData.barcode}</p>
            </div>
            <div className="modal_detail">
              <p className="item_label">ชื่อสินค้า</p> 
              <p className="item_data">{arrayData.name}</p>
            </div>
            <div className="modal_detail">
              <p className="item_label">ราคาต่อชิ้น</p> 
              <p className="item_data">{arrayData.price}฿</p>
            </div>
            <div className="modal_detail">
              <p className="item_label">รายละเอียดสินค้า</p> 
              <p className="item_data">{arrayData.description}</p>
            </div>
            <div className="modal_detail">
              <p className="item_label">ประเภทสินค้า</p> 
              <p className="item_data">{arrayData.type_id}</p>
            </div>
            <div>
              <button onClick={() => {setOpenModal(true);}}>
                แก้ไขรายละเอียดสินค้า
              </button>
            </div>
        </div>
        {openModal && <ModalEdit closeModal={setOpenModal} arrayData={arrayData}/>}
    </div>
  )
}

export default ModalItem