# 백준 1260번

DFS와 BFS

## 문제

그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 

단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 

정점 번호는 1번부터 N번까지이다.



## 입출력

| 입력  | 출력    |
| ----- | ------- |
| 4 5 1 | 1 2 4 3 |
| 1 2   | 1 2 3 4 |
| 1 3   |         |
| 1 4   |         |
| 2 4   |         |
| 3 4   |         |

- 입력
  - 첫 번째 줄 : 정점의 수(N) 간선의 수(M) 탐색의 시작 점점(V)
  - 이후 : 간선의 연결 정점
- 출력
  - DFS
  - BFS

| 입력  | 출력      |
| ----- | --------- |
| 5 5 3 | 3 1 2 5 4 |
| 5 4   | 3 1 4 2 5 |
| 5 2   |           |
| 1 2   |           |
| 3 4   |           |
| 3 1   |           |



| 입력        | 출력     |
| ----------- | -------- |
| 1000 1 1000 | 1000 999 |
| 999 1000    | 1000 999 |

N은 최대 1~1,000

M은 1~10,000



## 코드

```python
##### 입력 : 정점의 수(N) 간선의 수(M) 탐색의 시작 점점(V)
import sys

N, M, V = map(int,sys.stdin.readline().split())



##### (N x N) array 만들기
Nodes = []
for i in range(N):
    Nodes.append([0]*N) # 이게 N = [Nodes]*N 이렇게 짜면 참조변수가 된다.

visited = [0] * N # 방문한 곳


# Edge 연결
for i in range(M):
    a, b = map(int,sys.stdin.readline().split())
    Nodes[a-1][b-1] = 1
    Nodes[b-1][a-1] = 1

# print(Nodes)



##### DFS
def DFS(Nodes,V,visited,bills):
    # print(V)
    visited[V] = 1
    point = V
    point_clock = 0
    bills.append(V)

    while visited[point]: # 다음 Node 찾기
        point = Nodes[V].index(1,point_clock)
        # print('point ',point)
        if visited[point] == 1: # 빠르게 pointing
            point_clock = point + 1
            # print('clock ',point_clock)
            if point_clock == len(visited):
                # print('??',bills)
                return bills

    # print(point)
    # print(visited)
    # print(bills)

    return DFS(Nodes,point,visited,bills)



# DFS 출력
bills = []
DFS_result = DFS(Nodes,V-1,visited,bills)
for i in DFS_result:
    print(i+1, end = ' ')



print()

##### BFS
def BFS(Nodes,V,visited,bills,queue=[]):
#    print('Node',V,'방문')
    if visited[V] == 0:
        bills.append(V)
        visited[V] = 1
    else :
        return bills

    for i, edge in enumerate(Nodes[V]):
        if edge and visited[i] == 0 :
            queue.append(i)

#    print(queue)
    
    while queue:
        go = queue.pop(0)
        BFS(Nodes,go,visited,bills,queue)
    
#    print(V, bills)
    return bills



# BFS 출력
bills = []
visited = [0] * N

BFS_result = BFS(Nodes,V-1,visited,bills)
for i in BFS_result:
    print(i+1,end = ' ')
```



### 설명

![image-20210119151324403](bj_1260_(DFS_BFS).assets/image-20210119151324403.png)

- DFS는 그냥 edge 타고 쭉 내려가기만 하면 됨

  (그러다 unvisited edge가 끝나면 알아서 새로운 branch로 넘어감)

- BFS가 문제
  - 1에서 2번 node로 갔다가 되돌아 와야 하기 때문
  - 그래서 queue 이용
  - 그렇다면 만약, 1번에서 [1,2,3]라는 edge 정보를 queue에 넣고
  - queue의 첫 번째 요소인 1을 타고 2번 노드로 간 뒤
  - 2번에서 4번으로 가는 edge 정보를 타지 않고 queue에만 넣는다면?



- 위처럼 돌리면 DFS 부분의 `index.()` 에서 `ValueError` 가 난다.

### 수정된 코드

```python
##### 입력 : 정점의 수(N) 간선의 수(M) 탐색의 시작 점점(V)
import sys

N, M, V = map(int,sys.stdin.readline().split())



##### (N x N) array 만들기
Nodes = []
for i in range(N):
    Nodes.append([0]*N) # 이게 N = [Nodes]*N 이렇게 짜면 참조변수가 된다.

visited = [0] * N # 방문한 곳


# Edge 연결
for i in range(M):
    a, b = map(int,sys.stdin.readline().split())
    Nodes[a-1][b-1] = 1
    Nodes[b-1][a-1] = 1



##### DFS
def DFS(Nodes,V,visited,bills):
    visited[V] = 1
    bills.append(V)
    for i, edge in enumerate(Nodes[V]):
        if edge and visited[i] == 0:
            DFS(Nodes,i,visited,bills)

    return bills


# DFS 출력
bills = []
DFS_result = DFS(Nodes,V-1,visited,bills)
for i in DFS_result:
    print(i+1, end = ' ')
print()


##### BFS
def BFS(Nodes,V,visited,bills,queue=[]):
    if visited[V] == 0:
        bills.append(V)
        visited[V] = 1
    else :
        return bills

    for i, edge in enumerate(Nodes[V]):
        if edge and visited[i] == 0 :
            queue.append(i)

    while queue:
        go = queue.pop(0)
        BFS(Nodes,go,visited,bills,queue)
    
    return bills


# BFS 출력
bills = []
visited = [0] * N

BFS_result = BFS(Nodes,V-1,visited,bills)
for i in BFS_result:
    print(i+1,end = ' ')
```

