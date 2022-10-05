import React from 'react'
import { useRef } from 'react';
import "./styles/modal.css"

function Modal({closeModal}) {
  const typeitem = useRef();
  const submitHandler = async function (event) {
    event.preventDefault();
    const typeitem_input = typeitem.current.value;
    const response = await fetch("https://posme.fun:2096/types", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type_name: typeitem_input,
        }),
      });
      const data = await response.text();
      console.log(data);
  }
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
                <h1>เพิ่มประเภทสินค้า</h1>
            </div>
            <form action='#' onSubmit={submitHandler}>
                <input 
                  id='new_type' 
                  type="text" 
                  placeholder='ประเภทสินค้า'
                  ref={typeitem}
                  >
                </input>
                <div className="submit">
                    <button>บันทึก</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Modal