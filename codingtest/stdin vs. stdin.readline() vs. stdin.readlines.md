# `stdin` vs. `stdin.readline()` vs. `stdin.readlines`

## `sys.stdin`

- 계속 입력 받음(엔터를 쳐도)

- 입력이 없으면 빈 문자열을 반환

- 여러 줄 입력 => 한 줄 출력

*** 거의 안 쓰임**

> `for line in sys.stdin:` 형태로 사용



## `sys.stdin.readline()`*

- 한 줄만 입력 받음(엔터를 치면 끝)
- 입력이 없으면 빈 문자열을 반환
- 한 줄 입력 => 한 줄 출력



## `sys.stdin.readlines()`

- 여러 줄을 입력 받음(ctrl+z로 입력을 끝낼 때까지)
- 엔터(\n)까지 모두 입력 받아 출력
- 여러 줄 입력 => 한 줄 출력

***마찬가지로 거의 안 쓰임**

