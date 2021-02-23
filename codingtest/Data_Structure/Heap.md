# Heap

최대, 최소값을 빠르게 찾기 위한 자료구조 (`이진 트리`)

---

## 특징

- O(logN)
- 리스트로 구현 (자식노드는 부모노드 idx\*2 + 1, idx\*2 + 2)
- 삽입 : 데이터 끝에 삽입 -> 위로 올라가면서 힙정렬
- 삭제 : 루트 노드 제거(pop) -> 마지막 데이터를 루트 노드에 위치 -> 내려가면서 힘정렬



## 구현

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
            return -1

        self.queue[0], self.queue[-1] = self.queue[-1], self.queue[0]
        p = self.queue.pop()
        self.heapify()
        return p

	# 정렬
    def heapify(self): # 재정렬
        idx = 0
        while 2*idx + 1 < len(self.queue): # 적어도 왼쪽이랑은 비교할 수 았어야 가치가 있다.
            if self.queue[idx] < self.queue[2*idx + 1]: # 왼쪽 자식과 비교
                self.queue[idx], self.queue[2*idx + 1] = self.queue[2*idx + 1], self.queue[idx]
                idx = 2*idx + 1
            elif 2*idx + 2 < len(self.queue) and self.queue[idx] < self.queue[2*idx + 2]: # 오른쪽 자식과 비교
                self.queue[idx], self.queue[2*idx + 2] = self.queue[2*idx + 2], self.queue[idx]
                idx = 2*idx + 2
            
            else:
                break
        # 근데 만약 왼쪽부터 바꿔버렸는데, 오른쪽 자식이 더 컸다면?
        if len(self.queue) > 2 and self.queue[0] < self.queue[2]:
            self.heapify()

	# 출력
    def show(self):
        print(self.queue)
```

**입력**

```python
heaps = heap()
heaps.push(1)
heaps.push(5)
heaps.push(2)
heaps.push(7)
heaps.push(1)
heaps.push(6)
heaps.show()
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
heaps.push(10)
heaps.show()
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
print(heaps.pop())
```

**출력**

```
[7, 5, 6, 1, 1, 2]
7
6
5
2
[10, 1, 1]
10
1
1
-1
-1
-1
-1
-1
-1
-1
```



## 기본 모듈 heapq

최소힙을 구현하는 내장 모듈

https://www.daleseo.com/python-heapq/

---

- 사용

```python
import heapq
```

- heap 정렬 (`heapify`)

```python
# heap으로 만들 list 준비
heap1 = [10,9,8,7,6]
# heapify로 힙 정렬
heapq.heapify(heap1)
```

- heap 정렬 값 추가 (`heappush`)

```python
heap2 = []
heapq.heappush(heap2,10)
heapq.heappush(heap2,8)
heapq.heappush(heap2,9)
print(heap2) # [8,10,9]
```

- root값 제거(`heappop`)

 ```python
heap3 = [1,4,5]
print(heapq.heappop(heap3)) # 1
 ```



### 응용

튜플로 push를 하면 힙 정렬은 0번째 요소를 기준으로 정렬하기 때문에 이를 이용해서 최대힙을 구현할 수 있다.

```python
import heapq

nums = [4, 1, 7, 3, 8, 5]
heap4 = []

for num in nums:
  heapq.heappush(heap4, (-num, num))  # (우선 순위, 값)

while heap:
  print(heapq.heappop(heap4)[1])  # 8 7 5 4 3 1
```



## 우선순위 큐

힙을 응용해서 우선순위 큐를 만들 수 있다.

maxheap, minheap의 pop을 활용하여 우선 순위가 높은 항목부터 꺼내 쓸 수 있다.

(**어짜피 최대/최소값 하나만 반환돼서 우선순위 별 내부 정렬이 필요없다.**)



### 기본 모듈 queue.PriorityQueue

https://www.daleseo.com/python-priority-queue/

---

- 사용

```python
from queue import PriorityQueue
```

- 생성

```python
que = PriorityQueue()
```

- 추가

```python
que.put(4)
que.put(1)
que.put(7)
que.put(3)
```

- 삭제

```python
print(que.get())  # 1
print(que.get())  # 3
print(que.get())  # 4
print(que.get())  # 7
```

- 정렬 기준 변경

```python
que.put((3, 'Apple')) # 우선순위, 값
que.put((1, 'Banana'))
que.put((2, 'Cherry'))

print(que.get()[1])  # Banana
print(que.get()[1])  # Cherry
print(que.get()[1])  # Apple
```
