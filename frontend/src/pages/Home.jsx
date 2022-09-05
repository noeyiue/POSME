import React from 'react'
import MediaQuery from 'react-responsive'
import Navhome from '../components/Navbarhome'
import './Page.css'


function Home() {
  return (
    <>
      <Navhome />

      {/* Ipad mini or Bigger */}
      <MediaQuery minWidth={818}>
        <div className='menu'>
          <div className='InlineMenu'>
            <a className='buttonMenu' href='/store/cashier'>
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                width="200"
                height="200"
                className="d-inline-block align-top"
                />
            </a>
            <a className='buttonMenu' href='/store/items'>
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                width="200"
                height="200"
                className="d-inline-block align-top"
                />
            </a>
            <a className='buttonMenu' href='/store/cashier'>
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                width="200"
                height="200"
                className="d-inline-block align-top"
              />
            </a>
            <a className='buttonMenu' href='/store/items'>
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                width="200"
                height="200"
                className="d-inline-block align-top iconMenu"
              />
            </a>
          </div>
        </div>
      </MediaQuery>

      {/* Mobile Device */}
      <MediaQuery maxWidth={820}>
        <div className='menu'>
          <div className='OutLineMenu'>
            <div className='Upper'>
              <a className='buttonMenu' href='/store/cashier'>
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                  width="150"
                  height="150"
                  className="d-inline-block align-top iconMenu"
                  />
              </a>
              <a className='buttonMenu' href='/store/items'>
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                  width="150"
                  height="150"
                  className="d-inline-block align-top iconMenu"
                  />
              </a>
            </div>
            <div className='Lower'>
              <a className='buttonMenu' href='/store/cashier'>
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                  width="150"
                  height="150"
                  className="d-inline-block align-top iconMenu"
                />
              </a>
              <a className='buttonMenu' href='/store/items'>
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                  width="150"
                  height="150"
                  className="d-inline-block align-top iconMenu"
                />
              </a>
            </div>
          </div>
        </div>
      </MediaQuery>
    </>
    
  )
}

export default Home