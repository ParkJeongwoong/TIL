# 백준 1753번

최단경로

> https://www.acmicpc.net/problem/1753

> 다익스트라 활용
>
> 최근 다익스트라 활용 문제가 전부 시간초과가 나는 것을 보고 내가 활용을 못한다는 것을 깨달았다

## 문제

방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 단, 모든 간선의 가중치는 10 이하의 자연수이다.



## 입출력

| 입력  | 출력 |
| ----- | ---- |
| 5 6   | 0    |
| 1     | 2    |
| 5 1 1 | 3    |
| 1 2 2 | 7    |
| 1 3 3 | INF  |
| 2 3 4 |      |
| 2 4 5 |      |
| 3 4 6 |      |

- 입력
  - 첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1≤V≤20,000, 1≤E≤300,000)
    - 모든 정점에는 1부터 V까지 번호가 매겨져 있다고 가정
  - 둘째 줄에는 시작 정점의 번호 K(1≤K≤V)가 주어진다. 
  - 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다.
    - 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻
    - u와 v는 서로 다르며 w는 10 이하의 자연수
    - 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의



- 출력
  - 첫째 줄부터 V개의 줄에 걸쳐, i번째 줄에 i번 정점으로의 최단 경로의 경로값을 출력
  - 시작점 자신은 0으로 출력하고, 경로가 존재하지 않는 경우에는 INF를 출력





## 최초 코드

```python
def dijkstra():
    pass

V, E = map(int, input().split())
start_num = int(input())
nodes = [[] for _ in range(V+1)]
for i in range(E):
    from_node, to_node, cost = map(int,input().split())
    nodes[from_node].append((to_node, cost)) # 방향과 가중치 저장

visited = ['INF']*(V+1) # 여기에 최소 비용을 저장
visited[start_num] = 0
graph = [start_num]

flag = True
while flag:
    flag = False
    min_cost = 'INF'
    min_num = None
    for num in graph:
        for node, cost in nodes[num]:
            if visited[node] == 'INF': # 방문한 적 없는 node라면
                cost += visited[num]
                if min_cost == 'INF' or min_cost > cost:
                    min_cost = cost
                    min_num = node
                    flag = True
                    
    if flag:
        visited[min_num] = min_cost
        graph.append(min_num)

for i in range(1,V+1):
    print(visited[i])
```



### 설명

- 다익스트라를 직관적으로 구현

- 현재 연결되어 있는 그래프를 `graph` 변수에 넣음
- graph와 연결된 간선 `node`를 하나씩 꺼내서 최소 비용을 비교
- while문을 한 번 돌릴 때마다 최소 연결비용을 가진 node를 찾아 저장



- 시간초과





## 다른 사람의 코드

> https://pacific-ocean.tistory.com/281
>
> https://sungmin-joo.tistory.com/33

```python
import sys
from heapq import heappush, heappop
inf = 100000000
v, e = map(int, sys.stdin.readline().split())
k = int(sys.stdin.readline())
s = [[] for _ in range(v + 1)]
dp = [inf] * (v + 1)
heap = []
def dijkstra(start):
    dp[start] = 0
    heappush(heap, [0, start])
    while heap:
        w, n = heappop(heap)
        for n_n, wei in s[n]:
            n_w = wei + w
            if n_w < dp[n_n]:
                dp[n_n] = n_w
                heappush(heap, [n_w, n_n])
for i in range(e):
    u, v, w = map(int, sys.stdin.readline().split())
    s[u].append([v, w])
dijkstra(k)
for i in dp[1:]:
    print(i if i != inf else "INF")
```



- `heap`을 이용
- `dp`가 `memo`와 동일한 역할 / 최소 비용 저장
- `s`가 `nodes`와 동일한 역할 / 연결된 간선 저장



**[dijkstra 함수]**

- 변수 `heap`에다가 `[비용, 좌표]` 묶음으로 heappush
- heappop으로 최소 비용이 나오는 n을 뽑아냄
- n과 연결된 노드 n_w와 가중치 wei를 가져옴
- 등등



- 결론 : **힙 이용** => 힙을 이용함으로써 첫 번째 for문, `for num in graph:`를 돌릴 필요가 없어짐

근데, graph를 이용하지 않고 바로 `w, n = heappop(heap)`을 이용해 n을 찾는다는 것은?

heap에는 어떤 원소가 들어있나??

heap에는 n_w를 가진 이전 최소 





## 다익스트라 의사코드

```
1  function Dijkstra(Graph, source):
2
3      create vertex set Q
4
5      for each vertex v in Graph:             // 초기화
6          dist[v] ← INFINITY                           // 소스에서 v까지의 아직 모르는 길이
7          prev[v] ← UNDEFINED                          // 소스에서 최적 경로의 이전 꼭짓점
8          add v to Q                                // 모든 노드는 초기에 Q에 속해있다 (미방문 집합)
9
10      dist[source] ← 0                                 // 소스에서 소스까지의 길이
11
12      while Q is not empty:
13          u ← vertex in Q with min dist[u]         // 최소 거리를 갖는 꼭짓점
14                                                            // 을 가장 먼저 선택한다
15          remove u from Q
16
17          for each neighbor v of u:           // v는 여전히 Q에 있다.
18              alt ← dist[u] + length(u, v)
19              if alt < dist[v]:               // v 까지의 더 짧은 경로를 찾았을 때
20                  dist[v] ← alt
21                  prev[v] ← u
22
23      return dist[], prev[]
```





