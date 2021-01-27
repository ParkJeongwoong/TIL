# 백준 11728번

배열 합치기

## 문제

정렬되어있는 두 배열 A와 B를 합친 다음 정렬해서 출력



## 입출력

| 입력  | 출력    |
| ----- | ------- |
| 4 5 1 | 1 2 4 3 |
| 1 2   | 1 2 3 4 |
| 1 3   |         |
| 1 4   |         |
| 2 4   |         |
| 3 4   |         |

- 입력
  - 첫 번째 줄 : 두 배열 A, B의 크기 (1이상)
  - 이후 : 배열 A와 B의 내용

| 입력 | 출력    |
| ---- | ------- |
| 2 2  | 2 3 5 9 |
| 3 5  |         |
| 2 9  |         |

| 입력 | 출력  |
| ---- | ----- |
| 2 1  | 1 4 7 |
| 4 7  |       |
| 1    |       |

| 입력    | 출력          |
| ------- | ------------- |
| 4 3     | 1 2 3 4 5 7 9 |
| 2 3 5 9 |               |
| 1 4 7   |               |



## 코드

```python
import sys

Al, Bl = map(int,sys.stdin.readline().split())

A = list(map(int,sys.stdin.readline().split()))
B = list(map(int,sys.stdin.readline().split()))
result = []

while A and B:
    if A[0] > B[0]:
        result.append(B.pop(0))
    else :
        result.append(A.pop(0))

result.extend(A)
result.extend(B)

print(' '.join(map(str,result)))
```



### 설명

- 두 배열의 크기 값은 그냥 버리고
- 두 배열의 첫 번째 요소 중 작은 것을 list에 넣는다.
- 둘 중 하나를 다 넣으면 남은 걸 싹 다 뒤에 붙이고 출력



> 근데 이게 시간 초과가 난다.
>
> 왜 일까?



## 다른 사람의 코드

```python
import sys

a, b = map(int, sys.stdin.readline().split())
a_list = list(map(int, sys.stdin.readline().split()))
b_list = list(map(int, sys.stdin.readline().split()))
answer_list = a_list + b_list
answer = ' '.join(map(str, sorted(answer_list)))
print(answer)
```

- 역시 크기 부분은 버리고
- A와 B를 합치고 `sorted`



## 결론

여러 코드를 비교해보니,

time out을 안 당하려면 합치고 sorting을 시켜야 한다.
