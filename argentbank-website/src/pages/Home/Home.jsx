
import React, {useState} from 'react';
import "./Home.scss";
import iconChat from "../../assets/img/icon-chat.png";
import inconMoney from "../../assets/img/icon-money.png";
import iconSecurity from "../../assets/img/icon-security.png";
import { useDispatch } from 'react-redux';
import FeatureItem from '../../components/featureItems/FeatureItem';
import { useNavigate } from 'react-router-dom';
/**
 *
 * @returns {React.ReactElement} JSX.Element - the user main page
 */


function Home(){


  const dispatch = useDispatch(); 
 const navigate = useNavigate();
  const [isRemember, setIsRemember] = useState(false);

  const [credientials, setCredientials] = useState({
    email: '',
    password: '',
  });



 
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
       
       
       <FeatureItem icon={iconChat} title="Chat Support" description="Get help whenever you need it."/>
       <FeatureItem icon={inconMoney} title="No Minimum Deposit" description="Start saving with any amount." />
       <FeatureItem icon={iconSecurity} title="High Security" description="Your money is safe and secure." />
       
      </section>
   
   </>
  );
}
export default Home;