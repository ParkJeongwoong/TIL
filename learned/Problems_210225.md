# 2021년 2월 25일

IM 시험 대비 문제 풀이 중 배운 내용

---

- .pop()이 아닌 다른 pop의 경우 지양하는 것이 좋다.
  - input이 많아 질 경우 남은 원소들의 idx를 재배치하는 과정에서 시간이 생각보다 많이 소요된다.



## 백만 장자 프로젝트

오르내리는 시세 속에서, 실현 가능한 가장 큰 이익을 찾는 문제

=> 12312 의 경우 1,2에 사서 3에 팔고(+3), 1에 사서 2에 팔면(+1), <u>최대 4의 이익을 얻을 수 있다</u>



#### 코드1

```python
T = int(input())
 
for tc in range(1,T+1):
    N = int(input())
    costs = list(map(int,input().split()))
    idx = 0 # 검색 시작 위치
    answer = 0
    while idx < N:
        maxidx = costs.index(max(costs[idx:]),idx) # 가장 큰 수의 위치를 찾고 그 전까지를 차이를 더해 이익을 계산
        for i in range(idx, maxidx):
            answer += costs[maxidx] - costs[i]
        idx = maxidx + 1 # 검색 시작 위치를 가장 큰 수 이후로 조정, 반복
     
    print('#{} {}'.format(tc, answer))
```

`메모리 초과` `274,316 kb`



#### 코드2

```python
T = int(input())

for tc in range(1, T + 1):
    N = int(input())
    costs = list(map(int, input().split()))
    answer = 0
    my_max = costs[N-1]
    for i in range(N-2,-1,-1):
        if my_max > costs[i]:
            answer += my_max - costs[i]
        elif my_max < costs[i]:
            my_max = costs[i]

    print('#{} {}'.format(tc, answer))
```

`성공` `232,608 kb`

max를 찾는 것이 생각보다 부하가 생긴다는 것을 깨닫고 뒤에서 부터 검색하는 방식으로 조정하여 해결
