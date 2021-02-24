# 백준 2023번

신기한 소수

## 문제

수빈이가 세상에서 가장 좋아하는 것은 소수이고, 취미는 소수를 가지고 노는 것이다. 요즘 수빈이가 가장 관심있어 하는 소수는 7331이다.

7331은 소수인데, 신기하게도 733도 소수이고, 73도 소수이고, 7도 소수이다. 즉, 왼쪽부터 1자리, 2자리, 3자리, 4자리 수 모두 소수이다! 수빈이는 이런 숫자를 신기한 소수라고 이름 붙였다.

수빈이는 N자리의 숫자 중에서 어떤 수들이 신기한 소수인지 궁금해졌다. N이 주어졌을 때, 수빈이를 위해 N자리 신기한 소수를 모두 찾아보자.



## 특이사항

시간 제한 : `2초`

메모리 제한 : `4MB`



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 4    | 2333 |
|      | 2339 |
|      | 2393 |
|      | 2399 |
|      | 3119 |
|      | 3137 |
|      | 3733 |
|      | 3739 |
|      | 3793 |
|      | 3797 |
|      | 5939 |
|      | 7193 |
|      | 7331 |
|      | 7333 |
|      | 7393 |

- 입력
  - N (1~8)



## 코드1

```python
import sys
input = sys.stdin.readline

# 에라토스테네스의 체 + 소수 리스트
def primef(n):
    if n == 2:
        return 1

    prime_list = [2] # 소수 모음 => return을 위한 값
    check = [2] # 소수 + sqrt(i)보다 작음 => for문 돌리기 위한 값

    for i in range(3,n+1):
        prime = True
        # 소수 이면서 sqrt(i)보다 작은 숫자만 모은 리스트 check로 for문 돌리기
        for j in check:
            if not i % j:
                prime = False
                break
        if prime:
            prime_list.append(i)
        
        if prime_list[len(check)] <= int((i+1)**(0.5)): # 다음 i를 위한 리스트 check를 준비
            check.append(prime_list[len(check)]) # 8일 때, check = [2] // 9가 되기 전 check = [2,3]로 만들기

    return prime_list

N = int(input())


all_prime = primef(10**N - 1)
my_prime = list(filter(lambda x: len(str(x)) == N, all_prime)) # N자리의 소수 저장

result = []
for prime in my_prime: # 이미 작은 수부터 정렬되어 있다.
    for n in range(N-1):
        if prime//10**(n+1) not in all_prime:
            break
    else:
        result.append(prime) # 모두 소수이면 결과에 추가

for r in result: # 출력
    print(r)
```

### 설명

- N자리의 소수를 모두 구한 뒤, 하나씩 뽑아 낮은 자릿수가 소수인지 확인
- 에라토스테네스의 채 + 소수 리스트 활용

`메모리 초과`



## 코드2

```python
import sys
input = sys.stdin.readline

def lowerprime(n): # n보다 작은 최대 소수를 찾는 함수
    if n%2:
        for i in range(n, 2, -2):
            for j in range(2, int(i**(1/2))+2):  
                if i % j == 0:
                    break
            else:
                return i
    else:
        for i in range(n-1,2,-2):
            for j in range(2, int(i**(1/2))+2):  
                if i % j == 0:
                    break
            else:
                return i
    return 2

N = int(input())

prime = lowerprime(10**N) # 가장 큰 소수 찾기

if N == 1:
    result = [2,3,5,7]
else:
    result = []
    while prime >= 10**(N-1):
        for n in range(N-1):
            if prime//10**(n+1) != lowerprime(prime//10**(n+1)):
                break
        else:
            result.insert(0,prime) # 모두 소수이면 결과에 추가
        prime = lowerprime(prime-1)

for r in result: # 출력
    print(r)
```

### 설명

- 메모리를 줄이기 위해 숫자 n보다 작은 가장 큰 소수를 구한다.
- 해당 소수의 낮은 자릿수도 소수인지 확인

`시간 초과`



## 최종 코드

