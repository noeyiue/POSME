import React from 'react'
import { useRef } from 'react';
import "./styles/modal.css"
import BackdropAddtype from './BackdropAddtype';
import { useState } from 'react';
import { useEffect } from 'react';

function Modal(props) {
  const typeitem = useRef();
  const [arrayType,setArrayType] = useState([]);
  const [errAdd, setErrAdd] = useState(false);
  const [errtext, setErrtext] = useState();

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
      setErrtext(response.status);
      console.log(errtext);
      if (response.ok) {
        // window.location.reload(false);
        props.closeModal(false);
      }
      else {
        setErrAdd(true);
        console.log(errAdd);
      }
      GetAllType();
  }

  async function GetAllType() {
    const response2 = await fetch("https://posme.fun:2096/types", {
      method: "GET",
      credentials: "include",
    });
    const alltype = await response2.json();
    console.log(alltype);
    setArrayType(alltype);
    props.setEditArrayType(alltype);
  }

  useEffect(() => {
    GetAllType();
  },[])

  async function DeleteType(type_id) {
    await fetch("https://posme.fun:2096/types/"+type_id, {
      method: "DELETE",
      credentials: "include",
    });
    GetAllType();
  }

  return (
    <div className='background'>
        <div className="modal_container">
            <button onClick={() => {
                  props.closeModal(false);
                  }}>
                {/* <img src={require('../image/logo_err.png')} alt="close" /> */}
                X
            </button>
            <div className="title">
                <h1>เพิ่มประเภทสินค้า</h1>
            </div>
            {arrayType.map(eachType =>
            <div className='type'>
              <p className="type_name">ประเภทสินค้า : {eachType.type_name}</p>
              <button className="btn_del" onClick={() => DeleteType(eachType._id)}>
                <img className='btn_ing' src={require('../image/trash-bin.png')} alt='Delete' />
              </button>
            </div>
              )}

            <form action='#' onSubmit={submitHandler}>
                <input 
                  id='new_type' 
                  type="text" 
                  placeholder='ประเภทสินค้า'
                  ref={typeitem}
                  >
                </input>
                <div className="submit">
                    <button onClick={() => GetAllType}>บันทึก</button>
                </div>
            </form>
        </div>
        {errAdd && <BackdropAddtype closeModal={setErrAdd} ErrText={errtext}/>}
    </div>
  )
}

export default Modal