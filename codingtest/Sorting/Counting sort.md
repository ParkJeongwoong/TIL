# Counting Sort

1. 정렬할 리스트 l과 l의 요소를 모두 포함할 최대값 k가 필요
2. 크기가 k+1인 count list 생성
3. 리스트 l의 요소의 갯수를 count에 저장
4. count list의 요소를 누적 요소로 변경 (앞 요소들의 값의 합 + 자신의 값) => indexing을 위해 (count가 0이었던 값들은 어짜피 사용 X)
5. 결과 값을 위한 list 생성
6. **l의 요소를 뒤에서부터 꺼내, 이를 idx로 삼아 count 요소의 값 -1**
   - 안정 정렬을 위해 뒤에서 부터 배치
7. -1한 값을 다시 idx로 삼아 result list에 l의 요소 저장



## 코드

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
