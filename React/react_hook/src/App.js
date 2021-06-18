import './App.css'
import React, { useState, useEffect } from "react"

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
    </div>
  )
}

export default App