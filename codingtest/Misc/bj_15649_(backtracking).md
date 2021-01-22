# 백준 15649번

백트래킹 문제

## 문제

자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

- 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 3 1  | 1    |
|      | 2    |
|      | 3    |

- 입력
  - 자연수 N과 M
- 출력
  - 오름차순으로 배열

| 입력 | 출력 |
| ---- | ---- |
| 4 2  | 1 2  |
|      | 1 3  |
|      | 1 4  |
|      | 2 1  |
|      | 2 3  |
|      | 2 4  |
|      | 3 1  |
|      | 3 2  |
|      | 3 4  |
|      | 4 1  |
|      | 4 2  |
|      | 4 3  |



| 입력 | 출력    |
| ---- | ------- |
| 4 4  | 1 2 3 4 |
|      | 1 2 4 3 |
|      | 1 3 2 4 |
|      | 1 3 4 2 |
|      | 1 4 2 3 |
|      | 1 4 3 2 |
|      | 2 1 3 4 |
|      | 2 1 4 3 |
|      | 2 3 1 4 |
|      | 2 3 4 1 |
|      | 2 4 1 3 |
|      | 2 4 3 1 |
|      | 3 1 4 2 |
|      | 3 2 1 4 |
|      | 3 2 4 1 |
|      | 4 1 2 3 |
|      | 4 1 3 2 |
|      | 4 2 1 3 |
|      | 4 2 3 1 |
|      | 4 3 1 2 |
|      | 4 3 2 1 |



## 백트래킹 알고리즘

조건을 탐색하며 전체 경우의 수 확인

![image-20210123023139179](bj_15649_(backtracking).assets/image-20210123023139179.png)

- 매 노드마다 조건을 확인
- 조건에 맞지 않으면 해당 노드의 하위 노드는 방문 X
- 최하단 노드에 도착한 값들만 return



## 코드

```python
import sys
N, M = map(int,sys.stdin.readline().split())
n = [i for i in range(1,N+1)]


def backtrack(n,k,result=[]): # n은 배열 / k는 level
    if not k:
        print(' '.join(result)) # 공백을 만들면서 list 안의 str 이어 붙이기

    for i in n:
        # print(i,n)
        nn = list(n)
        result1 = result + [str(i)]
        nn.remove(i)
        backtrack(nn,k-1,result1)


backtrack(n,M)
```



### 설명

- 재귀 함수 사용
- 최하단 레벨 도달 시, print()
- for문 안에서 값을 순서대로 list안에 넣고, 넣은 값을 뺀 채로 재귀



## 다른 사람의 코드

```python
# Baekjoon15649_NandM1.py
from itertools import permutations

N, M = map( int, input().split() )
nums = [ str(x) for x in range( 1, N + 1 ) ]

print( '\n'.join( [ ' '.join( perm ) for perm in permutations( nums, M ) ] ) )

```

- `permutations` 이용
  - `permutations`로 만든 순열 `perm`을 한 칸 띄우고
  - 이렇게 만들어진 `perm`들을 한 줄 씩 띄운 string을 만들고
  - 통째로 출력

### Permutation (순열)

- `from interpools import permutations`로 불러오기 가능

- `permutations(array,num)`를 사용하면 array 안의 요소들을 num 개 만큼 꺼내서 순열을 만든다.

  - (array)P(num) 과 같은 형태

  - 결과값은 `string`이 담긴 `tuple`이 들어있는 `list` 형태
    - `[('a', 'b'), ('b', 'a')]`



- 결론 적으로 위의 문제를 그대로 표현한 함수
