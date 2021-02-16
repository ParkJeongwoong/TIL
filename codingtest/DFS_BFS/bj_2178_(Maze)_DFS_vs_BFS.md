# 백준 2178번

미로 탐색

## 문제

N×M크기의 배열로 표현되는 미로가 있다.

| 1    | 0    | 1    | 1    | 1    | 1    |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 1    | 0    | 1    | 0    | 1    | 0    |
| 1    | 0    | 1    | 0    | 1    | 1    |
| 1    | 1    | 1    | 0    | 1    | 1    |

미로에서 1은 이동할 수 있는 칸을 나타내고, 0은 이동할 수 없는 칸을 나타낸다. 이러한 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하는 프로그램을 작성하시오. 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동할 수 있다.

위의 예에서는 15칸을 지나야 (N, M)의 위치로 이동할 수 있다. 칸을 셀 때에는 시작 위치와 도착 위치도 포함한다.



## 입출력

| 입력   | 출력 |
| ------ | ---- |
| 4 6    | 15   |
| 101111 |      |
| 101010 |      |
| 101011 |      |
| 111011 |      |

- 입력
  - 첫 번째 줄 : N, M
  - 미로 지도

| 입력   | 출력 |
| ------ | ---- |
| 4 6    | 9    |
| 110110 |      |
| 110110 |      |
| 111111 |      |
| 111101 |      |



| 입력                      | 출력 |
| ------------------------- | ---- |
| 2 25                      | 38   |
| 1011101110111011101110111 |      |
| 1110111011101110111011101 |      |



| 입력    | 출력 |
| ------- | ---- |
| 7 7     | 13   |
| 1011111 |      |
| 1110001 |      |
| 1000001 |      |
| 1000001 |      |
| 1000001 |      |
| 1000001 |      |
| 1111111 |      |





## 코드

```python
import sys
input = sys.stdin.readline

N, M = map(int,input().split())

maze = [[0]*(M+2)]
for m in range(N):
    maze.append([0]+list(map(int,input().strip()))+[0])
maze += [[0]*(M+2)]

record = [[0]*(M+1) for _ in range(N+1)]
step = 0

stack = [[1,1,step]]
x = 0
y = 0

while stack:
    move = stack.pop()
    x = move[0]
    y = move[1]
    step = move[2] + 1
    if record[y][x] and record[y][x] < step:
        continue

    # print(x,y,step)

    if maze[y-1][x]:
        stack.append([x,y-1,step])
    if maze[y][x+1]:
        stack.append([x+1,y,step])
    if maze[y+1][x]:
        stack.append([x,y+1,step])
    if maze[y][x-1]:
        stack.append([x-1,y,step])
    
    # print(stack)

    record[y][x] = step

print(record[N][M])
```



### 설명

배웠던 대로 stack을 사용해서 구현했다.

그런데 문제는 이게 시간초과가 난다는 것이다.

어딘가에서 비효율적으로 코드가 돌아간다는 뜻이다.

사실 비효율적일만한 구간은 많은데 어떻게 손 볼지 좀 더 고민을 해봐야겠다.



### 수정된 코드

```python
import sys
input = sys.stdin.readline

N, M = map(int,input().split())

maze = [[0]*(M+2)]
for m in range(N):
    maze.append([0]+list(map(int,input().strip()))+[0])
maze += [[0]*(M+2)]

record = [[0]*(M+1) for _ in range(N+1)]
step = 0

stack = [[1,1,step]]
x = 0
y = 0

while stack:
    move = stack.pop()
    x = move[0]
    y = move[1]
    step = move[2] + 1
    if record[y][x] and record[y][x] < step:
        continue

    # print(x,y,step)

    if maze[y-1][x] and (not record[y-1][x] or record[y-1][x] > step):
        stack.append([x,y-1,step])
    if maze[y][x+1] and (not record[y][x+1] or record[y][x+1] > step):
        stack.append([x+1,y,step])
    if maze[y+1][x] and (not record[y+1][x] or record[y+1][x] > step):
        stack.append([x,y+1,step])
    if maze[y][x-1] and (not record[y][x-1] or record[y][x-1] > step):
        stack.append([x-1,y,step])
    
    # print(stack)

    record[y][x] = step

print(record[N][M])
```

- 반복문을 줄이기 위해 스택을 쌓는 조건문을 추가했다.
- 그래도 시간초과가 난다.



### 최종 코드

이 문제에선 BFS가 훨씬 좋은 방법이라는 글을 읽었다.

