# 백준 1707번

이분 그래프

## 문제

이분 그래프 판별



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 2    | YES  |
| 3 2  | NO   |
| 1 3  |      |
| 2 3  |      |
| 4 4  |      |
| 1 2  |      |
| 2 3  |      |
| 3 4  |      |
| 4 2  |      |

- 입력
  - 첫 번째 줄 : 테스트 케이스
  - 두 번째 줄 : 정점의 수(N) 간선의 수(M)
  - 이후 : 간선의 연결 정점



## 이분 그래프

![image](https://user-images.githubusercontent.com/77447841/105185588-07324100-5b74-11eb-88c8-42f2f536a2eb.png)

인접한 정점끼리 다른 색으로 칠해서 모든 정점을 두 가지 색으로 칠할 수 있는 그래프

- 같은 색깔 끼리는 연결 x
- 모든 정점이 서로 연결 됨 (아님)



### 이분 그래프 확인법 아이디어

- 색깔을 표시하는 변수 `color` 필요
  - -1 : 미정 / 0 or 1 부여
  - 0 : 색깔1
  - 1 : 색깔2
    - <u>-1이 아닌 color</u> & <u>같은 color</u> => **이분 그래프 X**
    - `not color`를 이용해 color 변수 switch

- 이분 그래프인지 확인하는 문제이므로 아마 모든 노드가 연결 되어 있을 것
  - DFS로 탐색하면서 인접 노드 색깔 확인



## 코드

```python
import sys

def dfs():
    stack = [1]
    color_stack = [0]
    d_check = [0 for _ in range(N+1)]
    colors = [-1 for _ in range(N+1)]
    color = 0
    while stack:
        v1 = stack.pop()
        c1 = color_stack.pop()
        if not d_check[v1]:
            d_check[v1] = 1
            stack += edge[v1]
            colors[v1] = color
            color = int(not color)
            color_stack += [color]*len(edge[v1])
        else :
            if c1 != colors[v1]:
                return 'NO'
    return 'YES'



T = int(sys.stdin.readline())
for i in range(T):
    N, M = map(int, sys.stdin.readline().strip().split())
    edge = [[] for _ in range(N+1)]

    for __ in range(M):
        n1, n2 = map(int, sys.stdin.readline().strip().split())
        edge[n1].append(n2)
        edge[n2].append(n1)

    for e in edge:
        e.sort(reverse=True)
        
    print(dfs())
```



### 설명

- DFS 를 이용해서, 출발 정점은 1, 색깔은 0으로 시작
- 모든 정점을 방문할 때까지 while문 반복
- color_stack을 추가 (color 상태의 어떤 노드 n에 연결된 모든 다른 노드는 ~color의 color stack을 부여받음)
- stack을 모두 안정적으로 수행하면 'YES' 반환
  - 만약, 자기 차례에 부여받은 color와 다른 노드가 준 color stack이 다르다면 'NO'를 반환



- <u>**하지만 나는 틀렸다**</u>



## 고찰

내 착각과 달리, 모든 노드가 한 그룹으로 연결이 안 되어 있을 수도 있음

​	-> 여러 개의 이분 그래프 그룹이 있을 수 있음



### 수정 코드

```python
import sys

def dfs():
    stack = [1]
    color_stack = [0]
    d_check = [0 for _ in range(N+1)]
    colors = [-1 for _ in range(N+1)]
    color = 0
    while sum(d_check) < N:
        while stack:
            v1 = stack.pop()
            c1 = color_stack.pop()
            if not d_check[v1]:
                d_check[v1] = 1
                stack += edge[v1]
                colors[v1] = color
                color = int(not color)
                color_stack += [color]*len(edge[v1])
            else :
                if c1 != colors[v1]:
                    return 'NO'
        if 0 in d_check[1:]:
            stack = [d_check[1:].index(0) + 1]
            color_stack = [0]
    return 'YES'



T = int(sys.stdin.readline())
for i in range(T):
    N, M = map(int, sys.stdin.readline().strip().split())
    edge = [[] for _ in range(N+1)]

    for __ in range(M):
        n1, n2 = map(int, sys.stdin.readline().strip().split())
        edge[n1].append(n2)
        edge[n2].append(n1)

    for e in edge:
        e.sort(reverse=True)
        
    print(dfs())
```

이것도 틀림;;



## 고찰2

- 쓸데 없는 변수 `color`에서 문제가 발생하는 것을 확인

  - `color_stack`에서 나온 `c1`이 있어서 color는 불필요

  

### 수정 코드2

```python
import sys

def dfs():
    stack = [1]
    color_stack = [0]
    d_check = [0 for _ in range(N+1)]
    colors = [-1 for _ in range(N+1)]
    while sum(d_check) < N:
        while stack:
            v1 = stack.pop()
            c1 = color_stack.pop()
            if not d_check[v1]:
                d_check[v1] = 1
                stack += edge[v1]
                colors[v1] = c1
                c1 = int(not c1)
                color_stack += [c1]*len(edge[v1])
            else :
                if c1 != colors[v1]:
#                    print('v1', v1, 'c1',c1,colors[v1])
                    return 'NO'
#            print(v1, colors[v1], 'stack', stack, 'c-stack',color_stack, 'color')
        if 0 in d_check[1:]:
            stack = [d_check[1:].index(0) + 1]
            color_stack = [0]
    return 'YES'



T = int(sys.stdin.readline())
for i in range(T):
    N, M = map(int, sys.stdin.readline().strip().split())
    edge = [[] for _ in range(N+1)]

    for __ in range(M):
        n1, n2 = map(int, sys.stdin.readline().strip().split())
        edge[n1].append(n2)
        edge[n2].append(n1)

    for e in edge:
        e.sort(reverse=True)
        
    print(dfs())
```

**성공!**

하지만 시간이 너무 오래 걸림

(Python 3 시간 초과, PyPy3 통과)


`검증용 숫자`

```
2

7 7
1 2
2 6
4 5
7 1
2 3
3 5
6 7

9 5
1 3
2 4
6 7
7 8
9 1
```



## `jiyolla`님의 코드

```python
import sys
from collections import deque


def solve():
    read = sys.stdin.readline
    t = int(read())
    for _ in range(t):
        nv, ne = map(int, read().split())
        """
        adj = set()
        for _ in range(ne):
            v1, v2 = map(int, read().split())
            e.append((v1, v2))
            adj |= {(v1, v2), (v2, v1)}
        """
        """
        adj = [[False] * (nv + 1) for _ in range(nv + 1)]
        for _ in range(ne):
            v1, v2 = map(int, read().split())
            e.append((v1, v2))
            adj[v1][v2] = True
            adj[v2][v1] = True
        """
        # """
        adj = [[] for _ in range(nv + 1)]
        for _ in range(ne):
            v1, v2 = map(int, read().split())
            adj[v1].append(v2)
            adj[v2].append(v1)
        # """

        # 어떻게 이분 그래프인지 확인할 것인가?
        # 이분 그래프가 아닌 그래프의 예시를 생각해보자.
        # 1 2, 2 3, 1 3. 서로 연결되어 있는 3개의 정점이다.
        # 각 집합에 하나씩 넣었을 때, 세번째 원소는 어느 집합에도 들어가지 못한다. 두 집합의 원소들 중 적어도 하나와 모두 인접하기 때문이다.
        # 체인이 문제인 건가? 체인보다는, 한 정점의 간선의 개수가 2개이면 안 되는 것 같은데?
        # 맞는 거 같다. 한 정점에서 2개의 정점과 이어지는 순간, 이 정점은 들어갈 곳을 잃는다.
        # 흠 그러면 단순히 모든 정점들이 최대 1개의 간선을 갖는지만 조사하면 될 것 같다.
        # 응? 아니넼ㅋㅋㅋㅋㅋ 당장 예제만 봐도 아니네.
        # 그 2개의 정점을 같은 집합에 넣고 중간의 정점을 다른 집합에 넣으면 되네.
        # 그러면 3개의 정점이 서로 연결되는 상황만 없으면 되는 건가? 4개의 정점이 단순히 체인을 형성할 떄는 문제 없다.
        # 즉, 임의의 3개의 정점이 상호 연결되어 있을 때 이분 그래프가 될 수 없는 것 같다. 이번엔 맞는 것 같다.
        # 구현을 어떻게 할까? 모든 원소에 대해서 깊이가 3인 탐색을 했을 때 자신을 재방문하면 이분 그래프가 못되는 걸로 할까?
        # 20,000개의 정점이 있고, 깊이가 3인 탐색은 최악의 경우에 흠...그냥 일단 구현해보자. 뭔가 중복적인 일을 굉장히 많이 하는 것 같지만...
        """
        ans = 'YES'
        for v1 in range(nv):
            v3s = set()
            for v2 in adj[v1]:
                v3s |= set(adj[v2])
            if not v3s.isdisjoint(set(adj[v1])):
                ans = 'NO'
                break
        print(ans)
        """
        # 역시 시간 초과가 떴다. 내가 봐도 너무 비효율적임.
        # 아, 아니면 nC3을 할까? 총 20,000개 정점 중에서 임의의 3개의 정점을 고르는 경우의 수가 C(20000 3)일테고 각 경우에 사이클 이루는지 판단하는 거 상수시간의 조회면 된다.
        # 음 20,000C3이면 대충 10**12가 나오군...가지치기 가능?
        # 아니면 200,000개의 간선들을 순회하면서 각 간선에 대해서 간선에 없는 정점들을 하나씩 대입해서 검사? 그러면 200,000*20,000이고 10**9다. 이거 구현해보자.
        """
        ans = 'YES'
        for e0 in e:
            for v2 in range(nv):
                if adj[e0[0]][v2] and adj[e0[1]][v2]:
                    ans = 'NO'
                    break
            if ans == 'NO':
                break
        print(ans)
        """
        # 메모리 초과가 뜬다.
        # 그러면 2차 배열 대신 해시테이블을 쓴다.
        """
        ans = 'YES'
        for e0 in e:
            for v2 in range(nv):
                if (e0[0], v2) in adj and (e0[1], v2) in adj:
                    ans = 'NO'
                    break
            if ans == 'NO':
                break
        print(ans)
        """
        # 허허 이것도 시간 초과라...? 10**9가 확실히 느리긴 느린가 보네.
        # BFS를 어떻게 똑똑하게 쓰지?? 다시 위 방법으로 돌아가보자.
        # 이분그래프 판정의 본질을 다시 생각해보자. 상호연결된 3개의 정점의 존재 여부가 맞는 것 같다.
        # 아, bfs를 전체 그래프에 한번만 돌리되, 각 단계에서 만약 다음 큐에 들어갈 노드 사이에 연결이 있으면 삼각관계가 헝셩되는 것을 확인할 수 있다.
        """
        ans = 'YES'
        visited = {}
        for v in range(nv + 1):
            if v not in visited:
                queue = deque([v])
                visited[v] = True
                lq, llq, lllq = [], [], []
                while queue:
                    lllq = llq
                    llq = lq
                    lq = queue
                    for _ in range(len(queue)):
                        v1 = queue.popleft()
                        queue += adj[v1]
        """
        # 하 ㅅㅂ 전혀 다른 접근으로 문제를 푸는 정석적인 방법이 있었다.
        # 도대체 어떻게 떠올린 방법인지 궁금하다. 색깔을 칠하면서 그래프를 순회하는데, 자식 노드들을 자신의 색과 다른 색으로 칠한다.
        # 자식 노드가 이미 방문 당했으면 그 색이 자신의 색과 다른지 확인하다. 다르면 계속 진행하고, 같으면 이미 이분 그래프일 수가 없으므로 종료한다.
        # 이렇게 써보니, 너무 좋은 방법이다. 그래프 전체를 한번 순회하면 된다.
        # 나는 왜 이 방법을 못 떠올렸을까? 이분그래프의 판정을 상호연결된 세 개의 정점의 존재여부로 정해서 그런 것 같다.
        # 근본적으로 이분그래프의 판정에 대한 수학적인 이해가 떨어져서 비효율적인 방법을 택하게 되었다.
        # 내 방법은 작업 간에 상당히 많은 정보 저장되지 않아 반복처리 되어 비효율적인 것 같다...같다로만 결론을 내리게 되어서 좀 아쉽지만 지금 머리 아파서 일단 컬러링 답안의 구현까지만 하고 넘어간다.
        ans = True
        color = [0 for _ in range(nv + 1)]
        for v in range(1, nv + 1):
            if color[v] == 0:
                queue = deque([v])
                color[v] = 1
                while ans and queue:
                    for _ in range(len(queue)):
                        v1 = queue.popleft()
                        v1_c = color[v1]
                        v2_c = -1 * v1_c
                        for v2 in adj[v1]:
                            if color[v2] == v1_c:
                                ans = False
                                break
                            elif color[v2] == 0:
                                queue.append(v2)
                                color[v2] = v2_c
                        if not ans:
                            break
            if not ans:
                break
        print('YES' if ans else 'NO')


solve()

```

**<u>BFS가 훨씬 좋은 방법</u>**

