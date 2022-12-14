import React, { useEffect , useState } from 'react'
import Navitem from '../components/NavbarItem'
import { useNavigate,Link } from 'react-router-dom';
import { useRef } from 'react';
import {Navigate} from 'react-router-dom';
import "./styles/additem.css"
import Modal from '../components/Modal';
import CamModal from '../components/scanner/CamModal'
import { Snackbar, Alert } from "@mui/material"

const AddItem = () => {
  const [arrayType,setArrayType] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [camModal, setCamModal] = useState(false)
  const navigate = useNavigate();
  const barnum = useRef();
  const itemname = useRef();
  const itemprice = useRef();
  const itemdes = useRef();
  const [scanBarNum,setScanBarNum] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [alertColor, setAlertColor] = useState("error");
  

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
        setErrorMessage("?????????????????????????????????????????????????????????????????????")
        setAlertColor("success")
      } else {
        setErrorMessage("????????????????????????????????????????????????????????????????????????????????????????????????????????????")
        setAlertColor("error")
      }

  };

    return (
    <>
        <Navitem />
        {/* <form action='#'> */}
      <div className="additem_container">
        <h1 className='Add_title'>???????????????????????????????????????????????????</h1>
        <form onSubmit={submitHandler}>

          <div className='add_barnum_input'>
            <label>????????????????????????????????????????????? : </label>
            <input
              className='additem_input'
              id='barcode_num'
              type='tel'
              placeholder='Barcode Number'
              ref={barnum}
              required
              pattern = "[0-9]{13}"
              defaultValue={scanBarNum}
            ></input>

            <div type='button' className='scanner_btn'
              onClick={() => {
                setCamModal(true);
              }}>
                  <img className='scanner_btn_img' src={require('../image/barcode-scanner.png')}/>
            </div>
          </div>
          <div>
            <label>?????????????????????????????? : </label>
            <input 
              className='additem_input'
              id='item_name'
              type='text'
              placeholder='??????????????????????????????'
              ref={itemname}
              required
              ></input>
          </div>
          <div>
            <label>??????????????????????????????????????????????????? : </label>
            <input className='price_input additem_input'
              id='item_price'
              type='number'
              step="0.25"
              min = "0.00"
              required
              placeholder='????????????'
              ref={itemprice}
              ></input>
              <label>???</label>
          </div>
          <div>
            <label>???????????????????????????????????????????????? : </label>
            <input 
              className='additem_input'
              id='item_desc'
              type='text'
              placeholder='????????????????????????????????????????????????'
              ref={itemdes}
              ></input>
          </div>

          <div className='item_type'>
            <label className='type_label'>???????????????????????????????????? : </label>
            <select onChange={handleChange}>
              <option value="0">none</option>
              {arrayType.map(eachtype => 
              <option value={eachtype.index}>
                {eachtype.type_name}
              </option>
              )}
            </select>
          </div>
          
          {/* <div type="button" className='add_item_type_btn'
            onClick={() => {
              setOpenModal(true);
            }}>
                ??????????????????????????????????????????????????????
          </div> */}
          <input type="submit" value="??????????????????" className='add_item_btn'></input>
        </form>
        <div className='btn_container'>
      </div>

          {/* {openModal && <Modal 
            closeModal={setOpenModal}
            setEditArrayType={setArrayType} 
            />}  */}

          {/* Open camera button */}
          {camModal && <CamModal 
            closeModal={setCamModal}
            setScanBarNum={setScanBarNum}
            barnum={barnum}
            />} 
        </div>

      {
        errorMessage && 
        <Snackbar  open={errorMessage} onClose={() => setErrorMessage(false)} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} autoHideDuration={5000} bodyStyle={{ height: 200, width: 200, flexGrow: 0 }}>
          <Alert onClose={() => setErrorMessage(false)} severity={alertColor} sx={{ width: '100%' }}>
            <div className="errormssg">
            {errorMessage}
            </div>
          </Alert>
        </Snackbar>
      }

    </>
  )
}

export default AddItem