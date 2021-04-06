# SWE 5648. 원자 소멸 시뮬레이션

모의 SW 역량 테스트 문제

https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWXRFInKex8DFAUo

---

##  내 코드

```python
for tc in range(1,int(input())+1):
    N = int(input())
    states = [list(map(int,input().split())) for _ in range(N)]
    collisions = [[22222]*N for _ in range(N)]
    collisions_t = []
    d = [(0,1), (0,-1), (-1,0), (1,0)]
    energy = 0
     
    for i in range(N):
        for j in range(i+1,N):
            if i != j:
                # # t초 후 충돌 위치
                # states[i][0]+d[states[i][2]][0]*tx = states[j][0]+d[states[j][2]][0]*tx
                # states[i][1]+d[states[i][2]][1]*ty = states[j][1]+d[states[j][2]][1]*ty
                # tx, ty가 같고 양수여야 함
                tx = int(round((states[i][0]-states[j][0])*10/(d[states[j][2]][0]-d[states[i][2]][0]+1e-7)))
                ty = int(round((states[i][1]-states[j][1])*10/(d[states[j][2]][1]-d[states[i][2]][1]+1e-7)))
                # print(tx,ty)
                # 충돌하는 경우
                if (tx>0 and tx==ty and states[j][2] != states[i][2]):
                    collisions[i][j] = tx
                    collisions[j][i] = tx
                    if tx not in collisions_t:
                        collisions_t.append(tx)
                     
                elif not tx and ty>0 and states[j][2]+states[i][2]==1:
                    collisions[i][j] = ty
                    collisions[j][i] = ty
                    if ty not in collisions_t:
                        collisions_t.append(ty)
                 
                elif not ty and tx>0 and states[j][2]+states[i][2]==5:
                    collisions[i][j] = tx
                    collisions[j][i] = tx
                    if tx not in collisions_t:
                        collisions_t.append(tx)
 
    # for i in range(N):
    #     print(collisions[i])
 
    collisions_t.sort()
    for t in collisions_t:
        for i in range(N):
            for j in range(N):
                if collisions[i][j] == t:
                    energy += states[i][3]
                    collisions[i] = [22222]*N
                    for ii in range(N):
                        if collisions[ii][j] != t:
                            collisions[ii][j] = 22222
                             
                    # print('====================')
                    # print(i, energy)
                    # for i in range(N):
                    #     print(collisions[i])
                    continue
 
    print('#{} {}'.format(tc,energy))
```

`2,005 ms` `94,028 KB`



- 만약 충돌한다면, collisions에 집어 넣고
- 충돌하는 시간을 빠른 순서대로 정렬
- 충돌할 때마다 energy 추가, 충돌한 건 collisions에서 지우기



- 느린 이유?
  - **4중 for문,** 많은 나누기 연산 때문으로 추정



## 국현님 코드

```python
T = int(input())
for test_case in range(1, T + 1):
    N = int(input())
    coors = []
    for idx in range(N):
        X, Y, D, K = map(int, input().split())
        coors.append((2 * X, 2 * Y, D, K, idx))
 
    crashes = []
    dx = [0, 0, -1, 1]
    dy = [1, -1, 0, 0]
    for i in range(N - 1):
        for j in range(i + 1, N):
            x1, y1, d1, k1, idx1 = coors[i]
            x2, y2, d2, k2, idx2 = coors[j]
            t = 0
            # 같은 행에 있고 서로 마주 보는 경우
 
            if y1 == y2 and (dx[d1] * dx[d2] == -1):
                if abs((x1 + dx[d1]) - (x2 + dx[d2])) < abs(x1 - x2):
                    t = abs(x1 - x2) // 2
            # 같은 열에 있고 서로 마주 보는 경우
            elif x1 == x2 and (dy[d1] * dy[d2] == -1):
                if abs((y1 + dy[d1]) - (y2 + dy[d2])) < abs(y1 - y2):
                    t = abs(y1 - y2) // 2
            # 서로 직교하는 경우
            # x 차이와 y 차이가 같고 방향성이 직교하는 경우
            elif abs(x1 - x2) == abs(y1 - y2) and dx[d1] * dx[d2] == 0 and dy[d1] * dy[d2] == 0:
                if abs((x1 + dx[d1]) - (x2 + dx[d2])) < abs(x1 - x2):
                    if abs((y1 + dy[d1]) - (y2 + dy[d2])) < abs(y1 - y2):
                        t = abs(x1 - x2)
            if t != 0:
                crashes.append((idx1, idx2, t))
 
    crashes.sort(key=lambda x: x[2])
    answer = 0
    # 각 원자의 충돌 시간 기록
    times = [0] * N
    for idx1, idx2, t in crashes:
        if times[idx1] == 0 and times[idx2] == 0:
            times[idx1] = t
            times[idx2] = t
            answer += coors[idx1][3] + coors[idx2][3]
        elif times[idx1] == t and times[idx2] == 0:
            times[idx2] = t
            answer += coors[idx2][3]
        elif times[idx1] == 0 and times[idx2] == t:
            times[idx1] = t
            answer += coors[idx1][3]
    print('#{} {}'.format(test_case, answer))
```

`339 ms` `62,404 KB`



- 훨씬 효율적인 코드
- 충돌 기록 부분
  - 일단 crash 부분에서 복잡한 나누기 연산이 필요 X => 조건 별로 지정해두면 간단

- 충돌 부분
  - 복잡한 4중 for문 필요 X => 이것도 조건 별로 지정해두고 계산하면 간단
    - 둘 다 첫 충돌일 때 / 하나만 첫 충돌일 때 => 둘 다 첫 충돌이 아니면 무시
