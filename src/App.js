import React, { useState } from 'react';
import './App.css';

function App() {
  const [nftPrice, setNftPrice] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [cases, setCases] = useState([]);
  const [bestCase, setBestCase] = useState('');

  const calculateNuts = () => {
    const price = parseFloat(nftPrice);
    const investment = parseFloat(investmentAmount);

    if (isNaN(price) || isNaN(investment) || price <= 0 || investment <= 0) {
      setCases([]);
      setBestCase('');
      return;
    }

    // Calculate how many NFTs can be bought
    const numberOfNFTs = Math.floor(investment / price);
    const maxNFTs = Math.min(numberOfNFTs, 3);
    const calculatedCases = [];

    // Function to calculate portfolio boost
    const getPortfolioBoost = (remaining) => {
      if (remaining > 5) return 1.8; // 180%
      if (remaining > 2) return 1.2; // 120%
      if (remaining > 1) return 1; // 100%
      if (remaining > 0.5) return 0.7; // 70%
      if (remaining > 0.2) return 0.5; // 50%
      return 0; // No boost
    };

    // Calculate Nuts for each case
    for (let i = 0; i <= maxNFTs; i++) {
      const cost = i * price;
      const remaining = investment - cost;

      let nftBoost = 0;
      if (i === 1) nftBoost = 1; // 100%
      else if (i === 2) nftBoost = 1.5; // 150%
      else if (i === 3) nftBoost = 2; // 200%

      const portfolioBoost = getPortfolioBoost(remaining);
      const nutsGenerated = (10 * remaining) + (10 * nftBoost * remaining) + (10 * portfolioBoost * remaining);

      calculatedCases.push({
        nftCount: i,
        nutsGenerated,
        remaining,
        cost,
        nftBoost,
        portfolioBoost,
      });
    }

    // Find the best case
    const best = calculatedCases.reduce((prev, current) => (prev.nutsGenerated > current.nutsGenerated) ? prev : current);
    setBestCase(`Best case: Buy ${best.nftCount} NFT(s) for ${best.nutsGenerated.toFixed(2)} Nuts generated.`);

    setCases(calculatedCases);
  };

  return (
    <div className="App">
      <h1>Treehouse NFT & Investment Calculator</h1>
      <p>Calculate your best investment based on NFT owned and investment amount</p>

      <label htmlFor="investmentAmount">Investment Amount (ETH):</label>
      <input
        type="number"
        placeholder="Investment Amount (in ETH)"
        value={investmentAmount}
        onChange={(e) => setInvestmentAmount(e.target.value)}
      />
      <label htmlFor="nftPrice">NFT Price:</label>
      <input
        type="number"
        placeholder="NFT Price (in ETH)"
        value={nftPrice}
        onChange={(e) => setNftPrice(e.target.value)}
      />
      
      <button onClick={calculateNuts}>Calculate</button>
      
      {cases.length > 0 && (
        <div className="cases-container">
          <h2>Case Calculations</h2>
          <div className="cases-grid">
            {cases.map((caseItem, index) => (
              <div className="case-item" key={index}>
                <h3>{caseItem.nftCount} NFT(s)</h3>
                <p>Cost: {caseItem.cost.toFixed(2)} ETH</p>
                <p>Remaining: {caseItem.remaining.toFixed(2)} ETH</p>
    
                <p>NFT Boost: {caseItem.nftBoost * 100}%</p>
                <p>Portfolio Boost: {caseItem.portfolioBoost * 100}%</p>
                <p style={{ fontWeight: 'bold' }}>Daily Nuts Generated: {caseItem.nutsGenerated.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="summary">
            <h2>Summary</h2>
            <p style={{ fontWeight: 'bold' }}>{bestCase}</p>
          </div>
        </div>
      )}

      <footer>
        Support Creator: 0x33c1BA1703e0903aEA3CC8D77014baC065e0bC0c
      </footer>
    </div>
  );
}

export default App;