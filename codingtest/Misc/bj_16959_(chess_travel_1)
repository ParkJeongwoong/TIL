# 백준 16959번

체스판 여행1

https://www.acmicpc.net/problem/16959

## 문제

크기가 N×N인 체스판이 있고, 체스판의 각 칸에는 1부터 N2까지의 정수가 한 번씩 적혀있다. 지학이는 이 체스판을 이용해서 재미있는 게임을 해보려고 한다.

지학이가 가지고 있는 말은 나이트, 비숍, 룩이다. 가장 먼저 1이 적혀있는 칸에 말 하나를 놓는다. 그 다음, 1, 2, ..., N2 순서로 이동시키려고 한다.

먼저, 1에 나이트, 비숍, 룩 중 하나를 놓는다. 그 다음, 말을 이동시켜서 2가 적힌 칸으로 이동시킨다. 1에서 2로 이동시킬 때, 다른 수가 적힌 칸을 방문할 수도 있다. 그 다음에는 3이 적힌 칸으로 이동시키고, ..., N2이 적힌 칸으로 이동시킨다. 같은 칸을 여러 번 방문하는 것도 가능하다.

지학이가 1초 동안 할 수 있는 행동은 체스판 위에 놓인 말을 이동시키거나, 다른 말로 바꾸는 것이다.

1에서 출발해서, 2, 3, ..., N2-1을 방문하고, N2까지 도착하는데 걸리는 시간의 최솟값을 구해보자.



## 입출력

| 입력  | 출력 |
| ----- | ---- |
| 3     | 12   |
| 1 9 3 |      |
| 8 6 7 |      |
| 4 2 5 |      |

- 입력
  - N
  - 체스판




| 입력  | 출력 |
| ----- | ---- |
| 3     | 12   |
| 1 9 3 |      |
| 8 6 7 |      |
| 4 2 5 |      |



| 입력  | 출력 |
| ----- | ---- |
| 3     | 12   |
| 1 9 3 |      |
| 8 6 7 |      |
| 4 2 5 |      |



| 입력       | 출력 |
| ---------- | ---- |
| 4          | 23   |
| 5 4 1 13   |      |
| 8 3 6 16   |      |
| 15 9 14 12 |      |
| 11 2 7 10  |      |



| 입력          | 출력 |
| ------------- | ---- |
| 5             | 38   |
| 21 14 2 3 12  |      |
| 19 8 16 18 7  |      |
| 9 17 10 15 4  |      |
| 24 5 1 23 11  |      |
| 25 13 22 6 20 |      |



## 코드

> 함수 중심의 코드가 해석이 쉽고 확장성이 좋기 때문에 연습을 하고자 이번 코드는 함수 위주로 짰다

### step1

```python
from collections import deque
import sys
input = sys.stdin.readline

N = int(input())
board = [list(map(int,input().split())) for _ in range(N)]

route = [0]*(N**2+1)
for i in range(N):
    for j in range(N):
        route[board[i][j]] = [i,j]

def bfs(route):
    states = [1,1,1] # rook, bishop, knight
    step = 0
    for i in range(2,N**2+1):
        start = route[i-1]
        end = route[i]
        minn = 2*N
        for ii in range(3):
            if states[ii]:
                # 룩
                r_step = rook(start, end, N)
                if ii != 0:
                    r_step += 1

                if r_step < minn:
                    minn = r_step
                    nstates = [1,0,0]
                elif r_step == minn:
                    nstates[0] = 1
                
                # 비숍
                b_step = bishop(start, end, N)
                if ii != 1:
                    b_step += 1
                    
                if b_step < minn:
                    minn = b_step
                    nstates = [0,1,0]
                elif b_step == minn:
                    nstates[1] = 1
                    
                # 나이트
                k_step = knight(start, end, N)
                if ii != 2:
                    k_step += 1

                if k_step < minn:
                    minn = k_step
                    nstates = [0,0,1]
                elif k_step == minn:
                    nstates[2] = 1
        states = nstates
        step += minn
    
    return step

def rook(start, end, N):
    dr, dc = abs(start[0]-end[0]), abs(start[1]-end[1])
    if not dr or not dc:
        return 1
    else:
        return 2


def bishop(start, end, N):
    dr, dc = abs(start[0]-end[0]), abs(start[1]-end[1])
    if dr == dc:
        return 1
    elif dr%2 == dc%2:
        return 2
    else:
        return 2*N


def knight(start, end, N):
    queue = deque([start+[0]])
    visited = [[0]*N for _ in range(N)]
    visited[end[0]][end[1]] = 2
    d = [(2,-1), (2,1), (1,2), (-1,2), (-2,-1), (-2,1), (1,-2), (-1,-2)]

    while queue:
        r,c, step = queue.popleft()
        if visited[r][c]:
            if visited[r][c] == 2:
                return step
            continue
        visited[r][c] = 1

        for dr, dc in d:
            if 0<= r+dr <N and 0<= c+dc <N and visited[r+dr][c+dc] != 1:
                queue.append([r+dr,c+dc,step+1])
    
    return 2*N

print(bfs(route))
```



