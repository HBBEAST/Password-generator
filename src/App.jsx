import {useState,useCallback, useEffect,useRef} from 'react'
import './tail.css'


function App() {
  const [length,setlength] = useState(8);
  const [number,setnumber] = useState(false);
  const [character,setcharacter] =useState(false);
  const [password,setpassword] =useState("");

  //REFHOOK

  const passwordref=useRef(null)

  const passwordgenerator= useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num="0123456789"
    let char="!@#$%^&*()_+{}[]:';<>/?|~"
    if(number){
      str+=num;
    }
    if(character){
      str+=char;
    }
    for(let i=1;i<=length;i++){
      let s=Math.floor(Math.random() * str.length + 1)
      pass+=str.charAt(s)
    }

    setpassword(pass);
  },[length,number,character,setpassword]) 

  useEffect(() => {
    passwordgenerator();
  },[length,number,character,passwordgenerator])

  const copypasstoclick=useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3 bg-white text-orange-500" placeholder="password" readOnly ref={passwordref} />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copypasstoclick}>copy</button>
        </div>
        <div className='flex text-sm gam-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={100} value={length} className='cursor-pointer mb-3' onChange={(e) => {setlength(e.target.value)}}/>
            <label className='mb-3'>Length: {length}</label>
          </div>
          <input type="checkbox" defaultChecked={number} id="numberInput"
          className="ml-2 mb-2 mr-1"
          onChange={() => {
            setnumber((prev) => !prev);
          }}/>
          <label className="mt-0.25"htmlFor='numberInput'>Numbers</label>
          <input type="checkbox" defaultChecked={character} id="numberInput"
          className="ml-2 mb-2 mr-1"
          onChange={() => {
            setcharacter((prev) => !prev);
          }}/>
          <label className="mt-0.25"htmlFor='numberInput'>Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
