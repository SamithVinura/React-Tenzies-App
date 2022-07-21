import { useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Confetti from "react-confetti";
function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies,setTenzies]=useState(false)


  useEffect(()=>{
      const allHeld=dice.every(die=>die.isHeld)
      const firstValue =dice[0].value
      const allSameValue =dice.every((die)=>die.value===firstValue)
      if(allSameValue && allHeld){
        setTenzies(true)
        
      }
      
  },[dice])

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  /* function rollDie() {
    setDice(allNewDice());
  } */
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  function rollDice() {
    if(!tenzies){setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );}else{
      setTenzies(false)
      setDice(allNewDice())
    }
    
  }

  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }
  const dieElements = dice.map((die) => {
    return (
      <Die
        number={die.value}
        key={die.id}
        isHeld={die.isHeld}
        id={die.id}
        holdDice={() => holdDice(die.id)}
      ></Die>
    );
  });

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{dieElements}</div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
