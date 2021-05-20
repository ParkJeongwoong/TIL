# More About Vew

## vue.js에서 data를 함수로 사용하는 이유

> https://velog.io/@bang3957/vueData

- data를 객체로 쓰게 되면 data를 참조할 때 문제가 생긴다고 배웠다.
- 좀 더 구체적인 이유를 알아보자



[ **구체적인 이유** ]

<u>동일한 컴포넌트가 여러 번 사용</u>되더라도, 동일한 객체를 가리키는 것이 아니라 <u>함수에서 리턴한 객체를 사용</u>하기 때문에 서로 다른 객체를 가리킴



- 즉, 동일한 컴포넌트를 여러 번 사용했을 때 참조의 문제가 생기기 때문에,

  동일한 컴포넌트를 따로 조절하기 위해서 함수 형태의 data를 사용





## v-for 과 v-bind

- Vue CLI를 사용하며 v-for와 v-bind를 항상 함께 사용하길래 헷갈렸었다.



- Vue CLI를 사용하지 않는 환경에서는 `v-for`를 단독으로 사용
  - 이럴 경우 v-for가 붙은 태그 내부에서 item 활용
- **Vue CLI**에서 자식 컴포넌트로 props를 내려줘야 하는 경우
  - **v-for를 통해 꺼낸 item을 bind로 묶어서 내려줘야 함**
  - <u>Vue CLI에서 props를 보내려면 일단 bind 해야 하기 때문</u>





## $의 의미

Vue 에서 `$`는 `전역 객체 속성`이다

즉, private하지 않은 <u>public한 속성이라는 뜻</u>

즉 global (전역변수) 처럼 어디서든 호출할 수 있다는 뜻





## this의 사용처

- 기본적으로 **vue에서 this는 vue 객체를 의미**



- Vue CLI에서는?
  - component - **template** 안에서,
    - `this 사용 X`
  - component - **script** 안에서,
    - `method -> data, props 접근` 시 this 사용
    - `$ 접근` 시 this 사용
  - sotre/**index.js**  안에서,
    - `actions -> state 접근` 시 this 사용
    - `mutations -> state 접근` 시 `this 사용 X` / state를 인자로 받는다
