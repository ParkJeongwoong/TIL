# 백준 10951번

입출력

## 문제

정수 A, B를 입력 받아 A+B를 출력

이를 여러 번 반복하며, 테스트 케이스는 미정인 상태



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 1 1  | 2    |
| 2 3  | 5    |
| 3 4  | 7    |
| 9 8  | 17   |
| 5 2  | 7    |



## 코드

```python
while True:
    try:
        A, B = map(int, input().split())

        print(A+B)
    except:
        break
```



## 설명

- 무한 반복이기 때문에 while True 사용

- ```python
  A, B = map(int, input().split())
  ```

  - 이 부분에 공백을 입력하면, error가 뜬다.

- 이를 이용해서 try-except 구문을 넣어 error 발생 시 반복문 탈출



## 다른 방법

### sys.stdin 활용

```python
import sys

for i in sys.stdin:
    a,b=map(int,i.split())
    print(a+b)
```

- sys 모듈은 파이썬이 제공하는 변수와 함수를 직접 제어할 수 있게 해주는 모듈
- `sys.stdin` 는 표준 입력에 대한 반복
  - 즉 값이 존재하면 계속 반복
- **결론적으로 `input` 대신 `sys.stdin` 을 쓰는 게 더 빠름**



### `input()` VS `sys.stdin` VS `sys.stdin.readline()`

#### input()

- `사용자의 입력을 받고` → `문자열로 변환` → `추가 strip 진행` 의 과정을 거침

- 느림

- **내장함수** 취급 -> 입력이 없는데 수행될 경우 EOFerror 반환



#### sys.stdin

`standard input`을 의미

<u>여러 줄 입력</u> => 출력이 한 줄로 나옴

- sys 관련 메소드는 **file object**로 취급 -> 사용자의 입력만 받는 buffer 존재
- 빠름
- 입력이 없는 경우 빈 문자열을 반환



#### sys.stdin.readlines() <- (readline => readlines)

사용자의 입력을 받으며 <u>줄바꿈(개행문자 \n)까지 함께 입력</u> 받는다.

- 말 그대로 read line

() 안에 정수를 넣어 한 번에 읽는 문자의 수도 지정 가능

<u>한줄 입력</u> => 출력이 한 글자씩 여러 줄로 나옴
