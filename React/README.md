# React 공부

다음의 강의 / 교재를 활용

1. NomadCoder 강의 : https://nomadcoders.co/
2. 리액트를 다루는 기술

(강의들을 통해 만든 프로젝트는 Repo로 올림)

> 공식 사이트
>
> https://ko.reactjs.org/



# React

## 프로젝트 준비

- create react app 을 하면 webpack과 babel이 모두 설치가 된 상태로 project가 생성된다.

**`npx create-react-app appname`**



## 프로젝트 실행

- 프로젝트 실행 명령어

**`npm start`**



## SRC

이 부분의 내용들을 조작할 예정. 기본부터 배우기 위해 대부분 지울 것
(App.js와 index.js의 일부 내용, logo.svg, index.css, app.test.js, app.css 등 제거) => 최종적으로 **App.js**와 **index.js**만 남음



## React의 동작

React는 소스코드의 처음부터 HTML을 넣지 않음 => 따라서 빈 HTML을 먼저 받게 되고 이후에 JS에 따라 내용을 채워 넣기 때문에 속도가 빠름

=> 이 때문에 <u>소스코드에는 내용이 나타나지 않음!</u>



## Uniqueness of elemet

React에서 모든 element는 유일성을 가져야 한다 (이 유일성은 List 안에 넣을 때 사라진다)

=> 이 때문에 List 내부의 객체에는 각 객체의 유일성을 보증할 `id`값이 있어야 하고, 이 id값을 prop에서 `key`형태로 내려보내야 한다. [`key={elelment.id}`]



## prop types

설치 : `npm i prop-types`

역할 : 전달 받은 props 가 원하는 props인지 확인하는 것

> 이렇게 설치된 패키지는 `package.json`에 추가가 된다

사용 : 

1. App.js에서 import

```react
import PropTypes from "prop-types"
```

2. `Component.propTypes` 형태로 필요한 형식을 지정

```react
Component.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.string, // 이렇게 하면 undefined도 허용
}
```

3. 이 때 에러는 console 창에 나타난다. (동작에는 아무 문제 X)



## Component

컴포넌트는 function 형태가 아니라 class 형태로도 사용할 수 있다.

이 때의 형태는 `class App extends React.Component{ }` => React.Component로 부터 상속 (class는 상속이 가능하다는 장점이 있음)

우리는 이 React.Component의 render 메서드를 사용해서 화면에 출력

### class component를 사용하는 이유

<u>class 내부에 state를 사용해서 component에서 사용하는 데이터를 관리할 수 있다</u>



이 때, 함수를 통해 state의 값을 직접 바꾸면 안 된다!

**그리고 react는 render 메서드를 refresh 하지 않음** => `변경된 값을 출력하려면 render를 다시 호출해야 함`

=> 이를 위해 `setState()`를 사용해서 state의 값을 변경

​	이렇게하면 state의 값을 바꾸면서 render를 재호출 가능



### Class Component

```react
class App extends React.Component{
  // state : 데이터 보관
  state = {
    count: 0
  }
  // 함수 : setState를 통해 state의 값 변경 & rerender
  add = () => {
    this.setState({count: this.state.count+1})
  }
  minus = () => {
    this.setState(current=>({count: current.count-1})) // 이런 식으로 current를 사용하는 것이 더 나은 방법!!!!!
  }
  // render : 화면 출력
  render() {
    return (
      <div>
        <h1>The number is {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    )
  }
}
```



## Function

React Component에서 사용하는 유일한 함수는 render



## Component Life Cycle

> https://ko.reactjs.org/docs/react-component.html#mounting

각 상태에서 다음의 함수를 실행

1. **Mounting**
   - 생성
     - constructor()
     - render()
     - componentDidMount()

2. **Updating**
   - 갱신
     - render()
     - componentDidUpdate()

3. **Unmounting**
   - 제거
     - componentWIllUnmout()



## Fetch

1. fetch()

2. **axios()**

   - 설치: `npm i axios`

   - 사용:

     1. App.js에서 import

     ```react
     import axios from "axios"
     ```

     2. axios 요청

     ```react
     // GET 요청
     axios.get("주소")
     ```

     3. response data 접근



##  async & await

> 비동기 처리 패턴 문법 중 하나

- 일반적으로 비동기 작업은 `콜백`을 사용해야지 실행순서를 보장 받음

  ```react
  axios.get("주소")
      .then((res)=>{
          console.log(res.data)
          return res.data
      })
  ```

  (이렇게 들여쓰기를 한 콜백을 적어야 데이터를 받아서 사용)

