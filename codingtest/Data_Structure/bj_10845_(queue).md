# 백준 10845번

큐 구현

## 문제

정수를 저장하는 큐를 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여섯 가지이다.

- push X: 정수 X를 큐에 넣는 연산이다.
- pop: 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
- size: 큐에 들어있는 정수의 개수를 출력한다.
- empty: 큐가 비어있으면 1, 아니면 0을 출력한다.
- front: 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
- back: 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.



## 입출력

| 입력   | 출력 |
| ------ | ---- |
| 15     | 1    |
| push 1 | 2    |
| push 2 | 2    |
| front  | 0    |
| back   | 1    |
| size   | 2    |
| empty  | -1   |
| pop    | 0    |
| pop    | 1    |
| pop    | -1   |
| size   | 0    |
| empty  | 3    |
| pop    |      |
| push 3 |      |
| empty  |      |
| front  |      |



## 코드

```python
queue = []
#push X: 정수 X를 큐에 넣는 연산이다.
def push(x):
    queue.append(int(x))
#pop: 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
def pop():
    print(-1 if len(queue)==0 else queue.pop(0))
#size: 큐에 들어있는 정수의 개수를 출력한다.
def size():
    print(len(queue))
#empty: 큐가 비어있으면 1, 아니면 0을 출력한다.
def empty():
    print(1 if len(queue) == 0 else 0)
#front: 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
def front():
    print(-1 if len(queue) == 0 else queue[0])
#back: 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
def back():
    print(-1 if len(queue) == 0 else queue[-1])
    
import sys
N = int(sys.stdin.readline())
for i in range(N):
    commands = {'pop':pop, 'size':size, 'empty':empty, 'front':front, 'back':back}
    command = sys.stdin.readline().split()
    if command[0] == 'push':
        push(int(command[1]))
    else:
        commands[command[0]]()
```



## 설명

- 초반에 정수만 입력되는 건 줄 모르고 정수인지 판별하는 코드를 넣었다가 계속 실패가 떴다.
- 다시 한 번 문제를 잘 읽는 게 중요하다는 것을 배우는 시간이었다.



## 다른 사람의 코드

```python
import sys

N = int(sys.stdin.readline())

queue = []

for i in range(N):
    cmd = sys.stdin.readline().split()

    if cmd[0] == "push":
        queue.insert(0, cmd[1])
        ##print(queue)

    elif cmd[0] == "pop":
        if len(queue) != 0: print(queue.pop())
        else: print(-1)

    elif cmd[0] == "size":
        print(len(queue))

    elif cmd[0] == "empty":
        if len(queue) == 0: print(1)
        else : print(0)

    elif cmd[0] == "front":
        if len(queue) == 0: print(-1)
        else: print(queue[len(queue) -1])

    elif cmd[0] == "back":
        if len(queue) == 0: print(-1)
        else: print(queue[0])
```

https://hyuna-tech.tistory.com/entry/%EB%B0%B1%EC%A4%80-10845-%ED%81%90-%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%9C%BC%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

- 딕셔너리가 더 빠를 줄 알았는데, 조건문을 쓴 위의 코드가 10ms 정도 더 빨랐다. (메모리는 동일하게 사용)
- 함수를 사용해서 느려진 것일 수도 있겠다는 생각이 들었다.

