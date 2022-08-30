import React,{ useEffect, useState } from 'react'
import "./component.css"
import { Navigate } from 'react-router-dom'
import logo from '../img/Posme_logo.png'

const Title = () => {
    let [timeDelay, setTimeDelay] = useState(5);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDelay(timeDelay-=1)
            return () => clearInterval(interval);
        }, 1000);
    }, []);

    console.log(timeDelay)
    return (
        <div>
            <div className="fade-out">
                <img src={logo} alt='title-logo' />
            </div>
            { timeDelay < 3.5 && <Navigate to ={'/login'} /> }
        </div>
    )

}

export default Title