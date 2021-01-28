하노이 탑 이동 순서

## 문제

세 개의 장대가 있고 첫 번째 장대에는 반경이 서로 다른 n개의 원판이 쌓여 있다. 각 원판은 반경이 큰 순서대로 쌓여있다. 이제 수도승들이 다음 규칙에 따라 첫 번째 장대에서 세 번째 장대로 옮기려 한다.

1. 한 번에 한 개의 원판만을 다른 탑으로 옮길 수 있다.
2. 쌓아 놓은 원판은 항상 위의 것이 아래의 것보다 작아야 한다.

이 작업을 수행하는데 필요한 이동 순서를 출력하는 프로그램을 작성하라. 단, 이동 횟수는 최소가 되어야 한다.

아래 그림은 원판이 5개인 경우의 예시이다.

![img](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/11729/hanoi.png)



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 3    | 7    |
|      | 1 3  |
|      | 1 2  |
|      | 3 2  |
|      | 1 3  |
|      | 2 1  |
|      | 2 3  |
|      | 1 3  |

- 입력
  - 원판의 수
- 출력
  - 최소 이동 횟수 / from & to 출력



## 코드

```python
# 하노이탑 문제

# 원판 1 => 원판 3

# 1개면 그냥 바로 (3)
# 2개면 (<2> 3 [3])
# 3개면 (<3 2 2> 3 [1 3 3])
# 4개면 <2 3 3 2 1 2 2> 3 [3 1 1 3 2 3 3]

# [1]
# 1 [1] 2
# 1 1 3 [1] 2 2 1
# 1 1 2 1 3 3 1 [1] 2 2 3 2 1 1 2
#   3->2, 2->3      1->2, 2->1

# obj
# 1
# 1 2 1
# 1 2 1 3 1 2 1
# 1 2 1 3 1 2 1 4 1 2 1 3 1 2 1

# 1) 2번에 n-1개를 먼저 쌓고 3번에 n개를 쌓는다
#     <   >                  [   ]
#     3->2, 2->3             1->2, 2->1
# 2) 3번에 n-2개를 먼저 쌓고 2번에 n-1개를 쌓는다

def count(n):
    if n == 1:
        return 1
    else:
        return 2*count(n-1) + 1

def num_shifter(l,case=1):
    result = []
    # case 1 : 3->2, 1->3, 2->1
    if case :
        for i in l:
            if i == 1:
                result.append(1)
            elif i == 2:
                result.append(3)
            else:
                result.append(2)
    
    # case 0 :1->2, 2->1
    else:
        for i in l:
            if i == 1:
                result.append(2)
            elif i == 2:
                result.append(1)
            else:
                result.append(3)
    return result

def hanoi_to(n):
    if n == 1:
        return [3]
    else:
        return num_shifter(hanoi_to(n-1)) + [3] + num_shifter(hanoi_to(n-1),0)

def hanoi_from(n):
    if n == 1:
        return [1]
    else:
        return num_shifter(hanoi_from(n-1)) + [1] + num_shifter(hanoi_from(n-1),0)

import sys

n = int(sys.stdin.readline())
c = count(n)
print(c)
result = [hanoi_from(n),hanoi_to(n)]
for i in range(c):
    print(result[0][i], result[1][i])
```



### 설명

- 하노이탑 문제의 핵심은, n층 탑을 옮기기 위한 과정은

- n-1층 탑을 한 번 옮기고, n번째 원판을 옮기고, 다시 n-1층 탑을 옮기는 것

  (재귀)

- 위의 규칙은 동일, 각 step마다 from, to, object만 바뀌므로
- 바뀌는 규칙을 찾아내고 이를 numshifter라는 함수로 만들어 냄
- 그리고 이를 이용해 from 함수와 to 함수를 생성
- 마지막으로 재귀적으로 갯수를 세는 count 함수 생성

=> count의 경우 전혀 쓸모없다고 생각될 정도로 재귀가 많다

​	(그냥 len으로 구할 수 있는 값)



> 이게 python3에서는 **시간 초과**
>
> pypy3에서는 **동작**



## 다른 사람의 코드

```python
def hanoi(n, a, b, c):
    stack = []
    res = ''
    while True:
        while n > 1:
            stack.append((n, a, b, c))
            n -= 1
            b, c = c, b
        res += a + ' ' + c + '\n'
        if stack:
            n, a, b, c = stack.pop()
            res += a + ' ' + c + '\n'
            n -= 1
            a, b = b, a
        else:
            break
    return res

n = int(input())
print(2 ** n - 1)
print(hanoi(n, '1', '2', '3'))
```

- 재귀 없이 stack을 활용해 푼 문제
- 중간 지점과 목표 지점인 b와 c를 번갈아가며 바꾼다
- stack이 있으면 같은 경로를 한 번 더 res에 더하고 a와 b를 바꿔준다

=> 패턴을 파악한 문제



```python
n = int(input())
def hanoi(n, a, b, c):
    if n == 1:
        print(a, c)
    else:
        hanoi(n - 1, a, c, b)
        print(a, c)
        hanoi(n - 1, b, a, c)
sum = 1
for i in range(n - 1):
    sum = sum * 2 + 1
print(sum)
hanoi(n, 1, 2, 3)
```

- 가장 간결하고 직관적으로 구성
- 나의 함수 구성과 동일하지만 이를 굉장히 압축시켰다.
- from 함수와 to 함수를 따로 분리하지 않았고
- numshifter 함수를 사용하지 않고 인자를 넘길 때 매개변수를 바꾸는 것으로 활용
- **속도와 메모리도 매우 훌륭!!!**



## 결론

더 간결히 표현하는 방법을 생각해보기