## 결론

내가 다익스트라를 잘못 알고 있었다.

매번 연결된 그래프 전체를 탐색하는 것이 아니라,

DP를 활용해서, 한 번 <u>최소 비용 노드를 고르면</u> 해당 노드와 <u>연결된 노드들의 값을 비교해서 갱신</u>만 한다.

<u>**즉 지금까지 어떤 길을 거쳐왔는지 확인할 필요가 전혀 없다**</u>



### 위의 이해를 바탕으로 바꾼 코드

```python
import heapq
import sys
input = sys.stdin.readline

V, E = map(int, input().split())
start_num = int(input())
nodes = [[] for _ in range(V+1)]
for i in range(E):
    from_node, to_node, cost = map(int,input().split())
    nodes[from_node].append((to_node, cost)) # 방향과 가중치 저장

visited = ['INF']*(V+1) # 여기에 최소 비용을 저장
visited[start_num] = 0

heap = []
heapq.heappush(heap, (0, start_num))

while heap:
    cost, node = heapq.heappop(heap)

    if visited[node] != 'INF' and cost > visited[node]: # 검사할 필요가 없는 node skip
        continue

    for next_node, next_cost in nodes[node]:
        new_cost = cost+next_cost
        if visited[next_node] == 'INF' or new_cost < visited[next_node]: # 최소 비용으로 갱신
            visited[next_node] = new_cost
            heapq.heappush(heap, (new_cost, next_node))


for i in range(1,V+1):
    print(visited[i])
```

`736 ms` `150240 KB` `PyPy3`



- input이 많아서인지 readline을 안 쓰니까 시간초과가 났다

- 매 스텝마다 최소 비용의 node를 꺼내서 -> 해당 node와 연결된 node들의 최소 비용을 갱신



### 작은 개선

- 생각해보니 저 skip 문구가 필요 없을 것 같았다.

```python
import heapq
import sys
input = sys.stdin.readline

V, E = map(int, input().split())
start_num = int(input())
nodes = [[] for _ in range(V+1)]
for i in range(E):
    from_node, to_node, cost = map(int,input().split())
    nodes[from_node].append((to_node, cost)) # 방향과 가중치 저장

visited = ['INF']*(V+1) # 여기에 최소 비용을 저장
visited[start_num] = 0

heap = []
heapq.heappush(heap, (0, start_num))

while heap:
    cost, node = heapq.heappop(heap)

    for next_node, next_cost in nodes[node]:
        new_cost = cost+next_cost
        if visited[next_node] == 'INF' or new_cost < visited[next_node]: # 최소 비용으로 갱신
            visited[next_node] = new_cost
            heapq.heappush(heap, (new_cost, next_node))


for i in range(1,V+1):
    print(visited[i])
```

`572 ms` `150240 KB` `PyPy3`





## 백준 코드

```python
import heapq, sys


def init():
    v, e = map(int, ipt().split())
    k = int(ipt())
    adj_list = [[] for _ in range(v+1)]
    for _ in range(e):
        a, b, c = map(int, ipt().split())
        adj_list[a].append((b, c))
    dist = [float('inf')] * (v+1)
    dist[k] = 0
    visited = [False] * (v+1)
    return [(0, k)], adj_list, dist, visited, v


ipt = sys.stdin.readline
opt = sys.stdout.write
q, adj_list, dist, visited, v = init()
while q:
    cd, cn = heapq.heappop(q)
    visited[cn] = True
    for nn, cost in adj_list[cn]:
        if visited[nn]:
            continue
        nd = dist[cn] + cost
        if dist[nn] > nd:
            dist[nn] = nd
            heapq.heappush(q, (nd, nn))
for i in range(1, v+1):
    if dist[i] == float('inf'):
        opt('INF\n')
    else:
        opt(f'{dist[i]}\n')

```

[leehj8896](https://www.acmicpc.net/user/leehj8896) `496 ms` `150340 KB` `PyPy3`



- `init 함수`를 통해 사전 준비 완료
- **<u>`opt`이라는 output용 stdout 사용</u>** <- `\n`을 일일이 붙여줘야 함
- <u>`q`가 heap 변수와 동일한데, 따로 heappush를 안 해도 사용 가능</u>
- 나머지 로직은 동일



```python
import sys
import heapq
input = sys.stdin.readline
inf = int(1e9)

def dijkstra(G,s,distance):
    q = []
    heapq.heappush(q, (0,s))
    distance[s] = 0

    while q:
        dist, now = heapq.heappop(q)
        if distance[now] < dist:
            continue

        for i in G[now]:
            cost = dist + i[1]
            if cost < distance[i[0]]:
                distance[i[0]] = cost
                heapq.heappush(q, (cost, i[0]))

def Solution():
    v, e = map(int, input().split())
    s = int(input())
    G = [[] for _ in range(v+1)]
    distance = [inf] * (v+1)

    for _ in range(e):
        u, v, w = map(int, input().split())
        G[u].append((v,w))

    dijkstra(G, s, distance)
    
    for result in distance[1:]:
        if result == inf:
            print('INF')
        else:
            print(result)
        
Solution()
```

[ggohee0410](https://www.acmicpc.net/user/ggohee0410) `628 ms` `65952 KB` `Python 3`



- 방법론은 비슷
