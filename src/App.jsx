import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCallback } from 'react';
import { useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';


function App() {

  const [password, setPassword] = useState('');
  const [length, setLength]=useState(6);
  const [char, setChar]=useState(false);
  const [number, setNumber]= useState(true);

  const generatePassword = useCallback(() => {
    let pass= "";
    let str="abcdefghijklmnopqrstuvwxyz";
    let spc="!@#$%^&*()_+";
    let num="1234567890";
    if(char) str+=spc;
    if (number) str += num;
    for(let i=0;i<length;i++){
      pass+=str.charAt(Math.floor(Math.random()*str.length));
    }
    setPassword(pass);
    
  }, [char, length, number]);

  useEffect (()=> {
    generatePassword();
  }, [number,char,length]);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toastr.success('Password copied to clipboard successfully!', 'Success');
    }).catch(error => {
      toastr.error('Failed to copy password to clipboard.', 'Error');
      console.error('Error copying password to clipboard:', error);
    });
  };
  return (
    <>
      <h1>password generator</h1>
      <input type="text" readOnly value={password} />
      <button onClick={() => copyToClipboard()}> copy</button>




      <input type="range" min="0" max="10" value= {length} onChange={(e)=>setLength(e.target.value)}/>
      <label htmlFor='length'>length : {length} </label>
      <div className="checkbox-group">
        <input type="checkbox" id="char" defaultChecked={char}  onChange={() => {setChar(( prev ) => !prev)}} />
        <label htmlFor="char">char </label>
        <input type="checkbox" id="number" defaultChecked={number} onChange={(e)=>setNumber(e.target.checked)}/>
        <label htmlFor="number">number </label>
       
      </div>
    </>
  )
}

export default App
