import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./User.scss";
import { useAuth } from '../../AuthContext';


/**
 * 
 * @returns {React.ReactElement}
 */

function UserPage(){

  const { isLoggedIn, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    // Vérifier si l'utilisateur est connecté
    if (!token) {
     
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/login');
    }
  }, [getToken, navigate]);

  // Éviter le rendu du contenu de la page s'il y a une redirection
  if (!isLoggedIn) {
   
    return null;
  }
  
    return(
    
        <main className="main bg-dark"> 
      
        <div className="header">
          <h1>Welcome back<br />Tony Jarvis!</h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
     
      
    )
}

export default UserPage