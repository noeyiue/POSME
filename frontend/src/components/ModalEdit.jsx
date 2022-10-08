import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './styles/modalitem.css'

function ModalEdit(props) {
    const [closeModal,arrayData] = props;
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
    })

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
        <div className="modal_container">
            <button onClick={() => {
                closeModal(false);
            }}>
                X
            </button>
            <form action='#'>
                <h1>แก้ไขรายละเอียดสินค้า</h1>
                <div>
                    <label>หมายเลขบาร์โค้ด</label>
                    <input placeholder='หมายเลขบาร์โค้ด' type="number" defaultValue={arrayData.barcode}></input>
                </div>
                <div>
                    <label>ชื่อสินค้า</label>
                    <input placeholder='ชื่อสินค้า' type="text" defaultValue={arrayData.name}></input>
                </div>
                <div>
                    <label>ราคาต่อชิ้น</label>
                    <input placeholder='ราคาต่อชิ้น' type="number" defaultValue={arrayData.price}></input>
                    <label>฿</label>
                </div>
                <div>
                    <label>รายละเอียดสินค้า</label>
                    <input placeholder='รายละเอียดสินค้า' type="text" defaultValue={arrayData.description}></input>
                </div>
                <div>
                    <label>ประเภทสินค้า</label>
                    <select>
                        <option value="0">{arrayData.type_id}</option>
                        {arrayType.map(eachtype =>
                            <option value={eachtype.index}>{eachtype.type_name}</option>
                        )}
                    </select>
                </div>
                <div>
                    <button>ยืนยันการแก้ไข</button>
                    <button onClick={DeleteItem}>ลบสินค้า</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ModalEdit