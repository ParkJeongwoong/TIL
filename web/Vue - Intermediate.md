# Vue.js - Intermediate

68, 마지막 프로젝트 파일 참고

## Vue Life Cycle Hook

> https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html

- `beforeCreated`, `beforeMounted`, `beforeUpdated`, `beforeDestroyed` `destroyed`
- **`created() {}`**: 요소(변수들) 생성 이후 동작
- **`mounted() {}`** : DOM에 요소 부착 이후 동작
- `updated() {}` : DOM 변경 이후 동작





## API Key 암호화

환경변수 설정을 통한 숨김 처리

> https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
>
> https://velog.io/@skyepodium/vue-%EC%8B%A4%ED%96%89-%EB%AA%A8%EB%93%9C%EC%99%80-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%84%A4%EC%A0%95#1-envlocal-%EC%99%80-gitignore

```bash
$ touch .env.local
```

- 숨김 정보를 넣는 파일 (루트 디렉토리에 생성)

```
VUE_APP_YOUTUBE_API_KEY = 'AIzaSyB_spnOF0MO3271U03OM4nPRfUFLrsw0iw'
```

- 반드시 변수명 앞에 `VUE_APP_`를 붙여야 함

```javascript
const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
```

- 그리고 이렇게 `process.env.`을 통해 접근





## 배포

>  https://online.codingapple.com/unit/vue-build-and-deploy-with-github-pages/?id=139

```bash
$ npm run build
```

- 압축한 js, css 파일을 `dist` 폴더에 만든다.

- dist 폴더에 있는 `css, js, index, favicon`을 복사 => 사이트에 올리면 완성





## Vuex

```bash
$ vue add vuex
```

- store가 생김 => <u>state, mutations, actions, modules 관리</u>



- `state` : data
- `getters` : computed / 인자 state
- `mutations` : method - **state 변경** / commit으로 호출, 인자 state
- `actions` : method - **데이터 fetch / 처리 / 가공 / 비동기 작업, mutation 호출** / dispatch로 호출, 인자 context



### modules

> https://vuex.vuejs.org/kr/guide/modules.html
>
> https://beomy.tistory.com/88

- 모듈 내부에서 `context.state`는 로컬 state를 뜻함 / <u>mutation과 actions의 state</u> 역시 로컬 state
  - `context.rootState`가 루트 state 의미
- `action`, `mutation`, `getter`는 모두 **글로벌 네임스페이스**에 등록



### Destructuring

- `action (context) { 내용, context.commit('MUTATION') }`

  => `action ({ commit }) { 내용, commit('MUTATION') }`

- context 인자에는 많은 정보가 담겨있음 => 사용할 내용만 destructuring



### Component Binding Helper

vuex를 좀 더 깔끔하게 사용하는 방법

> https://vuex.vuejs.org/kr/api/#%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3-%E1%84%87%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC-%E1%84%92%E1%85%A6%E1%86%AF%E1%84%91%E1%85%A5

- `mapState`
- `mapGetters`
- `mapActions`
- `mapMutations`



[ 사용법 ]

```javascript
import { mapActions } from 'vuex'

export default {
    ...
    
    methods: {
        ...mapActions(['action1', 'action2'])
    },
    
    ...
}
```

- 이 때 methods에 인자를 넣어주는 부분이 없기 때문에, template에서 인자를 넣어줘야 함

```vue
<button @click="action1(arg)"></button>
```





## Plugins

### persistedState

> https://www.npmjs.com/package/vuex-persistedstate

```bash
$ npm i vuex-persistedstate
```



- **store/index.js**에 plugin을 설치

```javascript
import createPersistedState from 'vuex-persistedstate' // plugin import

export default new Vuex.Store({
    plugins: [
        createPersistedState(), // plugin 등록
    ],
    state: {
        ...
    },
    mutations: {
        ...
    },
    actions : {
        ...
    },
    modules : {
    }
})
```

