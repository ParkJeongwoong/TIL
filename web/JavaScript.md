# JavaScript

> Vanilla JS

## BOM / DOM

- BOM (Browser Object Model)

  - 브라우저 조작



- DOM (Document Object Model)
  - 문서 조작

![문서 객체 모델 - 위키백과, 우리 모두의 백과사전](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/1200px-DOM-model.svg.png)



## 선택 - 변경

> DOM 조작은 `선택 -> 변경` 순서를 따른다

### 선택

- document.**querySelector()** : 값과 일치하는 첫 번째 element를 반환
- document.**querySelectorAll()** : 값과 일치하는 모든 element를 NodeList로 반환
  - 이 때 NodeList는 <u>Static Collection</u>



### 변경

> 메서드

- document.**createElement()** : 주어진 태그명을 가진 HTML 요소 반환
- parentNode.**append()** : 부모 노드의 마지막 자식 다음에 **Node 객체**나 **DOMString** 삽입 / `여러 개` 추가 가능
- node.**appendChild()** : `한 노드`를 부모 노드의 마지막 자식으로 삽입 (Node 객체만 추가 가능) / 만약 이미 다른 노드를 참조하고 있다면, 위치 이동
- childNode.**remove()** : 객체 제거
- node.**removeChild()** : 자식 노드를 제거하고, 제거된 노드를 **반환**

> 속성

- node.**innerText** : 노드와 그 자손의 텍스트 컨텐츠(DOMString) 표현 - `raw text`
- element.**innerHTML** : 요소(element) 내에 포함된 `HTML 마크업` 반환 / 보안 위험이 있으므로 권장하지 않음
  - 대신 <u>Node.**textContent**</u>를 사용하면 전달 된 내용을 HTML로 파싱하지 않고 (raw text)로 삽입합니다.
- element.**setAttribute(name, value)** : 지정된 속성 값을 설정
- element.**getAttribute()** : 지정된 속성의 값 반환

> 이벤트

- **`EventTarget.addEventListener(type, listener[, options])`** : `type`이 발생하면, `listener(콜백 함수)`가 실행

- EventTarget.removeEventListener() : 이벤트 제거

- preventDefault() : 이벤트의 전파는 유지 / 타겟 태그의 기본 동작은 중단



## 식별자

- `camelCase`: 변수, 객체, 함수에 사용
- `PascalCase`: 클래스, 생성자에 사용
- `SNAKE_CASE`: 상수



## 변수

- `let` - <u>재선언 불가능</u> - **재할당 가능** - 블록 스코프( 중괄호 )
- `const` - <u>재선언 불가능</u> - **재할당 불가능** - 블록 스코프( 중괄호 )



- `var` - 재선언 가능 - 재할당 가능 - 함수 스코프 // `호이스팅`으로 인한 불안정성 문제로 사용 X



## 조건문

- `if`

  ```javascript
  if (조건) {
      결과 1
  } else if (조건) {
      결과 2
  } else {
      결과 3
  }
  ```

- `switch`

  ```javascript
  switch (값) {
      case 비교값1: {
          결과 1
          break
      }
      case 비교값2: {
  		결과 2
  		break
      }
      default: {
          결과 3
      }
  }
  ```



## 반복문

- `while`

  ```javascript
  let i = 0
  while (i < 5) {
      <expression>
      i++
  }
  ```

  

- `for`

  ```javascript
  for (let i=0; i<5; i++) {
      <expression>
  }
  ```

  - array용, `for-of`

  ```javascript
  const arrs = [1, 2, 3, 4, 5]
  // for - of
  for (const arr of arrs) {
      <expression>
  }
  ```

  - object용, `for-in`

  ```javascript
  const obj = {key1: 'value1', 'key2': 'value2',}
  // for - in
  for (const key in obj) {
      <expression>
  }
  ```



## 함수

- 선언식

  ```javascript
  function functionName(args) {
      <expression>
      return <result>
  }
  ```

