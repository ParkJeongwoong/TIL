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
