import React, { useEffect , useState } from 'react'
import Navitem from '../components/NavbarItem'
import { useNavigate,Link } from 'react-router-dom';
import { useRef } from 'react';
import {Navigate} from 'react-router-dom';
import "./styles/additem.css"
import Modal from '../components/Modal';


const AddItem = () => {
  const [arrayType,setArrayType] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate();
  const barnum = useRef();
  const itemname = useRef();
  const itemprice = useRef();
  const itemdes = useRef();
  let itemtypeid = null;

  async function GetType() {
    const response1 = await fetch("https://posme.fun:2096/types", {
        method: "GET",
        credentials: "include",
      });
      const alltype = await response1.json();
      console.log(alltype);
      setArrayType(alltype);
  }

  useEffect(() => { 
    GetType()
  },[])

  const handleChange = async function(e) {
    const typename = e.target.value;
    const response_typeid = await fetch("https://posme.fun:2096/types/name/"+typename, {
      method: "GET",
      credentials: "include",
    });
    const typeid = await response_typeid.json();
    if (e.target.value !== "0") {
      itemtypeid = typeid._id;
    }
  }

  const submitHandler = async function (event) {
    event.preventDefault();
    const barcode_input = barnum.current.value;
    const itemname_input = itemname.current.value;
    const itemprice_input = itemprice.current.value;
    const itemdes_input = itemdes.current.value;

      const response = await fetch("https://posme.fun:2096/items", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barcode: barcode_input,
          name: itemname_input,
          price: itemprice_input,
          description: itemdes_input,
          type_id: itemtypeid,
        }),
      });
      const data = await response.text();
      console.log(data);

      if (response.ok) {
        navigate("/store/items/");
      }

  };

    return (
    <>
        <Navitem />
        {/* <form action='#'> */}
        <form action='#' onSubmit={submitHandler}>
            <input 
              id='barcode_num'
              type='number'
              placeholder='Barcode Number'
              ref={barnum}
            ></input>

            {/* <Link to={`/BarcodeScanner`}> */}
                {/* <img src={require('../image/barcode-scan.png')} alt='Previous'/> */}
            {/* </Link> */}

            <input 
              id='item_name'
              type='text'
              placeholder='ชื่อสินค้า'
              ref={itemname}
            ></input>

            <input 
              id='item_price'
              type='number'
              placeholder='ราคาสินค้าต่อชิ้น'
              ref={itemprice}
            ></input>

            <input 
              id='item_desc'
              type='text'
              placeholder='รายละเอียดสินค้า'
              ref={itemdes}
            ></input>

            <div className='item_type'>
              <select onChange={handleChange}>
                <option value="0">none</option>
              {arrayType.map(eachtype => 
                <option value={eachtype.index}>
                 {eachtype.type_name}
                </option>
              )}
              </select>

            </div>
          <button>บันทึก</button>
        </form>
        <button className='add_item_btn'
          onClick={() => {
            setOpenModal(true);
            }}>
              เพิ่มประเภทสินค้า
          {/* <img className='add_btn_img' src={require('../image/plus_green.png')} alt='Add New Type'/> */}
        </button>
        {openModal && <Modal closeModal={setOpenModal} />} 
    </>
  )
}

export default AddItem