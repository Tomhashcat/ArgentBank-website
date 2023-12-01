
import React, {useState} from 'react';
import "./Home.scss";
import iconChat from "../../assets/img/icon-chat.png";
import inconMoney from "../../assets/img/icon-money.png";
import iconSecurity from "../../assets/img/icon-security.png";
import { useDispatch } from 'react-redux';
import { logingError, logingRemember, logingSuccess, logingPending } from '../login/authSlice';
import { useNavigate } from 'react-router-dom';
/**
 *
 * @returns {React.ReactElement} JSX.Element - the user main page
 */


function Home(){

  const dispatch = useDispatch(); 

  const [isRemember, setIsRemember] = useState(false);

  const [credientials, setCredientials] = useState({
    email: '',
    password: '',
  });

  function handelChange({ currentTarget }) {
    const { value, name } = currentTarget
    setCredientials({
      ...credientials,
      [name]: value,
    })
  }
  
  async function handelSubmit(e) {
    e.preventDefault()
  

    try {
      const token = "votre_token"; 
  
      if (isRemember) {
        localStorage.setItem('token', isAuth.body.token)
      } else {
        localStorage.removeItem('token')
      }
  
      dispatch(logingSuccess())
      navigate('/profilePage/Profile')
    } catch (error) {
      console.log(error)
      dispatch(logingError(error.response?.data.message|| 'Une erreur est survenue !'))
    }
  }
  const navigate = useNavigate();
	return (
		
		
		 <>
     <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handelSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="email"
                onChange={handelChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handelChange}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                defaultChecked={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" variant="success" className="sign-in-button">
              Sign In
            </button>
           
          </form>
        </section>
      </main>
    </>
	
            
	);

	}
export default Home;