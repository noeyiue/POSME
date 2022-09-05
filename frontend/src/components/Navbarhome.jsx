import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import MediaQuery from 'react-responsive'
import 'bootstrap/dist/css/bootstrap.min.css';
import './component.css'

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
                  alt=""
                  src="https://media.discordapp.net/attachments/1015206753857720341/1015281070154989568/posme.png"
                  width="132.2"
                  height="40"
                  className="d-inline-block align-top"
                />{' '}
              </div>
            </Navbar.Brand>
            <Navbar.Brand>
              <div className='logout'>
                ร้าน {' '}{' '}{shopName} {' '}
                <a href="/login">
                  <button type='button' class="btn btn-danger" href="/login">
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
                  src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                  width="40"
                  height="40"
                  className="d-inline-block align-top"
                  />{' '}
              </div>
            </Navbar.Brand>
            <Navbar.Brand>
              <div className='logout'>
                ร้าน {' '}{' '}{shopName} {' '}
                <a href="/login">
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