# Jira

## 이슈 생성

> **상단 `Create`**

[이슈 타입]

- `Story` : 유저가 어떤 일을 해야 하는지 하나의 스토리 라인으로 만들어 놓은 것
  - 유저가 회원가입 - 유저가 로그인 - 유저가 게시글 조회
- `Task` : Story를 위해 개발해야 할 일
  - 로그인을 하려면 로그인을 위한 로직 개발, UI 개발
- `Bug` : 개발 후 버그 발생 시 버그 관리
- `Epic` : 하나의 큰 테마 (위의 3가지를 모두 포함)



<예시>

- 유저 관리(`Epic`)
  - 로그인(`Story`)
    - 비밀번호 찾기 기능(**`Task`**)
  - 회원가입(`Story`)
    - 회원가입 창 디자인(**`Task`**)
    - 필수 값 검증 적용(**`Task`**)
- 서버 세팅(`Epic`)
  - 네트워크 방화벽 구성(**`Task`**)

---

[Workflow]

`To Do` - `In Progress` - `Done`

(커스텀 가능)

---

[컴포넌트]

묶고 싶은 이슈들이 Epic으로 묶기 애매할 때 (ex. 역할 별) **그룹핑하는 도구**



<예시>

- Frontend 관련 컴포넌트



## JQL

> Jira Query Language

- Jira Issue를 검색하기 위해 제공하는 언어 (SQL 문법과 비슷)
- 이슈들을 재가공해 데이터를 도출하기 위해 사용

---

> **`상단 Search for Issues`** - **`Advanced`**



### Dashboard & Gadget

> 상단 **`Manage Dashboard`**

Gadget은 Dashboard의 구성요소(지표관리를 위한 차트들)



## Agile Board

> 상단 보드 **`보드 만들기`**

- Scrum과 Kanban 보드 선택 가능



- Scrum Board : 스프린트라 불리우는 계획, 제출, 배송의 <u>시간 단위의 작업 묶음</u>에 중점
- Kanban Board : 사용자의 <u>업무흐름을 가시화</u>하는 것과 <u>공정의 단계별 개선을 위해 동시에 진행하는 업무를 제한</u>하는데 중점