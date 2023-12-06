
import React, {useState} from 'react';
import "./Home.scss";
import iconChat from "../../assets/img/icon-chat.png";
import inconMoney from "../../assets/img/icon-money.png";
import iconSecurity from "../../assets/img/icon-security.png";
import { useDispatch } from 'react-redux';

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
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <div className="feature-item">
          <img src={iconChat} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className="feature-item">
          <img
            src={inconMoney}
            alt="Chat Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">More savings means higher rates</h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className="feature-item">
          <img
            src={iconSecurity}
            alt="Chat Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
   
   </>
  );
}
export default Home;