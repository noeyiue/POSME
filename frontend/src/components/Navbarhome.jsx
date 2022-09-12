import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import MediaQuery from 'react-responsive'
import 'bootstrap/dist/css/bootstrap.min.css';
import './component.css'
import posmeLogoL from '../image/logoLarge.png'
import posmeLogoS from '../image/logoMini.png'

function Navhome() {
  let shopName = "Cafe dot com"
  return (
    <>
    {/* Ipad mini or Upper */}
    <MediaQuery minWidth={768}>

        <Navbar bg="warning" variant="dark">
          <Container>
            <Navbar.Brand href="/store/home">
              <div className='name'>
                <img
                  alt="app-logo"
                  src={posmeLogoL}
                  width="132.2"
                  height="40"
                  className="d-inline-block align-top"
                />{' '}
              </div>
            </Navbar.Brand>
            <Navbar.Brand>
              <div className='logout'>
                ร้าน {' '}{' '}{shopName} {' '}
                <a href="/">
                  <button type='button' class="btn btn-danger" href="/">
                    logout
                  </button>{' '}
                </a>
              </div>
            </Navbar.Brand>
          </Container>
        </Navbar>
      
      </MediaQuery>
      {/* Mobile Device Size */}
      <MediaQuery maxWidth={767}>
        <Navbar bg="warning" variant="dark">
          <Container>
            <Navbar.Brand href="/store/home">
              <div className='name'>
                <img
                  alt=""
                  src={posmeLogoS}
                  width="40"
                  height="40"
                  className="d-inline-block align-top"
                  />{' '}
              </div>
            </Navbar.Brand>
            <Navbar.Brand>
              <div className='logout'>
                ร้าน {' '}{' '}{shopName} {' '}
                <a href="/">
                  <button type='button' class="btn btn-danger">
                    logout
                  </button>{' '}
                </a>
              </div>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </MediaQuery>
    </>
  );
}

export default Navhome;