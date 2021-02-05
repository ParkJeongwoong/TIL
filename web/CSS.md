## CSS

**C**ascading **S**tyle **S**heet

스타일, 레이아웃을 통해 HTML을 표시하는 방법을 지정

### 구문

```css
h1 {
  color: blue;
  font-size: 15px;
}
```

- h1 => **선택자**
- color : blue => **선언**
- font-size => **속성**
- 15px => **값**



### 정의 방법

1. 인라인 정의
2. 내부참조 : head 태그 내 <u>style 태그</u>
3. 외부참조 : head 태그 내 <u>외부 CSS 파일 링크</u>

#### 인라인

```html
<body>
  <h1 style="color: blue; font-size: 100px;">Hello</h1>
</body>
```

#### 내부참조

```html
<head>
  <style>
    h1 {
	  color: blue;
	  fornt-size: 15px;
  }
  </style>
</head>
```

#### 외부참조

```html
<head>
    <link rel="stylesheet" href="mystyle.css">
</head>
```

보통 같은 디렉토리 내 css파일을 만들어 관리



### 선택자 (Selector)

> 스타일링 할 요소를 선택

- **기본 선택자**
  - 전체 선택자(*), 요소 선택자(h1, p, a)
  - 클래스 선택자(`.`), 아이디 선택자(`#`), 속성 선택자
    - `.클래스` : 클래스 선택
    - `#아이디` : 아이디 선택자
      - ID는 원칙적으로 한 문서당 한 번만 사용 (한 군데만 적용)



- **결합자 (Combinarors)**
  - 자손 결합자, 자식 결합자
    - `부모 > 자식` : 자식 결합자 (바로 아래)
      - **자식 요소에 `div:nth-child(n)` : n번째 자식이 div면 적용**
      - **자식 요소에 `div:nth-of-type(n)` : n번째 div에 적용**
    - `부모 자식` : 자손 결합자 (하위 전체)
  - 일반 형제, 인접 형제 결합자



- ***의사 클래스/요소(pseudo class)***
  - *링크, 동적 의사 클래스*
  - *구조적 의사 클래스*



### CSS 적용 우선순위 (Cascading Order)

1. **중요도**
   - `!important`를 덧붙인다.

2. 우선순위 (Specificity)
   - **인라인** / **ID 선택자** / **클래스 선택자** / 요소 선택자

3. 소스 **순서**



### 상속

- CSS에는 상속되는 것과 되지 않는 것이 존재
  - 상속 되는 것
    - Text 관련 요소(font, color 등), opacity, visibility 등
  - 상속 되지 않는 것
    - Box 관련 요소(width, margin, border 등), position 관련 요소(top,left)



### 단위

#### 크기 단위

- `px` : 모니터에 따라 상대적인 크기를 가짐
- `%` : 기본글꼴 크기에 대해 상대적인 값을 가짐 (보통 16px이 100%)
- `em` : 배수 단위, 요소에 지정된 사이즈에 상대적인 사이즈 (부모에 영향)
- `rem` : 최상위 요소(html)의 사이즈를 기준으로 배수 단위
  - <u>em보다 rem이 많이 쓰임</u>
- viewport 기준 단위 : 
  - vw, vh, vmin, vmax



#### 색상 단위

- 색상 키워드
- RGB 색상
  - `#+16진수` 표기법
  - `rgb(r,g,b)` 함수형 표기법
    - `rgba(r,g,b,a)`를 통해 투명도(a)도 설정할 수 있다.
    - 숫자가 낮을수록 검정, 높을수록 하양

- HSL 생상
  - 색상, 채도, 명도



#### 문서 표현

- 텍스트 변형 (강조, 폰트, 자간, 행간)
- 컬러, 배경
- 목록 꾸미기
- *표 꾸미기*



### BOX Model

CSS에서는 모든 것이 다 Box 형태

