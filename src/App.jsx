import './App.css'
import React from 'react';
import { Link, Routes, Route} from 'react-router-dom';
import Error from "./pages/Error"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { nanoid } from "nanoid"
import "./main.css"


function App() {
  const backend_url = "https://mdalamin19.pythonanywhere.com"

  const [show, setShow] = React.useState(false)
  // setting show
  function showFunc() {
    setShow(!show)
  }

  // setting some width style
  let styleMain = {

  }
  let styleHeight = {

  }
  if (window.innerHeight > window.innerWidth) {
    styleMain = {
      width: `90%`
    }
    styleHeight = {
      height:"50px"
    }
  }



///// Data server

  // error text
  const [error, setError] = React.useState("")
  React.useEffect(() => {
    fetch(backend_url+'/error-text')
    .then(res => res.json())
    .then(data => {
      setError(data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])


  // Home data

  // using awit to load the data first
  const[count, setCount] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(preCount => preCount +1)
    }, 60000)
    return ()=> clearInterval(interval)
  }, [])


  const [dtask, setDtask] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const datafetch = async () => {
      const data = await (
        await fetch(backend_url+'/home-data')
      ).json()
      setDtask(data)
      setLoading(true)
    }
    datafetch()
  }, [count])


  // Data to show
  let dtaskElement = []
  let timeNow = {}
  if (loading) {
  timeNow = dtask.time_now
  dtaskElement = dtask.tasks.map(n=> {
      return (
        <li 
          key={nanoid()}
          style={styleHeight}
        >
          <div className="main-menu-time">{n.time}</div>
          {n.text}
          <span>
            <a href={"/delete-data/" + n.taskId}>🗑</a>
          </span>
        </li>
      )
    })
  }
  

  console.log("Dtask",dtask)







  // test
  const[data, setData] = React.useState("")
  React.useEffect(()=> {
    const datafetch = async() => {
      const data = await (
        await fetch(backend_url+'/home')
      ).json()
      setData(data)
    }
    datafetch()
  },[])

  return (
    <>
      <div className="container">
        {/* Login or register */}
        
        { dtask? 
          <div className="header-main-menu"> 
            <Link to="/">Home</Link>
            <Link to="/logout">logout</Link>
            <Link to={"/delete-accout/" + dtask.id}>Delete Acc</Link>
            <h1 className="text-center" >Welcom {dtask.name}</h1>
          </ div>
           :
          <div className="header-main-menu">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
          </ div>
      }
        
          <Routes>
            <Route path="/" element={ 
              dtask?
              <Home 
                time={timeNow}
                styleMain={styleMain}
                styleHeight={styleHeight}
                taskElement={dtaskElement}
                showFunc={showFunc}
                show={show}
                backend_url={backend_url}

              /> :

              <Login 
                backend_url={backend_url}
              />
              
              }/>
            <Route path="/register" element={
              <Register 
                backend_url={backend_url}
              />}/>
            <Route path="/login" element={
              <Login 
                backend_url={backend_url}
              />}/>
            <Route path="/erorr" element = {
              <Error 
                message={error.text}
              />
            } />
          </Routes>

          {/* me */}
          <div className="main-me">
            <a href="https://www.linkedin.com/in/alamin1964/" target='_blank'>Concept & build by MD. Alamin</a>
          </div>
        </div>

    </>
  )
}

export default App
