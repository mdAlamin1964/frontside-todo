import './App.css'
import React from 'react';
import { Link, Routes, Route} from 'react-router-dom';

function App() {

  const[data, setData] = React.useState("")
  React.useEffect(()=> {
    const datafetch = async() => {
      const data = await (
        await fetch('/home')
      ).json()
      setData(data)
    }
    datafetch()
  },[])

  return (
    <>
      <h1>Hello world</h1>
      <h1>Hello</h1>
      <ul>
        <li>
          <Link to="/" >Home</Link>
        </li>
        <li>
          <Link to="/about" >about</Link>
        </li>
        <li>
          <Link to="/contact" >Contact me</Link>
        </li>
      </ul>

      <Routes>
        <Route path='/' element={ <h1>Hellowordl</h1>} />
        <Route path='/contact' element={ <h1>HelloContact</h1>} />
        <Route path='/about' element={ <h1>{data.text} Hello</h1>} />
      </Routes>
    </>
  )
}

export default App
