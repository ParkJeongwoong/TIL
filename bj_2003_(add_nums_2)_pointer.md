# 백준 2003번

숫자 더하기 2

## 문제

N개의 수로 된 수열 A[1], A[2], …, A[N] 이 있다. 이 수열의 i번째 수부터 j번째 수까지의 합 A[i] + A[i+1] + … + A[j-1] + A[j]가 M이 되는 경우의 수를 구하는 프로그램을 작성하시오.



## 입출력

| 입력    | 출력 |
| ------- | ---- |
| 4 2     | 3    |
| 1 1 1 1 |      |

- 입력
  - 자연수 N과 M
  - Array
- 출력
  - 경우의 수 출력



| 입력                | 출력 |
| ------------------- | ---- |
| 10 5                | 3    |
| 1 2 3 4 2 5 3 1 1 2 |      |



## 코드

```python
import sys
input = sys.stdin.readline

N, M = map(int,input().split())
A = list(map(int,input().split()))

count = 0
for i in range(N):
    if A[i] > M:
        continue
    elif A[i] == M:
        count += 1
        continue
    As = A[i]
    for j in range(i+1,N):
        if As + A[j] > M:
            break
        elif As + A[j] == M:
            count += 1
            break
        As += A[j]

print(count)
```



### 설명

- 직관적으로 이중 for문 사용
- 그리고 당연히 이렇게 쉬울 리가 없으므로 <u>**시간초과**</u>로 **Failed**



## 개선된 코드1

```python
import sys
input = sys.stdin.readline

N, M = map(int,input().split())
A = list(map(int,input().split()))

count = 0
sumnum = 1
i = 0
j = 1
while i < N:
    sumnum = sum(A[i:j])
    if sumnum < M:
        if j < N:
            j += 1
            continue
        i += 1
    elif sumnum == M:
        count += 1
        i += 1
        if i == j:
            j = i + 1
    else:
        i += 1
        if i == j:
            j = i + 1

print(count)
```

- 이중 반복문을 없애기 위해 포인터 i, j 사용

그리고 결과는...

![image-20210209010016703](https://user-images.githubusercontent.com/77447841/107245615-af9c3c80-6a72-11eb-931e-e31324cd6933.png)

성공했지만 <u>가장 빠른 60ms보다 18배 가까이 느린 코드 탄생!!</u>



## 개선된 코드2

더 개선 가능할 거라 판단

불필요한 조건문 부분들을 최대한 줄이고,

sum 내장함수가 속도 저하를 유발한다고 생각했기 때문에 sum 제거

```python
import sys
input = sys.stdin.readline

N, M = map(int,input().split())
A = list(map(int,input().split()))

count = 0
sumnum = 0
i = 0
j = 0
while i < N and j < N:
    sumnum += A[j]
    if sumnum < M:
        j += 1
    else:
        if sumnum == M:
            count += 1
        sumnum -= A[i]+A[j]
        i += 1
print(count)
```

![image-20210209010236807](https://user-images.githubusercontent.com/77447841/107245642-b88d0e00-6a72-11eb-98e3-76d469d7df31.png)

매우 괜찮은 코드 탄생
