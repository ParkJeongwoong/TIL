# SWE 1244. 최대 상금

https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15Khn6AN0CFAYD

---

##  내 코드

```python
def recur(s, value):
    if not s:
        global immax
        sumv = 0
        for i in range(rr+1):
            sumv += n[i] * 10**(rr-i)
        if sumv > immax:
            immax = sumv
        return
     
    l = 0
    r = rr
 
    while l < rr:
        max_num = 0
        for i in range(l+1,rr+1):
            if value[i] > max_num:
                max_num = value[i]
                max_idxs = [i]
            elif value[i] == max_num:
                max_idxs.append(i)
        for r in max_idxs:
            value[l], value[r] = value[r], value[l]
            recur(s-1, value)
            value[l], value[r] = value[r], value[l]
        l += 1
 
 
for tc in range(1, int(input())+1):
    n, S = input().split()
    S = int(S)
    n = list(map(int, list(n)))
    sorted_n = sorted(n)
 
    rr = len(n)-1
    immax = 0
    recur(S, n)
    print('#{} {}'.format(tc, immax))
```

`3,124 ms` `65,768 kb`

- 완전탐색으로 풀면 시간초과 발생
- 교환할 대상 (`l`)의 오른쪽에 있는 숫자들 중 최대값을 찾아서 `max_idxs`에 추가
- `max_idxs`에서 숫자를 하나씩 뽑아 교환 시도



- 왜인지 엄청나게 비효율적인 코드



## 원혁님 코드

```python
def max_reward(n, m):
    global result
 
    if m == M:
        result.append(''.join(N))
        return
    for j in range(n, len(N)- 1):
        for k in range(j + 1, len(N)):
            if N[j] <= N[k]:
                N[j], N[k] = N[k], N[j]
                max_reward(j, m+1)
                N[j], N[k] = N[k], N[j]
 
 
for tc in range(1, int(input())+1):
    original_N, M = input().split()
    N = list(original_N)
    M = int(M)
    result = []
 
    max_num = 0
    max_reward(0, 0)
    for i in range(len(result)):
        if max_num <= int(result[i]):
            max_num = int(result[i])
 
    if result == []:
        if M % 2:
            N[len(N) - 1], N[len(N) - 2] = N[len(N) - 2], N[len(N) - 1]
            max_num = int(''.join(N))
        else:
            max_num = int(''.join(N))
 
    print('#{} {}'.format(tc, max_num))
```

`196 ms` `62,084 kb`

- 오른쪽 수가 왼쪽보다 크면 교환
- result에 최종 값들을 모아두고 최대값을 찾음



- case 1) 위의 과정에서 제대로 찾은 경우
- case 2) 위의 과정에서 답이 나오지 않으면?
  - 오른쪽 값이 왼쪽보다 큰데, 바꿔야 했다는 뜻
  - 따라서 맨 끝 두 자리를 바꿔준다



## 은상님 코드

```python
# 큰수가 가장 왼쪽으로, 큰수가 여러개라면 swap_count 범위내에서 작은수가 가장 오른쪽으로
# 어쩔수없이 바꿔야되는 경우는(오름차순 정렬된 경우) 가장 오른쪽 두개 바꾸면됨
for tc in range(int(input())):
    numbers, swap_count = input().split()
    numbers = list(map(int, list(numbers)))  # string -> int list
    swap_count = int(swap_count)
    n = len(numbers)
    left = 0  # 왼쪽에 가장 큰수가 왔을 경우 이부분은 볼필요가없으므로 left값을 증가시킴
    while swap_count and left < n:
        maximum = max(numbers[left:])
        maximum_count = 0  # 최댓값 개수
        max_idxes = []  # 최댓값들의 위치
        for idx, i in enumerate(numbers[left:]):
            if i == maximum:
                max_idxes.append(left + idx)
                maximum_count += 1
        convert_count = min(swap_count, maximum_count)  # 왼쪽으로부터 바꿀 개수들(최댓값이 여러개인경우 문제가발생하기때문)
        minimums = sorted(numbers[left:left+convert_count])  # 왼쪽으로부터 바꿀만큼을 오름차순 정렬한것
        max_idxes = max_idxes[::-1][:convert_count]  # 최댓값의 개수랑 swap_count중 작은 수만큼만 옮길수있음
        for i in range(len(max_idxes)):
            if left != max_idxes[i]:  # 최댓값과 최솟값이 같으면 swap할필요 없음
                numbers[left] = maximum  # 젤왼쪽을 최댓값으로
                numbers[max_idxes[i]] = minimums[i]  # 최댓값이 있던 자리를 최솟값으로 채움
                swap_count -= 1
            left += 1
    if swap_count % 2 == 1:  # 최댓값을 구한 후 잔여 swap_count가 홀수인경우
        if len(numbers) == len(set(numbers)):  # 중복되는 수가 있으면 그냥 그거둘이 swap하면됨
            numbers[n-2], numbers[n-1] = numbers[n-1], numbers[n-2]  # 마지막두개를 바꿈
    print('#{} {}'.format(tc+1, ''.join(map(str, numbers))))
```

`134 ms` `55,008 kb`

- `압도적으로 좋은 코드`
- 세세하게 조건들을 달아서 분기별로 경우의 수를 최소화

- Greedy하게 접근
