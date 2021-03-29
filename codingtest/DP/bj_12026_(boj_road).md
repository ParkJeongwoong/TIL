# 백준 12026번

BOJ 거리

## 문제

BOJ 거리는 보도블록 N개가 일렬로 놓여진 형태의 도로이다. 도로의 보도블록은 1번부터 N번까지 번호가 매겨져 있다.

스타트의 집은 1번에 있고, 링크의 집은 N번에 있다. 스타트는 링크를 만나기 위해서 점프해가려고 한다.

BOJ거리의 각 보도블록에는 B, O, J 중에 하나가 쓰여 있다. 1번은 반드시 B이다.

스타트는 점프를 통해서 다른 보도블록으로 이동할 수 있다. 이때, 항상 번호가 증가하는 방향으로 점프를 해야 한다. 만약, 스타트가 현재 있는 곳이 i번이라면, i+1번부터 N번까지로 점프를 할 수 있다. 한 번 k칸 만큼 점프를 하는데 필요한 에너지의 양은 k*k이다.

스타트는 BOJ를 외치면서 링크를 만나러 가려고 한다. 따라서, 스타트는 B, O, J, B, O, J, B, O, J, ... 순서로 보도블록을 밟으면서 점프를 할 것이다.

스타트가 링크를 만나는데 필요한 에너지 양의 최솟값을 구하는 프로그램을 작성하시오.



## 입출력

| 입력      | 출력 |
| --------- | ---- |
| 9         | 8    |
| BOJBOJBOJ |      |




| 입력     | 출력 |
| -------- | ---- |
| 8        | -1   |
| BJJOOOBB |      |




| 입력      | 출력 |
| --------- | ---- |
| 13        | 50   |
| BOJBOJBOJ |      |




| 입력 | 출력 |
| ---- | ---- |
| 2    | 1    |
| BO   |      |



| 입력            | 출력 |
| --------------- | ---- |
| 15              | 52   |
| BJBOJOJOOJOBOOO |      |



## 코드

```python
N = int(input())
roads = input()

loc = 0
energy = 0
sf = False
si = 0
ei = 0

for i in range(N-1,-1,-1):
    if roads[-1] != roads[i]:
        break

boj = {'B':'O', 'O':'J', 'J':'B'}
for j in range(1,i+1):
    if sf:
        if roads[j] == boj[roads[loc]]:
            ei = j
        else:
            go = si+(ei-si)//2
            energy += (go-loc)**2
            loc = go
            sf = False

    if not sf and roads[j] == boj[roads[loc]]:
        sf = True
        si = j
        ei = j+1

if sf:
    go = si+(j-si)//2
    energy += (go-loc)**2
    loc = go
    

if N == 1:
    print(0)
elif boj[roads[loc]] == roads[-1]:
    print(energy + (N-1-loc)**2)
else:
    print(-1)
```



- 도무지 완성이 되지 않았다
  -  Greedy하게 매 순간 최적을 구하려고 조건을 넣어서 그랬다



- 문제에 대한 접근이 잘못되었던 사례
  - DP



## 코드2

```python
N = int(input())
roads = input()

records = [0]+[N**2]*(N-1)

loc = 0
boj = {'B':'O', 'O':'J', 'J':'B'}

for i in range(1,N):
    for j in range(i):
        if boj[roads[j]] == roads[i] and records[i] > records[j] + (i-j)**2:
            records[i] = records[j] + (i-j)**2


if records[-1] == N**2:
    print(-1)
else:
    print(records[-1])
```



- DP를 활용해 해결
  - 접근 방법을 잘 파악하자
