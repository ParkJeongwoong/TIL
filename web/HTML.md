## HTML

**H**yper**T**ext **M**arkup **L**anguage

**HT**: 비선형적인 이동 가능 & **ML**: 태그로 문서 구조 명시



### 기본구조

![HTML 기본구조](http://www.devkuma.com/data/page/115/html_template.png)

각 구조를 객체처럼 생각 (웹페이지를 객체 지향적으로 표현)

- DOCTYPE에서 이 문서가 어떤 언어로 쓰였는지 명시
- html을 head와 body로 나눠서 구현
  - head 요소 : 문서에 대한 정보
  - body 요소 : 화면에 나타나는 정보



#### 요소

- **HTML의 요소 = 태그 + 내용**
  - <u>\<h1></u>contents<u>\<h1></u>



#### 속성

\<a <u>**href**</u>="https://google.com">\</a>

- 태그 별로 사용할 수 있는 속성이 존재

- 모든 HTML 요소가 공통으로 사용하는 속성
  - id, class
  - style
  - hidden
  - lang
  - tabindex
  - title



#### 시맨틱 태그 (Symantic Tag)

HTML5에서 의미를 담은 태그의 등장 <u>(`div 태그 + 의미`)</u>

- **header** : 문서 전체나 섹션의 헤더(머리말)
- **nav** : 내비게이션
- **aside** : 사이드에 위치한 공간, 메인 컨텐츠와 관련성이 적은 컨텐츠
- **section** : 문서의 일반적인 부분, 컨텐츠의 그룹을 표현
- **article** : 문서, 페이지, 사이트 안에서 독립적으로 구분
  - section과 article은 구분을 안 해도 큰 문제 X
- **footer** : 문서 전체나 섹션의 마지막 부분 (연락처, 주소 같은 것 작성)



=> 윗쪽에 있는 div는 header로, 아래쪽에 있는 div는 footer로 사용하자고 한 것

=> div 태그에 **의미**를 덧붙인 것이 시맨틱 태그

+ 검색엔진최적화에 도움을 준다.



#### 시맨틱 웹

수 많은 웹페이지에 메타 데이터를 부여

=> 웹페이지를 '의미'와 '관련성'을 가진 데이터 베이스로 구축



### 문서 구조화

#### 인라인 요소 / 블록 요소

- `Block (h1, div)` : 전체를 차지. 다른 요소가 옆에 올라올 수 없음

- `Inline (span, a)` : 부분을 차지(크기만큼 차지). 옆에 다른 요소가 붙을 수 있음

#### 그룹 컨텐츠

- `<div>`

- `<p>` : 문단(paragraph)
- `<hr>` : 수평선

- `<ol>`
- `<pre>`
- `<blockquote>`

#### 텍스트 관련 요소

- `<a>` : 링크
  - href 속성 : 이동할 주소
  - target : _blank 입력 시 새 탭에서 열기 활성화
- `<b>`
  - `<strong>`
  - \<b> vs. \<strong>
    - b는 그냥 굵게 / strong은 굵게 + 의미 가짐

- `<i>` 
  - `<em>` 
- `<span>` 
- `<br>` : 줄바꿈
- `<img>` : 이미지 요소 삽입
  - src 속성 : 이미지 주소
  - alt 속성 : 이미지에 대한 설명

#### form

- 서버에서 처리될 데이터를 제공하는 역할
- 기본 속성
  - action
  - method

#### input

- \<form> 태그 안에 여러 \<input> 태그 존재
- 다양한 타입을 가지는 **입력** 데이터 필드
- \<input> 요소는 type에 따라 동작이 달라짐



### 기타

- **HTML의 역할은 구조를 잡는 것.** (꾸미기는 CSS로 해야 함)
