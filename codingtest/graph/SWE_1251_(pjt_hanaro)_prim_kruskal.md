# SWE 1251. 하나로

https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15StKqAQkCFAYD

> MST 문제

---

##  내 코드

>  MST 문제를 Kruskal과 Prim, 두 가지 방법으로 풀어보았다

### KRUSKAL

```python
import heapq
 
def find_set(x):
    if states[x] == x:
        return x
    else:
        return find_set(states[x])
  
def union_set(a,b):
    pa = find_set(a)
    pb = find_set(b)
    if pa != pb:
        states[pb] = pa    
  
  
for tc in range(1, int(input())+1):
    N = int(input())
    xys = list(zip(list(map(int,input().split())),list(map(int,input().split()))))
    E = float(input())
    states = list(range(N)) # 서로소 집합
    # 크루스칼 알고리즘 사용
    distances = []
    for a in range(N):
        for b in range(a+1,N):
            # distances[idx] = [abs(xys[a][0]-xys[b][0])+abs(xys[a][1]-xys[b][1]),a,b]
            heapq.heappush(distances, [(xys[a][0]-xys[b][0])**2 + (xys[a][1]-xys[b][1])**2,a,b])
      
    cost = 0
    chosen = 0
    while chosen < N-1:
        distance, a, b = heapq.heappop(distances)
        if find_set(a) != find_set(b):
            union_set(a, b)
            chosen += 1
            # cost += (xys[a][0]-xys[b][0])**2 + (xys[a][1]-xys[b][1])**2
            cost += distance
    cost *= E
    int_cost = int(cost)
    if int_cost + 0.5 > cost:
        print('#{} {}'.format(tc, int_cost))
    else:
        print('#{} {}'.format(tc, int_cost+1))
```

`1,411 ms` `196,044 kb`

- Kruskal 알고리즘 사용

  1. 모든 간선에 대해 오름차순 정렬
     - 처음에는 `sort`를 사용했는데 `4,551 ms`가 나왔다
     - <u>이후 `heap`을 사용</u>

  2. 가중치가 낮은 간선부터 선택 / 사이클이 만들어지면 pass
  3. 모든 정점이 이어질 때까지 반복

- 처음에는 탐색 속도 향상을 위해 Manhattan Distance로 비교 후 간선이 이어지면 Euclid 사용

  - **오답**. 이건 근사치일 뿐, (0,0)에서 (2,2)와 (1,3)의 거리가 똑같이 나온다.

  - 이후 Euclidean Distance로 고쳐서 사용



### PRIM

```python
import heapq
 
def find_set(x):
    if states[x] == x:
        return x
    else:
        return find_set(states[x])
 
def union_set(a,b):
    pa = find_set(a)
    pb = find_set(b)
    if pa != pb:
        states[pb] = pa
 
def add_neighbor(node):
    idx = 0
    while idx < N:
        if find_set(node) == find_set(idx): # 같은 집합이면
            idx += 1
            continue
        dist = (xys[node][0]-xys[idx][0])**2 + (xys[node][1]-xys[idx][1])**2
        heapq.heappush(distances, (dist,node,idx))
        idx += 1
         
 
 
for tc in range(1, int(input())+1):
    N = int(input())
    xys = list(zip(list(map(int,input().split())),list(map(int,input().split()))))
    xys.sort()
    E = float(input())
    states = list(range(N)) # 서로소 집합
    # 프림 알고리즘 사용
    # 시작 정점은 0
    distances = []
    add_neighbor(0)
    cost = 0
    chosen = 1
    while distances and chosen < N:
        selected_edge, island1, island2 = heapq.heappop(distances)
        pi1 = find_set(island1)
        pi2 = find_set(island2)
        if pi1 != pi2:
            cost += selected_edge
            chosen += 1
            union_set(pi1, pi2)
            add_neighbor(pi2)
     
    cost *= E
    int_cost = int(cost)
    if int_cost + 0.5 > cost:
        print('#{} {}'.format(tc, int_cost))
    else:
        print('#{} {}'.format(tc, int_cost+1))
```

`1,276 ms` `194,208 kb`

