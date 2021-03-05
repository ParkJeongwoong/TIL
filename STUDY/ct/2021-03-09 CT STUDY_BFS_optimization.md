# 2021-03-09 CT STUDY



## 토마토

https://www.acmicpc.net/problem/7576

효율성이 중요했던 BFS 문제

### 코드1

```python
M, N = map(int, input().split())

d = [(-1, 0), (0, 1), (1, 0), (0, -1)]

day = 0

tomatos = N * M
tom1s = []  # tom0과 인접한 tom1

box = [[-1] * (M + 2)]  # padding
for i in range(N):
    row = list(map(int, input().split()))
    box.append([-1] + row + [-1])  # padding
    tomatos -= M - row.count(0)
    if 1 in row:
        tom1s.append((i + 1, row.index(1) + 1))
        for j in range(row.count(1)-1):
            tom1s.append((i + 1, row.index(1, tom1s[-1][1]) + 1))
box.append([-1] * (M + 2))  # padding

tom0s = []  # 이번에 익을 토마토들
while True:
    while tom0s:
        r, c = tom0s.pop()
        box[r][c] = 1
        tomatos -= 1  # 남은 토마토 감소
        tom1s.append((r, c))

    l_tom1s = len(tom1s)
    for i in range(l_tom1s):
        r, c = tom1s[l_tom1s - 1 - i]
        blocked = True
        for dr, dc in d:
            if box[r + dr][c + dc] == 0 and (r + dr, c + dc) not in tom0s:
                tom0s.append((r + dr, c + dc))
                blocked = False

        if blocked:  # 사방이 막혀있으면 인접 토마토 리스트에서 지우기
            tom1s.remove((r, c))

    if not tom0s:  # 더 이상 익을 토마토가 없으면 탈출
        break
    day += 1

if tomatos:
    print(-1)
else:
    print(day)
```

`시간 초과`

- stack을 활용
- `tom1s`에 이미 익은 토마토 배치(추가로 다른 토마토를 익힐 수 있는 것들만 배치)
- `tom0s`에는 다음 턴에 익힐 토마토를 배치
- `tom1s`에서 사방이 막힌, 더 이상 다른 토마토를 익히지 못하는 토마트는 뺀다
- while문을 계속 돌리지 않고, 중간에 for문을 넣음으로써 하루를 표시 (for문이 한 번 도는 것이 하루)



=> 시간 초과 / 고민 끝에 내가 복잡하게 조건을 건 위의 코드가 그냥 BFS를 의미한다는 것을 깨달았다.



### 코드2

```python
M, N = map(int, input().split())

d = [(-1, 0), (0, 1), (1, 0), (0, -1)]
tomatos = N * M
queue = []
day = 0

box = [[-1] * (M + 2)]  # padding
for i in range(N):
    row = list(map(int, input().split()))
    box.append([-1] + row + [-1])  # padding
    tomatos -= M - row.count(0)
    if 1 in row:
        queue.append((i + 1, row.index(1) + 1))
        for j in range(row.count(1)-1):
            queue.append((i + 1, row.index(1, queue[-1][1]) + 1))
box.append([-1] * (M + 2))  # padding

while queue:
    r, c = queue.pop(0)

    for dr, dc in d:
        if box[r+dr][c+dc] == 0 and (r+dr,c+dc) not in queue:
            queue.append((r+dr,c+dc))
            box[r+dr][c+dc] = box[r][c]+1
            tomatos -= 1
            day = box[r][c]


if tomatos:
    print(-1)
else:
    print(day)
```

`시간 초과`

- BFS 형태로 코드를 간략화시켜 봤지만 시간 초과



### 코드3

```python
from collections import deque
import sys
input = sys.stdin.readline

M, N = map(int, input().split())

d = [(-1, 0), (0, 1), (1, 0), (0, -1)]
tomatos = N * M
queue = deque()
day = 0

box = [[-1] * (M + 2)]  # padding
for i in range(N):
    row = list(map(int, input().split()))
    box.append([-1] + row + [-1])  # padding
    tomatos -= M - row.count(0)
    if 1 in row:
        queue.append((i + 1, row.index(1) + 1))
        for j in range(row.count(1)-1):
            queue.append((i + 1, row.index(1, queue[-1][1]) + 1))
box.append([-1] * (M + 2))  # padding

while queue:
    r, c = queue.popleft()

    for dr, dc in d:
        if box[r+dr][c+dc] == 0 and (r+dr,c+dc) not in queue:
            queue.append((r+dr,c+dc))
            box[r+dr][c+dc] = box[r][c]+1
            tomatos -= 1
            day = box[r][c]


if tomatos:
    print(-1)
else:
    print(day)
```

`시간 초과`

- pop(0)의 경우 인덱스를 수정하는 과정이 추가되어 불필요한 로드가 생길 수 있다고 판단, `deque` 사용

- 역시나 시간 초과



### 마지막 코드

