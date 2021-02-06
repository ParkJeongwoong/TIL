# Bootstrap
## Bootstrap 준비

**빠름** / **반응형** / 가장 유명한 **프론트엔드 오픈소스** / **반응형 그리드 시스템** / **prebuilt**

홈페이지 : https://getbootstrap.com/

공식 문서 : https://getbootstrap.com/docs/5.0/getting-started/introduction/

- [핵심]

**[Responsive], [Grid System]**



### 설치

- 부트스트랩을 사용하려면 부트스트랩 파일을 다운받고 해당 파일을 참조해야 함

  - Compiled CSS and JS 다운로드

    - 한 파일은<u>(*.css), *.min, *.rtl, *.rtl.min</u> 이렇게 4개씩 세트임
    - min 파일(minified)은 css 파일을 단축시킨 버전 (좀 더 빠름)
      - cdn으로 받는 파일은 min 파일

  - https://getbootstrap.com/docs/5.0/getting-started/contents/#css-files

    (각 파일별 기능 확인 링크)

  - css폴더의 bootstrap.css 와 js폴더의 bootstrap.bundle.js 를 필요한 폴더로 이동



### 참조

- head에 css 외부 참조

```html
<link rel="stylesheet" href="bootstrap.css">
```

- body 맨 아래에 js 외부 참조

```html
<script src="bootstrap.bundle.js"></script>
```



=> 부트스트랩을 참조하면 <u>css를 초기화</u>시킨다.

​	(브라우저가 제공하는 기본 스타일이 있는데, 이걸 해제 => 브라우저 별 차이를 없앰)

​	(bootstrap-reboot.css 파일에서 css 초기화 코드 가능)



- 초기화 방식
  - Reset : aggressive한 방식
  - **Normalize : gentle한 방식 (부트스트랩은 이걸 채택)**



#### 더 편한 참조 (CDN)**

Content Delivery(Distribution) Network

- 개별 end-user와 가까운 서버를 통해 부트스트랩 컨텐츠(CSS, JS)를 제공

=> 속도 상승

- 외부 서버를 활용하여 본인 서버의 부하 감소

**https://getbootstrap.com/docs/5.0/getting-started/introduction/**

여기의 Quick start에서 CDN 링크를 확인할 수 있다. (여기선 빠른 min 파일 사용)

> **이걸 통해 개발하는 것이 좋음 **// <u>**앞으로도 CDN 활용**</u>



## Bootstrap 활용

> **Bootstrap은 class를 통해 조작**

**기본적으로 공식 문서를 통해 찾아보며 적용**

=> https://getbootstrap.com/docs/5.0/getting-started/introduction/

---

### spacing

> https://getbootstrap.com/docs/5.0/utilities/spacing/

margin = m

padding = p



top = t

bottom = b

left = start = s

right = end = e

top bottom = y

left right = x



| #    | rem  | px   |
| ---- | ---- | ---- |
| 1    | 0.25 | 4    |
| 2    | 0.5  | 8    |
| 3    | 1    | 16   |
| 4    | 1.5  | 24   |
| 5    | 3    | 48   |
| auto |      |      |

=> `mx-0` / 이런 식으로 사용



### color

>  https://getbootstrap.com/docs/5.0/utilities/colors/

background color = bg

color = text



### position

상단 고정 : fixed-top

하단 고정 : fixed-bottom



### display

display = d



d-none : 공간을 지워버림 (출력도 없음)

d-block

d-inline

<u>d-flex</u> => flex

#### flexbox in Bootstrap

```html
<div class="d-flex justify-content-start">
    ...
</div>
<div class="d-flex align-items-start">
    ...
</div>
<div class="align-self-start-/">
    Aligned flex item
</div>
```

flexbox를 css로 직접 조작하는 것이 아니라 class로 간접 조작

- 마찬가지로 이름이 조금 바뀐다.



### Responsive Web

한 번의 코딩으로 같은 컨텐츠를 여러 디바이스로 편하게 볼 수 있도록 만드는 것

(ex. <u>Bootstrap Grid System</u>)

#### Grid System

`flexbox grid / 12 column / 6 default responsive tier`

---

- **`container`, `rows`, `column` 으로 구성**
- **12개의 column**
- 6개의 grid breakpoints

---

#### 구성

```html
<div class="container">
    <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>        
    </div>    
</div>
```

컨테이너 -> row(가로) -> column(세로)

(12를 column으로 선택한 이유 = 약수가 많아서)

- 12 coulmn을 넘으면 다음줄로 자동으로 넘겨진다.



#### **breakpoint** 6가지

- `Extra small (xs)` <576px
- `Small (sm)` >=576px
- `Medium (md)` >=768px
- `Large (lg)` >=992px
- `Extra large (xl)` >=1200px
- `Extra extra large (xxl)` >=1400px

> 다양한 경우에 사용 가능 (d, col, row 등과 결합하여 해당 bp에서 동작하게 만듦)



[예시]

```html
<span class="d-block p-2 d-sm-none d-md-block bg-primary text-white">d-block</span>
<span class="d-block p-2 d-md-none d-lg-block bg-dark text-white">d-block</span>
```

- `d-sm-none` : display small none : small이 넘어가면 none을 display

- `d-md-block` : display medium block : medium을 넘어가면 block을 display



#### Nesting (중첩된 그리드)

그리드 안에  그리드를 넣는 것 가능

```html
<!-- nesting (중첩된 그리드 시스템) -->
    <h2>nesing</h2>
    <div class="row">
      <div class="box col-6">
        <div class="row">
          <div class="box col-3">1</div>
          <div class="box col-3">2</div>
          <div class="box col-3">3</div>
          <div class="box col-3">4</div>
        </div>
      </div>
      <div class="box col-6">2</div>
      <div class="box col-6">3</div>      
      <div class="box col-6">4</div>
    </div>
```

- 첫 번째 그리드 안에 4등분한 그리드를 넣음

- 이 때 별도의 container 생성 없이, col 안에 row를 새로 만들어 grid 형성



#### offset

grid 시작점 조정 (공간을 만듦)

```html
<div class="box col-4 offset-4">1</div>
```

