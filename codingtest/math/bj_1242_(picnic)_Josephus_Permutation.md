# 백준 1242번

소풍

> https://www.acmicpc.net/problem/1242

## 문제

N명의 사람이 모여, 1~K까지 돌아가면서 숫자를 말하고, 매 K번째 사람이 빠질 때, M번째 사람이 빠지는 차례는?



## 입출력

| 입력  | 출력 |
| ----- | ---- |
| 5 2 3 | 5    |

- 입력
  - N, K, M
  - N과 K는 5,000,000보다 작거나 같은 자연수, M은 N보다 작거나 같다



## 코드

### 코드 1

```python
N, K, M = map(int, input().split())
M -= 1 # idx offset

idx = 0
turn = 0
on_game = [1]*N

while on_game[M]:
    num = 1
    while True:
        if on_game[idx]:
            if num == K:
                on_game[idx] = 0
                break
            num += 1        
        idx += 1
        if idx == N:
            idx = 0
    turn += 1

print(turn)
```

`시간 초과`



- '이렇게 쉬울리가 없지'라고 생각하면서 제출한 코드
- 문제 내용을 그대로 구현해서 직관적으로 풀었다



### 코드 2

```python
N, K, M = map(int, input().split())

ongame = list(range(N+1))

tidx = 1
for i in range(N):
    tidx = tidx + K -1
    left = len(ongame)
    if tidx >= left:
        tidx %= left-1
    if not tidx:
        tidx = left-1
    if M == ongame.pop(tidx):
        print(i+1)
```

`시간 초과`



- 역시 문제 내용을 방향만 바꿔서 그대로 구현
- 사실 pop이 있어 위의 코드보다 느리면 느렸지 빠를린 없는 코드



## 요세푸스 문제 (요세푸스 순열)

> https://ko.wikipedia.org/wiki/%EC%9A%94%EC%84%B8%ED%91%B8%EC%8A%A4_%EB%AC%B8%EC%A0%9C
>
> 세그먼트 트리



## 백준 특강

시뮬레이션을 돌리면 굉장히 느릴 수 밖에 없는 문제

=> 중요한 건 M번째 수 => 매 턴마다 M번째 수의 위치를 새로 구한다

```python
import sys
input = sys.stdin.readline

N, K, M = map(int,input().split())

for i in range(N):
    if N-i < K:
        M += (N-i)*((K-1)//(N-i))
    if K == M:
        print(i+1)
        break
    else:
        M -= K
        if M < 0:
            M += N-i
```

`2200 ms` `28776 KB` `Python 3`

`180 ms` `122244 KB` `PyPy3`



- 매번 M의 값 갱신

- PyPy3 백준 최고 속도



## 백준 코드

``` python
N, K, M = map(int,input().split())
original_N = N
while True:
    mod = K % N
    if mod == 0:
        mod = N
    if mod == M:
        break
    elif mod < M:
        M = M - mod
    else:
        M = M - mod + N
    N -= 1
print(original_N - N + 1)
```

[scl2589](https://www.acmicpc.net/user/scl2589) `1500 ms` `28776 KB` `Python 3`



- Python3 최고 속도
- K가 아니라 `(K % N)`을 사용해서 검증
