# 백준 10989번

수 정렬 문제 / 메모리가 굉장히 낮을 때

https://www.acmicpc.net/problem/10989

## 문제

N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 10   | 1    |
| 5    | 1    |
| 2    | 2    |
| 3    | 2    |
| 1    | 3    |
| 4    | 3    |
| 2    | 4    |
| 3    | 5    |
| 5    | 5    |
| 1    | 7    |
| 7    |      |

숫자 갯수(N), 숫자

N(1 ≤ N ≤ 10,000,000)

숫자는 10,000보다 같거나 작은 자연수



## 코드

```python
import sys
input = sys.stdin.readline

N = int(input())

num_list = [0] *  10001
for i in range(N):
    num_list[int(input())] += 1

for n in range(1,10001):
    while num_list[n]:
        print(n)
        num_list[n] -= 1
```



## 설명

- Counting Sort 사용



### 주의사항

메모리가 매우 적기 때문에, 최소한의 메모리를 사용하는 방법을 적용해야 함



## 다른 사람의 코드

```python
import sys
n = int(sys.stdin.readline())
b = [0] * 10001
for i in range(n):
    b[int(sys.stdin.readline())] += 1
for i in range(10001):
    if b[i] != 0:
        for j in range(b[i]):
            print(i)
```

- 기존의 sorting 기법을 쓰면 무조건 메모리 초과가 남
- import 대신 stdin을 사용하여 최대한 효율적으로 동작하도록 코딩



- 문제의 핵심은 10001 크기의 배열을 미리 생성하고 그 외에는 값을 저장하지 않는 것
