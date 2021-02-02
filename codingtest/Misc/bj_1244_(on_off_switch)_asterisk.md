# 백준 1244번

스위치 문제

https://www.acmicpc.net/problem/1244

## 문제

스위치를 끄고 키는 문제

- 남자는 주어진 수의 배수만큼 스위치의 상태를 바꾼다.
- 여자는 주어진 수를 중심으로 좌우 대칭인 최대 구간의 스위치 상태를 모두 바꾼다.



## 입출력

| 입력            | 출력            |
| --------------- | --------------- |
| 8               | 1 0 0 0 1 1 0 1 |
| 0 1 0 1 0 0 0 1 |                 |
| 2               |                 |
| 1 3             |                 |
| 2 3             |                 |

- 입력
  - 스위치 개수
  - 스위치 상태
  - 학생 수
  - *성별, 숫자
- 출력
  - 스위치 상태



## 코드

```python
import sys

SN = int(sys.stdin.readline())
lst = list(map(int,sys.stdin.readline().split()))
StN = int(sys.stdin.readline())
for i in range(StN):
    sex, N = map(int,sys.stdin.readline().split())

    if sex == 1:
        # 남자 숫자 N
        i = N - 1
        while i < SN:
            lst[i] = int(not lst[i])
            i += N
    else:
        # 여자 숫자 N
        left = N-1
        right = N-1
        if SN == 1:
            lst[left] = int(not lst[left])
            continue
        lst[left] = int(not lst[left])
        while lst[left] == lst[right]:
            lst[left] = int(not lst[left])
            lst[right] = int(not lst[right])
            left -= 1
            right += 1
            if left < 0 or right == SN:
                break

# lst = list(map(str,lst))
# print(" ".join(lst))
for i in range(0, SN, 20):
    print(*lst[i:i+20]) # asterisk를 앞에 붙이면 unpacking이 된다.
```



### 설명

- 구현 문제였기 때문에 특별히 기술적인 어려움은 없었다.

- 문제는, 출력 조건이 한줄 출력 & 20배수마다 줄바꿈을 해야 하는 것.

  (이거 때문에 계속 틀렸다.)



> 이번 역시 테스트 코드가 굉장히 도움이 많이 되었다.



## 다른 사람의 코드

```python
import sys
input = sys.stdin.readline

on_off = {1:0, 0:1}
n = int(input())
switch = list(map(int,input().split()))
t = int(input())
for _ in range(t):
    s, num = map(int, input().split())
    if s == 1:
        i = num
        while num-1 < n:
            switch[num-1] = on_off[switch[num-1]]
            num += i
    else:
        i, j = num-2, num
        switch[num-1] = on_off[switch[num-1]]
        while i >= 0 and j < n:
            if switch[i] == switch[j]:
                switch[i] = on_off[switch[i]]
                switch[j] = on_off[switch[j]]
            else:
                break
            i -= 1
            j += 1

for i in range(0, n, 20): # ??? 설마
    print(*switch[i:i+20])
```

- dict 사용



## Asterisk 사용법

1. 곱, 거듭제곱

2. 리스트 확장

3. 가변인자

4. **Unpacking**

   ```python
   a = [1,2,3,4]
   
   print(a) # [1, 2, 3, 4]
   print(*a) # 1 2 3 4
   ```



## 또 다른 코드

```python
import sys
input = lambda: sys.stdin.readline().rstrip()

n = int(input())
a = [0] + list(map(int, input().split()))
s_n = int(input())

switch = {0:1, 1:0}

for _ in range(s_n):
    g, num = map(int, input().split())
    if g == 1:
        for i in range(num, n+1, num):
            a[i] = switch[a[i]]
    else:
        a[num] = switch[a[num]]
        i = 1
        while (num - i >= 1) and (num + i <= n) and (a[num - i] == a[num + i]):
            a[num-i], a[num+i] = switch[a[num-i]], switch[a[num+i]]
            i+=1

for idx, el in enumerate(a[1:], start = 1):
    print(el, end=" ")
    if not idx % 20:
        print()
```

가장 빠른 코드

- lambda를 사용
- 스위치 리스트 앞에 0을 붙여서 idx == 스위치 #로 만듦

- dict 사용
  - 연산 없이 dict의 값을 참조만 하는 형식이 더 효율적으로 보임
