import React from "react";
// import { ImCross } from "react-icons/im";
import styles from "./Backdrop.module.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Backdrop = function (props) {
  return (
    <div className={styles.background}>
      <div className={styles.warning_box}>
        {/* <ImCross className={styles.logo} /> */}
        <p>ไม่สามารถเข้าสู่ระบบได้</p>
        <p className={styles.text}>Your username or password is wrong!</p>
        <p className={styles.text}>Please try to login again!</p>
        <Link to="/Login" onClick={props.close}>
          <button type="button" class="btn btn-outline-danger">Close</button>
        </Link>
      </div>
    </div>
  );
};

export default Backdrop;
