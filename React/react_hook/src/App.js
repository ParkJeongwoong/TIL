import './App.css'
import React, { useState, useEffect, useRef } from "react"
import useAxios from "./useAxios"

// useInput
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue)
  const onChange = event => {
    let willUpdate = true
    if (typeof validator === "function") {
      willUpdate = validator(event.target.value)
    }
    if (willUpdate) {
      setValue(event.target.value)
    }
  }
  return { value, onChange }
}

// useTabs
const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  }
]
const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab)
  if (!allTabs || !Array.isArray(allTabs)) {
    return
  }
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  }
}

// useTitle
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle)
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title")
    htmlTitle.innerText = title
  }
  useEffect(updateTitle, [title])
  return setTitle
}

// useClick
const useClick = (onClick) => {
  const element = useRef()
  useEffect(() => {
    // 1. 변수를 안에서 copy하지 않으면 warning (element가 unmount 시점에 null이 된다.)
    const ref = element.current
    if(ref){
      ref.addEventListener("click", onClick)
    }
    if(typeof onClick !== "function") {
      return
    }
    // 2. Unmount 단계, Component가 Unmount되면 eventListener를 정리해주는 게 맞다
    return () => {
      if (ref) {
        ref.removeEventListener("click", onClick)
      }
    }
  }, [onClick])
  if(typeof onClick !== "function") {
    return
  }
  return element
}

// useConfirm & usePreventLeave
const useConfirm = (message = "", onConfirm, onCancel) => {
  if (typeof onConfirm !== "function") {
    return
  }
  if (typeof onCancel !== "function") {
    return
  }
  const confirmAction = () => {
    if(window.confirm(message)) {
      onConfirm()
    } else {
      onCancel()
    }
  }
  return confirmAction
}

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault()
    event.returnValue = ""
  }
  const enablePrevent = () => window.addEventListener("beforeunload", listener)
  const disablePrevent = () => window.removeEventListener("beforeunload", listener)
  return { enablePrevent, disablePrevent }
}

// useBeforeLeave
const useBeforeLeave = (onBefore) => {
  const handle = event => {
    const { clientY } = event
    if(clientY <= 0) {
      onBefore()
    }
  }
  useEffect(() => {
    document.addEventListener("mouseleave", handle)
    return () => document.removeEventListener("mouseleave", handle)
  })
}