- 이렇게 작성하면 재귀함수를 너무 많이 사용했다는 `RecursionError`가 뜬다.
  - 아마 BFS 때문인 것 같다. (DFS에 비해 BFS가 재귀를 더 많이 돌린다.)



### 최종 코드

``` python
##### 입력 : 정점의 수(N) 간선의 수(M) 탐색의 시작 점점(V)
import sys

N, M, V = map(int,sys.stdin.readline().split())



##### (N x N) array 만들기
Nodes = []
for i in range(N):
    Nodes.append([0]*N) # 이게 N = [Nodes]*N 이렇게 짜면 참조변수가 된다.

visited = [0] * N # 방문한 곳


# Edge 연결
for i in range(M):
    a, b = map(int,sys.stdin.readline().split())
    Nodes[a-1][b-1] = 1
    Nodes[b-1][a-1] = 1

# print(Nodes)



##### DFS
def DFS(Nodes,V,visited,bills):
    visited[V] = 1
    bills.append(V)
    for i, edge in enumerate(Nodes[V]):
        if edge and visited[i] == 0:
            DFS(Nodes,i,visited,bills)

    return bills



# DFS 출력
bills = []
DFS_result = DFS(Nodes,V-1,visited,bills)
for i in DFS_result:
    print(i+1, end = ' ')
print()


##### BFS
def BFS(Nodes,V,visited,bills,queue=[]):
    bills.append(V)
    visited[V] = 1

    for i, edge in enumerate(Nodes[V]):
        if edge and visited[i] == 0 :
            queue.append(i)

# queue를 재귀처럼 사용
    while queue:
        go = queue.pop(0)
        if visited[go] == 0:
            bills.append(go)
        visited[go] = 1
        for i, edge in enumerate(Nodes[go]):
            if edge and visited[i] == 0 :
                queue.append(i)
        
    return bills



# BFS 출력
bills = []
visited = [0] * N

BFS_result = BFS(Nodes,V-1,visited,bills)
for i in BFS_result:
    print(i+1,end = ' ')
```

- `queue`를 재귀처럼 사용하여 BFS 쪽의 Recursion을 줄였다.
- 하지만 시간이 길다는 단점이 있음



## 다른 사람의 코드

```python
def dfs(v):
    print(v, end=' ')
    visit[v] = 1
    for i in range(1, n + 1):
        if visit[i] == 0 and s[v][i] == 1:
            dfs(i)

def bfs(v):
    queue = [v]
    visit[v] = 0
    while(queue):
        v = queue[0]
        print(v, end=' ')
        del queue[0]
        for i in range(1, n + 1):
            if visit[i] == 1 and s[v][i] == 1:
                queue.append(i)
                visit[i] = 0

n, m, v = map(int, input().split())
s = [[0] * (n + 1) for i in range(n + 1)] # Nodes
visit = [0 for i in range(n + 1)]
for i in range(m): # Edges
    x, y = map(int, input().split())
    s[x][y] = 1
    s[y][x] = 1
    
dfs(v)
print()
bfs(v)
```

BFS에선 `queue`가 필요



### 설명

- DFS 이후 `visited` 가 전부 1이 되었기 때문에 BFS에서는 0을 visit으로 설정
  - [0,0,0,0] 으로 초기화 시키지 않기 위한 방법



## 가장 빠른 사람의 코드

```python
import sys
N, M, V = map(int, sys.stdin.readline().strip().split())
edge = [[] for _ in range(N+1)]

for __ in range(M):
    n1, n2 = map(int, sys.stdin.readline().strip().split())
    edge[n1].append(n2) # 차이점 1번
    edge[n2].append(n1)

for e in edge: # 차이점 2번
    e.sort(reverse=True)

def dfs():
    d_visit = []
    stack = [V] # 차이점 3번
    d_check = [0 for _ in range(N+1)]
    while stack:
        v1 = stack.pop()
        if not d_check[v1]:
            d_check[v1] = 1 # 방문 기록 확인용
            d_visit.append(v1) # 방문 순서 (result)
            stack += edge[v1]
    return d_visit


def bfs():
    b_visit = []
    queue = [V]
    b_check = [0 for _ in range(N+1)]
    b_check[V] = 1
    while queue:
        v2 = queue.pop()
        b_visit.append(v2)
        for i in reversed(edge[v2]):
            if not b_check[i]:
                b_check[i] = 1
                queue = [i] + queue
    return b_visit

print(' '.join(map(str,dfs())))
print(' '.join(map(str,bfs())))
```

- `edge`를 표현할 때 0으로 이루어진 array를 만들고 1로 연결을 표시하는 방식이 아닌, array 내에 0이 없고 바로 주소로 이어지는 숫자들만 넣음
  - [[0,1,1], [1,0,0], [1,0,0]] 이 아니라
  - [[1,2], [0], [0]] 이렇게 표현
- <u>재귀함수를 사용하지 않음</u> (이게 시간을 획기적으로 줄인 것 같음)
  - **DFS는 Stack을, BFS는 Queue를 이용**

- Stack이라 새로운 요소가 뒤에 쌓이고, 오름차순으로 꺼내야 해서 `.sort(reverse=True)`를 이용해서 거꾸로 정렬
