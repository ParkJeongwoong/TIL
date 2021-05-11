# JavaScript - Intermediate

## 비동기식 JS

### AJAX (Asynchronous Javascript And XML)

> HTML 페이지 전체가 아닌 `일부분`만 갱신
>
> XHR 객체 사용 (JSON, XML 형태로 데이터를 받음)

- 비동기식 JS

- XMLHttpRequest 객체 사용 (실제로는 JSON 활용)

```javascript
const request = new XMLHttpRequest()
const URL = 'https://naver.com'

request.open('GET', URL)
request.send()

const todo = request.response
console.log(todo)
```

- 이렇게 XMLHttpRequest 객체를 만들고, **open**과 **send** 메서드를 활용해서 데이터를 보내고 **response** 메서드를 통해 데이터를 받는다



### Concurrency Model

> https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop

비동기식 작업을 위해 `Event Loop`를 사용하는 **동시성 모델**

![JavaScript Concurrency Model and Event Loop](https://i.imgur.com/rnQEY7o.png)

**`시간/요청`**과 관련된 명령어는 `WEB API`로 이동 후 처리 (`setTimeout()`, `DOM events`, `AJAX로 데이터를 가져오는 일` 같은 시간이 소요되는 일)

=> 처리 후 `Task Queue`로 이동

=> `Event Loop`에서 지속적으로 `Call Stack` 확인

​	비었다면 Queue의 콜백을 push



### 비동기 작업의 순차적 처리

1. `Async callbacks`
   - <u>`콜백 함수`를 통해 비동기 로직을 구현</u> (`콜백함수`; 다른 함수에 **인자로 전달된 함수**)
     - 예) addEventListener()의 두 번째 인자 / '클릭'하면 '콜백'
   - Callback Hell이 발생할 수 있음



2. `promise-style`
   - <u>`Promise 객체`를 활용</u>하여 Callback Hell 없이 깔끔하게 순차 실행 가능
   - XMLHttpRequest 보다 더 현대적인 버전





### Promise

![img](https://mdn.mozillademos.org/files/8633/promises.png)

#### **Promise 객체 만들기**

```javascript
const myPromise = new Promise((resolve, reject) => {
    setTimeout(function () {
        const ran = Math.random() * 10
        
        if (ran >= 5) {
            resolve(ran)
        } else {
            reject(-1)
        }
    }, 1000)
})
```

- 콜백 함수 2개를 인자로 받음
  - Promise가 성공했을 때 => `resolve 반환`
  - Promise가 실패했을 때 => `reject 반환` / **<u>없어도 됨</u>**



#### Promise 객체 활용

```javascript
myPromise
    .then(function (response) {
		console.log(response)
})
	.catch(function (error) {
    	console.log(error)
})
```

- promise의 반환값을 받는 2가지 메서드

  - `.then(callback)` : **성공**했을 때, callback 함수 실행 / **성공 결과를 인자로 받음**
  - `.catch(callback)` : **실패**했을 때, callback 함수 실행 / **실패한 error를 인자로 받음**
  - `.finally(callback)` : **결과와 상관 없이** callback 함수 실행 / **어떠한 인자도 받지 않음**

  

- <u>promise 객체를 반환</u> => **<u>메서드를 반복해서 사용 가능</u>**





## Axios

node.js와 브라우저를 위한 **Promise 기반**의 HTTP 통신 클라이언트

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

- https://github.com/axios/axios 에서 CDN 받아 입력



```javascript
const URL = 'http://jsonplaceholder.typicode.com/todos/1/'

axios.get(URL) // URL에 대한 response 반환
	.then(function (response) {
    	console.log(response)
    	return response.data // data 반환
})
	.then(function (data) {
    	console.log(data)
    	return data.title // title 반환
})
	.then(function (title) {
    	console.log(title)
})
	.catch(function (error) {
    	console.log(error)
})
	.finally(function () {
    	console.log('this is final')
})
```

- **response.data**에 필요한 데이터 존재



# 예시

## DOG

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GET DOG</title>
</head>
<body>
  <!-- dog.html -->
  <h1>DOG IMAGE</h1>
  <div>  
    <button id="getDogBtn">GET DOG IMAGE</button>
  </div>
  <div>
    <img id="dogImage" style="display: none;" alt="random-dog-image">
  </div>

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    const dogImage = document.querySelector('#dogImage')
    const getDogBtn = document.querySelector('#getDogBtn')
    getDogBtn.addEventListener('click', function (event) {
      axios.get('https://dog.ceo/api/breeds/image/random') // axios.get()의 return값은 promise
        .then(function (response) {
          const dogMessage = response.data.message
          dogImage.src = dogMessage
          dogImage.style.display = null
        })
        .catch(function (error) {
          console.error(error)
        })
    })
  </script>
</body>
</html>
```



## Like

> 참고: Django + JS 형태

```django
{% csrf_token %} <!-- 이제 form 태그를 안 써서 필요 X-->
{% for article in articles %}
  <div>
    <form class="likeForm" data-article-pk="{{ article.pk }}">
      {% if request.user in article.like_users.all %}
        <button id="likeBtn{{ article.pk }}" class="btn btn-danger">좋아요 취소</button>
      {% else %}
        <button id="likeBtn{{ article.pk }}" class="btn btn-primary">좋아요</button>
      {% endif %}
    </form>
  </div>
{% endfor %}


<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  const likeForms = document.querySelectorAll('.likeForm')
  
  likeForms.forEach(function (likeForm) {
    likeForm.addEventListener('submit', function (event) {
      event.preventDefault() // 제출이 안 되도록
      const pk = event.target.dataset.articlePk
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/articles/${pk}/likes/`,
        headers: { 'X-CSRFToken': csrftoken }
      })
        .then(function (res) {
          const likeBtn = document.querySelector(`#likeBtn${pk}`)
          likeBtn.innerText = res.data.like ? '좋아요 취소' : '좋아요'
          likeBtn.classList.toggle('btn-primary')
          likeBtn.classList.toggle('btn-danger')
        })
        .catch(err => console.error(err))
    })
  })
