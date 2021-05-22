# 백준 17071번

숨바꼭질 5

## 문제

수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 500,000)에 있고, 동생은 점 K(0 ≤ K ≤ 500,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다. 동생은 항상 걷기만 한다. 동생은 항상 매 초마다 이동을 하며, 이동은 가속이 붙는다. 동생이 이동하는 거리는 이전에 이동한 거리보다 1을 더한 만큼 이동한다. 즉, 동생의 처음 위치는 K, 1초가 지난 후 위치는 K+1, 2초가 지난 후 위치는 K+1+2, 3초가 지난 후의 위치는 K+1+2+3이다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오. 동생을 찾는 위치는 정수 좌표이어야 하고, 수빈이가 0보다 작은 좌표로, 50만보다 큰 좌표로 이동하는 것은 불가능하다.



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 5 17 | 2    |

- 입력
  - 수빈이가 있는 위치 N과 동생이 있는 위치 K
  
  


| 입력 | 출력 |
| ---- | ---- |
| 17 5 | 4    |




| 입력 | 출력 |
| ---- | ---- |
| 6 6  | 0    |




| 입력     | 출력 |
| -------- | ---- |
| 1 500000 | -1   |




| 입력          | 출력 |
| ------------- | ---- |
| 250000 499999 | 1    |




| 입력 | 출력 |
| ---- | ---- |
| 1 10 | 6    |



## 코드

```python
from collections import deque

def subin(N,t):
    target = M+t*(t+1)//2

    if N == target:
        return t
    elif aa:
        pass


N, M = map(int,input().split())

dp_odd = [False]*500001
dp_even = [False]*500001

targets = []
t = 1
while M < 500001:
    targets.append(M)
    M += t
    t += 1
    
time = 0
subins = deque([(time,N)])
while subins:
    time, subin = subins.popleft()

    if time == len(targets):
        print(-1)
        break

    if subin == targets[time]:
        print(time)
        break

    if time & 1: # 홀수
        if dp_odd[targets[time]]: # M이 전에 방문한 적 있는 곳을 밟았다면
            print(time)
            break
        if not dp_odd[subin]:
            dp_odd[subin] = True
            if subin>0 and not dp_even[subin-1]:
                subins.append((time+1,subin-1))
            if subin<500000 and not dp_even[subin+1]:
                subins.append((time+1,subin+1))
            if subin<250001 and not dp_even[subin*2]:
                subins.append((time+1,subin*2))
    
    else: # 짝수
        if dp_even[targets[time]]: # M이 전에 방문한 적 있는 곳을 밟았다면
            print(time)
            break
        if not dp_even[subin]:
            dp_even[subin] = True
            if subin>0 and not dp_odd[subin-1]:
                subins.append((time+1,subin-1))
            if subin<500000 and not dp_odd[subin+1]:
                subins.append((time+1,subin+1))
            if subin<250001 and not dp_odd[subin*2]:
                subins.append((time+1,subin*2))
    
else:
    print(-1)
```

`1384 ms` `41364 KB` `Python 3`



### 설명

- 2초 마다 제자리로 오기 때문에, 짝수 번째에 도착했던 곳은 이후 짝수 번째 시간에 그곳에 있다는 것이 보장된다.
  - 마찬가지로 홀수 번째 도착한 곳도 홀수 번째 시간에 그곳에 있다는 것이 보장된다.
- 위의 개념을 적용하면 중복없이 각 위치를 한 번씩만 밟아도 된다.
- 동생이 수빈이가 방문했던 위치를 방문한다면, 정답 판별 가능



> 백준 특강이 도움이 크게 되었다. 언젠가 본 적 있는 문제 같고, DP를 써야할 것 같았는데 알고보니 특강 때 들은 문제였다.