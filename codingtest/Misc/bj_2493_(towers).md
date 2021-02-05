# 백준 2493번

탑

## 문제

탑은 왼쪽으로 레이저를 쏨

높이가 같거나 높으면 레이저를 맞음

n번째 탑에서 쏜 레이저가 어느 탑을 맞추는지 찾기



## 입출력

| 입력      | 출력      |
| --------- | --------- |
| 5         | 0 0 2 2 4 |
| 6 9 5 7 4 |           |

- 입력
  - 탑의 수
  - 탑의 높이가 나열된 리스트
- 출력
  - 맞춘 탑의 번호



## 코드

```python
#2493
import sys
input = sys.stdin.readline

N = int(input())
towers = list(map(int,input().split()))
towers.insert(0,max(towers)+1)

answer = [0]

for i in range(1,N+1):
    if towers[i-1] < towers[i]:
        to = i-1
        for j in range(len(answer)):
            if towers[answer[to]] < towers[i]:
                to = answer[to]
            else:
                answer.append(answer[to])
                break
    else:
        answer.append(i-1)
        
answer = answer[1:]

print(*answer)
```



### 설명

- 만약 직전 탑의 높이가 더 낮다면, 직전 탑이 레이저를 맞춘 탑과 비교, 이를 반복한다



- 한 번에 해결
- 나쁘지 않은 속도와 메모리
- 다만 이 문제가 스택 문제로 분류되었기 때문에, 스택을 써보는 것도 좋았을 것 같다.



## 다른 사람의 코드

> 모든 코드가 2번의 반복문 혹은 그와 유사한 구조를 갖추고 있다.

### Stack 사용

```python
if __name__ == "__main__":
    N = int(input())  # 탑의 개수
    top_list = list(map(int, input().split()))  # 탑 리스트
    stack = []
    answer = []

    for i in range(N):
        while stack:
            if stack[-1][1] > top_list[i]:  # 수신 가능한 상황
                answer.append(stack[-1][0] + 1)
                break
            else:
                stack.pop()
        if not stack:  # 스택이 비면 레이저를 수신할 탑이 없다.
            answer.append(0)
        stack.append([i, top_list[i]])  # 인덱스, 값

    print(" ".join(map(str, answer)))
```

(https://jjangsungwon.tistory.com/44)

- stack을 이용하여, 탑이 더 낮을 때 다음 번에 확인할 탑을 지정했다.



### 재귀함수 사용

```python
import sys

def deep(index, num):
    if index == 0:
        return 0

    if nums[index] >= num:
        return index
    else:
        return deep(result[index], num)


N = int(sys.stdin.readline())+1
nums = list(map(int, sys.stdin.readline().split()))
nums.insert(0, 0)

# print(nums)

result = [0] * N

for i in range(2, N):
    if nums[i-1] > nums[i]:
        result[i] = i-1
    else:
        result[i] = deep(result[i-1], nums[i])


print(' '.join(map(str, result[1:])))
```

([redpigeon](https://www.acmicpc.net/user/redpigeon))

- for문과 재귀함수를 사용했다.



### DP

```python
n = int(input())
top = [100000000] + list(map(int,input().split()))
dp = [0]
for i in range(1,n+1): # 첫 번째 탑부터 시작
    idx = i-1 # 일단 직전 탑과 비교
    while True:
        if top[idx] >= top[i]: # idx 탑이 더 크면 답을 저장
            dp.append(idx)
            break
        idx = dp[idx] # 조건문이 틀리면, 다음 idx는 레이저를 맞은 탑
print(*dp[1:])
```

([joi0104](https://www.acmicpc.net/user/joi0104))

- 이 분은 DP로 풀었는데, 속도와 메모리가 모두 우수하다.

- 나도 처음에 DP로 접근하다 실패했었는데, 공부가 많이 되었다.

- 보다보니 내 answer 리스트의 역할이 dp와 굉장히 유사하다.

- 논리는 나와 같은데, 군데군데 효율적으로 바꾼 코드인 것 같다.
