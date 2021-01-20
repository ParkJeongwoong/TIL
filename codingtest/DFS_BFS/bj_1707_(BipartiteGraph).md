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

![image-20210120130128074](bj_1707_(BipartiteGraph).assets/image-20210120130128074.png)

인접한 정점끼리 다른 색으로 칠해서 모든 정점을 두 가지 색으로 칠할 수 있는 그래프

- 같은 색깔 끼리는 연결 x
- 모든 정점이 서로 연결 됨



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
