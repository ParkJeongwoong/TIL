# 백준 2751번

수 정렬

## 문제

N개의 수가 주어졌을 때, 이를 오름차순으로 정렬

첫 번째 수는 수의 갯수

이후 부터는 정렬해야 할 숫자



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 5    |      |
| 5    | 1    |
| 4    | 2    |
| 3    | 3    |
| 2    | 4    |
| 1    | 5    |



## 코드

```python
def merge_sort(array):
    # 1에서 분할이 멈춤
    if len(array) <= 1:
        return array
    
    # 분할 
    half = len(array)//2
    # 재귀함수 필요 (끝까지 분할을 위해서)
    left = merge_sort(array[:half])
    right = merge_sort(array[half:])

    # 병합
    i, j = 0, 0
    result = []

    while i < len(left) and j < len(right):
        if left[i] > right[j]:
            result.append(right[j])
            j += 1
        else :
            result.append(left[i])
            i += 1

    # 둘 중 남는 List 값 뒤에 이어 붙이기
    if len(left) > i:
        result += left[i:]
    if len(right) > j:
        result += right[j:]

    # print(result)
    return result


# 연산
N = int(input())
array = []

for i in range(N):
    array.append(int(input()))

array = merge_sort(array)    

for i in range(N):    
    print(array[i])
```



## 설명

- 병합 정렬 기법 사용
- 리스트의 크기가 1이 될 때까지 반으로 분할시킨다
- 이후 하나씩 정렬하면서 병합
  - 이 때 병합하려는 두 리스트는 이미 정렬이 되어 있음



## 다른 방법

### sys.stdin 활용

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
        if left[i] > right[j]:
            result.append(right[j])
            j += 1
        else :
            result.append(left[i])
            i += 1

    if len(left) > i:
        result += left[i:]
    if len(right) > j:
        result += right[j:]

    return result


# 연산
N = int(sys.stdin.readline())
array = []

for i in range(N):
    array.append(int(sys.stdin.readline()))

array = merge_sort(array)    

for i in range(N):    
    print(array[i])
```

- `sys 모듈`이 기본적으로 `input`보다 빠름



### 동작 결과

기존 `2232 ms` 에서 `1420 ms` 로 `800ms` 이상 빨라짐

(메모리 사용량도 조금 줄어듬)



## 내장함수 이용

이 문제는 정렬 문제이기 때문에 파이썬에 내장된 기본 정렬함수를 사용하지 않았다.

하지만 실제 개발환경에서는 내장함수가 훨씬 빠르다. (2배 정도)



### `sort()` VS `sorted()`

#### sort()

- 리스트의 메소드
- 해당 리스트 자체를 변경

```python
myList = [3,2,1]
myList.sort() # myList = [1,2,3] 으로 변환
```



#### sorted()

- iterable 객체로부터 정렬된 리스트를 생성하는 내장함수
  - 꼭 자료형이 리스트가 아니어도 사용 가능
- 새로운 리스트 반환
- 일반적으로 sorted() 내장함수가 sort() 메소드보다 편리함

```python
sorted([3,1,2]) # [1,2,3] 이라는 새로운 리스트 반환
```

