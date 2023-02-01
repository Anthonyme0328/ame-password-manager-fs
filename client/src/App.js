import './App.css';
import { useState } from 'react';
import Axios from 'axios'

function App() {

  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')

  const addPassword = () => {
    Axios.post("http://localhost:3001/addPassword", {
      password: password,
      website: website
    })
  }

  return (
    <div className="App">
      
      <div className='addPassword'>
        <input type='text' placeholder='Example. ABC123' onChange={(event) => {
          setPassword(event.target.value)}}/>

        <input type='text' placeholder='Example. Instagram' onChange={(event) => {
          setWebsite(event.target.value)}}/>

        <button onClick={addPassword}>Add Password</button>
      </div>

    </div>
  );
}

export default App;
