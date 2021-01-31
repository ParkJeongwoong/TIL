# Quick Sort

1. pivot을 정한다

   (pivot을 중간값으로 잘 정해야 속도 상승)

2. pivot 기준으로 작은 건 왼쪽, 큰 건 오른쪽으로 정렬
3. 왼쪽으로 간 리스트, 오른쪽으로 간 리스트에서 1, 2번 반복
4. 리스트의 크기가 1이하 일 때 중지

<좋은 설명>

https://www.daleseo.com/sort-quick/



## 코드

```python
def quick(array):
    if len(array) < 2:
        return array
    
    pivot = array.pop(len(array)//2)

    left = []
    right = []

    for i in array:
        if i > pivot:
            right.append(i)
        else:
            left.append(i)

    return quick(left) + [pivot] + quick(right)


a = [3, 17, 7, 10, 2, 1, 15, 19]
print(sorted(a))
print(quick(a))
```

위 코드의 단점 => `.pop()`이 들어가서 원본이 훼손되는 문제



## 수정된 코드

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    lesser_arr, equal_arr, greater_arr = [], [], []
    for num in arr:
        if num < pivot:
            lesser_arr.append(num)
        elif num > pivot:
            greater_arr.append(num)
        else:
            equal_arr.append(num)
    return quick_sort(lesser_arr) + equal_arr + quick_sort(greater_arr)
```

위의 블로그의 코드처럼 pop 대신 그냥 equal_arr를 만들어 넣었다.



---

## 최적화

위의 코드들은 재귀함수가 새로 호출될 때마다 리스트를 생성 => 비효율적

리스트 내에서 idx를 이용하여 요소의 위치를 바꾸는 것이 효율적

```python
def quick_sort(arr):
    def sort(left, right):
        if right <= left:
            return

        mid = partition(left, right)
        sort(left, mid - 1)
        sort(mid, right)

    def partition(left, right):
        pivot = arr[(left + right) // 2]
        while left <= right:
            while arr[left] < pivot:
                left += 1
            while arr[right] > pivot:
                right -= 1
            if left <= right:
                arr[left], arr[right] = arr[right], arr[left]
                left, right = left + 1, left - 1
        return left

    return sort(0, len(arr) - 1)


a = [3, 17, 7, 10, 2, 1, 15, 19]
quick_sort(a)
print(a)
```

- 왼쪽 인덱스를 증가시키며 pivot보다 큰데 왼쪽에 있는 값을 찾는다.
- 오른쪽 인덱스를 감소시키며 pivot보다 작은데 오른쪽에 있는 값을 찾는다.
- 값을 모두 찾고나면 두 위치를 서로 바꾼다.



- 정렬된 왼쪽, 오른쪽에 대하여 이를 반복

