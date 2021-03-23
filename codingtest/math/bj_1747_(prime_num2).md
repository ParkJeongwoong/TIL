# 백준 1747번

소수 & 팰린드롬

## 문제

어떤 수와 그 수의 숫자 순서를 뒤집은 수가 일치하는 수를 팰린드롬이라 부른다. 예를 들어 79,197과 324,423 등이 팰린드롬 수이다.

어떤 수 N (1 ≤ N ≤ 1,000,000)이 주어졌을 때, N보다 크거나 같고, 소수이면서 팰린드롬인 수 중에서, 가장 작은 수를 구하는 프로그램을 작성하시오.



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 31   | 101  |

- 입력
  - N 입력
- 출력
  - 조건에 맞는 수 출력



## 코드

```python
import sys
input = sys.stdin.readline

N = int(input())

# N보다 작은 소수 구하기
primes = [2]
checkprimes = [2]

for n in range(3,N+1):
    isprime = True
    for p in checkprimes:
        if not n % p:
            isprime = False
            break
    if isprime:
        primes.append(n)

    if (n+1)**0.5 >= primes[len(checkprimes)]:
        checkprimes.append(primes[len(checkprimes)])

ispal = False
isbig = primes[-1] >= N

# N보다 큰 소수 구하기
if N < 3:
    pass

# 홀수일 때
elif N % 2:
    newnum = N
    while not (ispal and isbig):
        isprime = True

        for p in checkprimes:
            if not newnum % p:
                isprime = False
                break

        if isprime:
            primes.append(newnum)
            isbig = True
            ispal = True
            nnum = str(newnum)
            for i in range(len(nnum)//2):
                if nnum[i] != nnum[-1-i]:
                    ispal = False
        
        if (newnum+2)**0.5 >= primes[len(checkprimes)]:
            checkprimes.append(primes[len(checkprimes)])

        newnum += 2
        
# 짝수일 때
else:
    newnum = N+1
    while not (ispal and isbig):
        isprime = True

        for p in checkprimes:
            if not newnum % p:
                isprime = False
                break

        if isprime:
            primes.append(newnum)
            isbig = True
            ispal = True
            nnum = str(newnum)
            for i in range(len(nnum)//2):
                if nnum[i] != nnum[-1-i]:
                    ispal = False
        
        
        if (newnum+2)**0.5 >= primes[len(checkprimes)]:
            checkprimes.append(primes[len(checkprimes)])

        newnum += 2


print(primes[-1])
```

![image-20210208172900501](bj_1747_(prime_num2).assets/image-20210208172900501.png)

### 설명

- 엄청나게 코드가 긴 코드
- N보다 작은 소수를 먼저 찾고, N 보다 크면서 팰린드롬을 만족하는 소수를 찾았다.
  - 이 때 횟수를 줄이기 위해 짝수일 때와 홀수일 때를 나눠서 진행



## 수정된 코드1

코드가 너무 길고 복잡해 단순화 시켰다.

```python
import sys
input = sys.stdin.readline

N = int(input())

primes = [2]
checkprimes = [2]

n=3
t = N > 2
while t:
    isprime = True
    for p in checkprimes:
        if not n % p:
            isprime = False
            break
    if isprime:
        if n >= N:
            sn = str(n)
            for i in range(len(sn)):
                if sn[i] != sn[-1-i]:
                    break
            else:
                t = False

        primes.append(n)

    if (n+1)**0.5 >= primes[len(checkprimes)]:
        checkprimes.append(primes[len(checkprimes)])
    
    n += 1

print(primes[-1])
```

![image-20210208171135613](bj_1747_(prime_num2).assets/image-20210208171135613.png)

하지만 놀랍게도 성능이 더 구려졌다.



## 수정된 코드2

성능이 구려진 원인이 짝수든 홀수든 동일하게 1씩 더하면서 탐색했기 때문이라고 판단. 짜피 3이상부턴 홀수만 소수니 홀수만 검색하도록 만들었다.

```python
import sys
input = sys.stdin.readline

N = int(input())

primes = [2]
checkprimes = [2]

n=3
t = N > 2
while t:
    isprime = True
    for p in checkprimes:
        if not n % p:
            isprime = False
            break
    if isprime:
        if n >= N:
            sn = str(n)
            for i in range(len(sn)):
                if sn[i] != sn[-1-i]:
                    break
            else:
                t = False

        primes.append(n)

    if (n+2)**0.5 >= primes[len(checkprimes)]:
        checkprimes.append(primes[len(checkprimes)])
    
    n += 2

print(primes[-1])
```

![image-20210208171330139](bj_1747_(prime_num2).assets/image-20210208171330139.png)

확실히 연산 속도가 많이 빨라졌다.



## 다른 사람의 코드

> 나와는 비교할 수 없을 정도로 효율적인, 2자리수 대의 속도를 가진 코드들이다.

### jmkk27님

