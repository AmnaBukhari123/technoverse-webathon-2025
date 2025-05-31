import React, { useState } from 'react';
import './ProposalPolls.css';

const ProposalPolls = () => {
  const [polls, setPolls] = useState([
    { id: 1, title: 'What should be the next feature?', options: ['Dark Mode', 'Multi-Language Support', 'UI Improvements'] },
    { id: 2, title: 'Should we increase user storage?', options: ['Yes', 'No'] },
  ]);
  const [newPollTitle, setNewPollTitle] = useState('');
  const [newPollOptions, setNewPollOptions] = useState('');

  const handleAddPoll = () => {
    if (newPollTitle && newPollOptions) {
      const newPoll = {
        id: polls.length + 1,
        title: newPollTitle,
        options: newPollOptions.split(',').map((opt) => opt.trim()),
      };
      setPolls([...polls, newPoll]);
      setNewPollTitle('');
      setNewPollOptions('');
    } else {
      alert('Please provide both a title and options for the poll.');
    }
  };

  return (
    <div className="proposal-polls">
      <h1 className="page-title">Proposal & Polls</h1>

      <div className="add-poll">
        <input
          type="text"
          placeholder="Poll Title"
          value={newPollTitle}
          onChange={(e) => setNewPollTitle(e.target.value)}
        />
        <textarea
          placeholder="Poll Options (comma separated)"
          value={newPollOptions}
          onChange={(e) => setNewPollOptions(e.target.value)}
        />
        <button onClick={handleAddPoll}>Add Poll</button>
      </div>

      <div className="polls-list">
        {polls.map((poll) => (
          <div key={poll.id} className="poll-card">
            <h3>{poll.title}</h3>
            <ul>
              {poll.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposalPolls;
