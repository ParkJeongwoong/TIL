# 백준 1654번

랜선 자르기

## 문제

이미 가지고 있는 랜선 K 개를 길이 X로 잘라 나눠 N 개로 만든다. 

이 때 남는 부분은 버리고 다른 선과 이어붙일 수도 없다.

이 경우 X의 최대치를 구하시오.



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 4 11 | 200  |
| 802  |      |
| 743  |      |
| 457  |      |
| 539  |      |

- 입력
  - 가지고 있는 선의 수 K, 필요한 선의 수 N
  - 가지고 있는 선의 길이
- 출력
  - N을 만드는 최대 길이 X



## 코드

```python
# 잘라진 길이 length가 최대가 되게 하기 위해
# length는 항상 가장 짧은 선 보다 짧다
# 길이1 // length + 길이2 // length + ... = N이 되어야 한다.
# 그냥 for문 돌려도 되나? 너무 오래 걸릴 것 같은데
# binary니까 이진 탐색으로 찾아야 하나? 근데 그러기엔 생각보다 간단

# 노우... 이게 아니다.
# length가 가장 짧은 선보다 길수도 있음
# ex) 10, 30, 80 일 때 N이 2라면, length = 40이 최대 이다. (10,30은 그냥 버려버릴 수도 있음) => 최대 length는 N이 1일 때, 즉 가장 긴 선이 기준이다.
import math
import sys
K, N = map(int, sys.stdin.readline().split())

nowhave = []
for i in range(K):
    nowhave.append(int(sys.stdin.readline())) # 지금 가지고 있는 선 확보

# cand_l = [i for i in range(1,max(nowhave)+1)] 이걸 굳이 list로 만들 필요 없음
#mid = math.ceil(max(nowhave)/2) # 얘가 지금 index // index가 아니라 실제 값으로
cand_l = [1,max(nowhave)+1]

while True:
    mid = math.ceil((cand_l[1]+cand_l[0])/2)
    after_mid = 0
    for line in nowhave:
        after_mid += line // mid

    if after_mid >= N:
        cand_l[0] = mid
    else :
        cand_l[1] = mid - 1
    if cand_l[1] == cand_l[0]:
        print(cand_l[0])
        break
```



### 설명

- `cand_l`, length의 후보 값을 [최소, 최대] 값으로 표현
- 그리고 중간값 `mid`를 구한다
- `mid`로 나눠 만든 선의 갯수가 N 보다 작으면 더 잘게 나눈다
  - 즉 최대값을 줄인다
- 선의 갯수가 N 보다 크면 더 크게 나눈다
  - 즉 최솟값을 올린다
- 그렇게 찾은 하나의 최종 값이 X



## 다른 사람의 코드

```python
from sys import stdin
K, N = map(int,stdin.readline().split())
li = list(map(int,stdin.readlines()))
h, l = sum(li)//N, 1 # 차이점 1
while l <= h :
    mid = (h+l)//2
    cnt = sum([x//mid for x in li])
    if cnt < N:
        h = mid - 1
    elif cnt >= N:
        l = mid + 1
        ans = mid
print(ans)
```

(나보다 1.5배 빠름)



### 설명

- 전체적인 방법론은 같음
- 결정적인 차이는,
  1. math 모듈을 썼냐 안 썼냐
  2. 최대최소를 `list`로 구현했냐 `int`로 구현했냐



- 최대 길이 h를 sum/N으로 구함
  - ?근데 나보다 구린 방법 같음
    - 실제로 `sum(li)`를 N으로 나눈 값이 아닌, `max(li)`가 최대 X
