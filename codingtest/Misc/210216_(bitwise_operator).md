## 비트 연산자를 활용한 부분집합

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
        if i (1<<j):
            ans += lst[j] + " "
    print(ans)
```

이렇게 부분 집합 구현 가능.
