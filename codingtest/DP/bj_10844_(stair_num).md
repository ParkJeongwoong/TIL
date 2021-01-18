# 백준 10844번

쉬운 계단 수

## 문제

각 자리수의 숫자가 앞뒤의 자리수와 1만큼 차이나는 수를 계단수라고 한다

ex) 12345 / 12321 / 45456787

자리수 N이 주어졌을 때, 계단수가 가능한 N자리 숫자의 숫자는?



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 1    | 9    |
| 2    | 17   |



## 코드

```python
N = int(input())

digit = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]

for i in range(N-1):
    temp_digit = [0] * 10

    for j in range(10):
        if j == 0:
            temp_digit[0] = digit[1]
        elif j == 9:
            temp_digit[9] = digit[8]
        else : # 1~8
            temp_digit[j] = digit[j-1] + digit[j+1]    
    
    digit = temp_digit

sum_digit = sum(digit)
print(sum_digit%1000000000)
```



## 설명

이전의 dp와는 다르게 접근 (dp 배열이 진행 순서가 아니라, 자릿수로 생각)



- digit의 index인 0~9를 끝자리 숫자라고 생각
  - N+1자리 숫자는 N자리 숫자에서 끝자리 숫자를 덧붙인 것
- 이 경우 1~8까지는 +/- 1을 한 숫자를 덧붙일 수 있음
- 0과 9의 경우, 0은 1에서만 덧붙여질 수 있고, 9는 8에서만 덧붙여질 수 있음



### 주의사항

`temp_digit = digit` 을 안 쓰고 `temp_digit = [0]*10` 으로 값을 준 이유

- 파이썬은 참조변수만 존재 / 처음처럼 변수를 지정하면 이름만 다른 같은 변수가 된다. (참조 주소가 같음)
  - temp_digit을 변경하면 digit도 함께 바뀜
- 만약 값을 그대로 받아오고 싶다면 `temp_digit = digit[:]` 을 사용해야 함
    - 혹은 `temp_digit = list(digit)` 도 가능



## 개선점

```python
N = int(input())

digit = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
# 매번 temp_digit을 만들 필요X
temp_digit = [0]*10

for i in range(N-1):
    # 굳이 조건문을 만들 필요 없음
    temp_digit[0] = digit[1]
    temp_digit[9] = digit[8]
    
    for j in range(1,9):
        temp_digit[j] = digit[j-1] + digit[j+1]    
    
    # temp_digit을 새로 안 만들어주기 때문에 digit과 temp_digit 분리
    digit = temp_digit[:]

print(sum(digit)%1000000000)
```

