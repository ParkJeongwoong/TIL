# Context API

사용 목적 : **Redux를 사용하지 않고 전역변수를 관리하기 위함**



## Context

### 핵심

1. <u>**CreateContext**</u>

   `export const MyContext = React.createContext(default 값);`

   Context 객체 생성

   CreateContext 객체 내부에는 Provider와 Consumer가 존재

   1. **Provider**

      `MyContext.Provider value={값 설정}> </MyContext.Provider>`

      Provider를 이용해 자손들에게 Context 제공

      Provider의 value는 하위 모든 컴포넌트에서 사용 가능 (<u>**Provider에 속한 모든 컴포넌트는 value가 변경될 때 재 렌더링**</u>)

      위의  createContext 시 결정하는 default 값을  null로 주고 여기서 따로 value를 설정해도 된다.

   

   2. **Consumer**

      `<MyContext.Consumer> {(value) => (함수 코드)} </MyContext.Consumer>`

      MyConetext의 value 변경 사항을 구독



2. <u>**useContext**</u>

`const value = useContext(MyContext);`

Context의 객체를 가져옮

다른 컴포넌트에서 Context를 사용할 때는 import 해야 한다

`import { MyContext } from '상위 컴포넌트 주소'`



### 요약

- **값 단순 전달** => `createContext & useContext`

- **전달 시 값 변경 및 변경 값 활용** => `Provider & Consumer`



### 예시

- 상위 컴포넌트

```react
import React, {createContext} from 'react';

export const example = createContext(null);

function Parent() {
    return(
    <example.Provider value={value: true, contextDispatch}>
        <div>
            <Children />
        </div>
    </example.Provider>
    )
};
```

- 하위 컴포넌트

```react
import React, { useContext } from 'react';
import { example } from "./Parent.js"


function Children() {
    const example = useContext(example)
    console.log(example) // true 출력
    return(
        <div>
        	{example}
        </div>
    )
}
```



## Reducer

### 핵심

`상태 변경`

redux의 reducer와 사용 방식이 동일



- **<u>useReducer</u>**

  `const [state, contextDispatch] = useReducer(reducer, initialState);`



- **<u>Reducer</u>**

  ```react
  const reducer = (state, action) => {
      switch (action.type) {
          case "ADD_TODO":
              const newToDoObj = { text: action.text, id: Date.now() };
              return [newToDoObj, ...state];
          case "DELETE_TODO":
              const cleaned = state.filter(toDo => toDo.id !== parseInt(action.id));
              return cleaned;
          default:
              return state;
      }
  }
  ```



- 컴포넌트에서 reducer 사용

  ```react
  const { value, contextDispatch } = useContext(Context)
  
  ...
  
  <button
      onClick={()=>contextDispatch({type: "ADD_TODO", value=id })}
      >
      증가
  </button>
  ```



# 최종 정리 예제!!!!!!!

- Register.js - 상위 컴포넌트

```react
import React, { createContext, useReducer, useState } from "react";
...
// Context-Reducer //
// reducer 설정
const reducerSubmit = (state, action) => {
  switch (action.type) {
    case "SUBMIT":
      return {state: true, email: action.value}
    default:
      throw new Error("회원가입 실패")
  }
}
// state, dispatch를 Context 객체로 export
export const stateSubmitContext = createContext()
export const dispatchSubmitContext = createContext()

function Register() {
  // useReducer(reducer, initialState) //
  // reducer를 첫 번째 인자로, initialState 두 번째 인자를 설정한 state와 dispatch 생성
  const [state, dispatch] = useReducer(reducerSubmit, {state: false, email: ""})
  ...
  // dispatch Context 객체를 useReducer의 dispatch로 설정 후 하위 컴포넌트와 연결
  // state Context 객체를 useReducer의 state로 설정 후 하위 컴포넌트와 연결
  return (
    <dispatchSubmitContext.Provider value={dispatch}>
      <stateSubmitContext.Provider value={stateSubmit}>
        {
          stateSubmit.state ? (
            <RegisterComplete />
          ):(
            <div>
              {isBusiness ? (
                <div>
                  <RegisterBusiness />
                </div>
                ):(
                <div>
                  <RegisterGeneral />
                  <div className="change_to_business">
                    <div>체육관 소유주이신가요?</div>
                    <button className="registerForm__button change_to_business__button" onClick={change_to_business}>비즈니스 계정 회원가입</button>
                  </div>
                </div>
              )}
            </div>
            )
          }
    </stateSubmitContext.Provider>
  </dispatchSubmitContext.Provider>
  )};

export default Register
```



- RegisterGeneral.js - 하위 컴포넌트

```react
import React, { useState, useEffect, useContext } from "react";
import { dispatchSubmitContext } from "../common/Register";
...
function RegisterGeneral() {
  // Context-Reducer //
  // dispatch를 context 객체로 import
  const dispatch = useContext(dispatchSubmitContext)
  ...
  // dispatch를 통해 reducer 사용 가능 (상태 변경)
  return(
      ...
      <button onClick={()=>{dispatch({type: "SUBMIT"})}}>클릭!</button>
      ...
      )
}
```



- RegisterComplete.js - 하위 컴포넌트

```react
import React, { useContext } from "react";
import { stateSubmitContext } from "router/user/common/Register";

function RegisterComplete() {
  // Context
  const { email } = useContext( stateSubmitContext )

  return(
    <div className="registerComplete">
      <div>
        <img className="registerComplete__logo" src="/images/logo.png" alt="logo" />
      </div>
      <div className="registerComplete__comments">
        <div>인증 메일이 발송되었습니다!</div>
        <div className="registerComplete__email">{ email }</div>
        <div>이메일 인증을 완료하시면 서비스 사용이 가능합니다.</div>
        <div className="registerComplete__excuse">인증 메일 발송에 1~2분이 소요될 수 있습니다.</div>
      </div>
    </div>
  )
}

export default RegisterComplete
```



# 전역 관리

## 구성





# 참조

https://velog.io/@code-bebop/useReducer%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90

**https://velog.io/@ansrjsdn/Context-API-Store-%EB%B6%84%EB%A6%AC-%ED%95%A9%EC%B3%90%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0**

<u>**https://velog.io/@kimu2370/%EB%A6%AC%EB%8D%95%EC%8A%A4%EC%97%86%EC%9D%B4-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0hookscontext**</u>
