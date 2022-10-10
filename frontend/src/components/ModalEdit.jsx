import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function ModalEdit(props) {
    const {closeModal,arrayData} = props;
    const [arrayType, setArrayType] = useState([]);

    async function GetType() {
        const response1 = await fetch("https://posme.fun:2096/types", {
            method: "GET",
            credentials: "include",
        });
        const alltype = await response1.json();
        console.log(alltype);
        var filtered = alltype.filter(function(el) {return el.type_name !== arrayData.type_id});
        setArrayType(filtered);
    }

    useEffect(() => {
        GetType();
    },[])

    async function DeleteItem() {
        const del_res = await fetch("https://posme.fun:2096/items/"+arrayData._id, {
            method: "DELETE",
            credentials: "include",
        });
        const delres = await del_res.json();
        if (del_res.ok) {
            window.location.reload(false);
        }
    }

  return (
    <div className='background'>
        <div className="modal_container2">
        <button className='close_btn' onClick={() => {
                  closeModal(false);
                  }}>
                <img className='close_btn_img' src={require('../image/logo_err.png')} alt="close" />
            </button>
            <form action='#'>
                <h1>แก้ไขรายละเอียดสินค้า</h1>
                <div className='edit_detail'>
                    <label>หมายเลขบาร์โค้ด : </label>
                    <input className='editinput' placeholder='หมายเลขบาร์โค้ด' type="number" defaultValue={arrayData.barcode}></input>
                </div>
                <div className='edit_detail'>
                    <label>ชื่อสินค้า : </label>
                    <input className='editinput' placeholder='ชื่อสินค้า' type="text" defaultValue={arrayData.name}></input>
                </div>
                <div className='edit_detail'>
                    <label>ราคาต่อชิ้น : </label>
                    <input className='editinput price_edit_input' placeholder='ราคาต่อชิ้น' type="number" defaultValue={arrayData.price}></input>
                    <label>฿</label>
                </div>
                <div className='edit_detail'>
                    <label>รายละเอียดสินค้า : </label>
                    <input className='editinput' placeholder='รายละเอียดสินค้า' type="text" defaultValue={arrayData.description}></input>
                </div>
                <div className='edit_detail'>
                    <label>ประเภทสินค้า : </label>
                    <select className='editinput'>
                        <option value="0">{arrayData.type_id}</option>
                        {arrayType.map(eachtype =>
                            <option value={eachtype.index}>{eachtype.type_name}</option>
                        )}
                    </select>
                </div>
                <div>
                    <button className='accept_edit_btn'>ยืนยันการแก้ไข</button>
                    <button className='delete_item_btn' onClick={DeleteItem}>ลบสินค้า</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ModalEdit