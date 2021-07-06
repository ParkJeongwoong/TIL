# Redux

> https://ko.redux.js.org/introduction/getting-started/
>
> https://d2.naver.com/helloworld/1848131
>
> https://react-redux.js.org/using-react-redux/connect-mapstate



노마드 코더 강의 : `초보자를 위한 리덕스 101`



## Without React (Pure Redux)

설치 : `npm install redux`

사용 :

1. import 

```react
import { createStore } from "redux";
```

2.  Store, Reducer, Actions 활용



### Codes

- Counter

```javascript
import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD"; // action의 type에 들어가는 string은 타이핑하기 힘들어서 함수로 바꿈 
const MINUS = "MINUS";

const countModifier = (count = 0, action) => { // data를 수정하는 함수 (이 함수만 data를 수정 가능)
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  };
};

const countStore = createStore(countModifier); // createStore 안의 함수가 return 하는 값을 Store에 저장

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => countStore.dispatch({type : ADD});
const handleMinus = () => countStore.dispatch({type : MINUS});

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
```



- Todo List

```javascript
import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  }
};

// Reducer => state를 Return
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== parseInt(action.id));
      return cleaned;
    default:
      return state;
  }
};

// store : 여기서 reducer가 return 하는 state를 저장
const store = createStore(reducer);

// Actions => dispatch를 통해 reducer의 action을 전달
const addTodo = text => {
  return {
    type: ADD_TODO,
    text
  }
};

// Dispatch를 이용한 Actions 호출
const dispatchAddTodo = text => {
  store.dispatch(addTodo(text));
};
const dispatchDeleteTodo = e => {
  const id = e.target.parentNode.id;
  store.dispatch(deleteTodo(id));
};

// store를 subscribe하면서 렌더링하는 함수
const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo)
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddTodo(toDo);
};

form.addEventListener("submit", onSubmit);

store.subscribe(paintTodos);
```



## Redux Flow