```python
def isPrime(n):	# 소수를 찾는 함수
  if n<=1: return 0
  for d in range(2,int(n**.5)+1):
    if n%d==0: return 0
  return 1
n=int(input()) # 여기서부터 입력
if n<=2: print(2)
elif n<=3: print(3)
elif n<=5: print(5)
elif n<=7: print(7)
elif n<=11: print(11)
else:	# 2자리수 이상일 때
  if len(str(n))%2: # 길이가 홀수 123 12345 1234567
    k=str(n)[:len(str(n))//2+1] # k는 n의 시작부터 중간까지 12 123 1234
    if int(k+k[-2::-1])<n: # k의 뒤에서 2번째 자리부터 뒤집은 수를 k에 덧붙인 게 n보다 작다면..? 12+1 123+21 1234+321
      k=str(int(k)+1)
  else: k='1'+'0'*(len(str(n))//2) # 길이가 짝수
  while 1:
    t=int(k+k[-2::-1])
    if isPrime(t): print(t); break # 여기서 프라임 #를 찾음
    k=str(int(k)+1)
```

([jmkk27](https://www.acmicpc.net/user/jmkk27))

- 팰린드롬을 먼저 찾고 소수인지 검증
  - 근데 저렇게 팰린드롬을 찾아도 되나..??
    - 아 이해 완료. 된다. `k=str(int(k)+1)`은 회문을 깨는 코드 (더 큰 회문을 만들기 위하여)
- 이건 팰린드롬에 대한 이해가 필요해 보인다.



### jh05013님

```python
def isprime(p, plist):
    if p == 2: return True
    for q in plist:
        if p%q == 0: return False
        if q**2 > p: return True

def genpalin(n, odd):
    s = str(n)
    if odd: return int(s+s[-2::-1]) #12345 4321
    return int(s+s[::-1]) #1234 4321

prime = [2,3,5,7]
for p in range(10, 10000): # 미리 prime #를 다 구했다.
    if isprime(p, prime):
        prime.append(p)
a = int(input()) # 여기서부터 입력
if a <= 2: print(2); exit()
for dlen in range(1, 6):
    for o in True, False: #홀수, 짝수일 때
        for i in range(10**(dlen-1), 10**dlen):
            p = genpalin(i, o) # 팰린드롬을 만드는 함수
            if p < a: continue
            if isprime(p, prime): print(p); break
        else: continue
        break
    else: continue
    break

```

([jh05013](https://www.acmicpc.net/user/jh05013))

- 함수를 사용해서 직관적으로 풀었다.
- 또 미리 prime #를 구함으로써 저장된 값을 꺼내서 비교만 했다.
- 일단 prime을 다 찾고, palindrome을 만들면서 이게 input값보다 크면서 prime 안에 있는지 확인



### df1097님

```python
def next(n) : # n보다 큰 회문을 만드는 함수 (더하기를 해서 회문을 만들기 때문)
    ind = 0 # 앞자리 idx
    diff = 1 # 뒷자리 offset 목적 int
    while True :
        num = int(n)
        while n[ind] != n[-1-ind] : # 회문이 아닌지 확인
            var = int(n[ind]) - int(n[-1-ind]) # 회문이 아니면 그 차이를 var에 저장
            if var < 0 : # 뒷자리 수가 더 클 때
                var += 10
            num += diff*var # 대칭되는 앞자리 수와 차이나는 만큼 뒷자리수에 더해줘서 회문으로 만든다.
            n = str(num) # 회문으로 보정된 str n
        ind += 1 # 다음 앞자리 비교
        diff *= 10 # 다음 뒷자리 offset 준비
        
        if ind > len(n)//2 :
            break
    return n

n = input()
while True :
    n = next(n) # 입력값 n을 회문으로 만든다.
    i = 2
    flag = True # 소수 판별용 flag
    while i*i <= int(n) :
        if int(n)%i == 0 :
            flag = False
            break
        i+=1
    if flag :
        break

    n = str(int(n)+1) # 소수가 아니면 숫자를 하나 올려서 회문을 깨고, 다음 반복문에 다시 회문으로 만든다.

if n == '1' :
    print(2)
else :
    print(n)
```

([[df1097](https://www.acmicpc.net/user/df1097)](https://www.acmicpc.net/user/joi0104))

- 회문을 만드는 함수를 이용

- 이 코드 역시 회문을 중심으로 돌아간다.



## 결론

prime을 찾아가면서 그게 <u>**회문인지 검증하는**</u> 나의 코드보다

prime을 미리 다 찾고, 회문을 <u>**만들면서**</u> 이게 prime인지 비교하는 코드가 훨씬 빠르다.

왜일까..?





prime에 대한 시간은 내가 더 짧을 것이다. 내가 더 적은 수의 prime을 찾았기 때문.

그렇다면 회문 때문에 차이가 난다는 건데..

로드가 걸리는 정도가  `소수가 회문인지 검증` > `회문이 소수인지 검증`이라는 것.

??회문이 소수보다 개수가 많은 게 아닌가?



꼭 그러지는 않을 수 있는 게, 회문 11에서 101로 넘어 가는 동안 소수는 여러 개지만 회문은 없다.

또 조건이 가장 작은 회문이므로 일의 자리가 아니라 중간값부터 바꿔야 한다.

& 생각보다 회문의 갯수가 적을 수도 있다.



잘못 생각했다. 1000보다 작은 소수는 168개, 10000보다 작은 소수는 1229개이다.

반면 회문은 3자리 수는 9\*10 = 90개, 4자리 수도 9\*10 = 90개로 비교도 안 되게 작다.

무조건 회문이 소수인지 검증하는 게 낫다는 뜻.
