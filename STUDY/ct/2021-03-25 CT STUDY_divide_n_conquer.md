# 2021-03-25 CT STUDY



## Moo 게임

https://www.acmicpc.net/problem/5904

> 분할 정복

### 코드1

```python
def next_moo(moos, level):
    level += 1
    moos = moos + [level] + moos
    return moos, level

# S = 0
moos = [3] # m3 m4 m3 m5 m3 m4 m3 m6 // 2**N + 2**n-1 + 2**n-2 + ... 2**2 + 2**1 + 2**0
level = 3

N = int(input())

while N > sum(moos):
    moos, level = next_moo(moos, level)
    
idx = 0
while N > 0:
    N -= moos[idx]
    idx += 1

if N:
    print('m')
else:
    print('o')
```

`메모리 초과`



### 코드2

```python
def MOO(N):
    if N < 4:
        return 'm' if N == 1 else 'o'
    k = 3
    moo_count = 3
    while N > moo_count:
        k += 1
        moo_count = 2*moo_count+k
    last = (moo_count-k)//2
    if last < N < last+k+1:
        return 'm' if N == last+1 else 'o'
    return MOO(N-last-k)

print(MOO(int(input())))
```

`68 ms` `28776 KB`



- 분할 정복 사용
  - while 문을 돌리기 때문에 N의 위치는 무조건 Sn의 중간 or 그 이상
  - Sn일 때 N이 중간 위치라면 검증
  - N이 중간 위치가 아니라면 그 만큼 이동 후 다시 MOO 함수 재귀



### 코드 정리

```python
def MOO(N):
    if N < 4:
        return 'moo'[N-1]
    k = 3
    moo_count = 3
    while N > moo_count:
        k += 1
        moo_count = 2*moo_count+k
    last = (moo_count-k)//2
    if last < N < last+k+1:
        moo = 'm'+'o'*(k-1)
        return moo[N-last-1]
    return MOO(N-last-k)

print(MOO(int(input())))
```

`68 ms` `28776 KB`





### 백준 코드

```python
g=lambda i:(i<<2)-bin(i).count('1')
i=int(input())-1
n=max((i//4)-9,0)
while g(n)<i:n+=1
print('om'[g(n)==i])
```

[scvhero](https://www.acmicpc.net/user/scvhero) `56 ms` `29284 KB`



- 이진수를 이용해 해결
  - i의 4제곱 - i에서 2의 제곱수 갯수
- ???



### 은상님 코드

```python
n = int(input())
# moo mooo moo  7 is m

def dq(idx):
    while idx > 2:
        k = 4
        prior = 3
        # divide
        while True:
            posterior = prior * 2 + k
            if posterior > idx:
                break
            prior = posterior
            k += 1
        if idx == prior:  # prior + [] + prior 에서 []의 첫글자일 때
            return 'm'
        elif idx < prior + k:  # []일 때
            return 'o'
        else:
            idx = idx - prior - k
    return idx
result = dq(n - 1)
if type(result) == int:
    print('moo'[result])
else:
    print(result)


```

`64 ms` `28776 KB`



- 과정은 비슷하지만 재귀를 사용하지 않음 => while문으로 처리
