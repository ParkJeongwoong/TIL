import './App.css'
import React, { useState, useEffect, useRef } from "react"

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
  }, [])
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
    </div>
  )
}

export default App