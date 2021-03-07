Searching, trie, mst, Dijkstra, binary search(lower_bound), 이진 검색 트리

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





# Math





# Probablity



# Combination & Permutation





