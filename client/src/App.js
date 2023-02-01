import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'

function App() {

  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')
  const [listOfPass, setListOfPass] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/showPasswords")
    .then((response) => {
      setListOfPass(response.data)
    })
  }, [])

  const addPassword = () => {
    Axios.post("http://localhost:3001/addPassword", {
      password: password,
      website: website
    })
  }

  const decryptPassword = (encryption) => {
    Axios.post('http://localhost:3001/decryptpassword', { password: encryption.password, iv: encryption.iv}).then((response) => {
      setListOfPass(
        listOfPass.map((val) => {
          return val.id == encryption.id
            ? {
              id: val.id,
              password: val.password,
              website: response.data,
              iv: val.iv
              }
            : val;
        })
      )
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

      <div className='list'>
          {listOfPass.map((val, key) => {
            return (
              <div 
                className='listItem'
                onClick={() => {decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id
                })

                }}
                key={key}
                >
                  <h3>{val.website}</h3>
              </div>
              )
          })}
      </div>

    </div>
  );
}

export default App;
