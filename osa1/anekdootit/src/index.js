import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);
  const [mostVoted, setMostVoted] = useState(0);

  const showRandomAnecdote = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length);

    setSelected(random);
  };

  const voteAnecdote = () => {
    let votesCopy = [...votes];

    votesCopy[selected] += 1;

    setVotes(votesCopy);

    // Show most voted
    checkMostVoted();
  };

  const checkMostVoted = () => {
    let votesCopy = votes.slice();

    let mostVotedAmount = Math.max(...votesCopy);
    let mostVotedAnecdote = votes.indexOf(mostVotedAmount);

    setMostVoted(mostVotedAnecdote)
    
  };

  return (
    <div>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div style={{ display: "block" }}>
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={showRandomAnecdote}>next anecdote</button>
      </div>
      <br />
      <h2>Anecdote with most votes</h2>
      {props.anecdotes[mostVoted]}
      <p>has {votes[mostVoted]} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