``` python
import sys
input = sys.stdin.readline

def isprime(n):
    if n == 1:
        return False
    elif n == 2:
        return True
    for i in range(2, int(n**(1/2))+1):  
        if n % i == 0:
            return False
    else:
        return True

N = int(input())

nums = ['1','2','3','4','5','6','7','8','9']
primes = ['2','3','5','7']

if N > 1:
    for n in range(N-1):
        tmp = []
        num_of_primes = len(primes)
        for p in range(num_of_primes):
            for i in range(9):
                tmpnum = primes[p] + nums[i]
                if isprime(int(tmpnum)):
                    tmp.append(tmpnum)
        primes = tmp
    
for r in primes: # 출력
    print(r)
```

`68 ms`

- 이 문제 분류가 DFS라는 걸 잊고 있었다.


### 설명

- 숫자를 DFS의 노드처럼 취급하여, 낮은 자리수부터 하나씩 붙여가며 소수인지 확인

- 낮은 자릿수가 소수인지 확인 -> 덧붙인 높은 자리가 소수인지 확인



## 다른 사람의 코드

### 코드1

```python
def isPrime(n):
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True


def f(n):
    if n == 1: return [2, 3, 5, 7]
    l = []
    for i in f(n - 1):
        for j in [1, 3, 7, 9]:
            k = 10 * i + j
            if isPrime(k):
                l.append(k)
    return l


for i in f(int(input())): print(i)

```

[702fbtngus](https://www.acmicpc.net/user/702fbtngus) `60 ms`

#### 설명

똑똑한 코드

- 생각해보면 소수는 2를 제외하고는 모두 홀수라서 1,3,5,7,9만 덧붙이면 된다.
  - 그 중 5는 무조건 5의 배수이므로 제외
- `for i in f(n-1)`을 이용해서 n-1번째 자리수의 조건에 맞는 소수들을 구하고 이를 뽑아서 덧붙인다.



#### 의문점

```python
import sys
input = sys.stdin.readline

def isprime(n):
    if n == 1:
        return False
    for i in range(2, int(n**(1/2))+1):  
        if n % i == 0:
            return False
    else:
        return True

N = int(input())

nums = ['1','3','7','9']
primes = ['2','3','5','7']

if N > 1:
    for n in range(N-1):
        tmp = []
        num_of_primes = len(primes)
        for p in range(num_of_primes):
            for i in range(4):
                tmpnum = primes[p] + nums[i]
                if isprime(int(tmpnum)):
                    tmp.append(tmpnum)
        primes = tmp
    
for r in primes: # 출력
    print(r)
```

위처럼 바꿔서 제출해도 내 시간은 줄어들지 않았다.

사실상 nums가 어떻든 상관 없다는 이야기

- 나는 string을 붙여 int로 만들어 계산하는데, 자료형 변환에서 시간이 더 쓰였을 수도 있겠다.

```python
import sys
input = sys.stdin.readline

def isprime(n):
    if n == 1:
        return False
    for i in range(2, int(n**(1/2))+1):  
        if n % i == 0:
            return False
    else:
        return True

N = int(input())
nums = [1,3,7,9]
primes = [2,3,5,7]

if N > 1:
    for n in range(N-1):
        tmp = []
        for p in primes:
            for i in nums:
                tmpnum = p*10 + i
                if isprime(tmpnum):
                    tmp.append(tmpnum)
        primes = tmp
    
for r in primes: # 출력
    print(r)
```

이렇게 고쳐도 메모리 사용량, 런타임이 전혀 변하지 않는다.. 왜일까??



### 가장 빠른 사람의 코드

```python
def isss(n):
    for i in range(3,int(n**0.5),2):
        if n%i==0:
            return False
    return True
def sosu(n,m):
    if n==1:
        print(m)
    else:
        m*=10
        for i in [1,3,7,9]:
            if isss(m+i)==True:
                sosu(n-1,m+i)
            else:
                continue
n=int(input())
for i in [2,3,5,7]:
    sosu(n,i)

```

[lsh0426](https://www.acmicpc.net/user/lsh0426) `56 ms`

#### 설명

정말 필요한 것만 담은 코드

- 소수 확인 함수도 1인지 확인X, 2로 나누기X
- 나머지는 비슷한 로직인 것 같다.