![css box model 이미지 검색결과](https://s3.amazonaws.com/viking_education/web_development/web_app_eng/css_box_model_chrome.png)

1. Margin : 테두리 바깥의 `외부 여백` (배경색 지정 불가능)
2. Border : 테두리 (여기까지 배경색 들어감)
3. Padding : 테두리와 내용 사이의 `내부 여백`
4. Content : 실제 내용 (글, 이미지 등)



#### margin

> 상하좌우 요소 존재

.margin {

margin-top: 10px;

margin-bottom: 30px;

margin-right: 20px;

margin-left: 40px;

}

#### padding

> 마찬가지로 상하좌우 요소 존재

#### Shorthand 적용 순서*

> margin, padding 모두 적용 가능

---

margin: 10px;

​	ㄴ**상하좌우**

margin: 10px 20px;

​	ㄴ**상하** / **좌우**

margin: 10px 20px 30px;

​	ㄴ**상** / **좌우** / **하**

margin: 10px 20px 30px 40px; 

​	ㄴ**상** / **우** / **하** / **좌**



**=> 시계방향으로 돌면서 적용하는 느낌**

----

#### border

> 상하좌우 요소 존재

.border {

border-width: 2px;

border-style: dashed;

border-color: black;

}

- 위와 아래는 같다 (shorthand 버전)

.border {

border: 2px dashed black

}

#### Box size

기본적으로 모든 요소의 `box-sizing`은 `content-box`를 기준으로 함

​	즉 <u>Padding을 제외</u>한 순수 contents 영역을 box로 지정

다만 일반적으로 우리가 영역을 볼 때는 <u>border를 기준으로 함(Padding 포함)</u>

​	그 경우, `box-sizing`을 `border-box`로 설정해야 함

​	(`box-sizing: border-box;`)

#### 마진 상쇄

인접 형제 요소 간의 margin 값이 겹쳐 보임

<u>(큰 margin 값으로 덮어씌워짐)</u>





### Layout

>  Display, Position, Float, Flexbox, Grid

#### Display

- `display: block`
  - 줄 바꿈
  - 화면 전체의 가로 폭 차지 (기본 너비의 100% 차지)
  - block 안에 inline이 들어갈 수 있음
  - `margin-right: auto`로 **정렬**
  - div / ul, ol, li / p / hr / form 등



- `display: inline`
  - 줄 바꿈 X (행의 일부)
  - contetn 너비만큼의 가로 폭 차지
  - <u>width, height, margin-top, margin-bottom 지정 불가</u>
  - **`line-height`로 상하 여백 지정 가능**
  - `text-align: center`로 **정렬**
  - span / a / img / input, label / b, i, strong, em 등



- `display: inline-block`
  - block + inline
  - inline처럼 한 줄 표시 가능
  - block처럼 width, eight, margin 속성 지정 가능



- `display: none`
  - 표시 X ( **공간도 사라짐** )
  - `visibility: hidden`은 공간은 유지, 표시만 X



#### Position

- `static` : Default 값 (기준 위치 / 부모 요소 내에서는, 부모 요소의 위치가 기준)
  - 좌상단에서 우하단으로 가는 기본 배치 순서를 따름
  - <u>이동 불가</u>

- 이동 가능한 position (`top, bottom, left, right`으로 이동 가능)
  - `relative` (상대 위치) **static 위치** 기준 이동
  - `absolute` (절대 위치) <u>특별한 **부모/조상** 기준</u> 이동 (없으면 body 기준)
    - static 부모는 무시
  - `fixed` (고정 위치) - **브라우저** 기준 이동 (화면 이동 X)



- 이 때, top, bottom, left, right은 기준점을 기준으로 얼마나 떨어지냐를 의미

  => <u>top이면 아래로 내려감</u> (position top이기 때문)

##### relative vs absolute

- relative는 본인의 공간을 유지
- absolute는 본인의 공간을 없앰

![image-20210202102210665](14_HTML_CSS_210202.assets/image-20210202102210665.png)



#### Float

본래 이미지 주변으로 텍스트를 감싸기 위해 도입

-> 한 때 웹 사이트의 전체 레이아웃을 만드는데 사용

-> 다시 기존처럼 사용하는 추세 (잘 안 쓰임)

- float을 하면 요소가 '뜨기' 때문에, 다른 요소가 뒤로 가게 된다. (글자 제외)

  => `float clear`를 이용해 float를 해제(무시)할 수 있다.

  ​	`clear: both;`는 왼쪽, 오른쪽을 모두 무시하는 것

  ​	정확한 원리는 내용이 없는 빈 공간을 만들어 float된 자리에 공간을 만드는 것



```css
.clearfix::after {
      content: "";
      display: block;
      clear: both;
    }
```

``` html
<header class="clearfix">
  <div class="box1 left">float left</div>
</header>
  <div class="box2">div</div>
```

(clear 하는 방법)



### Flexbox*

> Flexbox는 자식까지만 전달됨

요소 간 공간 배분과 정렬 기능을 위한 <u>단방향 레이아웃</u>

- 요소
  - Flex Container (부모 요소)
  - Flex Item (자식 요소)
- 축
  - main axis (메인축)
  - cross axis (교차축)
