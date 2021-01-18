# 백준 10814번

나이순 정렬

## 문제

1) 나이가 증가하는 순

2) 나이가 같으면 먼저 기입한 순



## 입출력

| 입력        | 출력        |
| ----------- | ----------- |
| 3           |             |
| 21 Junkyu   | 20 Sunyoung |
| 21 Dohyun   | 21 Junkyu   |
| 20 Sunyoung | 21 Dohyun   |

첫째 줄은 사람 수 N, 그 다음부터는 나이와 이름



## 코드

```python
import sys

def merge_sort(array):
    if len(array) <= 1:
        return array
    
    
    half = len(array)//2
    left = merge_sort(array[:half])
    right = merge_sort(array[half:])

    i, j = 0, 0
    result = []

    while i < len(left) and j < len(right):
        if left[i][0] > right[j][0]:
            result.append(right[j])
            j += 1
        elif left[i][0] < right[j][0]:
            result.append(left[i])
            i += 1
        else :
            if left[i][2] > right[j][2]:
                result.append(right[j])
                j += 1
            elif left[i][2] <= right[j][2]:
                result.append(left[i])
                i += 1

    if len(left) > i:
        result += left[i:]
    elif len(right) > j: # 굳이 if를 2개 줄 필요 x
        result += right[j:]

    return result

# 연산
N = int(sys.stdin.readline())
array = []

for i in range(N):
    x, y = sys.stdin.readline().split() # stdin 사용
    array.append([int(x),y,i]) # 여기서 int를 안 줘서 틀림

array = merge_sort(array)    

for i in range(N):    
    print(f'{array[i][0]} {array[i][1]}')
```



## 설명

- 병합 정렬 기법 사용
- 조금 더 다듬을 방법을 생각해보자



### 주의사항

자료형에 주의

- 이거 나이를 int 형이 아니라 str 으로 놓고 풀었다가 한참 동안 결과값은 정상인데 틀린 이유를 못 찾았었음



## 다른 방법

### lambda 활용

```python
member_num = int(input())
member_list = []

for _ in range(member_num):
    member_age, member_name = map(str, input().split())
    member_age = int(member_age)
    member_list.append((member_age, member_name))

#나이 숫자 정렬 > 가입순 정렬
member_list.sort(key = lambda member: (member[0]))

for member in member_list:
    print(member[0], member[1])

```

- `sys.stdin`을 쓰면 조금 더 빨라질듯
- 여기도 sort 사용
- lambda 함수를 이용
  - lambda는 단순히 나이를 우선으로 하라는 의미로 사용
  - 가입순 부분은 파이썬 내장함수의 정렬이 안정 정렬을 수행하기 때문에 기존의 index 대로 정렬되는 걸 사용


#### `lambda`

<u>함수를 간단하게</u> 만들어 주는 일회용 `익명함수`

사용법 : `lambda 인자 : 표현식`

[예제]

```python
(lambda x, y : x + y)(10,20)
#위의 함수의 의미는 아래와 같다
x = 10
y = 20
return x + y
```

그리고 `labmda`는 map()과 같은 다른 함수와 함께 쓰일 때 효과가 좋다

- `map()`
  - `r = map(fucntion, iterable)` 인 map 함수의 function 부분을 lambda로 간단히 표현 가능

```python
list(map(lambda x, y : x + y, a, b))
```

- `sorted()`
  - `sorted()` 함수의 key인자 지정 가능

```python
a = [(1, 2), (0, 1), (5, 1), (5, 2), (3, 0)]

# 인자없이 그냥 sorted()만 쓰면, 리스트 아이템의 각 요소 순서대로 정렬을 한다.
b = sorted(a)
# b = [(0, 1), (1, 2), (3, 0), (5, 1), (5, 2)]

# key 인자에 함수를 넘겨주면 해당 함수의 반환값을 비교하여 순서대로 정렬한다.
c = sorted(a, key = lambda x : x[0])
# c = [(0, 1), (1, 2), (3, 0), (5, 1), (5, 2)]
d = sorted(a, key = lambda x : x[1])
# d = [(3, 0), (0, 1), (5, 1), (1, 2), (5, 2)]

# 아이템 첫 번째 인자를 기준으로 오름차순으로 먼저 정렬하고,
# 그리고 그 안에서 다음 두 번째 인자를 기준으로 내림차순으로 정렬하게 하려면, 다음과 같이 할 수 있다.
e = [(1, 3), (0, 3), (1, 4), (1, 5), (0, 1), (2, 4)]
f = sorted(e, key = lambda x : (x[0], -x[1]))
# f = [(0, 3), (0, 1), (1, 5), (1, 4), (1, 3), (2, 4)]
```