![08/26, redux(3)](https://media.vlpt.us/images/sonofhuman20/post/e8bc8967-8762-494a-aa01-8c77556f8edb/redux.png)

1. **Store에 데이터 저장** (`createStore() 사용`)
2. **Reducers를 통해 Store에 저장된 값 변경** (`createStore함수 안에 reducer 함수를 인자로 / 이후 reducer의 return 값이 store에 저장`)
   - 첫 번째 인자는 state, 두 번째 인자는 action
     - 이 때, state에는 초기 값을 default 형태로 설정한다
3. **Actions를 통해 Reducers 실행** (`state.dispatch()를 통해 reducer의 두 번째 인자, action에 message를 보냄`)
   - 구체적으로는 <u>객체</u> (`{ type : action}`)이며 reducer에서 action 인자는 type 안의 action(문자열)을 전달받게 된다
4. <u>시작은 Actions 부터</u>
   1. **`state.dispatch(action)`** /// `state.dispatch({type : data})`
   2. **`reducer = (state, action) => {changedState}`**
   3. **`state = createStore(reducer)`** /// `state = changedState`



## Subscribe

![Redux 개념 익히기 -1](https://media.vlpt.us/images/cyongchoi/post/fa7c231f-fb68-4fde-a96d-c791360dfb8d/Bildschirmfoto-2017-12-01-um-08.56.48.png)

**`state.subscribe(callback)`**

- state의 변화를 감지하고 인자로 가지고 있는 callback 함수를 실행



## State Mutation

- mutation이란?
  - 객체의 값을 변경(수정)하는 행위



- State은 mutate하면 X
- new state object를 return 해야 함!





## REACT REDUX

**이미 React와 Redux를 썼지만**, `react-redux`와 `react-router-dom`을 설치해야 한다

`npm i react-redux react-router-dom`

### 설명

- `reactDom` 

  - https://ko.reactjs.org/docs/react-dom.html

  - <u>앱의 최상위 레벨</u>에서 사용할 수 있는 <u>DOM에 특화된 메서드</u> + React 모델 외부로 나갈 수 있는 해결책을 제공

  - 사용

    ```react
    // index.js
    import ReactDom from "react-dom";
    import App from "./components/App";
    
    ReactDom.render(<App></App>, document.getElementById("root"));
    ```

    위의 경우 **index.html에 있는 <div id="root"></div>를 index.js로 가져와서 App.js를 랜더링**



- `react-router-dom` 

  - https://velog.io/@kwonh/React-react-router-dom-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0

  - **https://yerinko.tistory.com/27**

    ```
    - react-router - 웹&앱
    - react-router-dom - 웹
    - react-router-native -앱
    ```

  - react에서 Routing을 할 때 사용하는 패키지 (이전에 다뤘음)



- **`react-redux`** - redux에서 추가된 어댑터! (<u>redux가 반드시 필요</u>)
  - https://react.vlpt.us/redux/
  - redux 는 리액트에서 사용하기 위해 만들어진 라이브러리이긴 하지만 무조건 리액트와 함께 사용 할 필요 X
    - 그래서 Pure Redux로 먼저 구현했던 것
  - redux -> react-redux 사용 시 **장점**
    1. redux를 쓰면서 생기는 react 코드 구조의 변화를 최소화 (**코드 구조 유지**)
    2. redux를 쓰면 모듈화가 힘들지만 react-redux에서는 이를 해결 (**모듈화**)



- `Provider` - 생성한 store를 연결하는 태그

  ```react
  import React from "react";
  import ReactDom from "react-dom";
  import App from "./components/App";
  import { Provider } from "react-redux";
  import store from "./store";
  
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  ```





### connect

> https://react-redux.js.org/api/connect

`import { connect } from 'react-redux';` => react-redux에서 가져와 쓰는 함수

(아래의 mapStateToProps와 mapDispatchToProps는 이 connect의 인자일 뿐)



- connect는 export default와 함께 쓰인다 => **기존의 `export default 컴포넌트명`이 `export default connect(인자)(컴포넌트명)`으로 바뀐다**

=> 즉 connect 함수의 의미는, **<u>인자로 받은 객체를 해당 컴포넌트에 연결하는 것</u>**



#### mapStateToProps

- **connect 함수의 첫 번째 인자** (함수 or 객체) (함수의 경우 객체를 return) -> <u>따라서 꼭 이 이름이 아니어도 된다</u>
- store가 업데이트 될 때마다 자동으로 호출

```react
function mapStateToProps(state, ownProps?) => Object
```

- 첫 번째 인자, `Redux store`에서 가져온 `state` -> 그냥 Store 값이라고 생각해도 된다
- 두 번째 인자(옵션), `ownProps`는 `component의 props` 



- 즉 <u>Redux store에서 가져온 값(state) + component가 직접 받은 props(ownProps)를 모두 활용 => 리턴한 객체를 return</u>



#### mapDispatchToProps

- **connect 함수의 두 번째 인자** (함수 or 객체) (마찬가지로 함수의 경우 객체를 return) -> <u>꼭 이 이름이 아니어도 된다</u>
- state와 비슷하지만 차이점이 있다면 state를 가져오는 게 아니라 **actions를 가져오는 것**

```react
function mapDispatchToProps(dispatch, ownProps?) => Object
```

- 첫 번째 인자, `store.js`에서 가져온 `actions`
- 두 번째 인자(옵션), `ownProps`는 `component의 props` 



- 이렇게 <u>Return한 객체는 connect를 호출한 component의 props에 추가가 됨 => action을 props를 통해 사용할 수 있음</u>



### 폴더구조

- src
  - component -> **페이지 구성요소**
    - `App.js` -> routes의 Home,js와 Detail.js <u>렌더링을 결정하는 컴포넌트</u>
    - `ToDos.js` -> Home.js에서 사용하는 컴포넌트
  - routes
    - `Home.js`
    - `Detail.js`
  - `index.js` -> **메인 컴포넌트**. <u>index.html과 연결</u>되어 <u>App.js 컴포넌트를 호출</u>
  - `store.js` -> **Store 정보 저장**



## React Redux Flow

1. state를 return하는 `Reducer`

   ```react
   const reducer = (state = [], action) => {
     switch (action.type) {
       case ADD:
         return [{ text: action.text, id: Date.now() }, ...state];
       case DELETE:
         return state.filter(toDo => toDo.id !== action.id);
       default:
         return state;
     }
   };
   ```

   

2. Reducer에서 state를 가져와 저장하는 `store`

   ```react
   const store = createStore(reducer);
   ```



3. Reducer의 action 부분을 담당할 `Actions`

   ```react
   const ADD = "ADD";
   const DELETE = "DELETE";
   
   const addTodo = text => {
     return {
       type: ADD,
       text,
     };
   };
   
   const deleteTodo = id => {
     return {
       type: DELETE,
       id: parseInt(id),
     };
   };
   ```



4. 외부적으로는 store와 actions만 접근 가능 (reducer는 외부에서 접근 불가. reducer를 통해 직접 store를 수정하면 안 되기 때문)

   ```react
   export const actionCreators = {
     addTodo,
     deleteTodo,
   };
   
   export default store;
   ```

   

5. connect

   1. mapStateToProps를 사용해 store 값을 호출

      ```react
      function mapStateToProps(state) {
        return { toDos: state };
      }
      
      function mapDispatchToProps(dispatch) {
        return {
          addToDo: text => dispatch(actionCreators.addTodo(text)),
        };
      }
      
      export default connect(mapStateToProps, mapDispatchToProps)(Home);
      ```

      mapStateToProps가 Return한 값은 해당 컴포넌트의 props에 추가된다

      (이 때 mapDispatchToProps는 option이며 필요하지 않다면 생략해도 된다)

      

   2. mapDispatchToProps를 사용해 actions 호출

      ```react
      function mapDispatchToProps(dispatch, ownProps) {
        return {
          onBtnClick: () => dispatch(actionCreators.deleteTodo(ownProps.id)),
        };
      }
      
      export default connect(null, mapDispatchToProps)(ToDo);
      ```

      mapDispatchToProps가 return한 값이 해당 컴포넌트의 props에 추가된다

      만약 mapStateToProps가 필요하지 않다면 위와 같이 connect 함수의 첫 번째 인자를 null로 두면 된다.





## Redux Toolkit

> Redux의 코드양을 줄여주고 Redux를 편리하게 사용할 수 있도록 도와주는 도구를 제공
>
> https://redux-toolkit.js.org/



1. 설치 : `npm install @reduxjs/toolkit`

### createAction

> https://redux-toolkit.js.org/api/createAction

- store.js

- `import { createAction } from "@reduxjs/toolkit";`



- 기존

```react
const ADD = "ADD";
const DELETE = "DELETE";

const addTodo = text => {
  return {
    type: ADD,
    text,
  };
};

const deleteTodo = id => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};
```

- createAction 사용

```react
const addTodo = createAction("ADD")
const deleteTodo = createAction("DELETE")
```

​	`reducer`의 case의 <u>`ADD`, `DELETE` => **`addTodo.type`, `deleteTodo.type`**</u> && <u>`action.text`, `action.id` => **`action.payload`**</u>

​	**createAction은 자동으로 입력한 인자를 payload로 설정해서 return**



### createReducer

> https://redux-toolkit.js.org/api/createReducer

- store.js

- `import { createReducer } from "@reduxjs/toolkit";`



- 기존

```react
const reducer = (state = [], action) => {
  switch (action.type) {
  	// action이 addTodo일 때의 동작
    case addTodo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
 	// action이 deleteTodo일 때의 동작
    case deleteTodo.type:
      return state.filter(toDo => toDo.id !== action.payload);
    default:
      return state;
  }
};
```

- createReducer 사용

```react
const reducer = createReducer([], {
  // action이 addTodo일 때의 동작
  [addTodo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() }); // 중요!! createReducer에서는 state mutation을 해도 괜찮음!! / 이 때는 return 하지 않음
  },
  // action이 deleteTodo일 때의 동작
  [deleteTodo]: (state, action) => {
    return state.filter(toDo => toDo.id !== action.payload); // 이렇게 새로운 state를 return 해도 괜찮긴 함 / 이 때는 return 함
  },
});
```

​	\*\*\* **<u>중요!! createReducer에서는 state mutation을 해도 괜찮음!!</u>** \*\*\* (이런 경우에는 reducer에서 state를 return하지 않음)



### configureStore

> https://redux-toolkit.js.org/api/configureStore

- store.js

- `import { configureStore } from "@reduxjs/toolkit";`



- 기존

```react
const store = createStore(reducer);
```

- configureStore 사용

```react
const store = configureStore({ reducer });
```

​	미들웨어 추가 / redux developer tool 사용 가능



### createSlice

> https://redux-toolkit.js.org/api/createSlice

- store.js

- `import { createSlice } from "@reduxjs/toolkit";`



- 기존

```react
const addTodo = createAction("ADD");
const deleteTodo = createAction("DELETE");

const reducer = createReducer([], {
  [addTodo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteTodo]: (state, action) => {
    return state.filter(toDo => toDo.id !== action.payload);
  },
});

const store = configureStore({ reducer });

export const actionCreators = {
  addTodo,
  deleteTodo,
};
```

- createSlice 사용

```react
const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => {
      return state.filter(toDo => toDo.id !== action.payload);
    },
  },
});

const store = configureStore({ reducer: toDos.reducer });

export const { add, remove } = toDos.actions;
```