// useFadeIn
const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef()
  useEffect(() => {
    if (element.current) {
      const { current } = element
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`
      current.style.opacity = 1
    }
  }, [duration, delay])
  return {ref: element, style: { opacity: 0 } }
}

// useNetwork
const useNetwork = onChange => {
  const [status, setStatus] = useState(navigator.onLine)
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine)
    }
    setStatus(navigator.onLine)
  }
  useEffect(() => {
    window.addEventListener("online", handleChange)
    window.addEventListener("offline", handleChange)
    return () => {
      window.addEventListener("online", handleChange)
      window.addEventListener("offline", handleChange)
    }
  })
  return status
}

// useScroll
const useScroll = () => {
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0
  })
  const onScroll = () => {
    setScroll({y: window.scrollY, x: window.scrollX})
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return scroll
}

// useFullscreen
const useFullscreen = (callback) => {
  const fullScrEl = useRef()
  const triggerFull = () => {
    if(fullScrEl.current){
      if (fullScrEl.current.requestFullscreen) {
        fullScrEl.current.requestFullscreen()
      } else if (fullScrEl.current.mozRequestFullscreen) {
        fullScrEl.current.mozRequestFullscreen()
      } else if (fullScrEl.current.webkitRequestFullscreen) {
        fullScrEl.current.webkitRequestFullscreen()
      } else if (fullScrEl.current.msRequestFullscreen) {
        fullScrEl.current.msRequestFullscreen()
      }
      if (callback && typeof callback === "function") {
        callback(true)
      }
    }
  }
  const exitFull = () => {
    const checkFullScreen = document.fullscreenElement
    if (checkFullScreen !== null) {
    document.exitFullscreen()
    }
    if(callback && typeof callback === "function") {
      callback(false)
    }
  }
  return { fullScrEl, triggerFull, exitFull }
}

// useNotification
const useNotification = (title, options) => {
  if(!("Notification" in window)) {
    return
  }
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, options)
        } else {
          return
        }
      })
    } else {
      new Notification(title, options)
    }
  }
  return fireNotif
}


const App = () => {
  // useState
  const [item, setItem] = useState(0)
  const incrementItem = () => setItem(item+1)
  const decrementItem = () => setItem(item-1)

  // useInput
  const maxLen = (value) => value.length < 10
  const name = useInput("Mr.", maxLen)

  // useTabs
  const { currentItem, changeItem } = useTabs(0, content)

  // useEffect
  const sayHello = ()=>console.log("hello")
  const [number, setNumber] = useState(0)
  const [aNumber, setAnumber] = useState(0)
  useEffect(sayHello, [number])

  // useTitle
  const titleUpdater = useTitle("Loading...")
  setTimeout(()=>titleUpdater("Home"), 5000)

  // useClick
  const sayClicked = () => console.log("I'm clicked!")
  const title = useClick(sayClicked)

  // useConfirm & usePreventLeave
  const deleteWorld = () => console.log("Deleting the world...")
  const abort = () => console.log("Aborted")
  const confirmDelete = useConfirm("Are you sure", deleteWorld, abort)

  const {enablePrevent, disablePrevent} = usePreventLeave()

  // useBeforeLeave
  const begForLife = () => console.log("Pls dont Leave")
  useBeforeLeave(begForLife)
  
  // useFadeIn
  const fadeInH1 = useFadeIn(1, 2)
  const fadeInP = useFadeIn(2, 4)

  // useNetwork
  const onLine = useNetwork()

  // useScroll
  const {y} = useScroll()

  // useFullscreen
  const onFullS = (isFull) => {
    console.log(isFull ? "We are full" : "We are small")
  }
  const {fullScrEl, triggerFull, exitFull} = useFullscreen(onFullS)

  // useNotification
  const triggerNoitf = useNotification("Can I get your bread?", {body: "I love bread, don't you?"})

  // useAxios
  const { loading, data, error, refetch } = useAxios({
    url:
    "https://yts.mx/api/v2/list_movies.json"
    })
  // console.log(`Loading: ${loading}\nError: ${error}]nData: ${JSON.stringify(data)}`)

    
  return (
    <div className="App">
      {/* useState */}
      <h1>Hello</h1>
      <h1>{ item }</h1>
      <h2>Magic of React Hook!</h2>
      <button onClick={decrementItem}>Decrement</button>
      <button onClick={incrementItem}>Increment</button>

      <hr></hr>
      
      {/* useInput */}
      <input placeholder="Name" value={name.value} onChange={name.onChange} />
      <input placeholder="Name" {...name} />
      <div>{name.value}</div>

      <hr></hr>

      {/* useTabs */}
      { content.map((section, index) => (
        <button onClick={()=>changeItem(index)} key={index}>{ section.tab }</button>
      ))}
      <div>
        { currentItem.content }
      </div>

      {/* useEffect */}
      <div>Hi</div>
      <button onClick={()=>setNumber(number+1)}>{ number }</button>
      <button onClick={()=>setAnumber(aNumber+1)}>{ aNumber }</button>

      {/* useClick */}
      <h1 ref={title}>USECLICK</h1>

      {/* useConfirm & usePreventLeave */}
      <button onClick={confirmDelete}>Delete the World</button>
      <div>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>Unprotect</button>
      </div>

      {/* useBeforeLeave */}
      <h1>BeforeYouLeave</h1>

      {/* useFadeIn */}
      <h1 {...fadeInH1}>Fade In </h1>
      <p {...fadeInP}>lorem ipsum lalalalal</p>

      {/* useNetwork */}
      <h1>{onLine ? "Online" : "Offline"}</h1>

      {/* useScroll */}
      <div style={{height: "200vh"}}>
        <h1 style={{position: "relative", color: y > 400 ? "red" : "blue"}}>Scroll</h1>
      </div>

      {/* useFullscreen */}
      <div ref={fullScrEl}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Baleine_%C3%A0_bosse_et_son_baleineau_2.jpg/1200px-Baleine_%C3%A0_bosse_et_son_baleineau_2.jpg" 
          alt="whale"
        />
        <button onClick={exitFull}>Exit fullscreen</button>
      </div>
      <button onClick={triggerFull}>Make fullscreen</button>

      {/* useNotification */}
      <div>
        <button onClick={triggerNoitf}>Notification!</button>
      </div>

      {/* useAxios */}
      <button onClick={refetch}>Refetch</button>
      <h2>{loading && "Loading"}</h2>
      <h2>{data && data.status}</h2>
    </div>
  )
}

export default App