- Prim 알고리즘 사용

  1. 임의의 정점 선택 / 0번 정점 선택
  2. 선택한 정점 집합과 연결된 간선 중 최소 비용의 간선 선택
     - 처음에는 구현이 어려워서 몇 번 코드를 지웠다가 다시 썼다
     - 그러다가 선택한 정점의 연결 간선 리스트를 하나 만들고, 새로 추가되는 간선들만 해당 리스트에 넣고
     - heap을 이용해 pop을 하나씩 하면서 간선 선택
  3. 모든 정점을 이을 때까지 반복

- 위의 순서에서 2번이 생각보다 까다로웠다.

  - 서로소 집합을 이용해 pop된 간선과 이어지는 정점이 사이클을 만드는지 확인

  - heap을 사용해 변수 `distances` 관리

- 구현하기 조금 더 까다로웠지만, 속도와 메모리를 크루스칼보다 조금 적게 사용하는 결과를 얻었다





## 다른 사람 코드

### 양다연님

```python
def mst_prim(G, s):
    key = [12345678900000] * N  # 간선의 가중치는 무한대로 가정되어 있음
    p = [-1] * N  # 트리에서 연결된 부모 정점 초기화
    visited = [False] * N  # 방문여부 초기화
    key[s] = 0  # 시작점 가중치 0으로 초기화
    cnt = 0
    result = 0
 
    while cnt < N:
        mini = 12345678900000
        u = -1
        for i in range(N):  # 방문 안한 정점중 최소 가중치 정점 찾기
            if not visited[i] and key[i] < mini:
                mini = key[i]
                u = i
 
        visited[u] = True
        result += mini
        cnt += 1
 
        for w in range(N):
            if G[u][w] > 0 and not visited[w] and key[w] > G[u][w]:
                key[w] = G[u][w]
                p[w] = u
 
    return result
 
 
T = int(input())
for tc in range(1, T+1):
    N = int(input())  # 섬의 개수
    xlist = list(map(int, input().split()))  # x좌표 리스트
    ylist = list(map(int, input().split()))  # y좌표 리스트
    E = float(input())
 
    # 그래프 만들기 - 도착 점과
    graph = [[0]*N for _ in range(N)]
    for i in range(N):
        for j in range(N):
            graph[i][j] = ((xlist[i]-xlist[j])**2 + (ylist[i]-ylist[j])**2)
            graph[j][i] = ((xlist[i]-xlist[j])**2 + (ylist[i]-ylist[j])**2)
 
    print('#{} {}'.format(tc, round(mst_prim(graph, 0)*E)))
```

`273 ms` `66,680 kb`

- Prim 사용
- 서로소 집합 X => 그냥 visited로 구현
- 어짜피 모든 노드는 다른 모든 노드와 연결 visited 여부만 확인 => 굳이 매번 거리를 구할 필요 X // 내 코드는 매번 거리를 구하면서 중복 연산이 들어감



### 심동식님

```python
def hanaro(N):
    check = [0xffffffffffff]*N
    check[0] = 0
    visit = [0]*N
    total_length = 0
 
    for _ in range(N):
        # 시작점 찾기
        cur = -1
        min_value = 0xffffffffffff
        for i in range(N):
            if visit[i]: continue
            if check[i] < min_value:
                cur, min_value = i, check[i]
 
        visit[cur] = 1
        total_length += min_value
 
        for j in range(N):
            if cur == j: continue
            dist_bet = (x_list[j]-x_list[cur])**2 + (y_list[j]-y_list[cur])**2
            if dist_bet < check[j]:
                check[j] = dist_bet
    return total_length
 
 
T = int(input())
for tc in range(1,1+T):
    N = int(input())
    x_list = list(map(int, input().split()))
    y_list = list(map(int, input().split()))
    E = float(input())
 
 
    ans = round(hanaro(N) * E)
    print('#{} {}'.format(tc, ans))
```

`188 ms` `59,760 kb`

- Prim 사용
- 서로소 집합 X => 그냥 visited로 구현

- 위의 코드랑 다르게 미리 거리를 구하지 않음
  - 방문 안 하고, check 값이 가장 낮은 지점을 선택 (출발지점)
    - check가 거리를 의미
  - 출발 지점을 선택하면 그 때 거리를 탐색 => 저장된 최소 거리보다 짧으면 check 갱신



- 이 코드는 check를 활용한 점이 특이했다
  - 즉 모든 노드에 대한 거리를 다 구하고 저장하지 않음
  - check는 특정 노드와 노드 사이의 거리가 X
  - check는 **선택된 노드로 이루어진 <u>그래프</u>와 <u>노드</u> 사이의 거리**