</script>
```

- HTML 태그 안에 `data-ke"value"` 값을 추가하면, object 형태로 반환 => script문 내에서 `dataset`을 통해 접근 가능
- 즉, data- 로 시작하는 HTML 속성들은 CUSTOM 가능

```html
<form data-article-pk="{{ article.pk }}">
```

```javascript
form.dataset.articlePk // article.pk 값이 반환됨
```





# JS 문법 심화

## Rest/SpreadOperator

### REST Operator

- without REST Operator

  ```javascript
  function withoutRestOpr(x, y, a, b, c, d, e) {
    console.log(x,y)
    const numbers = [a, b, c, d, e]
    return numbers.map(num => num + 1)
  }
  ```

- with REST Operator

  ```javascript
  function withRestOpr(x, y, ...numbers) { // ... 으로 Python의 *arg 를 표현할 수 있다
    console.log(x,y)
    return numbers.map(num => num + 1)
  }
  ```

  `...numbers`를 인자로 사용하면서 다중인자 표현 가능



### Spread Operator

- without Spread Operator

  ```javascript
  function withoutSpreadOpr () {
    const odds = [1, 3, 5, 7]
    const evens = [2, 4, 6, 8]
    return nums = odds.concat(evens)
  }
  ```

- with Spread Operator

  ```javascript
  function withSpreadOpr() {
    const odds = [1, 3, 5, 7]
    const evens = [2, 4, 6, 8]
    return nums = [...odds, ...evens] // python에서 [*odds, *evens]
  }
  ```

  `...odds`와 `...evens`를 리스트의 인자로 사용함으로써 **concatenate** 가능



## Class

- `__init__`대신 **`constuctor(options) {}` 필수**

```javascript
class Car {
  // __init__() 처럼 처음에 무조건 선언해야 함
  constructor(options) {
    this.title = options.title
  }

  // 이런 형태의 method 함수는 class의 특수 문법
  drive() {
    return `${this.title}는 달린다!`
  }
}

options = {title: '세단', color: 'blue'}
const car = new Car(options)

car.title
car.drive()
```



- 상속

```javascript
class Porsche extends Car {
  constructor(options) {
    super(options)
    this.color = options.color
  }

  honk() {
    return '빵빵'
  }
}

const panamera = new Porsche(options)
```

extends를 이용해서 상속 => super 활용



## this

> this를 window로 사용한다면 잘못 쓰고 있는 것!

- this의 사용처
  1. `constructor` 함수 내부 => `생성될 객체`를 의미
  2. `.function`으로 호출되는 **메서드** 내부 => `메서드를 사용하는 객체`를 의미
     1. <u>**Object의 Key 함수**</u>
     2. **Class 내부 메서드**



- 객체 내부의 함수는 this 사용 가능
- **콜백 함수** 혹은 함수 내부의 함수는, 메서드가 아니므로 this 사용 불가능 (함수 내부의 함수이기 때문에 this가 window로 잡힘)
  - 사용을 하고 싶다면
    1. **함수 끝에 `.bind(this)`를 붙여서** 함수 내부의 this와 함수 바깥의 this를 bind 시킨다
    2. **`arrow function`**을 사용한다. (얘는 bind가 자동)