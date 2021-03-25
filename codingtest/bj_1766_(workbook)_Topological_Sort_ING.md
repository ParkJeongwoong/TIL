# 3백준 1766번

문제집

> https://www.acmicpc.net/problem/1766

## 문제

난이도 순 문제 N개,

3가지 규칙을 지켜야 함

1. N개의 문제는 모두 풀어야 한다.
2. 먼저 푸는 것이 좋은 문제가 있는 문제는, 먼저 푸는 것이 좋은 문제를 반드시 먼저 풀어야 한다.
3. 가능하면 쉬운 문제부터 풀어야 한다.



## 입출력

| 입력 | 출력    |
| ---- | ------- |
| 4 2  | 3 1 4 2 |
| 4 2  |         |
| 3 1  |         |

- 입력
  - 첫 번째 줄 :  문제의 수 N(1 ≤ N ≤ 32,000), 먼저 푸는 것이 좋은 문제에 대한 정보의 개수 M(1 ≤ M ≤ 100,000)
  - 이후 : 두 정수의 순서



## 코드

### 코드 1

```python
import sys
input = sys.stdin.readline

N, M = map(int,input().split())
nums = [i for i in range(1,N+1)]
betters = [tuple(map(int,input().split())) for _ in range(M)]
betters.sort()
for a, b in betters:
    for ni in range(N):
        if nums[ni] == a:
            ai = ni
        elif nums[ni] == b:
            bi = ni
    for i in range(ai, bi, -1):
        nums[i] = nums[i-1]
    nums[bi] = a

print(*nums)
```

`시간 초과`

- 시간 초과일 뿐더러 틀린 코드
  - 5 2, 1 4, 4 2를 주면 `1 5 2 3 1`로 1이 중복되고 4가 사라진다.



### 코드 2

```python
import sys
input = sys.stdin.readline

N, M = map(int,input().split())

nums = [[i,N+1-i] for i in range(1,N+1)] # 숫자, 우선순위
betters = [tuple(map(int,input().split())) for _ in range(M)]
betters.sort(key=lambda x:-x[0])
for a, b in betters:
    if nums[a-1][1] < nums[b-1][1]: # a가 b보다 우선순위가 낮다면 (높으면 바꿀 이유 X)
        nums[a-1][1] = nums[b-1][1] + (N+1-a)**0.5/N**2
    else:
        for idx in range(nums.find(a))
nums.sort(key=lambda x:-x[1])

print(*list(zip(*nums))[0])
```

`오답`



- M개의 정수 조합이 우선순위를 바꿔주는 뜻으로 이해
  - 4 2면 4를 2보다 우선순위를 높여준다는 뜻

- 역시 틀린 코드
  - 4 1, 4 2를 주면 `1 4 2 3`이 나오는데, 사람들의 말을 빌려보면 `1 3 4 2`가 나와야 한다 (사실 좀 애매한 부분)

약간 수정을 한 아래 코드도 역시 틀렸다

```python
import sys
input = sys.stdin.readline

N, M = map(int,input().split())

nums = [[i,N+1-i] for i in range(1,N+1)] # 숫자, 우선순위
betters = [tuple(map(int,input().split())) for _ in range(M)]
betters.sort(key=lambda x:-x[0])
for a, b in betters:
    if nums[a-1][1] < nums[b-1][1]: # a가 b보다 우선순위가 낮다면 (높으면 바꿀 이유 X)
        nums[b-1][1] = nums[a-1][1]-1 + (N+1-b)**0.5/N**2 ## 이 부분에서 a를 b보다 높이는 게 아니라 b를 a보다 낮춤

nums.sort(key=lambda x:-x[1])

print(*list(zip(*nums))[0])
```



## 위상정렬

> https://jason9319.tistory.com/93
>
> https://www.acmicpc.net/problem/2252

이 문제는 위상정렬 문제이다.