- BFS를 돌리면서 매 스텝별로 가장 효율적인 루트를 구했다.
- 가장 효율적인 이동방식(룩, 비숍, 나이트)를 `states` 변수에 저장하고, 다음 step에서 다시 가장 효율적인 방식을 찾았다



=> 는 오답



#### 반례

```
4
1 15 5 8
16 9 2 6
3 14 12 13
10 7 4 11
```

- 이동 중간에 바뀌는 경우를 고려해야 함 (`4->5`로 가는 경우 `9`에서 `knight->bishop` 후 `5`로 가야 최단거리)



### step2

```python
from collections import deque
import sys
input = sys.stdin.readline

N = int(input())
board = [list(map(int,input().split())) for _ in range(N)]

route = [0]*(N**2+1)
for i in range(N):
    for j in range(N):
        route[board[i][j]] = [i,j]

def bfs(route):
    maxn = 5*N**2
    # states = [1,1,1] # rook, bishop, knight
    steps = [0,0,0] # rook, bishop, knight
    for i in range(2,N**2+1):
        start = route[i-1]
        end = route[i]

        minn = [maxn,maxn,maxn]
        for ii in range(3): # 출발점
            # 룩
            r_step = rook(start, end, N)
            if ii != 0:
                r_step += 1

            if minn[0] > steps[ii]+r_step:
                minn[0] = steps[ii]+r_step
            
            # 비숍
            b_step = bishop(ii, start, end, N)

            if minn[1] > steps[ii]+b_step:
                minn[1] = steps[ii]+b_step
                
            # 나이트
            k_step = knight(ii, start, end, N)

            if minn[2] > steps[ii]+k_step:
                minn[2] = steps[ii]+k_step

        steps = minn
    
    return min(steps)

def rook(start, end, N): # rook으로 도착(기본)
    dr, dc = start[0]-end[0], start[1]-end[1]
    if not dr or not dc:
        return 1
    else:
        return 2


def bishop(ii, start, end, N): # bishop으로 도착
    dr, dc = abs(start[0]-end[0]), abs(start[1]-end[1])
    if ii == 1:
        if dr == dc:
            return 1
        elif dr%2 == dc%2:
            return 2
        else:
            return 4
    if ii == 0:
        if dr == dc:
            return 2
        elif dr%2 == dc%2:
            return 3
        else:
            return 3
    if ii == 2:
        if dr == dc:
            return 2
        elif dr%2 == dc%2:
            return 3
        else:
            d = [(2,-1), (2,1), (1,2), (-1,2), (-2,-1), (-2,1), (1,-2), (-1,-2)]
            for dr, dc in d:
                if 0<= start[0]+dr <N and 0<= start[1]+dc <N and abs(start[0]+dr-end[0])==abs(start[1]+dc-end[1]):                
                    return 3
            return 4


def knight(ii, start, end, N): # knight로 도착
    d = [(2,-1), (2,1), (1,2), (-1,2), (-2,-1), (-2,1), (1,-2), (-1,-2)]
    if ii == 2:
        queue = deque([start+[0]])
        visited = [[0]*N for _ in range(N)]
        visited[end[0]][end[1]] = 2
        step = 0
        while queue and step < 4:
            r,c, step = queue.popleft()
            if visited[r][c]:
                if visited[r][c] == 2:
                    return step
                continue
            visited[r][c] = 1

            for dr, dc in d:
                if 0<= r+dr <N and 0<= c+dc <N and visited[r+dr][c+dc] != 1:
                    queue.append([r+dr,c+dc,step+1])
        return 4
    if ii == 0:
        for dr, dc in d:
            if 0<= end[0]+dr <N and 0<= end[1]+dc <N and (not start[0]-end[0]-dr or not start[1]-end[1]-dc):                
                return 3
        return 4
    if ii == 1:
        for dr, dc in d:
            if 0<= end[0]+dr <N and 0<= end[1]+dc <N and abs(start[0]-end[0]-dr)==abs(start[1]-end[1]-dc):                
                return 3
        return 4


print(bfs(route))


# 4
# 1 15 5 8
# 16 9 2 6
# 3 14 12 13
# 10 7 4 11
# 답 21
# rook 때문에 어떤 step이든 3번 이내로 접근 가능
# 기본 이동은 rook, knight, bishop은 해당 step이 유리할 때만
```



