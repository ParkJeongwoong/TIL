# 백준 10828번

스택 구현

## 문제

정수를 저장하는 스택을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 다섯 가지이다.

- push X: 정수 X를 스택에 넣는 연산이다.
- pop: 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
- size: 스택에 들어있는 정수의 개수를 출력한다.
- empty: 스택이 비어있으면 1, 아니면 0을 출력한다.
- top: 스택의 가장 위에 있는 정수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.



## 입출력

| 입력   | 출력 |
| ------ | ---- |
| 14     | 2    |
| push 1 | 2    |
| push 2 | 0    |
| top    | 2    |
| size   | 1    |
| empty  | -1   |
| pop    | 0    |
| pop    | 1    |
| pop    | -1   |
| size   | 0    |
| empty  | 3    |
| pop    |      |
| push 3 |      |
| empty  |      |
| top    |      |



## 코드

```python
import sys
N = int(sys.stdin.readline())

stack = []

for i in range(N):
    cmd = sys.stdin.readline().split()

    if cmd[0] == "push":
        stack.append(cmd[1])

    elif cmd[0] == "pop":
        if len(stack) != 0: print(stack.pop())
        else: print(-1)

    elif cmd[0] == "size":
        print(len(stack))

    elif cmd[0] == "empty":
        if len(stack) == 0: print(1)
        else : print(0)

    elif cmd[0] == "top":
        if len(stack) == 0: print(-1)
        else: print(stack[-1])
```



## 설명

- 큐를 구현하면서 배웠던 대로 조건문으로 그냥 돌리는 게 더 빠르기 때문에 조건문으로 구성했다.

- 결과는 not bad



## 가장 빠른 코드

```python
import sys

stack = list()

command = dict(
    push=lambda x: stack.append(x),
    pop=lambda: stack.pop() if stack else -1,
    size=lambda: len(stack),
    empty=lambda: 0 if stack else 1,
    top=lambda: stack[-1] if stack else -1
    )

in_data = sys.stdin.readlines()
for c in in_data[1:]:
    c = c.strip()
    if c[:2] == 'pu':
        command['push'](c.split()[1])
    else:
        print(command[c]())

```

[numna](https://www.acmicpc.net/user/numna)



### 설명

- 속도가 빠른 dict 이용
- 속도가 빠른 lambda 이용

- push를 검색할 때도 최소한의 경우만 검색하도록 'pu'까지만 탐색
