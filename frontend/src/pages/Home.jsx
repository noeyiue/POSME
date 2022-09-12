import React from 'react'
// import MediaQuery from 'react-responsive'
import Navhome from '../components/Navbarhome'
import './Home.style.css'


function Home() {
  return (
    <>
      <Navhome />
        <div className='menu'>
          <div className='OutLineMenu'>
            <div className='Upper'>
              <a className='buttonMenu' href='/store/cashier'>
                <img
                  alt=""
                  src="https://media.discordapp.net/attachments/1015206753857720341/1016270782952914974/cashier.png"
                  width="150"
                  height="150"
                  className="d-inline-block align-top"
                  />
              </a>
              <a className='buttonMenu' href='/store/items'>
                <img
                  alt=""
                  src="https://media.discordapp.net/attachments/1015206753857720341/1016278305139335168/item.png"
                  width="150"
                  height="150"
                  className="d-inline-block align-top "
                  />
              </a>
            </div>
            <div className='Lower'>
              <a className='buttonMenu' href='/store/cashier'>
                <img
                  alt=""
                  src="https://media.discordapp.net/attachments/1015206753857720341/1016281419707846778/report.png"
                  width="150"
                  height="150"
                  className="d-inline-block align-top"
                />
              </a>
              <a className='buttonMenu' href='/store/items'>
                <img
                  alt=""
                  src="https://media.discordapp.net/attachments/1015206753857720341/1016282697892646932/users.png"
                  width="150"
                  height="150"
                  className="d-inline-block align-top"
                />
              </a>
            </div>
          </div>
        </div>
    </>
    
  )
}

export default Home