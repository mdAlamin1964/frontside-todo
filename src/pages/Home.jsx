import React from "react"

export default function App({time, styleMain, styleHeight, taskElement, showFunc, show, backend_url,}) {

  return (
    <>
      {/* Time */}
      <div className="time">
        <h1><span className="time-hour">{time.hour}</span>:<span className="time-minute">{time.minute}</span><span className="time-con">{time.formate.toLowerCase()}</span></h1>
      </div>

      <div className="main" style={styleMain}>
        {/* Header area */}
        <div className="main-header">
          <div className="main-header-text">
            Note
          </div>
        </div>

        {/* Add task remove task */}
        <div className="main-btn">
          <button className="main-btn-add"
            onClick={showFunc}
            style={styleHeight}
          >
           { !show ? "New Task" : "Done"}
          </button>
        </div>

        {/* input task */}
        {show 
        &&

        <div className="main-input">
              <form action={backend_url+"/data"} method="POST">
                <input 
                  type="text" 
                  name="taskname" 
                  placeholder="Your task"
                  className="main-input-task"
                  autoComplete="off"
                  autoFocus
                />
                <input 
                  type="text" 
                  name="tasktime" 
                  placeholder="Task time (h:m:am/pm)"
                  className="main-input-task"
                  autoComplete="off"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="main-input-submit"
                  style={styleHeight}
                  >Add</button>
              </form>
        </div>

        }


        {/* Menu area */}
        <div className="main-menu">
          <ul className="p-0">
            {taskElement}
          </ul>
        </div>
      </div>

      {/* me */}
      <div className="main-me">
        <a href="https://www.linkedin.com/in/alamin1964/" target='_blank'>Concept & build by MD. Alamin</a>
      </div>
    </>
  )
} 