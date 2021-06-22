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
>
> <u>이 때, componentWillUnmout()는 return 기능이 대체</u>

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





## useRef

**컴포넌트의 특정 부분을 선택하는 방법**

(`document.querySelector()` 같은 역할)

```react
import React, { useState, useEffect, useRef } from "react"

const App = () => {
  const input = useRef()
    
  return (
    <div className="App">
      <input ref={input} placeholder="la" />
    </div>
  )
}
```

위처럼 변수를 useRef()로 선언하고, HTML 태그에서 ref를 해당 변수로 잡으면 연결이 된다.

### useClick

```react
import './App.css'
import React, { useState, useEffect, useRef } from "react"

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



const App = () => {
  const sayClicked = () => console.log("I'm clicked!")
  const title = useClick(sayClicked)
    
  return (
    <div className="App">
      <h1 ref={title}>USECLICK</h1>
    </div>
  )
}

export default App
```

- useClick 내의 useEffect를 통해 Mount 됐을 때와 UnMount 됐을 때의 동작을 지정



## useConfirm & usePreventLeave

> 실제로는 hook이 아님 (useState, useEffect를 쓰지 않음)

```react
import './App.css'
import React, { useState, useEffect, useRef } from "react"

// useConfirm
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

// usePreventLeave
const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault()
    event.returnValue = ""
  }
  const enablePrevent = () => window.addEventListener("beforeunload", listener)
  const disablePrevent = () => window.removeEventListener("beforeunload", listener)
  return { enablePrevent, disablePrevent }
}


const App = () => {
  // useConfirm
  const deleteWorld = () => console.log("Deleting the world...")
  const abort = () => console.log("Aborted")
  const confirmDelete = useConfirm("Are you sure", deleteWorld, abort)

  // usePreventLeave
  const {enablePrevent, disablePrevent} = usePreventLeave()

  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the World</button>
      <div>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>Unprotect</button>
      </div>
    </div>
  )
}

export default App
```



## useBeforeLeave

```react
import './App.css'
import React, { useState, useEffect, useRef } from "react"

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
  const begForLife = () => console.log("Pls dont Leave")
  useBeforeLeave(begForLife)

    
  return (
    <div className="App">
      <h1>BeforeYouLeave</h1>
    </div>
  )
}

export default App
```



## useFadeln & useNetwork

```react
import './App.css'
import React, { useState, useEffect, useRef } from "react"

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


const App = () => {
  // useFadeIn
  const fadeInH1 = useFadeIn(1, 2)
  const fadeInP = useFadeIn(2, 4)

  // useNetwork
  const onLine = useNetwork()

    
  return (
    <div className="App">
      {/* useFadeIn */}
      <h1 {...fadeInH1}>Fade In </h1>
      <p {...fadeInP}>lorem ipsum lalalalal</p>

      {/* useNetwork */}
      <h1>{onLine ? "Online" : "Offline"}</h1>
    </div>
  )
}

export default App
```



## useScroll & useFullscreen

```react
import './App.css'
import React, { useState, useEffect, useRef } from "react"

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


const App = () => {
  // useScroll
  const {y} = useScroll()

  // useFullscreen
  const onFullS = (isFull) => {
    console.log(isFull ? "We are full" : "We are small")
  }
  const {fullScrEl, triggerFull, exitFull} = useFullscreen(onFullS)

    
  return (
    <div className="App">
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
    </div>
  )
}

export default App
```



## useNotification

```react
import './App.css'
import React, { useState, useEffect, useRef } from "react"

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
  const triggerNoitf = useNotification("Can I get your bread?", {body: "I love bread, don't you?"})

    
  return (
    <div className="App">
      <div>
        <button onClick={triggerNoitf}>Notification!</button>
      </div>
    </div>
  )
}

export default App
```



## useAxios

```react
import './App.css'
import React, { useState, useEffect, useRef } from "react"
import useAxios from "./useAxios"

const App = () => {
  const { loading, data, error, refetch } = useAxios({
    url:
    "https://yts.mx/api/v2/list_movies.json"
    })
  // console.log(`Loading: ${loading}\nError: ${error}]nData: ${JSON.stringify(data)}`)

    
  return (
    <div className="App">
      <button onClick={refetch}>Refetch</button>
      <h2>{loading && "Loading"}</h2>
      <h2>{data && data.status}</h2>
    </div>
  )
}

export default App
```

```javascript
import defaultAxios from "axios"
import { useEffect, useState } from "react"

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  })

  const [trigger, setTrigger] = useState(0)
  const refetch = () => {
    setState({
      ...state,
      loading: true
    })
    setTrigger(Date.now())
  }

  useEffect(() => {
    if (!opts.url) {
      return
    }
    axiosInstance(opts).then(data => {
      setState({
        ...state,
        loading: false,
        data
      })
    }).catch(error => {
      setState({...state, loading:false, error})
    })
  }, [trigger])
  
  if (!opts.url) {
    return
  }
  return { ...state, refetch }
}

export default useAxios
```

