trie, binary search(lower_bound) / 새그먼트 트리

![image-20210304135155485](https://user-images.githubusercontent.com/77447841/110245410-50184a80-7fa6-11eb-9602-697f1365f2ae.png)

# Array

| 인덱스 - 데이터                                      |
| ---------------------------------------------------- |
| (파이썬의 리스트)                                    |
| 같은 종류의 데이터를 효율적으로 관리                 |
| 순차적으로 저장                                      |
| 장점 : 인덱스로 인한 빠른 접근                       |
| 단점 : 배열의 크기를 미리 할당(데이터 추가의 어려움) |
| & 데이터 삭제 시 뒤의 데이터가 앞으로 이동           |



# String





# Stack





# Queue





# List









## 연결 리스트





# Tree

## 개념

- 비선형 구조
  - 1:n의 관계를 가지는 자료구조
  - 계층관계
- 사이클이 없는 **무향 연결 그래프**

---

- 최상위 노드(Root)가 존재
- 최상위 노드 아래의 하위 노드들 역시 각각의 subtree이다

---

**level** : 0(root)에서 시작 -> 층수

**degree** : 노드에 연결된 자식의 수



## 이진 트리

모든 노드가 2개의 서브트리를 갖는 트리

<u>left child node</u>와 <u>right child node</u>로 나뉨



### 구현

#### 배열을 이용한 구현

부모 노드의 번호를 `n`이라고 했을 때, 

자식 노드의 번호를 `2*n`과 `2*n+1`로 선택하는 방식으로 구현(root를 1이라고 가정)

#### 연결리스트를 이용한 구현

`[왼쪽 자식 | key | 오른쪽 자식]` 형태로 구현

- 모든 원소는 **<u>서로 다른 유일한 키</u>**를 갖는다.
  - 따라서 <u>삽입 시 해당 값이 이미 트리에 있으면 삽입 불가</u>
- 왼쪽 자식은 key보다 작은 값, 오른쪽 자식은 key보다 큰 값



### 완전 이진 트리

그래프 상 왼쪽부터 채워진 이진 트리 (`heap` 가능)

#### heap

**`최고값, 최소값을 구하는 자료구조`**

- `삽입` : 완전 이진 트리의 마지막 index에 삽입 -> 부모와 비교

- `삭제` : 루트노드 삭제 -> 마지막 노드 위치를 루트 노드로 -> 자식과 비교	





### 이진 트리 - 순회(traversal)

순회는 각 노드를 <u>중복되지 않게 전부 방문하는 것</u> -> 비선형 구조인 트리는 특별한 방법 필요



- 기본적인 순회방법
  - **전위 순회** : `부모 노드 - 왼쪽 자식 - 오른쪽 자식` 방문
  - **중위 순회** : `왼쪽 자식 - 부모 노드 - 오른쪽 자식` 방문
  - **후위 순회** : `왼쪽 자식 - 오른쪽 자식 - 부모 노드` 방문



# Set





# Hash

| 해쉬 테이블  (Hash Table)                                 |
| --------------------------------------------------------- |
| 키 - 데이터                                               |
| (파이썬의 딕셔너리)                                       |
| 키 -> [해쉬 함수] -> 해쉬 주소                            |
| 장점 : 저장/읽기 속도가 빠름                              |
| & 키에 대한 데이터 확인이 쉬움                            |
| 단점 : 저장 공간이 많이 필요                              |
| 해쉬 주소 충돌을 해결하기 위한 별도의 자료구조 필요       |
| 용도 : 검색이 많이 필요한 경우 / 저장, 삭제가 빈번한 경우 |
| 캐쉬를 구현하는 경우                                      |



# Sorting

| 알고리즘       | 평균     | 최악 | 메모리 | 안정성 |
| -------------- | -------- | ---- | ------ | ------ |
| Bubble Sort    | n^2      | n^2  | 1      | Y      |
| Selection Sort | n^2      | n^2  | 1      | N      |
| Insert Sort    | n^2      | n^2  | 1      | Y      |
| Shell Sort     | n^1.5    | n^2  | 1      | N      |
| Merge Sort     | nlog2(n) | n^2  | n      | Y      |
| Quick Sort     | nlog2(n) | n^2  | 1      | N      |
| Counting Sort  | n        | n    | n+m    | Y      |
| Heap Sort      | nlog2(n) | n^2  | 1      | N      |



## 버블 정렬

인접한 두 원소를 비교하며 자리를 **교환**

가장 큰 원소부터 마지막 위치에 정렬됨



## 선택 정렬



## 삽입 정렬



## 셀 정렬





## 퀵 정렬

### 구현

```python
def quick(array):
    def sort(left,right):
        if left >= right:
            return

        mid = partition(left,right) # array 정렬 & mid 찾기

        sort(left,mid-1)
        sort(mid,right)


    def partition(left,right): # 정렬을 하면서 정렬 종료 지점 반환
        pivot = array[(left+right)//2]
        while left <= right:
            while array[left] < pivot:
                left += 1
            while array[right] > pivot:
                right -= 1
            
            if left <= right:
                array[left], array[right] = array[right], array[left]
                left += 1
                right -= 1
        return left

    return sort(0, len(array) - 1)

# 실행
import sys
input = sys.stdin.readline

N = int(input())
nums = []
for i in range(N):
    nums.append(int(input()))

quick(nums)

for i in nums:
    print(i)
```



## 병합 정렬

### 구현

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
```





## 카운팅 정렬

> O(n) 시간 안에 정렬이 가능한 매우 빠른 정렬



1. 정렬할 리스트 l과 l의 요소를 모두 포함할 최대값 k가 필요
2. 크기가 k+1인 count list 생성
3. 리스트 l의 요소의 갯수를 count에 저장
4. count list의 요소를 누적 요소로 변경 (앞 요소들의 값의 합 + 자신의 값) => indexing을 위해 (count가 0이었던 값들은 어짜피 사용 X)
5. 결과 값을 위한 list 생성
6. **l의 요소를 뒤에서부터 꺼내, 이를 idx로 삼아 count 요소의 값 -1**
   - 안정 정렬을 위해 뒤에서 부터 배치
7. -1한 값을 다시 idx로 삼아 result list에 l의 요소 저장



### 구현

```python
def counting(l, k):
    if len(l) < 2:
        return l

    count = [0] * (k + 1)
    for i in l:
        count[i] += 1

    for i in range(1, len(count)):
        count[i] += count[i - 1]

    result = [0] * len(l)
    for i in range(len(l)):
        count[l[-1 - i]] -= 1
        result[count[l[-1 - i]]] = l[-1 - i]
    return result
```





## 힙 정렬

### 구현

```python
class heap: # Maxheap
    def __init__(self):
        self.queue = []

    # 삽입
    def push(self,n): # 값 추가
        self.queue.append(n)
        idx = len(self.queue)-1
        while idx:
            if self.queue[idx] > self.queue[(idx-1)//2]:
                self.queue[idx], self.queue[(idx-1)//2] = self.queue[(idx-1)//2], self.queue[idx]
                idx = (idx-1)//2
            else:
                break

    # 반환
    def pop(self): # root값 반환 // 이후 맨 마지막 값을 root에 넣고 재정렬
        if len(self.queue) == 0: # 큐가 비어있을 때
            return 0

        self.queue[0], self.queue[-1] = self.queue[-1], self.queue[0]
        p = self.queue.pop()
        self.heapify()
        return p

	# 정렬
    def heapify(self): # 재정렬
        idx = 0
        while 2*idx + 1 < len(self.queue): # 적어도 왼쪽이랑은 비교할 수 았어야 가치가 있다.
            if 2*idx + 2 < len(self.queue) and (self.queue[idx] < self.queue[2*idx + 2] or self.queue[idx] < self.queue[2*idx + 1]): # 양쪽 비교 가능 & 둘 중 하나가 더 큼
                if self.queue[2*idx + 2] > self.queue[2*idx + 1]:
                    self.queue[idx], self.queue[2*idx + 2] = self.queue[2*idx + 2], self.queue[idx]
                    idx = 2*idx + 2
                else:
                    self.queue[idx], self.queue[2*idx + 1] = self.queue[2*idx + 1], self.queue[idx]
                    idx = 2*idx + 1
            elif self.queue[idx] < self.queue[2*idx + 1]: # 왼쪽 자식만 비교
                self.queue[idx], self.queue[2*idx + 1] = self.queue[2*idx + 1], self.queue[idx]
                idx = 2*idx + 1
            else:
                break
        # 근데 만약 왼쪽부터 바꿔버렸는데, 오른쪽 자식이 더 컸다면?
        if len(self.queue) > 2 and self.queue[0] < self.queue[2]:
            self.heapify()

	# 출력
    def show(self):
        print(self.queue)
```



# Searching

## 선형 탐색



## 이진 탐색 (Binary Search)

> 정렬된 자료에 사용 가능

https://velog.io/@keum0821/%EC%9D%B4%EC%A7%84-%ED%83%90%EC%83%89-%ED%8A%B8%EB%A6%ACBinary-Search-Tree-%EA%B5%AC%ED%98%84-%EC%82%AD%EC%A0%9C

- 탐색

1. 중앙값을 선택
2. 목표값과 비교
3. 목표값과 일치하면 탐색 종료
4. 목표값이 더 작으면 왼쪽 자료에 대해 탐색, 더 크면 오른쪽 자료에 대해 탐색
5. 위의 과정 반복

- 삼입

1. 루트 노드부터 아래로 탐색 수행
2. 탐색 실패 위치에 원소 삽입

- 삭제
  - 자식 노드가 0
    1. 그냥 삭제
  - 자식 노드가 1
    1. 원소 삭제
    2. 자손 노드를 하나씩 위로
  - 자식 노드가 2
    1. 원소 삭제
    2. <u>왼쪽 서브 트리의 가장 오른쪽 자손 노드와 교체</u> or <u>오른쪽 서브 트리의 가장 왼쪽 자손 노드와 교체</u>



# Recursion

함수 내부에서 직간접적으로 자기자신을 호출하는 행위

- 반복에 비해 코드가 간결, 이해가 쉬움
- 메모리 구조에서 스택을 사용
- 재귀 호출은 메모리, 속도 저하 발생

## 반복 VS 재귀

|                | 재귀                      | 반복                |
| -------------- | ------------------------- | ------------------- |
| 종료           | base case(호출 종료) 조건 | 반복문의 종료 조건  |
| 수행 시간      | 느림                      | 빠름                |
| 메모리 공간    | 많이 사용                 | 적게 사용           |
| 소스 코드 길이 | 짧다                      | 길다                |
| 소스 코드 형태 | if-else                   | for, while          |
| 무한 반복시    | 스택 오버플로우           | CPU를 반복해서 점유 |







# Graph

## 그래프 유형

- 무향 그래프
- 유향 그래프
- 가중치 그래프(weighted gragh)
- 사이클이 없는 방향 그래프(Directed Acyclic Graph)



- 완전 그래프 : 모든 정점이 모든 정점과 이어진 간선을 가진 그래프



- 그래프의 표현
  - 인접 행렬 : V x V의 2차원 배열
    - 장점 : 쉬운 구현, 두 노드의 연결을 확인할 때 O(1) 소요
    - 단점 : 특정 노드에 연결된 노드를 확인하려면 O(V) 소요
  - 인접 리스트 : 각 정점마다 간선 정보를 저장
    - 장점 : 적은 메모리 사용, 간선 파악에 간선 개수만큼만 시간 소요
    - 단점 : 두 노드의 연결을 확인하려면 O(V) 소요



## 그래프 순회

> 모든 정점을 탐색

### DFS & BFS

- DFS : stack, 재귀를 사용

- BFS : queue를 사용



## 상호배타 집합 자료구조 (Disjoint-sets)

> 서로소 집합
>
> 중복이 없는 집합들 (교집합이 공집합)

### 표현 방법

- 연결 리스트 : representative로 시작, tail로 끝남
- 트리 : representative(루트 노드) 아래의 자식 노드로 구성

### 연산

- `Make-Set(x)`
- `Find-Set(x)` - return representative

- `Union(x, y)`

### Rank / Path compression

- 두 집합을 더할 땐 작은 집합을 큰 집합의 높이 위치에 더한다(`rank`)
- find-set 과정에서 만나는 모든 원소를 root에 연결한다(`path compression`)



## 최소 신장 트리 (Minimum Spanning Tree)

> 탐욕 기법 이용
>
> 최소 비용의 경로를 찾는 문제 (가중치의 합이 최소)

- 신장 트리
  - `n개의 정점`과 `n-1개의 간선`으로 이루어진 `무향 그래프`





## 두 정점 사이의 최단 경로







# Exhaustive Search

가능한 모든 경우의 수를 나열 -> 확인하는 기법

- 완전 탐색, Brute-force라고 불리기도 한다



# Greedy

최적의 해를 구하는 근시안적인 방법

그 순간의 최적을 선택하는 방식

- <u>해당 탐욕 기법이 최적해로 가는 경로인지 증명이 필요</u>



## 탐욕 기법 vs 동적 계획법

| 탐욕 기법   | 동적 계획법 |
| ----------- | ----------- |
| Top-down    | Bottom-up   |
| 빠르고 간결 | 느리고 복잡 |



## 활동 선택 문제 (Activity-Selection problem)

시작시간과 종료시간이 있는 n개의 활동들의 집합에서, 겹치지 않는 최대 갯수를 구하는 문제

```
1. 종료 시간 순으로 정렬

2. 종료 시간이 가장 빠른 활동을 선택

3. 이후 선택한 활동 이후에 종료 시간이 가장 빠른 활동을 선택을 반복
```



## 탐욕 기법의 알고리즘

- `Prim` : **최소 신장 트리 탐색** - 서브 트리를 확장하면서 탐색
- `Kruskal` : **최소 신장 트리 탐색** - Cycle이 없는 서브 그래프를 확장하면서 탐색
- `Dijkstra` : **최단 경로 탐색** - 가장 가까운 인접 정점을 찾는 방식
- `Huffman tree & code` : **압축** - 빈도가 낮은 문자부터 이진 트리를 만들어 코드값 부여







# Divide and Conquer

`Divide - Conquer - Combine`

Divide : 문제를 여러 개의 부분으로 나눔

Conquer : 작은 부분 문제를 해결

Combine : 해결된 해답을 모은다 `(선택)`



# Backtacking

# Array

| 인덱스 - 데이터                                      |
| ---------------------------------------------------- |
| (파이썬의 리스트)                                    |
| 같은 종류의 데이터를 효율적으로 관리                 |
| 순차적으로 저장                                      |
| 장점 : 인덱스로 인한 빠른 접근                       |
| 단점 : 배열의 크기를 미리 할당(데이터 추가의 어려움) |
| & 데이터 삭제 시 뒤의 데이터가 앞으로 이동           |



# String





# Stack





# Queue

선형 큐, 원형 큐, 연결 큐

- 큐의 활용
  - 버퍼



# List









## 연결 리스트

다음 리스트의 주소를 저장한 리스트 / idx 조정에 따른 손실이 없다





# Tree

## 개념

- 비선형 구조
  - 1:n의 관계를 가지는 자료구조
  - 계층관계
- 사이클이 없는 **무향 연결 그래프**

---

- 최상위 노드(Root)가 존재
- 최상위 노드 아래의 하위 노드들 역시 각각의 subtree이다

---

**level** : 0(root)에서 시작 -> 층수

**degree** : 노드에 연결된 자식의 수



## 이진 트리

모든 노드가 2개의 서브트리를 갖는 트리

<u>left child node</u>와 <u>right child node</u>로 나뉨



### 구현

#### 배열을 이용한 구현

부모 노드의 번호를 `n`이라고 했을 때, 

자식 노드의 번호를 `2*n`과 `2*n+1`로 선택하는 방식으로 구현(root를 1이라고 가정)

#### 연결리스트를 이용한 구현

배열을 이용한 방식보다 더 효율적(메모리 관리, 삭제 및 수정에 있어서 더 효율적)

`[왼쪽 자식 | key | 오른쪽 자식]` 형태로 구현

- 모든 원소는 **<u>서로 다른 유일한 키</u>**를 갖는다.
  - 따라서 <u>삽입 시 해당 값이 이미 트리에 있으면 삽입 불가</u>
- 왼쪽 자식은 key보다 작은 값, 오른쪽 자식은 key보다 큰 값



### 완전 이진 트리

그래프 상 왼쪽부터 채워진 이진 트리 (`heap` 가능)

#### heap

**`최고값, 최소값을 구하는 자료구조`**

- `삽입` : 완전 이진 트리의 마지막 index에 삽입 -> 부모와 비교

- `삭제` : 루트노드 삭제 -> 마지막 노드 위치를 루트 노드로 -> 자식과 비교	





### 이진 트리 - 순회(traversal)

순회는 각 노드를 <u>중복되지 않게 전부 방문하는 것</u> -> 비선형 구조인 트리는 특별한 방법 필요



- 기본적인 순회방법
  - **전위 순회** : `부모 노드 - 왼쪽 자식 - 오른쪽 자식` 방문
  - **중위 순회** : `왼쪽 자식 - 부모 노드 - 오른쪽 자식` 방문
  - **후위 순회** : `왼쪽 자식 - 오른쪽 자식 - 부모 노드` 방문



# Set





# Hash

| 해쉬 테이블  (Hash Table)                                 |
| --------------------------------------------------------- |
| 키 - 데이터                                               |
| (파이썬의 딕셔너리)                                       |
| 키 -> [해쉬 함수] -> 해쉬 주소                            |
| 장점 : 저장/읽기 속도가 빠름                              |
| & 키에 대한 데이터 확인이 쉬움                            |
| 단점 : 저장 공간이 많이 필요                              |
| 해쉬 주소 충돌을 해결하기 위한 별도의 자료구조 필요       |
| 용도 : 검색이 많이 필요한 경우 / 저장, 삭제가 빈번한 경우 |
| 캐쉬를 구현하는 경우                                      |

## Hashing

특정 항목을 검색하고자 할 때, `탐색키`를 이용하여 산술 연산을 통해 키의 위치를 계산하는 방법

- 해시 함수
  - `탐색키` -> `위치` 변환 함수
- 해시 테이블
  - 변환된 주소의 위치에 값을 저장한 표

### 충돌

> 서로 다른 탐색키가 동일한 주소를 가르킬 경우

- **해결방법**
  1. 개방 주소법 (Open Addressing)
  2. 체이닝 (Chaining)



1. 체이닝

   - 하나의 버킷에 하나 이상의 키 값을 가지는 자료를 저장
   - **연결 리스트** 활용

   

2. 개방 주소법

   - 충돌이 발생하면 다음 공간에 빈 공간이 있는지 조사
     - 빈 공간이 있으면 해당 공간에 항목 저장
     - 빈 공간이 없으면 나올 때까지 탐색 반복





# Trie

> 문자열 집합을 표현하는 트리

- `간선` : 하나의 **문자**에 대응 (중복 X)

- `리프` : **문자열**



- 사전 순서대로 자식 노드 배열

## Suffix Tree

> 하나의 문자열의 모든 접미어를 포함하는 Trie

- 문자열의 끝에 `$`를 추가해서 종료를 표현





# Sorting

| 알고리즘       | 평균     | 최악 | 메모리 | 안정성 |
| -------------- | -------- | ---- | ------ | ------ |
| Bubble Sort    | n^2      | n^2  | 1      | Y      |
| Selection Sort | n^2      | n^2  | 1      | N      |
| Insert Sort    | n^2      | n^2  | 1      | Y      |
| Shell Sort     | n^1.5    | n^2  | 1      | N      |
| Merge Sort     | nlog2(n) | n^2  | n      | Y      |
| Quick Sort     | nlog2(n) | n^2  | 1      | N      |
| Counting Sort  | n        | n    | n+m    | Y      |
| Heap Sort      | nlog2(n) | n^2  | 1      | N      |



## 버블 정렬

> 맨 뒤부터 정렬

인접한 두 원소를 비교하며 자리를 **교환**

가장 큰 원소부터 마지막 위치에 정렬됨



## 선택 정렬

> 맨 앞부터 정렬

최소값 탐색 => 맨 앞과 교체

반복



## 삽입 정렬

인덱스에서 숫자를 뽑아서, 인덱스 앞 쪽의 정렬된 부분에서 들어갈 위치를 찾아서 정렬

- 배열이 작거나, 정렬이 많이 된 경우에는 상당히 빠른 정렬 (탐색에만 시간을 쓰기 때문)



## 셀 정렬

> 삽입 정렬을 보완한 알고리즘

https://gmlwjd9405.github.io/2018/05/08/algorithm-shell-sort.html



## 퀵 정렬

>  https://ldgeao99.tistory.com/376

### 구현

```python
def quick(array):
    def sort(left,right):
        if left >= right:
            return

        mid = partition(left,right) # array 정렬 & mid 찾기

        sort(left,mid-1)
        sort(mid,right)


    def partition(left,right): # 정렬을 하면서 정렬 종료 지점 반환
        pivot = array[(left+right)//2]
        while left <= right:
            while array[left] < pivot:
                left += 1
            while array[right] > pivot:
                right -= 1
            
            if left <= right:
                array[left], array[right] = array[right], array[left]
                left += 1
                right -= 1
        return left

    return sort(0, len(array) - 1)

# 실행
import sys
input = sys.stdin.readline

N = int(input())
nums = []
for i in range(N):
    nums.append(int(input()))

quick(nums)

for i in nums:
    print(i)
```



## 병합 정렬

### 구현

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
```



```python
def merge_sort(array):
    def divied(l,r):
        if l >= r:
            return

        mid = (l+r)//2

        divied(l,mid)
        divied(mid+1,r)
        merge(l,r,mid)

    def merge(l,r,mid):
        i = l
        j = mid+1
        k = 0
        temp = [0] * (r-l+1)

        while i < mid+1 and j < r+1:
            if array[i] <= array[j]:
                temp[k] = array[i]
                i += 1
            else:
                temp[k] = array[j]
                j += 1
            k += 1

        while i < mid+1:
            temp[k] = array[i]
            i += 1
            k += 1
        while j < r+1:
            temp[k] = array[j]
            j += 1
            k += 1

        for i in range(r-l+1):
            array[i+l] = temp[i]
            
    return divied(0,len(array)-1)

a = [3,5,10,2,1,7,3,4,6,5]
merge_sort(a)
print(a)
```



```python
def merge_sort(arr):
    def sort(low, high):
        if high - low < 2:
            return
        mid = (low + high) // 2
        sort(low, mid)
        sort(mid, high)
        merge(low, mid, high)

    def merge(low, mid, high):
        temp = []
        l, h = low, mid

        while l < mid and h < high:
            if arr[l] < arr[h]:
                temp.append(arr[l])
                l += 1
            else:
                temp.append(arr[h])
                h += 1

        while l < mid:
            temp.append(arr[l])
            l += 1
        while h < high:
            temp.append(arr[h])
            h += 1

        for i in range(low, high):
            arr[i] = temp[i - low]

    return sort(0, len(arr))
```





## 카운팅 정렬

> O(n) 시간 안에 정렬이 가능한 매우 빠른 정렬



1. 정렬할 리스트 l과 l의 요소를 모두 포함할 최대값 k가 필요
2. 크기가 k+1인 count list 생성
3. 리스트 l의 요소의 갯수를 count에 저장
4. count list의 요소를 누적 요소로 변경 (앞 요소들의 값의 합 + 자신의 값) => indexing을 위해 (count가 0이었던 값들은 어짜피 사용 X)
5. 결과 값을 위한 list 생성
6. **l의 요소를 뒤에서부터 꺼내, 이를 idx로 삼아 count 요소의 값 -1**
   - 안정 정렬을 위해 뒤에서 부터 배치
7. -1한 값을 다시 idx로 삼아 result list에 l의 요소 저장



### 구현

```python
def counting(l, k):
    if len(l) < 2:
        return l

    count = [0] * (k + 1)
    for i in l:
        count[i] += 1

    for i in range(1, len(count)):
        count[i] += count[i - 1]

    result = [0] * len(l)
    for i in range(len(l)):
        count[l[-1 - i]] -= 1
        result[count[l[-1 - i]]] = l[-1 - i]
    return result
```





## 힙 정렬

### 구현

```python
class heap: # Maxheap
    def __init__(self):
        self.queue = []

    # 삽입
    def push(self,n): # 값 추가
        self.queue.append(n)
        idx = len(self.queue)-1
        while idx:
            if self.queue[idx] > self.queue[(idx-1)//2]:
                self.queue[idx], self.queue[(idx-1)//2] = self.queue[(idx-1)//2], self.queue[idx]
                idx = (idx-1)//2
            else:
                break

    # 반환
    def pop(self): # root값 반환 // 이후 맨 마지막 값을 root에 넣고 재정렬
        if len(self.queue) == 0: # 큐가 비어있을 때
            return 0

        self.queue[0], self.queue[-1] = self.queue[-1], self.queue[0]
        p = self.queue.pop()
        self.heapify()
        return p

	# 정렬
    def heapify(self): # 재정렬
        idx = 0
        while 2*idx + 1 < len(self.queue): # 적어도 왼쪽이랑은 비교할 수 았어야 가치가 있다.
            if 2*idx + 2 < len(self.queue) and (self.queue[idx] < self.queue[2*idx + 2] or self.queue[idx] < self.queue[2*idx + 1]): # 양쪽 비교 가능 & 둘 중 하나가 더 큼
                if self.queue[2*idx + 2] > self.queue[2*idx + 1]:
                    self.queue[idx], self.queue[2*idx + 2] = self.queue[2*idx + 2], self.queue[idx]
                    idx = 2*idx + 2
                else:
                    self.queue[idx], self.queue[2*idx + 1] = self.queue[2*idx + 1], self.queue[idx]
                    idx = 2*idx + 1
            elif self.queue[idx] < self.queue[2*idx + 1]: # 왼쪽 자식만 비교
                self.queue[idx], self.queue[2*idx + 1] = self.queue[2*idx + 1], self.queue[idx]
                idx = 2*idx + 1
            else:
                break
        # 근데 만약 왼쪽부터 바꿔버렸는데, 오른쪽 자식이 더 컸다면?
        if len(self.queue) > 2 and self.queue[0] < self.queue[2]:
            self.heapify()

	# 출력
    def show(self):
        print(self.queue)
```

```python
# 힙푸쉬
def heap_push(item):
    global heap_count
    heap_count += 1
    heap[heap_count] = item

    cur = heap_count
    parent = cur // 2

    #최소힙을 만족하기 위해서 루트이면 멈추게끔, 부모와 자식 비교
    while parent and heap[parent] > heap[cur]:
        heap[parent],heap[cur] = heap[cur],heap[parent]
        cur = parent
        parent = cur // 2

# 힙팝
def heap_pop():
    global heap_count
    item = heap[1]
    heap[1] = heap[heap_count]
    heap_count -= 1

    parent = 1
    child = parent * 2
    if child + 1 <= heap_count:
        if heap[child] > heap[child+1]:
            child = child+1

    while child <= heap_count and heap[parent]> heap[child]:
        heap[parent],heap[child] = heap[child], heap[parent]
        parent = child
        child = parent * 2
        if child + 1 <= heap_count:
            if heap[child] > heap[child+1]:
                child = child+1

    return item
```





# Searching

## 선형 탐색



## 이진 탐색 (Binary Search)

> 정렬된 자료에 사용 가능

https://velog.io/@keum0821/%EC%9D%B4%EC%A7%84-%ED%83%90%EC%83%89-%ED%8A%B8%EB%A6%ACBinary-Search-Tree-%EA%B5%AC%ED%98%84-%EC%82%AD%EC%A0%9C

- 탐색

1. 중앙값을 선택
2. 목표값과 비교
3. 목표값과 일치하면 탐색 종료
4. 목표값이 더 작으면 왼쪽 자료에 대해 탐색, 더 크면 오른쪽 자료에 대해 탐색
5. 위의 과정 반복

- 삼입

1. 루트 노드부터 아래로 탐색 수행
2. 탐색 실패 위치에 원소 삽입

- 삭제
  - 자식 노드가 0
    1. 그냥 삭제
  - 자식 노드가 1
    1. 원소 삭제
    2. 자손 노드를 하나씩 위로
  - 자식 노드가 2
    1. 원소 삭제
    2. <u>왼쪽 서브 트리의 가장 오른쪽 자손 노드와 교체</u> or <u>오른쪽 서브 트리의 가장 왼쪽 자손 노드와 교체</u>





# Recursion

함수 내부에서 직간접적으로 자기자신을 호출하는 행위

- 반복에 비해 코드가 간결, 이해가 쉬움
- 메모리 구조에서 스택을 사용
- 재귀 호출은 메모리, 속도 저하 발생

## 반복 VS 재귀

|                | 재귀                      | 반복                |
| -------------- | ------------------------- | ------------------- |
| 종료           | base case(호출 종료) 조건 | 반복문의 종료 조건  |
| 수행 시간      | 느림                      | 빠름                |
| 메모리 공간    | 많이 사용                 | 적게 사용           |
| 소스 코드 길이 | 짧다                      | 길다                |
| 소스 코드 형태 | if-else                   | for, while          |
| 무한 반복시    | 스택 오버플로우           | CPU를 반복해서 점유 |







# Graph

## 그래프 유형

- 무향 그래프
- 유향 그래프
- 가중치 그래프(weighted gragh)
- 사이클이 없는 방향 그래프(Directed Acyclic Graph)



- 완전 그래프 : 모든 정점이 모든 정점과 이어진 간선을 가진 그래프



- 그래프의 표현
  - 인접 행렬 : V x V의 2차원 배열
    - 장점 : 쉬운 구현, 두 노드의 연결을 확인할 때 O(1) 소요
    - 단점 : 특정 노드에 연결된 노드를 확인하려면 O(V) 소요
  - 인접 리스트 : 각 정점마다 간선 정보를 저장
    - 장점 : 적은 메모리 사용, 간선 파악에 간선 개수만큼만 시간 소요
    - 단점 : 두 노드의 연결을 확인하려면 O(V) 소요



## 그래프 순회

> 모든 정점을 탐색

### DFS & BFS

- DFS : stack, 재귀를 사용

- BFS : queue를 사용



## 상호배타 집합 자료구조 (Disjoint-sets)

> 서로소 집합
>
> 중복이 없는 집합들 (교집합이 공집합)

### 표현 방법

- 연결 리스트 : representative로 시작, tail로 끝남
- 트리 : representative(루트 노드) 아래의 자식 노드로 구성

### 연산

- `Make-Set(x)` - 유일한 멤버 x를 포함하는 새로운 집합 생성
- `Find-Set(x)` - x를 포함하는 집합 탐색, return representative

- `Union(x, y)` - x와 y를 포함하는 두 집합을 통합 / 집합 y의 대표를 집합 x의 대표로 바꾸는 것

### Rank / Path compression <= `연산의 효율을 높이는 방법`

> 트리의 높이가 높아지면 연산 속도가 저하된다. 이렇게 높이가 높아지는 것을 막기 위해 2가지 방법이 있다.

- 두 집합을 더할 땐 작은 집합을 큰 집합의 높이 위치에 더한다(`rank`)

  - 리프의 높이를 0이라고 가정하고, 작은 집합의 루트를 큰 집합에서 동일한 높이의 위치에 붙인다

    ![8장. 상호 배타적 집합의 처리. - ppt download](https://slidesplayer.org/slide/16203848/95/images/17/%2B+%3D+%EB%9E%AD%ED%81%AC%EB%A5%BC+%EC%9D%B4%EC%9A%A9%ED%95%9C+Union%EC%9D%98+%EC%98%88+c+e+c+b+h+d+f+b+h+e+a+a+d+f.jpg)

  - 만약 두 집합의 높이가 동일하다면, 한 집합의 루트 노드의 높이를 하나 높이고, 다른 집합을 그 루트 아래에 연결

- <u>find-set 과정</u>에서 만나는 모든 원소를 root에 연결한다(`path compression`)



## 최소 신장 트리 (Minimum Spanning Tree)

> 탐욕 기법 이용
>
> 최소 비용의 경로를 찾는 문제 (가중치의 합이 최소)

- 신장 트리
  - `n개의 정점`과 `n-1개의 간선`으로 이루어진 `무향 그래프`
- 최소 신장 트리 (MST)
  - 무향 가중치 그래프에서 신장 트리의 간선들의 **가중치 합이 최소**인 신장 트리

### KRUSKAL 알고리즘

- **트리의 모든 간선을 대상으로 최소 비용 간선을 하나씩 선택**
  1. 먼저, 모든 간선을 가중치에 따라 `오름차순 정렬`
  2. `가중치가 낮은 간선부터` 신장 트리 증가 - 해당 간선을 선택했을 때 `사이클`이 만들어지면 `pass`
  3. 2를 반복



#### `이걸 상호 배타 집합을 어떻게 활용하나?`

각 노드마다 상호 배타 집합 형성

=> 선택한 간선이 연결하는 두 노드가 같은 대표자를 공유하는지 확인 => **`같은 대표자를 공유하면 사이클`**



#### 구현

```python
def make_set(x):
    p[x] = x


# 효율이 고려된 퐈인드 셋 ㅋ
def find_set(x):
    if p[x] != x:
        p[x] = find_set(p[x])
    return p[x]


# rank 고려 x
def union(x, y):
    p[find_set(y)] = find_set(x)


for tc in range(1, int(input()) + 1):
    V, E = map(int, input().split())

    # 간선 입력
    edges = [list(map(int, input().split())) for _ in range(E)]

    # 크루스칼을 하기 위해서 간선을 가중치 순으로 오름차순 정렬
    edges = sorted(edges, key=lambda x: x[2])

    p = [0] * (V + 1)
    # p = list(range(V+1))

    for i in range(V + 1):
        make_set(i)

    ans = 0
    cnt = 0  # 간선선택회수
    idx = 0  # 간선의 인덱스

    while cnt < V:
        x = edges[idx][0]
        y = edges[idx][1]

        if find_set(x) != find_set(y):
            union(x, y)
            cnt += 1
            ans += edges[idx][2]
        idx += 1
    print("#{} {}".format(tc, ans))
```



### PRIM 알고리즘

- **하나의 정점에서 연결된 간선 중 최소 비용 간선 선택**

  1. 임의의 정점 선택
  2. `인접 정점` 중 `최소 비용`의 간선을 가진 정점 선택 (이 때 대상은 선택한 트리와 인접한 간선 전체가 대상)
  3. 2를 반복

- **서로소**인 2개의 집합 정보 유지

  - 트리 정점 - MST를 만들기 위해 **선택된 정점들**
  - 비트리 정점 - **선택되지 않은 정점들**

  

#### `이걸 상호 배타 집합을 어떻게 활용하나?`

  `선택 한 노드 집합` VS `선택 안 한 노드 집합`

  항상 선택 안 한 노드 집합과 연결된 간선을 선택하기 때문에, 사이클 X



#### 구현

```python
def Prim():
    dist = [987654321] * (V+1)
    visited = [False]* (V+1)

    dist[V] = 0
    for _ in range(V):
        min_idx = -1
        min_value = 987654321

        # 최소 거리인 노드 선택
        for i in range(V+1):
            if not visited[i] and dist[i] < min_value:
                min_idx = i
                min_value = dist[i]
        visited[min_idx] = True
        # 새로 추가된 노드에 대해 거리 갱신
        for i in range(V+1):
            if not visited[i] and adj[min_idx][i] < dist[i]:
                dist[i] = adj[min_idx][i]

    return sum(dist)


for tc in range(1, int(input())+1):
    V, E = map(int,input().split())

    adj = [[987654321] * (V+1) for _ in range(V+1)]

    for i in range(E):
        st, ed, w = map(int, input().split())
        adj[st][ed] = adj[ed][st] = w

    print("#{} {}".format(tc, Prim()))
```



### ! 근데 MST에서 꼭 서로소 집합(상호 배타 집합)을 써야하는 건 아님 - 상황에 따라





## 두 정점 사이의 최단 경로

### 다익스트라 알고리즘 (Dijkstra)

- 중점-다른 모든 점까지의 최단 경로

- 음의 가중치 허용 X



- **시작 정점부터 거리가 최소인 정점을 선택** / 프림 알고리즘과 유사

```python
def dijstra():
    dist = [987654321]*(V+1)
    visited = [False] * (V+1)

    dist[0] = 0

    for _ in range(V):
        min_idx = -1
        min_value = 987654321
        for i in  range(V+1):
            if not visited[i] and min_value > dist[i]:
                min_value = dist[i]
                min_idx = i
        visited[min_idx] = True
        #갱신할거 개신
        for i in range(V+1):
            if not visited[i] and dist[i] > adj[min_idx][i] + dist[min_idx]:
                dist[i] = adj[min_idx][i] + dist[min_idx]
        print(dist)
    return dist[V]


for tc in range(1, int(input())+1):
    V, E = map(int , input().split())

    adj = [[987654321]*(V+1) for _ in range(V+1)]

    for i in range(E):
        st, ed , w = map(int , input().split())
        adj[st][ed] = w

    print("#{} {}".format(tc, dijstra()))
```





### 벨만-포드 알고리즘 (Bellman-Ford)

- 중점-다른 모든 점까지의 최단 경로
- 음의 가중치 허용





### 플로이드-워샬 알고리즘 (Floyd-Warshall)

- 모든 정점에 대한 최단 경로
- 동적 계획 알고리즘 (DP)
- 모든 부분에 대하여 [`직선거리 vs 경유거리`] 중 짧은 경로 선택을 반복
- 이를 N*N 배열에서 계속 값을 갱신하면서 `O(N^3)` 시간만에 해답 도출
  - 경유, 시작, 끝, 이렇게 3개에 대해서 반복문 3번 돌림
  - 직선이 최단이면 직선 선택, ***경유가 최단이면 경유에 대해서 다시 재귀 호출????***
  - DP적으로 풀면 재귀가 필요 없음





# Exhaustive Search

가능한 모든 경우의 수를 나열 -> 확인하는 기법

- 완전 탐색, Brute-force라고 불리기도 한다



# Greedy

최적의 해를 구하는 근시안적인 방법

그 순간의 최적을 선택하는 방식

- <u>해당 탐욕 기법이 최적해로 가는 경로인지 증명이 필요</u>



## 탐욕 기법 vs 동적 계획법

| 탐욕 기법   | 동적 계획법 |
| ----------- | ----------- |
| Top-down    | Bottom-up   |
| 빠르고 간결 | 느리고 복잡 |



## 활동 선택 문제 (Activity-Selection problem)

시작시간과 종료시간이 있는 n개의 활동들의 집합에서, 겹치지 않는 최대 갯수를 구하는 문제

```
1. 종료 시간 순으로 정렬

2. 종료 시간이 가장 빠른 활동을 선택

3. 이후 선택한 활동 이후에 종료 시간이 가장 빠른 활동을 선택을 반복
```



## 탐욕 기법의 알고리즘

- `Prim` : **최소 신장 트리 탐색** - 서브 트리를 확장하면서 탐색
- `Kruskal` : **최소 신장 트리 탐색** - Cycle이 없는 서브 그래프를 확장하면서 탐색
- `Dijkstra` : **최단 경로 탐색** - 가장 가까운 인접 정점을 찾는 방식
- `Huffman tree & code` : **압축** - 빈도가 낮은 문자부터 이진 트리를 만들어 코드값 부여





# Divide and Conquer

`Divide - Conquer - Combine`

Divide : 문제를 여러 개의 부분으로 나눔

Conquer : 작은 부분 문제를 해결

Combine : 해결된 해답을 모은다 `(선택)`





# Backtacking

**유망성 검사를 통해 <u>유망성</u>이 없는 경로를 제외하는 기법**

- 보통 `재귀함수-DFS`로 구현
- 해를 얻을 때 까지 시도
- 기본적으로 `완전탐색 + DFS + 유망성 탐색` 구조

```
[과정]
1. 유망성 검사 => False 면 return
2. 해답 검사 => True면 해 return
3. 자식 노드로 이동
```



## 완전탐색 DFS와의 차이점

백트래킹은 유망성 검사를 통해 **가지치기(Pruning)**을 한다는 특징이 있다.

* 하지만 <u>최악의 경우에는 완전탐색과 같은 시간이 걸릴 수도 있음</u>





# Dynamic Programming

- 메모이제이션 활용
- 2가지 요건이 필수적
  - 중복 부분 문제 : 반복 계산
  - 최적 부분 문제 : 어떤 문제의 최적해가 그 문제를 구성하는 작은 문제들의 최적해로 구성되는 것



## 분할 정복 VS DP

- 분할 정복
  - 연관 없는 부분 문제로 분할
  - 재귀적인 문제 해결
  - 하향식 접근
- DP
  - 연관된 부분 문제
  - 부분 문제를 한 번만 계산, 저장
  - 부분 문제들 사이에 의존적 관계가 존재
  - 상향식 접근





# Math

> 어떤 문제는 최적해를 구할 수 없음 => 근사 알고르짐과 확률적 접근이 필요

- NP 완전 문제들은 다항식 시간 안에 해결 불가
  - 해결을 위해서는 3가지 중 1가지를 포기해야 함
    - 다항식 시간에 해를 찾는 것
    - 모든 입력에 대한 해를 찾는 것
    - 최적해를 찾는 것
  - 여기서 3번을 포기한 것이 `근사 알고리즘`

## 문제

- `여행자 문제` : **크루스칼 / 프림 알고리즘**으로 MST => 근사해
- `작업 스케줄링` 문제 : **그리디** => 근사해



## 정수론

### 최대공약수

- 유클리드 알고리즘

```python
def gcd(a, b):
    if a < b:
    	a, b = b, a
    while b != 0:
        a, b = b, a % b
    return a
```

### 최대공배수

- 유클리드 호제법

```python
def lcm(a, b):
    return a*b//gcd(a,b)
```

### 소수

- 소수로만 시도

- N^0.5까지만 시도
- 2 이후로는 홀수만 시도

- 에라토스테네스의 체





#  Probablity

## 모의 담금질

> 해를 찾기 위한 확률적인 접근

높은 T에서는 원자들이 자유로움 => 낮은 T로 가면 원자들이 규칙성을 띔





# Combination & Permutation

## 순열 (Permutation)

### 생성 방법

1. 반복문
2. 재귀 호출
3. 비트마스킹 (비트연산자 사용) - 재귀

4. **NextPermutation** / <u>사전 순(오름차순)으로 다음 번 순열을 찾는 방법</u>
   1. 뒤쪽부터 탐색하면 `교환위치(i-1)` 찾기
   2. `교환 위치(i-1)`와 교환할 `큰 값 위치(j)` 찾기
   3. `i-1`, `j` 교환
   4. `꼭대기(i)`부터 맨 뒤까지 오름차순 정렬
   5. 반복

- 예시
  - 1234
  - 12**43**
  - 1**32**4
  - ...
  - 4321
    - 1324
    - 13**42**
    - ...
      - 1342
      - ...
        - ...



## 조합 (Combination)

### 생성방법

1. 반복문

2. 재귀 호출

3. NextPermutation

   `1 2 3 4`

    0  0  1  1

    0  1  0  1

    0  1  1  0

    1  0  0  1

    1  0  1  0

    1  1  0  0



## 부분집합

### 생성방법

1. 반복문

2. 재귀 호출

3. **바이너리 카운팅 (가장 좋은 방법)**

   n개의 원소를 갖고 있는 집합의 부분집합 개수는 2^n개

   (있다or없다, 있다or없다, ...)

   `i & (1<<j)` 를 이용해 i의 j번째 원소가 1인지 판별 가능

   이를 이용해서

   ```python
   lst = ['a','b','c','d']
   N = 4
   for i in range(1<<N): # 1<<N은 2의 N제곱
       ans = ''
       for j in range(N):
           if i & (1<<j):
               ans += lst[j] + " "
       print(ans)
   ```

   이렇게 부분 집합 구현 가능



# KMP 알고리즘

> 꼭 알아야 하는 문자열 알고리즘
>
> Knuth-Morris-Pratt Algorithm

https://bowbowbow.tistory.com/6

- 불일치가 발생하면 앞부분을 비교하지 않고 매칭 수행
- 패턴을 전처리 해서 `fail[k]`를 구함
  - 패턴 내에서 반복되는 값을 파악해서 매칭 실패시 돌아갈 위치를 지정
- 시간복잡도 `O(M+N)`



## 전처리 과정

패턴의 **맨 앞부분**과, **맨 뒷부분**에서 <u>동일한 모양</u> 중 <u>가장 긴 길이</u>만큼 숫자 배정

`AABAABAC`

`01012340`

A와 A -> 1

A와 B -> 0

A와 A -> 1

AA와 AA -> 2

AAB와 AAB -> 3

AABA와 AABA -> 4

A와 C -> 0

## 동작과정

전처리 후 얻어지는 숫자들은 매칭에서 틀렸을 때, 다음번 비교에서 비교할 패턴의 문자를 가리킴





# 데이터 압축

- Run-Length Encoding : 동일한 값이 얼마나 반복되는지 확인
- `Huffman Coding` : 기호의 **빈도**, **허프만 트리**
- Lampel-Ziv-Welch Encoding
- Arithmetic Coding





# 최적화

1. *unsigned > signed*
2. int > float
3. 곱셈 > 나눗셈
4. 수학 공식 > 단순 연산
5. 비트 연산 짝수 홀수 확인 > 모듈러 연산
6. 반복문 > 모듈러 연산
7. 함수 호출 최소화
8. 비트연산 활용
9. 풀어쓰기 > 반복문
10. <u>최적화는 마지막</u> / 최선은 **좋은 알고리즘 선택**


