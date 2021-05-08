# 백준 16916번

부분 문자열

## 문제

문자열 S의 부분 문자열이란, 문자열의 연속된 일부를 의미한다.

예를 들어, "aek", "joo", "ekj"는 "baekjoon"의 부분 문자열이고, "bak", "p", "oone"는 부분 문자열이 아니다.

문자열 S와 P가 주어졌을 때, P가 S의 부분 문자열인지 아닌지 알아보자.



## 입출력

| 입력     | 출력 |
| -------- | ---- |
| baekjoon | 1    |
| aek      |      |



## 코드

```python
def preprocessing(data):
    preprocessed = [0]*len(data)
    offset = 1 # 보정 값
    matched = 0 # matched된 길이
    while offset+matched < len(data):
        if data[offset+matched] == data[matched]:
            preprocessed[offset+matched] = matched+1
            matched += 1
        elif matched: # offset+matched는 그대로(같은 걸 조사) => 
            offset += matched - preprocessed[matched-1] # 다음 조사 대상을 유지하기 위해 offset 보정
            matched = preprocessed[matched-1] # 이전 걸로 돌아가기
        else: # 일단 다음 걸 조사해야 하기 때문에 전진
            offset += 1
    return preprocessed


def KMP(input_data):
    idx = 0
    idx_t = 0
    left = len(input_data)
    t_length = len(target_data)

    res = 0
    while idx <= left-t_length:
        adder = 0
        while idx_t < t_length and idx+adder < left:
            if input_data[idx+adder] == target_data[idx_t]:
                idx_t += 1
                adder += 1
            else:
                if idx_t:
                    idx_t = preprocessed[idx_t-1]
                    idx += adder
                    adder = 0
                    continue
                break
        if idx_t == t_length:
            return 1
        idx += 1
    
    return res

input_data = input()
target_data = input()
preprocessed = preprocessing(target_data)
print(KMP(input_data))
```

`772 ms` `71940 KB` `Python 3`

- KMP 알고리즘을 활용





## 백준 코드

### wider93님 코드

```python
def get_pi(p):
    q = len(p)
    pi = [0] * q
    j = 0
    for i in range(1, q):
        q = p[i]
        while j and q != p[j]:
            j = pi[j-1]
        if q == p[j]:
            j += 1
            pi[i] = j
    return pi

def kmp(s, p):
    q = len(p) - 1
    pi = get_pi(p)
    j = 0
    for t in s:
        while j and t != p[j]:
            j = pi[j-1]
        if t == p[j]:
            if j == q:
                return 1
            j += 1
    return 0

print(kmp(input(), input()))
```

[wider93](https://www.acmicpc.net/user/wider93) `440 ms` `71324 KB` `Python 3`

[전처리 구간]

- `pi` : preprocessed
- `i` : 전처리할 문자 idx => `q`가 전처리할 문자
- `j` : matched

- q와 j번째 문자 비교 / 일치할 때까지 while
  - 일치하지 않으면 j를 pi에 넣어 조정
- 일치하게 되면 pi에 j+1 저장

[탐색 구간]

- s에서 하나씩 떼온 t를 검사
- 마찬가지로 일치할 때까지 while
  - 일치하지 않으면 j를 pi에 넣어 조정
- 일치하게 됐을 때,
  - 만약 완전히 일치하면 1 return
  - 아니라면 중간에 검사하다만 것이므로 j+1 후 다음 t 검색 / (== `j까지는 일치한다고 표시하고 다음 문자 검색`)
