# 백준 9095번

1, 2, 3 더하기

## 문제

정수 4를 1, 2, 3의 합으로 나타내는 방법은 총 7가지가 있다. 합을 나타낼 때는 수를 1개 이상 사용해야 한다.

- 1+1+1+1
- 1+1+2
- 1+2+1
- 2+1+1
- 2+2
- 1+3
- 3+1

정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 프로그램을 작성하시오.



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 3    |      |
| 4    | 7    |
| 7    | 44   |
| 10   | 274  |

입력 = [테스트 케이스 개수 T + 테스트 케이스(11보다 작은 양수)]



## 코드

```python
times = int(input())
numlist = [0]*times

for i in range(times):
    numlist[i] = int(input())

max_num = max(numlist)

if max_num < 4:
    for i in range(times):
        if numlist[i] == 3:
            print(4)
        else:
            print(numlist[i])

else :
    dp = [0]*(max_num+1)
    dp[1] = 1 
    dp[2] = 2
    dp[3] = 4
    for i in range(4,max_num+1):
        dp[i] = dp[i-1] + dp[i-2] + dp[i-3]

    for i in range(times):
        print(dp[numlist[i]])
```



## 설명

매 테스트 케이스마다 list를 만드는 건 비효율적이라고 생각

가장 큰 수의 list를 만들면 dp 특성상 그보다 작은 수는 list 내에서 찾을 수 있음

- 가장 큰 수를 찾아 `max_num` 변수를 만들고, dp 수행

- 이후 `max_num` 보다 작은 수는 dp list에서 뽑아 사용

  - ex) max_num이 10인 경우

    `dp = [0, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274]`

    10보다 작은 수의 경우는 dp에서 뽑아 쓴다.



## 기존 코딩과 비교

```python
times = int(input())

for i in range(times):
    n = int(input())
    if n < 3:
        print(n)
    elif n == 3:
        print(4)
    else :
        dp = [0]*(n+1)
        dp[1] = 1 
        dp[2] = 2
        dp[3] = 4
        
        for i in range(4,n+1):
            dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
        
        print(dp[n])
```

이 경우는 times의 수만큼 list를 새로 만들어야 함. (불필요한 반복)



### 동작 결과

![image](https://user-images.githubusercontent.com/77447841/105063975-b234f300-5abf-11eb-9b57-f0e68a499546.png)


**실제로 기존 방법(위의 결과)보다 새로운 방법(아래의 결과)가 더 짧은 시간 내에 수행**



## 개선점

코드 실행시간이 최단 시간인 52ms보다 8ms 길다.

확인 결과, 동작 방식은 동일하지만

입력값 n이 최대 10이라는 점을 간과하고 max_num이라는 방식을 사용했기 때문

(애초에 max_num은 무조건 10이기 때문에 따로 input 값들을 list에 모아서 max 값을 찾을 이유가 없었음)



#### 결론

=> **문제를 잘 파악하는 연습을 해야한다.**
