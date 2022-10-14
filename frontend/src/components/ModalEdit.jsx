import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ModalEdit(props) {
    const {closeModal,arrayData} = props;
    const [arrayType, setArrayType] = useState([]);
    const barnum = useRef();
    const itemname = useRef();
    const itemprice = useRef();
    const itemdes = useRef();
    const navigate = useNavigate();

    const submitHandler = async function (event) {
        event.preventDefault();
        const barcode_input = barnum.current.value;
        const itemname_input = itemname.current.value;
        const itemprice_input = itemprice.current.value;
        const itemdes_input = itemdes.current.value;
    
          const response = await fetch("https://posme.fun:2096/items/"+arrayData._id, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              barcode: barcode_input,
              name: itemname_input,
              price: itemprice_input,
              description: itemdes_input,
            }),
          });
          const data = await response.text();
          console.log(data);
    
          if (response.ok) {
            navigate("/store/items/");
          }
      };

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
            <form action='#' onSubmit={submitHandler}>
                <h1>แก้ไขรายละเอียดสินค้า</h1>
                <div className='edit_detail'>
                    <label>หมายเลขบาร์โค้ด : </label>
                    <input id="barcode_num" ref={barnum} className='editinput' placeholder='หมายเลขบาร์โค้ด' type="number" defaultValue={arrayData.barcode}></input>
                </div>
                <div className='edit_detail'>
                    <label>ชื่อสินค้า : </label>
                    <input id="item_name" ref={itemname} className='editinput' placeholder='ชื่อสินค้า' type="text" defaultValue={arrayData.name}></input>
                </div>
                <div className='edit_detail'>
                    <label>ราคาต่อชิ้น : </label>
                    <input id='item_price' ref={itemprice} className='editinput price_edit_input' step="0.25" min = "0.00" placeholder='ราคา' type="number" defaultValue={arrayData.price}></input>
                    <label>฿</label>
                </div>
                <div className='edit_detail'>
                    <label>รายละเอียดสินค้า : </label>
                    <input id='item_desc' ref={itemdes} className='editinput' placeholder='รายละเอียดสินค้า' type="text" defaultValue={arrayData.description}></input>
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
                    <input type='submit' className='accept_edit_btn' value="ยืนยันการแก้ไข" />
                    <button className='delete_item_btn' onClick={DeleteItem}>ลบสินค้า</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ModalEdit