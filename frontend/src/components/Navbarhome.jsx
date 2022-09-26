import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './component.css'
import posmeLogoL from '../image/logoLarge.png'
import { useNavigate } from "react-router-dom";

function Navhome() {
  let shopName = "Cafe dot com"
  const navigate = useNavigate();
  const submitHandler = async function (e) {
    e.preventDefault();
  
    try {
      const response = await fetch("https://posme.fun:2096/auth/logout",{
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      if (localStorage.getItem('isLoggedIn')) {
        localStorage.removeItem('isLoggedIn')
        navigate("/login");
      }
    }
    catch (err) {
      console.log("Not Login");
    }
  };
  return (
    <>
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
              <a>
                <button onClick={submitHandler} type='button' class="btn btn-danger">
                  logout
                </button>{' '}
              </a>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navhome;