- 표현식

  ```javascript
  const functionName = function (args) {
      <expression>
      return <result>
  }
  ```

- 표현식 (Arrow function)

  ```javascript
  const functionName = (args) => {    <expression>    return <result>}// 만약 args가 1개라면const functionName = arg => {    <expression>    return <result>}// 만약 return 뿐이라면const functionName = arg => <result>
  ```

  

## 객체

- python의 dict와 비슷하지만, key값의 따옴표를 생략할 수 있다는 특징이 있음

- value에 접근할 때, `obj.key` 사용 가능

- ES6+ 축약 문법

  ```javascript
  const key1 = ['k1v1', 'k1v2']const key2 = ['k2v1', 'k2v2']const obj = {    key1,    key2}
  ```

- function 사용

  ```javascript
  const obj = {    funcName1: () => <expression>,    funcName2 () {        <expression>    }}
  ```

- Object Destructuring (비구조화)

  ```javascript
  const obj = {    key1: 'v1',    key2: 'v2',    key3: 'v3',}// 변수명과 key값이 같아야 가능const { key1, key2, key3 } = obj
  ```

### JSON

```javascript
const objData = {    key1: 'v1',    key2: 'v2',}const jsonData = JSON.stringfy(objData) // obj -> string으로 (JSON은 string)const backToObj = JSON.parse(jsonData) // json(string) -> obj로
```



## ArrayHelperMethods

- `forEach` - 반환값 X

  ```javascript
  arr.forEach(function (num) {  console.log(num)})// 아래의 for-of와 같음for (const num of arr) {  console.log(num)}
  ```

  

- `map`

  ```javascript
  arr.map(function (num) {  return <result>})// 아래와 같이 축약해서 사용 가능arr.map(num => <result>)
  ```

  - 응용

    ```javascript
    contents.map(content => `<h2>${content}</h2>`).forEach(tag => document.write(tag))
    ```

    

- `find` - 조건이 True인 첫 번째 요소 반환

  ```javascript
  arr.find(function (num) {  return <조건>})// 아래와 같이 축약해서 사용 가능arr.find(num => <조건>)
  ```

  

- `filter` - 조건이 True인 요소를 모은 배열 반환

  ```javascript
  arr.filter(function (num) {  return <조건>})// 아래와 같이 축약해서 사용 가능arr.filter(num => <조건>)
  ```

  

- `some` / `every`

  - (some) 배열 안의 하나 이상의 요소가 콜백 함수의 return 값이 True면 True
  - (every) 배열 안의 모든 요소가 콜백 함수의 return 값이 True면 True



- `.reduce(callback, initValue)`

  - reduce의 인자 2개(하나는 콜백), 콜백의 인자도 2개 필요

  ```javascript
  arr.reduce(function (acc, num) { // num은 arr의 요소, acc는 시작은 initValue, 그 다음은 콜백의 return값을 받음  return acc + num // 이렇게 하면 매 for문을 돌 때마다 num을 acc에 넣는다.}, 0)
  ```





---

# 예시

## Todo

```javascript
function addTodo(event) {    event.preventDefault()    const inputTag = document.querySelector('#todoInput')    const inputData = inputTag.value    if (inputData.trim()) {      const liTag = document.createElement('li')      liTag.innerText = inputData              liTag.addEventListener('click', function (event) {        event.target.classList.toggle('done')      })              const ulTag = document.querySelector('#todoList')      ulTag.appendChild(liTag)              const deleteBtn = document.createElement('button')      deleteBtn.innerText = 'X'      deleteBtn.addEventListener('click', function (event) {        event.target.parentNode.remove()      })      liTag.appendChild(deleteBtn)    } else {      alert('내용이 없습니다.')    }    inputTag.value = ""  }  const todoForm = document.querySelector('#todoForm')  todoForm.addEventListener('submit', addTodo)
```

