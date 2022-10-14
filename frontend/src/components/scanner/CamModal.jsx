import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Scanner from './Scanner';
import Result from './Result';
import './styles/cammodal.css'

function CamModal(props)  {
    const {closeModal, setScanBarNum,barnum} = props;
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState("");
    const scannerRef = useRef(null);

    const checkEAN = (ean) => {
        var checkSum = ean.split('').reduce(function(p,v,i) {
            return i % 2 === 0 ? p + 1 * v : p + 3 * v;
        }, 0);
  
        if (checkSum % 10 !== 0) {
            console.log("invalid barcode number")
        } else {
            setResults(ean);
            setScanBarNum(ean);
            barnum.current.value = ean;
            closeModal(false);
        }
    }




  return (
    <div className='background'>
        <div className="modal_container2">
        <button className='close_btn' onClick={() => {closeModal(false);}}>
            <img className='close_btn_img' src={require('../../image/logo_err.png')} alt="close" />
        </button>
                <div>
                    <button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop Camera' : 'Start Camera'}</button>
                    <h1>{results}</h1>
                    {/* <ul className="results">
                        {results.map((result) => (result.codeResult && <Result key={result.codeResult.code} result={result} />))}
                    </ul> */}
                    {/* <div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}> */}
                    <div ref={scannerRef}>
                        {/* <canvas className="drawingBuffer" style={{
                            position: 'absolute',
                            top: '0px',
                            // left: '0px',
                            // height: '100%',
                            // width: '100%',
                            border: '3px solid green',
                        }} width="640" height="480" /> */}
                        {/* <canvas className="drawingBuffer" width="640" height="480" /> */}
                        {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) => checkEAN(result)} /> : null}
                    </div>
                </div>
        </div>
    </div>
  )
}

export default CamModal