```python
from collections import deque
import sys
input = sys.stdin.readline

M, N = map(int, input().split())

d = [(-1, 0), (0, 1), (1, 0), (0, -1)]
tomatos = N * M
queue = deque()
day = 0

box = [[-1] * (M + 2)]  # padding
for i in range(1,N+1):
    box.append([-1] + list(map(int, input().split())) + [-1])  # padding
    
    for j in range(1,M+1):
        if box[i][j] == 1:
            queue.append((i,j))
            tomatos -= 1
        elif box[i][j] == -1:
            tomatos -= 1
            
box.append([-1] * (M + 2))  # padding

while queue:
    r, c = queue.popleft()

    for dr, dc in d:
        if box[r+dr][c+dc] == 0:
            queue.append((r+dr,c+dc))
            box[r+dr][c+dc] = box[r][c]+1
            tomatos -= 1
            day = box[r][c]


if tomatos:
    print(-1)
else:
    print(day)
```

`2068 ms`

- BFS 부분은 도저히 건드릴 것이 없다고 판단
- 문제가 있다면 box를 만드는 for문에서 있을 것
- `if 1 in row:` 같은 경우 이미 내부에서 for문을 돌려서 찾는 건데 반복적으로 for문 사용
- row라는 변수도 굳이 불필요한 것이라 판단



=> 불필요한 연산들을 최대한 빼냄으로써 통과



### 백준 코드

```python
import sys
from collections import deque
input = sys.stdin.readline


def solve():
    m, n = map(int, input().split())
    tomato = []
    haveto = 0
    tmt = deque()
    for i in range(n):
        tomato.append(input().split())
        for j in range(m):
            if tomato[i][j] == '0':
                haveto += 1
            elif tomato[i][j] == '1':
                tmt.append((i, j))
    res = 0
    while tmt and haveto:
        l = len(tmt)
        for _ in range(l):
            x, y = tmt.popleft()
            if x > 0 and tomato[x-1][y] == '0':
                tomato[x-1][y] = 1
                tmt.append((x-1, y))
                haveto -= 1
            if y > 0 and tomato[x][y-1] == '0':
                tomato[x][y-1] = 1
                tmt.append((x, y-1))
                haveto -= 1
            if x < n-1 and tomato[x+1][y] == '0':
                tomato[x+1][y] = 1
                tmt.append((x+1, y))
                haveto -= 1
            if y < m-1 and tomato[x][y+1] == '0':
                tomato[x][y+1] = 1
                tmt.append((x, y+1))
                haveto -= 1
        res += 1
    if haveto:
        print(-1)
    else:
        print(res)


if __name__ == '__main__':
    solve()
```

[shg9411](https://www.acmicpc.net/user/shg9411) `1080 ms` (가장 빠른 코드)



```python
from collections import deque
import sys
input = sys.stdin.readline
def TOMATO(m:int, n:int):
    tomato, start = [], []
    for i in range(n):
        row = list(map(int,input().split()))
        for j in range(m):
            if row[j] == 1:
                start.append((i,j))
        tomato.append(row)
    return tomato, start

def BFS(m:int, n:int, start:list, arr:list):
    queue = start
    time = 0
    while True:
        next_queue = []
        for i,j in queue:
            if 0<i and arr[i-1][j]==0:
                arr[i-1][j] = 1
                next_queue.append((i-1,j))
            if i<n-1 and arr[i+1][j]==0:
                arr[i+1][j] = 1
                next_queue.append((i+1,j))
            if 0<j and arr[i][j-1]==0:
                arr[i][j-1] = 1
                next_queue.append((i,j-1))
            if j<m-1 and arr[i][j+1]==0:
                arr[i][j+1] = 1
                next_queue.append((i,j+1))
        if not next_queue:
            break
        queue = next_queue
        time += 1

    for row in arr:
        for col in row:
            if col==0:
                return -1
    return time

def BOJ7576():
    m,n = map(int,input().split())
    tomato, start = TOMATO(m,n)

    res = BFS(m,n,start,tomato)
    print(res)
BOJ7576()
```

[res1235](https://www.acmicpc.net/user/res1235) `1132 ms`



```python
import sys
from collections import deque
input = sys.stdin.readline
def solve():
    m,n = map(int,input().split())
    tomatos=[]
    queue=deque()
    for i in range(n):
        tmp = list(map(int,input().split()))
        for j in range(m):
            if tmp[j]==1:
                queue.append([i,j])
        tomatos.append(tmp)
    day=-1
    while queue:
        day+=1
        for _ in range(len(queue)):
            i,j=queue.popleft()
            if i>0 and tomatos[i-1][j]==0:
                queue.append([i-1,j])
                tomatos[i-1][j]=1
            if j>0 and tomatos[i][j-1]==0:
                queue.append([i,j-1])
                tomatos[i][j-1]=1
            if i!=n-1 and tomatos[i+1][j]==0:
                queue.append([i+1,j])
                tomatos[i+1][j]=1
            if j!=m-1 and tomatos[i][j+1]==0:
                queue.append([i,j+1])
                tomatos[i][j+1]=1
    for t in tomatos:
        if 0 in t:
            print(-1)
            return
    print(day)
solve()
```

[jizon](https://www.acmicpc.net/user/jizon) `1184 ms`



- 빠른 코드들을 보면 의외로 별 게 없다.
- 그냥 BFS로 푼 것 뿐
- 괜히 좀 더 빠르게 해보겠다고 이것저것 하느라 느려진 것 같다.
- 탐색의 경우 그냥 한 번에 이중 for문으로 끝내버리는 게 더 효율적일 수도 있겠다.



### 의문점

어디서 그렇게 느려진 걸까?

어떤 점이 그렇게 불합리한 것이었을까?

padding을 준 것?

