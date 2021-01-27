# 백준 1780번

종이의 개수

https://www.acmicpc.net/problem/1780

## 문제

N×N크기의 행렬로 표현되는 종이가 있다. 종이의 각 칸에는 -1, 0, 1의 세 값 중 하나가 저장되어 있다. 우리는 이 행렬을 적절한 크기로 자르려고 하는데, 이때 다음의 규칙에 따라 자르려고 한다.

1. 만약 종이가 모두 같은 수로 되어 있다면 이 종이를 그대로 사용한다.
2. (1)이 아닌 경우에는 종이를 같은 크기의 9개의 종이로 자르고, 각각의 잘린 종이에 대해서 (1)의 과정을 반복한다.

이와 같이 종이를 잘랐을 때, -1로만 채워진 종이의 개수, 0으로만 채워진 종이의 개수, 1로만 채워진 종이의 개수를 구해내는 프로그램을 작성하시오.



## 입출력

| 입력                 | 출력 |
| -------------------- | ---- |
| 0 0 0 1 1 1 -1 -1 -1 | 10   |
| 0 0 0 1 1 1 -1 -1 -1 | 12   |
| 0 0 0 1 1 1 -1 -1 -1 | 11   |
| 1 1 1 0 0 0 0 0 0    |      |
| 1 1 1 0 0 0 0 0 0    |      |
| 1 1 1 0 0 0 0 0 0    |      |
| 0 1 -1 0 1 -1 0 1 -1 |      |
| 0 -1 1 0 1 -1 0 1 -1 |      |
| 0 1 -1 1 0 -1 0 1 -1 |      |

- 입력
  - 첫째 줄에 N(1 ≤ N ≤ 37, N은 3k 꼴)이 주어진다.
  - 다음 N개의 줄에는 N개의 정수로 행렬이 주어진다.
- 출력
  - 첫째 줄에 -1로만 채워진 종이의 개수를, 
  - 둘째 줄에 0으로만 채워진 종이의 개수를, 
  - 셋째 줄에 1로만 채워진 종이의 개수를 출력한다.



## 코드

```python
FAILED
```



### 설명

- 풀지 못함



## 다른 사람의 코드

```python
import sys

N = int(sys.stdin.readline())
matrix = []
result = [0] * 3 
for _ in range(N): 
    matrix.append(list(map(int, sys.stdin.readline().split()))) 
    
def check(start_x: int, start_y: int, n: int): 
    temp = matrix[start_x][start_y] 
    for i in range(n): 
        for j in range(n): 
            if temp != matrix[start_x + i][start_y + j]: 
                return False 
            
    return True 


def divide(start_x: int, start_y: int, n: int): 
    if check(start_x, start_y, n): 
        result[matrix[start_x][start_y] + 1] += 1 
    else: 
        for i in range(3): 
            for j in range(3): 
                divide(start_x + i* n//3, start_y + j* n//3, n//3)
                
        return 
    
divide(0, 0, N) 
for i in range(3): 
    print(result[i])
```

- check 함수와 divide 함수를 정의
- check 함수
  - 초기값 temp와 다른 숫자가 같은지 확인
- divide 함수
  - check 함수를 바탕으로 True이면 해당 숫자 +1
  - False이면 9조각으로 나누고 `재귀`
  - 이 때 return은 없다
    - 전역 변수 result에 값을 저장하기 때문 -> 함수의 return이 필요 X



## 또 다른 사람의 코드*

```python
import sys
from operator import add
ans = [0,0,0]
data = []
temp = 0
n = int(input())
for i in range(n):
    data.append([int(i) for i in sys.stdin.readline().rstrip().split()])
    
def lastpaper(x,y,size):
    global ans # 이건 빠져도 될 것 같다.
    tmpans = [0,0,0] # 이것도 빠져도 될 것 같다.
    init = data[x][y]
    sameflag = True # 이런 플래그 세우는 것도 본 받을만 하다.
    for i in range(size):
        for j in range(size):
            if data[x+i][y+j] != init:
                sameflag = False
                break
    
    return sameflag, init

def numpaper(size,x,y):
    global ans
    
    gflag, i = lastpaper(x,y,size)
    
    if gflag:
        ans[i+1] +=1
    else:
        for i in range(3):
            for j in range(3):
                numpaper(size//3, x+ i*(size//3), y+ j*(size//3))
                
numpaper(n,0,0)
print('{}\n{}\n{}'.format(ans[0],ans[1],ans[2]))
```

- lastpaper : x,y를 시작으로 size만큼 돌면서 같은 종이인지 판별
- numpaper : 재귀함수 / 모든 종이를 0,0에서 돌면서 lastpaper의 결과를 토대로,
  - 종이가 한 종류이면 ans에 1을 더함
  - 한 종류가 아니면 9조각으로 나누어 numpaper 재귀



## 교훈

**함수를 쓸 때는 전역변수를 잘 활용하자!**

> 코드를 짤 때 return 값을 하나만 둘 수 있으니 함수 간의 값 전달이 어려워 포기
>
> -> 전역 변수를 쓰면 함수 간 값 전달 가능

깔끔하고 간결한 위의 코딩을 본받자!
