# React Hooks

**functional component에서 state를 가질 수 있게 해 줌**

=> class component, didMount, render를 대체

=> 리액트에서 함수형 프로그래밍이 가능

> 공식 문서
>
> https://ko.reactjs.org/docs/hooks-overview.html



## 사용 방법

**`import { hook_name } from 'react'`**

'react'에서 import 해서 사용 (hook은 기본적으로 react에 내장되어 있음)

### 종류

1. useState : <u>함수에 state를 제공</u>
2. useEffect : <u>(Vue의) Life Cycle Hook 제공</u>



## useState

```react
import React, { useState } from "react"

const App = () => {
  const [item, setItem] = useState(0)
  const incrementItem = () => setItem(item+1)
  const decrementItem = () => setItem(item-1)
  return (
    <div className="App">
      <h1>Hello</h1>
      <h1>{ item }</h1>
      <h2>Magic of React Hook!</h2>
      <button onClick={decrementItem}>Decrement</button>
      <button onClick={incrementItem}>Increment</button>
    </div>
  )
}

export default App
```

- 선언

[`State 변수`, `Hook 함수 이름`] = userState(`State의 초기 값`)

```react
const [item, setItem] = useState(0)
```

- 저장

`함수명`(`State에 저장할 값`)

```react
const incrementItem = () => setItem(item+1)
```





**아래는 useState를 활용한 Custom Hook**

### useInput

useInput은 react에서 기본적으로 제공 X

<u>`커스텀 Hook`이라고 할 수 있다.</u>

```react
import React, { useState } from "react"

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const onChange = event => {
    setValue(event.target.value)
  }
  return { value, onChange }
}

const App = () => {
  const name = useInput("Mr.")
  return (
    <div className="App">
      <input placeholder="Name" value={name.value} onChange={name.onChange} />
      <input placeholder="Name" {...name} />
      <div>{name.value}</div>
    </div>
  )
}

export default App
```

- 이렇게 하면 value가 "Mr."인 객체 name이 만들어 진다.
  - name = { value: "Mr." }
- `<input placeholder="Name" {...name} />`
  - 이렇게 쓰면 name 안에 있는 모든 것들을 풀어준다.
  - `<input placeholder="Name" value={name.value} onChange={name.onChange} />` 대체 가능



- validator 추가 (최대 길이 10)

```react
import React, { useState } from "react"

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
  
const App = () => {
  const maxLen = (value) => value.length < 10
  const name = useInput("Mr.", maxLen)
  return (
    <div className="App">
      <input placeholder="Name" value={name.value} onChange={name.onChange} />
      <input placeholder="Name" {...name} />
      <div>{name.value}</div>
    </div>
  )
}

export default App
```

### useTab

```react
import './App.css'
import React, { useState } from "react"

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

const App = () => {
  const { currentItem, changeItem } = useTabs(0, content)

  return (
    <div className="App">
      { content.map((section, index) => (
        <button onClick={()=>changeItem(index)} key={index}>{ section.tab }</button>
      ))}
      <div>
        { currentItem.content }
      </div>
    </div>
  )
}

export default App
```





## useEffect

> useEffect는 componentDidMount(), componentDidUpdate(), componentWIllUnmout()의 기능을 담당

```react
import React, { useEffect } from "react"
```

**useEffect**( `Effect 함수`, `Dependency 배열` )

- Dependency는 옵션
- Dependency가 존재한다면, 배열 안에 있는 state가 바뀔 때만 반응

```react
const App = () => {
  const sayHello = ()=>console.log("hello")
  const [number, setNumber] = useState(0)
  const [aNumber, setAnumber] = useState(0)
  useEffect(sayHello, [number])

  return (
    <div className="App">
      <div>Hi</div>
      <button onClick={()=>setNumber(number+1)}>{ number }</button>
      <button onClick={()=>setAnumber(aNumber+1)}>{ aNumber }</button>
    </div>
  )
}

export default App
```

위의 상황에선 `number` state가 변할 때만 sayHello함수가 동작

(`aNumber` state가 변할 때는 동작 X)





**아래는 useEffect를 활용한 Custom Hook**

### useTitle

```react
import './App.css'
import React, { useState, useEffect } from "react"

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
  const titleUpdater = useTitle("Loading...")
  setTimeout(()=>titleUpdater("Home"), 5000)

  return (
    <div className="App">
      Home
    </div>
  )
}

export default App
```

- `const App` 내부의 `titleUpdater`가 실행되는 순간 Title이 Loading으로 바뀐다
- 이후 5초 뒤 다시 titleUpdater가 동작하면서 Title이 Home으로 바뀐다