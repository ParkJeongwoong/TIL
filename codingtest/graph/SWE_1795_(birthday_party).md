# SWE 1795. 인수의 생일 파티

https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV4xuqCqBeUDFAUx

---

##  내 코드

```python
import heapq
 
# 일단 X 부터 뻗어나가는 다익스트라는 필수
def dijkstra(node):
    dp = ['inf']*(N+1)
    dp[node] = 0
    heap = [(0,node)]
 
    while heap:
        cost, pos = heapq.heappop(heap)
 
        if cost > dp[pos]:
            continue
     
        for next_cost, next_node in edges[pos]:
            new_cost = cost + next_cost
            if dp[next_node] == 'inf' or dp[next_node] > new_cost:
                dp[next_node] = new_cost
                heapq.heappush(heap, (new_cost, next_node))
    return dp
 
def reversed_dijkstra(node):
    dp = ['inf']*(N+1)
    dp[node] = 0
    heap = [(0,node)]
 
    while heap:
        cost, pos = heapq.heappop(heap)
 
        if cost > dp[pos]:
            continue
     
        for next_cost, next_node in reversed_edges[pos]:
            new_cost = cost + next_cost
            if dp[next_node] == 'inf' or dp[next_node] > new_cost:
                dp[next_node] = new_cost
                heapq.heappush(heap, (new_cost, next_node))
     
    return dp
 
 
for tc in range(1,int(input())+1):
    N, M, X = map(int,input().split())
    edges = [[] for _ in range(N+1)]
    reversed_edges = [[] for _ in range(N+1)]
    for i in range(M):
        x, y, c = map(int,input().split())
        edges[x].append((c, y)) # 시간, 목적지
        reversed_edges[y].append((c, x))
 
    dp = dijkstra(X)
    reversed_dp = reversed_dijkstra(X)
    # 만약 a -> b -> X 를 통해 a->X의 최단거리를 구했으면, b->X를 다시 구할 필요가 없다
    # 이거 역방향으로 다익스트라 다시 돌리면 되겠는데??
    # print(dp)
    # print(reversed_dp)
    ans = 0
    for i in range(1,N+1):
        tmp = dp[i] + reversed_dp[i]
        if ans < tmp:
            ans = tmp
    print('#{} {}'.format(tc, ans))
```

`403 ms` `66,572 kb`

- `모든 위치에서 X까지`, 그리고 `X에서 모든 위치까지` 오가는 비용을 구하는 문제
- `X에서 모든 위치까지` 다익스트라로 구하고 난 뒤,
- `모든 위치에서 X까지` 가는 것은 역방향으로 이동하는 것과 같다는 생각이 들었다
- 결과는 성공적😀

- D6라는 난이도에 비해 너무 쉬웠던 문제