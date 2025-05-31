

import React, { useState } from "react";
import "./VotingScreen.css";

const VotingCard = ({ proposal }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [vote, setVote] = useState(null);

  const handleVote = (choice) => {
    setHasVoted(true);
    setVote(choice);
  };

  return (
    <div className="voting-card">
      <h2>{proposal.title}</h2>
      <p>{proposal.description}</p>
      <img src={proposal.image} alt="Proposal" className="proposal-image" />
      <p className="deadline">🕒 Voting ends in: {proposal.deadline}</p>

      {!hasVoted ? (
        <div className="vote-options">
          <button onClick={() => handleVote("yes")} className="vote-btn">Yes</button>
          <button onClick={() => handleVote("no")} className="vote-btn">No</button>
          <button onClick={() => handleVote("neutral")} className="vote-btn">Neutral</button>
        </div>
      ) : (
        <>
          <p className="thank-you">✅ Thank you for voting: <strong>{vote}</strong></p>
          <div className="results">
            <p>Live Results:</p>
            <div className="result-bar">
              <div className="yes" style={{ width: "62%" }}>Yes (62%)</div>
              <div className="no" style={{ width: "28%" }}>No (28%)</div>
              <div className="neutral" style={{ width: "10%" }}>Neutral (10%)</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const VotingScreen = () => {
  const proposals = [
    {
      id: 1,
      title: "New Bike Lanes on Main Street",
      description: "Install protected bike lanes to promote eco-friendly commuting.",
      deadline: "2 days",
      image: "https://via.placeholder.com/600x200"
    },
    {
      id: 2,
      title: "Upgrade Public Parks",
      description: "Add new play areas and walking tracks in central park.",
      deadline: "3 days",
      image: "https://via.placeholder.com/600x200"
    },
    {
      id: 3,
      title: "Install Smart Streetlights",
      description: "Proposal to upgrade streetlights with motion-sensor LEDs.",
      deadline: "5 days",
      image: "https://via.placeholder.com/600x200"
    },
    {
      id: 4,
      title: "Recycling Awareness Campaign",
      description: "Citywide events to educate on waste management.",
      deadline: "1 day",
      image: "https://via.placeholder.com/600x200"
    },
    {
      id: 5,
      title: "Community Wi-Fi Zones",
      description: "Install free Wi-Fi access points in public parks.",
      deadline: "4 days",
      image: "https://via.placeholder.com/600x200"
    },
  ];

  return (
    <div className="voting-wrapper">
      {proposals.map((proposal) => (
        <VotingCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
};

export default VotingScreen;
