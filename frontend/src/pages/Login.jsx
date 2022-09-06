import React from "react";
import styles from "./Login.module.css";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Login = function (props) {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async function (e) {
    e.preventDefault();

    const username_input = usernameRef.current.value;
    const password_input = passwordRef.current.value;

    const response = await fetch("http://167.71.195.231:2095/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username_input,
        password: password_input,
      }),
    });
    const data = await response.json();
    console.log(data);

    props.getToken(data);
  };

  return (
    <div className={styles.main}>
      <section className={styles.section_register}>
        <div className={styles.center}>
          <img
            className={styles.lock_image}
            src="https://cdn-icons-png.flaticon.com/512/7439/7439933.png"
            alt="img"
          />
          <form action="#" onSubmit={submitHandler}>
            <input
              className={`${styles.block} ${styles.input_field}`}
              cols="40"
              placeholder="username"
              ref={usernameRef}
            />
            <input
              type="password"
              className={`${styles.block} ${styles.input_field}`}
              cols="40"
              placeholder="password"
              ref={passwordRef}
            />
            <Link to="/store/home">
              <button className={`${styles.block} ${styles.login_btn} ${styles.loginbutton}`}>
                เข้าสู่ระบบ
              </button>
            </Link>
            <Link to="/Register">
              <button className={`${styles.block} ${styles.register_btn} ${styles.loginbutton}`}>
                ลงทะเบียน
              </button>
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;