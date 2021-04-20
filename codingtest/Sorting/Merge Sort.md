# Merge Sort

> 안정 정렬인 대신 추가적인 메모리가 필요 (Merge 과정에서 새로운 배열 생성)
>
> 완전히 포인터만으로 처리하려면 추가적인 작업이 필요 => 효율이 떨어짐

1. 두 포인터 사이의 요소 개수가 1이 될 때까지 divide
2. 새로운 배열 `temp`를 만들고 left, right의 원소를 하나씩 비교하며 작은 수부터 채워 넣기
   - 포인터로만 동작하게 하려면 추가 작업이 필요하다 (고정된 크기의 배열 내에서 swap만을 이용할 경우, 특정 위치의 특정 순서에서 옮기기 힘들어진다)



## 코드

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
