# 2021년 3월 2일

## SWEA\_4881\_배열최소합

1~9사이의 자연수가 들어있는 N*N 배열에서, 매 행 마다 하나씩 숫자를 골라 그 합이 최소가 되게 만드는 것. (한 번 고른 열은 다시 고를 수 없다.)

즉,

```
2 1 2
5 8 5
7 2 2
```

에서는 `(0,1)_1`, `(1,0)_5`, `(2,2)_2`를 골라 9가 최소합이 된다.



### 코드

```python
T = int(input())

for tc in range(1,T+1):
    N = int(input())
    min_res = 10*N

    array = []
    for i in range(N):
        array.append(list(map(int,input().split())))

    stack = [[i] for i in range(N)] # index만 저장

    while stack:
        nums = stack.pop()

        # 유망성 검사
        sum_res = 0
        for i in range(len(nums)):
            sum_res += array[i][nums[i]]  # 합계를 구한다
        if sum_res + 1*(N-len(nums)) >= min_res: # 매 스텝마다 이론상 최적의 거리로 따라잡아도 min 보다 작으면 버리기
            continue

        if len(nums) == N: # 끝까지 다다르면
            if sum_res < min_res: # 최소합보다 작으면
                min_res = sum_res # 저장
            continue

        for i in range(N):
            if i not in nums:
                stack.append(nums[:]+[i])

    print('#{} {}'.format(tc, min_res))
```



백트래킹 사용

=> 유망성 검사 부분에서 미래에 전망 가능한 최소값으로 이동해도 현재 알고 있는 최소값보다 크면 취하지 않는 방식을 사용
