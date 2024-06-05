import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { EthProvider } from "./contexts/EthContext";

import RegistrationForm from "./components/RegistrationForm";
import RegistrationsTable from "./components/RegistrationsTable";


import { useEffect, useState } from 'react';
import Web3 from 'web3';
import './components/app.css'; // Import CSS file for styling

function App() {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
        } catch (error) {
          console.error('User denied account access:', error);
        }
      } else {
        console.error('No Ethereum provider detected. Install MetaMask!');
      }
    };

    loadWeb3();
  }, []);

  // Render the App only when web3 is initialized
  if (!web3) {
    return <div>Loading...</div>;
  }

  return (
    <EthProvider>
      <Router>
        <div id="App">
          <div className="container">
            <h1>Welcome to Course Registration</h1> 
            <hr />
            <div className="buttons">
              <Link to="/students" className="button"><button>Students</button></Link>
              <Link to="/teachers" className="button"><button>Teachers</button></Link>
            </div>
            <hr />
            <Routes>
              <Route path="/students" element={<RegistrationForm web3={web3} />} />
              <Route path="/teachers" element={<RegistrationsTable web3={web3} />} />
            </Routes>
            <hr />
          </div>
        </div>
      </Router>
    </EthProvider>
  );
}

export default App;