- 위의 코드를 좀 더 <u>직관적으로 바꿔 사용</u>하는 방식이 async & awit

  ```react
  async () => {
      res = await axios.get("주소")
      console.log(res.data)
  }
  ```

  `async` : 이 함수는 비동기 함수라는 뜻

  `await` : 이 코드의 실행을 마치고 다음 코드를 진행하라는 뜻 (async 함수 안에서만 동작)





## Cloud에 코드 올리기

1. gh-phages 설치 => GitHub 페이지 도메인에 Static 웹사이트를 나타나게 해 줌

   `npm i gh-pages`

2. package.json 설정

   1. homepage 추가

   ```json
   "homepage": "https://parkjeongwoong.github.io/movie_app/"
   ```

   ```json
   "homepage": "https://{github username}.github.io/{project name}/"
   ```

   2. script에 deploy 추가 (gh-pages를 통해 업로드할 directory를 buil directory로 설정) <= npm run build로 생성되는 폴더

   ```json
   "deploy": "gh-pages -d build",
   ```

   3. script에 deploy 이전에 자동으로 npm run build가 실행되도록 설정

   ```json
   "predeploy": "npm run build"
   ```

3. `npm run deploy` 실행





## React Hook

**`react hook`을 사용하면 state를 사용하기 위해 class component를 사용할 필요가 없다** => 함수형 프로그래밍 가능 (아래에 자세히 다룰 예정)



## Routing

> react-router-dom 사용

설치: `npm install react-router-dom`

사용:

 1. components, routes 디렉토리 생성 후 컴포넌트와 라우트 분리

 2. App.js에 import

    ```react
    import { HashRouter, Route } from "react-router-dom"
    import Home from "./routes/Home"
    import About from "./routes/About"
    ```

    - HashRouter 대신 <u>BrowserRouter 사용 가능</u>

 3. App function에 라우팅

    ```react
    <HashRouter>
      <Route path="/" exact={true} component={Home}></Route>
      <Route path="/about" exact={true} component={About}></Route>
    </HashRouter>
    ```

    이 때, exact={true}를 하지 않으면 해당 path가 확인되면 무조건 렌더링을 하게 됨

    (/about의 경우 '/'가 포함되어 Home 렌더 => '/about'이 포함되어 About 렌더)

4. Link

   > Navigation 에 import 후 사용

   - 이 때 Link는 반드시 Router 안에 있어야 한다!

   ```react
   import React from "react"
   import { Link } from "react-router-dom"
   
   function Navigation() {
     return (
     <div>
       <Navigation />
       <Link to="/">Home</Link>
       <Link to="/about">About</Link>
     </div>
     )
   }
   
   export default Navigation
   ```

   

### HashRouter vs. BrowserRouter

- **HashRouter**

  - 백엔드가 필요없을 때 유용
  - 페이지 경로 뒤에 `/#/식별자`를 입력하면 서버 요청 없이 식별자에 해당하는 element를 렌더
  - 검색 엔진이 읽지 못함
  - 정적인 페이지에 적합

  => <u>Github에 올릴 개인 포트폴리오에 적합</u>

- **BrowserRouter**

  - 대부분의 상용 어플리케이션에 적합한 라우터
  - 새로고침을 하면 에러가 발생 (해결을 위해선 서버에 추가적인 세팅 필요)
  - github 배포가 복잡
  - 동적인 페이지에 적합

  => <u>일반 프로젝트 작업에 적합</u>



## Router Props

> https://gongbu-ing.tistory.com/45

Link를 통해 라우팅을 하면 연결된 컴포넌트에 props 객체의 형태로 **match, location, history** 정보가 담김

이를 이용해 라우팅 과정에서 데이터를 전달할 수 있음

1. App.js에서 variable routing

   ```react
   <Route path="/movie/:id" exact={true} component={Detail}></Route>
   ```

2. Movie.js에서 Link 과정에서 전달할 state 설정

   ```react
   <Link to={{
         pathname: `/movie/${id}`,
         state: {
           year,
           title,
           summary,
           poster,
           rating,
           genres,
         }
       }}>
   	<div>
   		...
   	</div>
   </Link>
   ```

3. Detail.js에서 전달받은 props 사용

   - history는 특정 경로로 push할 때 사용
   - location은 전달된 state 요소를 활용할 때 사용

   ```react
   class Detail extends React.Component {
     componentDidMount() {
       const { location, history } = this.props
       if (location.state === undefined) {
         history.push("/")
       } 
     }
     render() {
       console.log(this.props) // 라우팅을 할 때 전달되는 props들
       const { location } = this.props
       if (location.state) {
         return <span>{location.state.title}</span>
       } else {
         return null
       }
     }
   }
   ```





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

