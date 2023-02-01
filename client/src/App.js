import './App.css';
import { useState } from 'react';

function App() {

  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')

  return (
    <div className="App">
      
      <div className='addPassword'>
        <input type='text' placeholder='Example. ABC123' onChange={(event) => {
          setPassword(event.target.value)}}/>
        <input type='text' placeholder='Example. Instagram' onChange={(event) => {
          setWebsite(event.target.value)}}/>
        <button>Add Password</button>
      </div>

    </div>
  );
}

export default App;