- 중간에 말이 바뀌는 경우 추가

- `states`를 없애고 대신 `steps` 변수 추가
  - 매 step 마다 룩, 비숍, 나이트 각각의 최소 step을 저장 => 최종적으로 셋 중 가장 작은 step을 return



=> 는 오답

`첫 번째 코드에서 고려한 경우의 수, 시작점에서 말을 바꾸고 바꾼 말로 도착점으로 가는 경우를 빼먹었다`



#### 반례

```
3
2 5 8
7 1 3
4 9 6
```

- `1->2`는 bishop으로, `2->3`은 knight로 가야하는데, 이 때 2가 아니라 3이 더해지는 문제 발생



### step3 (최종)

```python
from collections import deque
import sys
input = sys.stdin.readline

N = int(input())
board = [list(map(int,input().split())) for _ in range(N)]

route = [0]*(N**2+1)
for i in range(N):
    for j in range(N):
        route[board[i][j]] = [i,j]

def bfs(route):
    maxn = 5*N**2
    # states = [1,1,1] # rook, bishop, knight
    steps = [0,0,0] # rook, bishop, knight
    for i in range(2,N**2+1):
        start = route[i-1]
        end = route[i]

        minn = [maxn,maxn,maxn]
        for ii in range(3): # 출발점
            # 룩
            r_step = rook(start, end, N)
            if ii != 0:
                r_step += 1

            if minn[0] > steps[ii]+r_step:
                minn[0] = steps[ii]+r_step
            
            # 비숍
            b_step = bishop(ii, start, end, N)

            if minn[1] > steps[ii]+b_step:
                minn[1] = steps[ii]+b_step
                
            # 나이트
            k_step = knight(ii, start, end, N)

            if minn[2] > steps[ii]+k_step:
                minn[2] = steps[ii]+k_step
        steps = minn
    
    return min(steps)

def rook(start, end, N): # rook으로 도착(기본)
    dr, dc = start[0]-end[0], start[1]-end[1]
    if not dr or not dc:
        return 1
    else:
        return 2


def bishop(ii, start, end, N): # bishop으로 도착
    dr, dc = abs(start[0]-end[0]), abs(start[1]-end[1])
    if ii == 1:
        if dr == dc:
            return 1
        elif dr%2 == dc%2:
            return 2
        else:
            return 4
    if ii == 0:
        if dr == dc:
            return 2
        else:
            return 3
    if ii == 2:
        if dr == dc:
            return 2
        elif dr%2 == dc%2:
            return 3
        else:
            d = [(2,-1), (2,1), (1,2), (-1,2), (-2,-1), (-2,1), (1,-2), (-1,-2)]
            for dr, dc in d:
                if 0<= start[0]+dr <N and 0<= start[1]+dc <N and abs(start[0]+dr-end[0])==abs(start[1]+dc-end[1]):                
                    return 3
            return 4


def knight(ii, start, end, N): # knight로 도착
    d = [(2,-1), (2,1), (1,2), (-1,2), (-2,-1), (-2,1), (1,-2), (-1,-2)]
    if ii == 2:
        queue = deque([start+[0]])
        visited = [[0]*N for _ in range(N)]
        visited[end[0]][end[1]] = 2
        step = 0
        while queue and step < 4:
            r,c, step = queue.popleft()
            if visited[r][c]:
                if visited[r][c] == 2:
                    return step
                continue
            visited[r][c] = 1

            for dr, dc in d:
                if 0<= r+dr <N and 0<= c+dc <N and visited[r+dr][c+dc] != 1:
                    queue.append([r+dr,c+dc,step+1])
        return 4
    if ii == 0:
        step = 4
        for dr, dc in d:
            if 0<= end[0]-dr <N and 0<= end[1]-dc <N:
                if (start[0], start[1]) == (end[0]-dr, end[1]-dc):
                    return 2
                if step > 3 and (not start[0]-end[0]+dr or not start[1]-end[1]+dc):                
                    step = 3
        return step
    if ii == 1:
        step = 4
        for dr, dc in d:
            if 0<= end[0]-dr <N and 0<= end[1]-dc <N:
                if (start[0], start[1]) == (end[0]-dr, end[1]-dc):
                    return 2
                if step > 3 and abs(start[0]-end[0]+dr)==abs(start[1]-end[1]+dc):                
                    step = 3
        return step


print(bfs(route))
```

`100 ms` `32092 KB` `Python 3`



- 위의 경우의 조건을 모두 충족하는 코드
- 반복되는 부분을 줄이고 효율적으로 동작하도록 코드 개선



- 가장 효율적인 파이썬 코드

![image](https://user-images.githubusercontent.com/77447841/113479982-f0419080-94cc-11eb-995d-11bdb4785620.png)
