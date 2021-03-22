# SWE 1949. 등산로 조성

모의 SW 역량 테스트 문제

https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5PoOKKAPIDFAUq

---

## 작은 배움

**Import가 생각보다 시간을 많이 잡아먹는다는 것**을 깨달았다. 실수로 import를 했을 때와 뺐을 때가 거의 40ms가 차이가 난다.`



---

##  내 코드

```python
for tc in range(1,int(input())+1):
    N, K = map(int,input().split())
    mountains = [list(map(int,input().split())) for _ in range(N)]

    tops = []
    highest = 0
    for i in range(N):
        for j in range(N):
            if mountains[i][j] > highest:
                highest = mountains[i][j]
                tops.clear()
                tops.append(([(i,j)], 1, K))
            elif mountains[i][j] == highest:
                tops.append(([(i,j)], 1, K))

    ds = [(1,0), (0,1), (-1,0), (0,-1)]
    ans = 0

    while tops:
        # print(tops)
        locs , step, drill = tops.pop()
        r,c = locs[-1]
        # print('위치',r,c,)
        # print(step,'번째')
        
        if step > ans:
            ans = step

        if drill > 0:
            present = mountains[r][c]
        else:
            present = min(-drill,mountains[r][c])

        for d in range(4):
            if 0<=r+ds[d][0]<=N-1 and 0<=c+ds[d][1]<=N-1 and (r+ds[d][0],c+ds[d][1]) not in locs:
                nlocs = locs + [(r+ds[d][0],c+ds[d][1])]
                if mountains[r+ds[d][0]][c+ds[d][1]] < present:
                    tops.append((nlocs, step+1, drill))
                elif drill > 0 and mountains[r+ds[d][0]][c+ds[d][1]] - drill < present:
                    tops.append((nlocs, step+1, -present+1))


    print('#{} {}'.format(tc,ans))
```

`243 ms` `61,748 KB`



- DFS로 문제 해결
  - 인자가 많아지고, visited 경로를 표시하기 위해 DFS의 위치 인자를 list 형식으로 만들었다.(`locs`)
  - 스택에 넣는 인자 : 경로(리스트), 거리, 뚫는 깊이

- Drill을 쓰면 값이 음수로 바뀌게 설정해서 한 번만 쓰도록 제한





## 황성훈님 코드

```python
dirs = [(1,0),(-1,0),(0,-1),(0,1)]
T = int(input())
for case in range(1, T + 1):
    n, k = map(int, input().split())
    arr = [list(map(int, input().split())) for _ in range(n)]
    maxij = []
    maxh = 1
    for i in range(n):
        for j in range(n):
            if arr[i][j] > maxh:
                maxh = arr[i][j]
                maxij = []
                maxij.append((i, j))
            elif arr[i][j] == maxh:
                maxij.append((i, j))
            else:
                continue
    stc = []
    maxdis = 0
    for x in maxij:
        i, j = x
        stc.append((i, j, maxh, 1))
    while stc:
        i, j, h, s = stc.pop() # 좌표/현재높이/ 깍을수있는지여부
        stack =[]
        stack.append((i,j,h,s,1,[])) #좌표/높이/상태/등산로의 길이/오기전 좌표
        while stack:
            i,j,h,s,d,visited = stack.pop()
            new_visit = visited.copy()
            new_visit.append((i,j))
            if d>maxdis:
                maxdis =d
            for x in range(4):
                si = i + dirs[x][0]
                sj = j + dirs[x][1]
                if si<0 or sj<0 or si>n-1 or sj>n-1:
                    continue
                if (si,sj) in new_visit:
                    continue
                if arr[si][sj]<h:
                    stack.append((si,sj,arr[si][sj],s,d+1,new_visit))
                elif arr[si][sj]>=h and s==1:
                    if arr[si][sj]>=h+k:
                        continue
                    else:
                        stack.append((si, sj, h-1, 0, d + 1, new_visit))
 
    print(f'#{case} {maxdis}')
```

`186 ms` `60,088 KB`



- 마찬가지로 DFS로 풀었고, stack에 많은 전달인자를 쌓아놨다.
  - 꼭대기(출발지) 선택을 while문을 돌리고, 다시 while문으로 돌리면서 아래로 내려가는 것을 구현
  - 이 때 visited를 표현하기 위해 copy를 사용 **`//`** 나는 새로운 nloc을 만들었음



## 손준희님 코드

```python
movement = [(0, -1), (0, 1), (-1, 0), (1, 0)]
 
for TC in range(int(input())):
    N, K = map(int, input().split())
    mountain = [list(map(int, input().split())) for x in range(N)]
    maxvalue = 0
    for y in range(N):
        for x in range(N):
            if maxvalue < mountain[y][x]:
                maxvalue = mountain[y][x]
                stack = []
                stack.append((x, y, [(x, y)], maxvalue, 0, K))
            elif maxvalue == mountain[y][x]:
                stack.append((x, y, [(x, y)], maxvalue, 0, K))
    maxvalue = 0
    while stack:
        x, y, route, h, step, K = stack.pop()
        if maxvalue < step:
            maxvalue = step
        for move in movement:
            nx, ny = x + move[0], y + move[1]
            if -1 < nx < N and -1 < ny < N and (nx, ny) not in route:
                if mountain[ny][nx] < h:
                    stack.append((nx, ny,  + [(nx, ny)], mountain[ny][nx], step + 1, K))
                elif K and mountain[ny][nx] - K < h:
                    stack.append((nx, ny, route + [(nx, ny)], h - 1, step + 1, 0))
    print('#{} {}' .format(TC + 1, maxvalue + 1))
```

`200 ms` `60,376 KB`



- 마찬가지로 DFS로 풀었고, stack에 많은 전달인자를 쌓아놨다.
- 큰 틀에서 방법론은 비슷한데, 나보다 정리가 잘 된 코드 같다.
