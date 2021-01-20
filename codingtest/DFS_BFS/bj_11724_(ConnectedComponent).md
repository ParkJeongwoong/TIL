# 백준 11724번

연결 요소의 개수

## 문제

방향 없는 그래프가 주어졌을 때, 연결 요소 (Connected Component)의 개수를 구하는 프로그램을 작성



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 6 5  | 2    |
| 1 2  |      |
| 2 5  |      |
| 5 1  |      |
| 3 4  |      |
| 4 6  |      |

- 입력
  - 첫 번째 줄 : 정점의 수(N) 간선의 수(M)
  - 이후 : 간선의 연결 정점

| 입력 | 출력 |
| ---- | ---- |
| 6 8  | 1    |
| 1 2  |      |
| 2 5  |      |
| 5 1  |      |
| 3 4  |      |
| 4 6  |      |
| 5 4  |      |
| 2 4  |      |
| 2 3  |      |



## 코드

```python
import sys
N, M = map(int, sys.stdin.readline().strip().split())
edge = [[] for _ in range(N+1)]

for __ in range(M):
    n1, n2 = map(int, sys.stdin.readline().strip().split())
    edge[n1].append(n2)
    edge[n2].append(n1)

for e in edge:
    e.sort(reverse=True)

def dfs():
    connected = 0
    stack = [1]
    d_check = [0 for _ in range(N+1)]
    while sum(d_check) < N:
        while stack:
            v1 = stack.pop()
            if not d_check[v1]:
                d_check[v1] = 1
                stack += edge[v1]
        connected += 1
        if 0 in d_check[1:]:
            stack = [d_check[1:].index(0) + 1]
    return connected


print(dfs())
```

DFS_BFS 문제의 가장 빠른 사람의 코드 참고



### 설명

- DFS 를 이용해서, 출발 정점은 1로 시작
- 모든 정점을 방문할 때까지 while문 반복
- stack을 모두 소모한 것 = 한 연결 요소에 대한 접근 완료
  - 만약 아직 방문하지 않은 정점이 남아있다면, 독립된 연결 요소임
  - `connected` 변수에 1을 더하고 미방문 정점부터 재탐색