``` python
import sys
input = sys.stdin.readline

N, M = map(int,input().split())

maze = [[0]*(M+2)]
for m in range(N):
    maze.append([0]+list(map(int,input().strip()))+[0])
maze += [[0]*(M+2)]

record = [[0]*(M+1) for _ in range(N+1)]
step = 0

queue = [[1,1,step]]
x = 0
y = 0

while queue:
    move = queue.pop(0)
    x = move[0]
    y = move[1]
    step = move[2] + 1

    if record[y][x]:
        continue

    if x == M and y == N:
        ans = step
        break

    # print(x,y,step)

    if maze[y-1][x] and not record[y-1][x]:
        queue.append([x,y-1,step])
    if maze[y][x+1] and not record[y][x+1]:
        queue.append([x+1,y,step])
    if maze[y+1][x] and not record[y+1][x]:
        queue.append([x,y+1,step])
    if maze[y][x-1] and not record[y][x-1]:
        queue.append([x-1,y,step])
    
    # print(stack)

    record[y][x] = 1

print(ans)
```

- 겨우 풀긴 풀었는데 상당히 느리다. (88 ms)

  (가장 빠른 코드는 60 ms대에 끊고 보통 70 ms대가 나옴)



## 질문거리

1. 더 효율적인 코드는?
2. DFS와 BFS는 각각 어떤 상황에서 적합한가?



## 다른 사람의 코드

```python
from sys import stdin
N, M = map(int, stdin.readline().split())
# matrix 배열
matrix = [stdin.readline().rstrip() for _ in range(N)]
# 방문경로 배열
visited = [[0]*M for _ in range(N)]
# 좌/우/위/아래 방향 이동
dx, dy = [-1, 1, 0, 0], [0, 0, -1, 1]

# BFS 경로 탐색
# queue 방식 사용
queue = [(0,0)]
visited[0][0] = 1

while queue:
    x, y = queue.pop(0)

    if x == N-1 and y == M-1:
        # 최종 경로 도착
        print(visited[x][y])
        break

    for i in range(4):
        nx = x + dx[i]
        ny = y + dy[i]
        if 0 <= nx < N and 0 <= ny < M:
            if visited[nx][ny] == 0 and matrix[nx][ny] == '1':
                visited[nx][ny] = visited[x][y] + 1
                queue.append((nx,ny))
```

https://chancoding.tistory.com/64 `76 ms`



### 설명

내 코드보다 조금 더 깔끔하게 푼 부분이 있는데, 이 정도로 그렇게 차이가 많이 날 수 있나..??

일단 step역할을 하는 게 없이 그냥 array에 기록



## 가장 빠른 사람의 코드

```python
from sys import stdin

n,m = map(int,input().split())

maze = [[0]*(m+2)]
for _ in range(n):
    maze.append([0]+list(map(int,list(stdin.readline().rstrip("\n"))))+[0])
maze.append([0]*(m+2))

que = [(1,1)]
maze[1][1] == 0
count = 1
while True:
    temp = []
    for node in que:
        i,j = node
        if maze[i+1][j] != 0:
            temp.append((i+1,j))
            maze[i+1][j] = 0

        if maze[i-1][j] != 0:
            temp.append((i-1,j))
            maze[i-1][j] = 0

        if maze[i][j+1] != 0:
            temp.append((i,j+1))
            maze[i][j+1] = 0

        if maze[i][j-1] != 0:
            temp.append((i,j-1))
            maze[i][j-1] = 0


    que = temp
    count += 1
    if (n,m) in temp:
        break

print(count)
```

[wndlswo12](https://www.acmicpc.net/user/wndlswo12) `62 ms`



### 설명

visited를 사용하지 않고, maze 배열에서 1인 값들을 지우면서 이동 (**maze를 visited 겸용으로 사용**)



## DFS와 BFS (심화)

https://dev-shin.tistory.com/entry/%EA%B9%8A%EC%9D%B4%EC%9A%B0%EC%84%A0-%ED%83%90%EC%83%89DFS-%EB%84%93%EC%9D%B4%EC%9A%B0%EC%84%A0-%ED%83%90%EC%83%89BFS

### DFS

- stack 사용
- 재귀를 사용하는 경우가 많음
- 끝까지 갔다가 돌아오는 것 : **Back-Tracking**이라고 불림

---

- 장점
  - 그래프의 높이만큼 공간 요구 (<u>공간을 적게 사용</u>하는 경우가 많다)
  - <u>목표 노드가 깊은 단계에 있을 경우</u> 빠르게 해를 구할 수 있음
- 단점
  - 해가 없는 경로에 깊이 빠질 수 있다 -> `깊이제한`
  - <u>**얻은 해가 최단 경로라는 보장이 없다**</u> (일반적으로 해에 다다르면 검색을 끝내버림)

> <u>사이클 탐지 / 위상 정렬</u>에 적합

### BFS

- queue 사용

---

- 장점
  - 목표까지의 **<u>최단 경로 보장</u>** (모든 간선의 가중치가 동일한 경우)
- 단점
  - <u>모든 노드의 정보에 대한 공간을 요구</u>
  - 목표 노드가 깊은 단계에 있을 경우 시간이 오래 걸림

> **가중치 없는 그래프의 최단 경로는 BFS로만 접근** => <u>최소신장트리(MST) / 최단경로(SP)에 적합</u>
