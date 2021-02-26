# 백준 9663번

N-Queen

## 문제

N-Queen 문제는 크기가 N × N인 체스판 위에 퀸 N개를 서로 공격할 수 없게 놓는 문제이다.

N이 주어졌을 때, 퀸을 놓는 방법의 수를 구하는 프로그램을 작성하시오.



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 8    | 92   |

- 입력
  - N



## 코드

```python
import sys
input = sys.stdin.readline

N = int(input())

count = 0
queens = [[[0,i]] for i in range(N)]

while queens:
    queen = queens.pop()
    if len(queen) == N:
        count += 1
        continue
    
    for next in range(N):
        for r, c in queen:
            if next == c:
                break
            if abs(next-c) == len(queen)-r:
                break
        else:
            nqueen = queen + [[len(queen),next]]
            queens.append(nqueen)

print(count)
```



### 설명

- 좌표만 취한다.
  - 다음 row마다 가능한 column을 확인하고 추가

- 백트래킹의 로직에 부합하는 코드인데, 무조건 시간 초과가 난다.

  (파이썬3, pypy3 포함)



## 검색

파이썬의 한계로 파이썬을 사용하면 정석적인 방법으로는 무조건 시간초과가 난다.

효율성을 아주 높이면 pypy3로는 시간 내 가능하다고 한다.



도저히 답이 나오지 않고, 백트래킹 기법이 파이썬에 적합하지 않아 일반적으로는 통과 못한다는 내용을 보고 다른 코드를 참고했다.



두 좌표의 x, y 연산을 통해 대각선을 확인하는 건 알고 있었는데,

그 결과값을 저장할 생각을 못했었다.



다음은 매우 효율적으로 작성한 코드이다.



## 최종 코드

```python
import sys
input = sys.stdin.readline

N = int(input())

count = 0
queens = [[0,{i},{i},{i}] for i in range(N)] # row, column, 우하, 우상

while queens:
    queen = queens.pop()
    # print(queen)
    if queen[0]+1 == N:
        count += 1
        continue
    
    for next in range(N):
        if next not in queen[1] and next-(queen[0]+1) not in queen[2] and next+(queen[0]+1) not in queen[3]:
            queens.append([queen[0]+1, queen[1] | {next}, queen[2] | {next-queen[0]-1}, queen[3] | {next+queen[0]+1}]) # 우하 대각선은 x-y, 우상 대각선은 x+y와 같다.

print(count)
```



### 설명

이걸 처음 생각한 사람은 정말 천재다. (블로그 글들마다 천재라고 찬양한다.)

나의 경우 set을 이용하여 열(x), 우하(x-y), 우상(x+y)을 저장하는 방식을 사용했다.

이렇게 하면 for문을 한 번만 돌려도 확인할 수 있어서 코드가 매우 빨라진다.



(그렇다하더라도 `21980 ms`가 걸린다)