- 이렇게 plugin을 설치하면 새로고침 해도 데이터가 사라지지 않음

  

### vue-cookies

> https://www.npmjs.com/package/vue-cookies

```bash
$ npm i vue-cookies
```



- **src/main.js**에 plugin 설치

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies' // vue-cookies import

Vue.config.productionTip = false

Vue.use(VueCookies)  // vue-cookies 사용

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

- **store/index.js**에 plugin 사용

```javascript
import cookies from 'vue-cookies'
import axios from 'axios'
import DRF from '@/api/drf.js'
import router from '@/router'
```

```javascript
// 쿠키 가져오기
cookies.get('keyName')

// 쿠키 등록
cookies.set('keyName', value)

// 쿠키 삭제
cookies.remove('keyName')
```





## CORS

> https://github.com/adamchainz/django-cors-headers

```bash
$ python -m pip install django-cors-headers
```

- 아래는 settings

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]
```

```python
MIDDLEWARE = [
    ...,
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...,
]
```

```python
CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
    "http://localhost:8080",
    "http://127.0.0.1:9000"
]
```

- 만약 `CORS_ALLOW_ALL_ORIGIN = True`로 둔다면 모든 접근을 허용하겠다는 말




## Authentication & Authorization
### JWT (Token Based Authentication)

> https://jpadilla.github.io/django-rest-framework-jwt/

```bash
$ pip install djangorestframework-jwt
```

- 아래는 accounts/urls.py

```python
from rest_framework_jwt.views import obtain_jwt_token
#...

urlpatterns = [
    path('api-token-auth/', obtain_jwt_token),			# JWT 토큰 획득
    url('api-jwt-auth/refresh/', refresh_jwt_token),	# JWT 토큰 갱신
    url('api-jwt-auth/verify/', verify_jwt_token),	# JWT 토큰 확인
]
```



- JWT 기본 유효 시간이 5분 => 수정 필요
- settings.py

```python
import datetime

...

JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1),
}

...
```

- token 값 저장

```javascript
// axios의 응답에 대해
.then(res => {
    localStorage.setItem('jwt', res.data.token)
})
```



#### Authentication

- views.py

```python
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import JSONWebTokenAuthentication

@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication]) # JWT를 활용한 인증을 할 때 JWT가 유효한지만 파악
@permission_classes([IsAuthenticated]) # 인증되지 않은 상태의 요청이면 '자격 인증 데이터'가 제공되지 않았습니다 같은 메세지 응답
```





## Navigation Guard

> https://router.vuejs.org/kr/guide/advanced/navigation-guards.html

경로 이동 조건을 설정하는 방법

- 전역 가드 : routing 이전에 실행

```javascript
router.beforeEach((to, from, next) => {
  const pages1 = ['name1', 'name2']
  const pages2 = ['name3', 'name4']
  
  const condition1 = pages1.includes(to.name)
  const condition2 = pages2.includes(to.name)
  const condition3 = store.getters.condition3

  // 없는 경로로 가려고 한다면
  if (!to.name) {
    next({ name: 'NotFound' })
  }
 
  // condition1 이면서 condition3
  if (condition1 && condition3) {
    next({ name: 'c1c3' })
  }

  // condition2 이면서 not condition3
  if (condition2 && !condition3) {
    next({ name: 'c2~c3' })
  } else {
    next() // 리디렉션 없이 통과! (정상적인 페이지 이동)
  }
})
```

- to : 넘어갈 곳
- from : 넘어온 곳
- next : 실행할 콜백함수





## Variable Routing

- params 키워드를 통해 router-link에 해당 인자 사용 가능
- `$route.params`를 통해 variable 사용 가능





## .Native

> https://hj-tilblog.tistory.com/88

v-on과 같이 쓰이면서 하위 컴포넌트의 이벤트를 상위 컴포넌트에서 아용 가능!

`<컴포넌트명 @이벤트핸들러.native="이벤트함수명"> </컴포넌트명>"`  <= 이런 형태로 사용