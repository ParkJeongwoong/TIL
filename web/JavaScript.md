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