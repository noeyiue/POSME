import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './component.css'

function Navhome() {
  return (
      <Navbar bg="warning" variant="dark">
        <Container>
          <Navbar.Brand href="/store/home">
            <div className='name'>
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Posme App
              <a>Logout</a>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
  );
}

export default Navhome;