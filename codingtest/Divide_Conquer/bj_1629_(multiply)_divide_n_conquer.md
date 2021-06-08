# 백준 1629번

곱셈

## 문제

자연수 A를 B번 곱한 수를 알고 싶다. 단 구하려는 수가 매우 커질 수 있으므로 이를 C로 나눈 나머지를 구하는 프로그램을 작성하시오.



## 입출력

| 입력     | 출력 |
| -------- | ---- |
| 10 11 12 | 4    |

- 입력
  - A B C



## 코드

### 실패

```python
#1
A, B, C = map(int,input().split())
print(A**B%C)

#2
A, B, C = map(int,input().split())
a = A%C
res = a
for _ in range(B-1):
    res = (res*a)%C
print(res)

#3
A, B, C = map(int,input().split())

def divide(num):
    result = []
    i = 2
    while num != 1:
        if not num%i:
            num //= i
            result.append(i)
        else:
            i += 1
    return result
        
a = A%C
res = a
for b in divide(B):
    for _ in range(b-1):
        res = (res*a)%C
    a = res
        
print(res)
```

`시간초과`

#### 설명

`1`

당연하게도 이렇게 쉽게 풀릴 리가 없다.



`2`

큰 수의 곱, 큰 수의 나머지 계산이 시간을 많이 잡아 먹는 것 같아 매 스텝 마다 나머지를 구해 곱했는데, 역시 이렇게 쉽게 풀릴 리도 없다.



`3`

제곱 부분이 문제라고 생각을 했다.

n = a*b일 때, 어떤 수의 n 제곱은 a 제곱을 b 제곱 한 것과 같다는 것을 깨닫고 이를 이용했다. (x^n = (x^a)^b)

이를 위해 B를 소인수분해 했는데, 소인수분해에 너무 시간이 오래 걸려 시간초과가 났다.



### 성공

> https://kjwan4435.tistory.com/80

위의 링크가 이 문제에 대한 접근법을 굉장히 이해하기 쉽게 설명했다.

```python
A, B, C = map(int,input().split())

# 비트연산 활용
ans = 1
a = A%C
for i in range(32):
    if B & (1<<i):
        ans = (ans*a)%C
    a = (a*a)%C

print(ans)
```

`72 ms` `Python 3`



#### 설명

- 비트 연산을 활용
  - B 값을 이진수로 보고 각 비트마다 A의 n 제곱에 대응한다고 생각

- 1 => 이진수 1, 결과 값은 A % C
- 2 => 이진수 10, 결과 값은 A^2 % C
- 4 => 이진수 100, 결과 값은 A^4 % C
- 3 => 이진수 11, 결과 값은 (A % C) * (A^2 % C) % C
- 2147483647 => 111111...1111, 따라서 A의 1 제곱부터 31 제곱 까지의 나머지를 구하고 그걸 곱하면 연산 가능 



이렇게 하면 최대 32회 연산만으로 계산 가능