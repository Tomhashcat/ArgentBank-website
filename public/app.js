import "./App.scss";
import Page from "./pages/Home";
import { DataProvider } from "./contexts/DataContext";
function App() {
const { MongoClient } = require('mongodb');

// URL de connexion
const url = 'mongodb://localhost:27017';

// Nom de la base de données
const dbName = 'populate-db';

// Utiliser le nouveau moteur de découverte et de surveillance des serveurs
const client = new MongoClient(url, { useUnifiedTopology: true });

// Se connecter au serveur
client.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    return;
  }

  console.log('Connecté à MongoDB');

  // Vous pouvez maintenant utiliser l'objet 'client' pour interagir avec la base de données

  // Exemple : Accéder à une base de données spécifique
  const db = client.db(dbName);

  // ...

  // Fermer la connexion lorsque vous avez terminé
  client.close();
});

return (
  <div className="App">
    <Header />
   
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Apropos" element={<Apropos />} />
      
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);



}

export default App;
