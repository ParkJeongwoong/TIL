# Vue.js

> [시작하기 — Vue.js (vuejs.org)](https://kr.vuejs.org/v2/guide/index.html)

## MVVM Pattern

- Model : Data (<u>JS Object</u>)
- View : HTML (<u>DOM</u>) - Data의 변화에 따라 바뀌는 대상
- View Model : 중개자 역할 (<u>Vue Instance</u>)

![MVVM(Model-View-ViewModel) in Vue.js](https://012.vuejs.org/images/mvvm.png)



## 코드 작성 순서

"Data 변화 => DOM 변화"

- **Data 로직 => DOM** 순으로 작성



## 코드 작성

1. CDN 받아오기

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

2. <u>Data 로직</u> 작성 & <u>Vue Instance</u> 생성 / **Model** 과 **View Model** 처리

```javascript
const app = new Vue({
  el: '#app',
  data: {
    message: 'beautiful Vue'
  }
})
```

3. <u>DOM</u> 작성 / **View** 처리

```html
<div id="app">
    {{ message }}
</div>
```



## Vue 객체 속성

- `el` : element => **대상 객체**
- `data` : Vue와 **연동된 데이터**
- `methods` : <u>**동작(data setting)** 담당</u> // 특정 신호에 동작하는 콜백 함수들 / **return 필수 X** (동사형으로 사용)
  - **`method에서 this는 vue instance를 의미`** => <u>this를 통해 객체에 접근하고 vue data의 다른 요소들에 접근하기 때문에 arrow func 사용 불가</u>
- `computed` : **data getting** 담당 // <u>참조하고 있는 데이터가  바뀔 때</u> 실행 / 캐싱된 데이터를 사용하므로 빠름 / **return 필수** (<u>명사형</u>으로 사용)
- `filters` : 함수식 작성 -> 텍스트 변형 / `interpolation, v-bind`에서 활용 가능 (**JS 표현식 마지막에 `|`를 추가해서 사용**) (체이닝 가능)



## Directives

> Diretives는 적용하는 HTML 태그 안에다가 쓴다
>
> <u>value 값은 "" 안에 JS 표현식으로 작성해야 한다</u>

### v-text

`v-text="key"` => vue instance의 data에 있는 value를 **innerText 형태로 출력**

- innerText로 {{ key }} 와 같음 // 하지만 DTL과 충돌할 수 있으므로 interplation 사용은 지양



### v-html

`v-html="key"` => vue instance의 data에 있는 value를 **innerHTML 형태로 출력**

- innerHTML과 같음, 즉 XSS 공격에 취약
  - 따라서 <u>사용자에게 받은 내용을 사용 절대 금지</u>



### v-show

`v-show="condition"` => condition이 True이면 **출력** / False이면 **숨김**

- **display 여부 설정** (v-if와 차이점)
- 초기 렌더링 비용이 크고 토글 비용이 작음 => <u>자주 바꿀 때 사용</u>



### v-if

`v-if="condition"` => condition이 True면 **출력** / False면 **제거**

- component의 **존재여부 설정** (v-show와 차이점)
- 토글 비용이 크고 초기 렌더링 비용이 작음 => 런타임 시 <u>조건이 바뀌지 않으면 사용</u>

> 추가. `v-else-if`, `v-else`



### v-for

> Directives 중 유일하게 "" 안에 JS 문법이 아닌 Python스러운 문법이 들어감

`v-for="element in iterator"` => iterator 안에서 **element를 하나씩 뽑아 HTML 태그 생성**

- v-for가 들어있는 태그와 동일한 태그를 생성
- v-if 보다 우선순위가 높음 (가능하면 중복 사용 지양)



### v-bind

`v-bind:attribute="value"` => vue instance의 data에 있는 value를 **HTML 속성의 값으로 할당**

- shortcut: **`:`로 `v-bind:` 대체 가능**

#### 속성 할당

```html
<div :class="{ active: isActive }"></div>
```

- 이런 식으로 속성을 동적으로 할당 가능



### v-on

`v-on:trigger="Event"` => trigger가 발동하면 **Event 함수를 실행**(<u>method</u>)

- shorcut: **`@`로 `v-on:` 대체 가능**
- method에서 arrow function을 쓰면 bind()가 동작하면서 window를 this로 잡게 됨 => 사용 X

```html
<div id="app">
  <h1>{{ message }}</h1>

  <button v-on:click="changeMessage">Go!</button>

  <h2>{{ name }}</h2>
  <!-- <input v-on:change="changeName" type="text"> change는 엔터 쳐야(혹은 focus out에) 반응 / input은 실시간 반응 -->
  <input @change="changeName" type="text"> <!-- v-on은 @로도 대체 가능-->
</div>
```

```javascript
const obj = { // 특정 속성들을 정의
  el: '#app',
  data: {
    message: 'beautiful Vue',
  },
  methods: {
    // this가 등장하기 때문에 화살표 함수 ()=>{}는 사용 불가능
    changeMessage: function () {
      this.message = 'Changed'
      console.log(this) // vm이 나옴
    },

    arrowFunction: () => {
      console.log(this) // window가 나옴 => 사용 불가능
    },

      changeName: function (event) {
      this.name = event.target.value
    },
  }
}
const vm = new Vue(obj)
```

- trigger 종류
  - click : 클릭했을 때
  - change : Enter | Focus out 했을 때
  - input : 실시간 반응



### v-model

`v-model="key"` => vue instance의 data에 있는 value와 **양방향 연결(동기화)**

- 보통 input 태그에 사용
- 수식어 종류
  - v-model.lazy : 실시간 동기화가 아닌 change 이벤트 후 동기화
  - v-model.number : 입력이 문자열이 아닌 숫자로 형변환 됨
  - v-modle.trim : 입력이 자동으로 trim 됨





## Vue CLI

- **NPM (Node Package Manage)**
  - 파이썬의 pip

```bash
- 프로젝트 생성
$ vue create new-app
- 서버 구동
$ npm run serve
```

### 구조

- **보통 src에서 작업**
- `assets`: 정적인 파일들
- `components`: 하위 컴포넌트들
- `App.vue`: 최상위 컴포넌트

- `main.js`: webpack이 번들링을 시작할 때 가장 먼저 불러오는 시작점



## Pass Props & Emit Events

- Pass props : 부모 -> 자식 : **데이터 전달**
- Emit event : 자식 -> 부모 : **이벤트 전달**

### Props

[부모]

```vue
<Child :appData="appData" :parentData="parentData" @child-input="onChildInput"/>
```

```javascript
export default {
  name: 'Parent',
  components: {
    Child
  },
  data () {
    return {
      parentData: '',
      childData: '',
    }
  },
}
```

- `:내려보낼 데이터(from data)="내려보낼 이름"`



[자식]

```vue
<p>appData: {{ appData }}</p>
<p>parentData: {{ parentData }}</p>
```

```javascript
export default {
  name: 'Child',
  props: {
    appData: String,
    parentData: String,
  }
}
```

### Emit

[자식]

```vue
<input v-model="childData" @input="onInputChange" type="text">
```

```javascript
export default {
    ...,
    
	methods: {
        onInputChange() {
          this.$emit('child-input', this.childData)
    },
        
    ...,
}
```



[부모]

```vue
<Child :appData="appData" :parentData="parentData" @child-input="onChildInput"/>
```

```javascript
export default {
  name: 'Parent',
  components: {
    Child
  },
    
  ...,
  
  methods: {
    onChildInput (textInput) {
    this.childData = textInput
    ...
    },
    ...
  },
}
```

- `@받은 데이터="동작할 method"`
- method의 인자 이름이 고정되지는 않음



## Vue Router

```bash
$ vue add router
```

- `* router를 만들면 기존의 vue 구조가 바뀌고, App.vue의 내용도 바뀌므로 주의`
- **`웬만하면 초반에 해야 함`**



### Tag

- `<router-link>`
  - **index.js**에서 지정한 컴포넌트와 매핑
    - 히스토리 모드에서는 페이지 새로고침 없이 url 변경
    
    ```vue
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    ```
    
    - App.vue 에서 router-link를 주소로 적을 수도 있지만, 이름으로 접근도 가능
      - **bind** => **obj 형태로 name 명시**



- `<router-view>`
  - <u>router-link를 통해</u> **연결된 컴포넌트가 부착되는 자리**



### 구조

- `veiws`: **router(index.js)에 매핑되는 컴포넌트**를 모아두는 폴더

- `components`: router에 매핑된 컴포넌트 **내부에 작성하는 컴포넌트**를 모아두는 폴더

- `router/index.js`: views의 컴포넌트에 대한 router-link의 경로 지정

- `main.js`: src 내부에서 연결된 vue 설정

  ```javascript
  import Vue from 'vue'
  import App from './App.vue'
  import router from './router'
  
  Vue.config.productionTip = false
  
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
  ```



### views

1. **script에서 컴포넌트 import**
2. **script의 components에 component 등록**
3. **template에서 component 사용** - `<component />` 방식

```vue
<template>
  <div class="home">
    ...,
      
    <!-- 3. 사용하기 -->
    <Parent :appData="appData" @parent-input="onParentInput" @child-input="onChildInput" />
  </div>
</template>

<script>
// @ is an alias to /src
// 1. 부르기
import Parent from '@/components/Parent.vue'

export default {
  name: 'App',
  // 2. 등록하기
  components: {
    Parent,
  },
    
  ...,
}
```





### index.js

1. **Component를 호출**
2. **routes에 Component Router 등록**

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
// 1. Component 호출
import Home from '../views/Home.vue'
import About from '../views/About.vue'
Vue.use(VueRouter)

const routes = [
  // 2. Component Router 등록
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```







## 추가 - API Key 암호화

> https://cli.vuejs.org/guide/mode-and-env.html#environment-variables

```bash
$ touch .env.local
```

- 숨김 정보를 넣는 파일

```
VUE_APP_YOUTUBE_API_KEY = 'AIzaSyB_spnOF0MO3271U03OM4nPRfUFLrsw0iw'
```

- 반드시 변수명 앞에 `VUE_APP_`를 붙여야 함

```javascript
const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
```

- 그리고 이렇게 `process.env.`을 통해 접근



## 추가 - 배포

```bash
$ npm run build
```

- 압축한 js, css 파일을 `dist` 폴더에 만든다.

- dist 폴더에 있는 `css, js, index, favicon`을 복사 => 사이트에 올리면 완성



> https://online.codingapple.com/unit/vue-build-and-deploy-with-github-pages/?id=139