# 백준 17103번

골드바흐 파티션

## 문제

- 골드바흐의 추측: 2보다 큰 짝수는 두 소수의 합으로 나타낼 수 있다.

짝수 N을 두 소수의 합으로 나타내는 표현을 골드바흐 파티션이라고 한다. 짝수 N이 주어졌을 때, 골드바흐 파티션의 개수를 구해보자. 두 소수의 순서만 다른 것은 같은 파티션이다.



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 5    | 1    |
| 6    | 1    |
| 8    | 2    |
| 10   | 1    |
| 12   | 6    |
| 100  |      |

- 입력
  - 첫째 줄에 테스트 케이스의 개수 T (1 ≤ T ≤ 100)
  - 다음부터 짝수 정수 N, 2 < N ≤ 1,000,000



## 코드

### 코드 1

```python
tc = int(input())
cases = [int(input()) for _ in range(tc)]


# 소수 구하기
prime_list = [2]
check = [2]
for i in range(3,max(cases)):
    prime = True
    
    for j in check:
        if not i % j:
            prime = False
            break
    if prime:
        prime_list.append(i)
    
    if prime_list[len(check)] <= int((i+1)**(0.5)):
        check.append(prime_list[len(check)])

prime_num = len(prime_list)

for n in cases:
    # 탐색
    a = 0
    b = prime_num-1
    ans = 0
    while a <= b:
        is_goldbach = prime_list[a] + prime_list[b]

        if is_goldbach == n:
            ans += 1
            a += 1
        elif is_goldbach < n:
            a += 1
        else:
            b -= 1

    print(ans)
```

`시간 초과`



### 코드 2

```python
import sys
input = sys.stdin.readline

tc = int(input())
cases = [int(input()) for _ in range(tc)]
top = max(cases)

# 소수 구하기
prime_list = [1]*1000001
prime_list[0], prime_list[1] = 0, 0
for i in range(2, int(top**0.5)+1):
    if prime_list[i]:
        for ii in range(i*2,top+1, i):
            prime_list[ii] = 0

# 골드바흐 파티션
for case in cases:
    ans = 0
    for x in range(2,case//2+1):
        if prime_list[x] and prime_list[case-x]:
            ans += 1
    print(ans)
```

`3152 ms` `36588 KB` `Python 3`

`224 ms` `130956 KB` `PyPy3`



- 백준 특강을 듣고 풀었다.
- 기존의 소수를 구하는 방식은 진짜 에라토스테네스의 채가 아니었음
  - 그냥 제곱근까지 구하는 건 당연한 이치 / 에라토스테네스의 채는 작은 소수부터 올라가면서 그 배수를 지우는 방식

- 투 포인터를 사용한 접근 방식은 좋았지만, b 값을 찾는 방식에 문제가 있었다.



## 백준 코드 (개선된 방법)

```python
import sys
read = sys.stdin.readline
MAX_NUM = 1000000


def Erastos(check_prime):
	check_prime[0] = check_prime[1] = False
	for num in range(int(MAX_NUM**0.5) + 1):
		if check_prime[num]:
			for remove_num in range(num**2, MAX_NUM+1, num):
				check_prime[remove_num] = False
	prime_list = [x for x in range(MAX_NUM+1) if check_prime[x]] # 이 부분!!
	return prime_list


def main():
	check_prime = [True for _ in range(MAX_NUM+1)]
	prime_list = Erastos(check_prime)
	test_case_num = int(read().strip())
	for _ in range(test_case_num):
		partition = 0
		num = int(read().strip())
		for prime in prime_list:
			if prime > int(num/2):
				break
			if check_prime[num-prime]:
				partition += 1
		print(partition)


if __name__ == '__main__':
	main()
```

[imn00133](https://www.acmicpc.net/user/imn00133) `792 ms` `39696 KB`



- 에라토스테네스의 채 이후 소수만 모은 prime_list를 다시 만들어서 시간을 줄였다.
