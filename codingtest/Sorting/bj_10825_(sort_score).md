# 백준 10825번

국영수 정렬

## 문제

도현이네 반 학생 N명의 이름과 국어, 영어, 수학 점수가 주어진다. 이때, 다음과 같은 조건으로 학생의 성적을 정렬하는 프로그램을 작성하시오.

1. 국어 점수가 감소하는 순서로
2. 국어 점수가 같으면 영어 점수가 증가하는 순서로
3. 국어 점수와 영어 점수가 같으면 수학 점수가 감소하는 순서로
4. 모든 점수가 같으면 이름이 사전 순으로 증가하는 순서로 (단, 아스키 코드에서 대문자는 소문자보다 작으므로 사전순으로 앞에 온다.)



## 입출력

| 입력               | 출력     |
| ------------------ | -------- |
| 12                 |          |
| Jungkyu 50 60 100  | Donghyuk |
| Sangkeun 80 60 50  | Sangkeun |
| Sunyoung 80 70 100 | Sunyoung |
| Soong 50 60 90     | nsj      |
| Haebin 50 60 100   | Wonseob  |
| Kangssoo 60 80 100 | Sanghyun |
| Donghyuk 80 60 100 | Sei      |
| Sei 70 70 70       | Kangsoo  |
| Wonseob 70 70 90   | Haebin   |
| Sanghyun 70 70 80  | Junkyu   |
| nsj 80 80 80       | Soong    |
| Taewhan 50 60 90   | Taewhan  |

첫째 줄에 도현이네 반의 학생의 수 N (1 ≤ N ≤ 100,000)이 주어진다. 둘째 줄부터 한 줄에 하나씩 각 학생의 이름, 국어, 영어, 수학 점수가 공백으로 구분해 주어진다. 점수는 1보다 크거나 같고, 100보다 작거나 같은 자연수이다. 이름은 알파벳 대소문자로 이루어진 문자열이고, 길이는 10자리를 넘지 않는다.



## 코드

```python
def merge_sort(array):
    if len(array) <= 1:
        return array
    
    half = len(array)//2
    left = merge_sort(array[:half])
    right = merge_sort(array[half:])

    i, j = 0, 0
    result = []
    counter = 0 # 감 증 감 증 순서 / 감 = 0, 증 = 1
    clock = [1,2,3,0]
    aim = 0

    while i < len(left) and j < len(right):
        #print(result, counter, aim)
        if counter == 0: # 내림차순
            if left[i][clock[aim]] < right[j][clock[aim]]:
                result.append(right[j])
                j += 1
                counter = 0
                aim = 0
            elif left[i][clock[aim]] > right[j][clock[aim]]:
                result.append(left[i])
                i += 1
                counter = 0
                aim = 0
            else :
                counter = 1
                aim += 1

        else : # 오름차순
            if left[i][clock[aim]] > right[j][clock[aim]]:
                result.append(right[j])
                j += 1
                counter = 0
                aim = 0
            elif left[i][clock[aim]] < right[j][clock[aim]]:
                result.append(left[i])
                i += 1
                counter = 0
                aim = 0
            else :
                counter = 0
                aim += 1
                

    if len(left) > i:
        result += left[i:]

    if len(right) > j:
        result += right[j:]


    return result


# 연산
import sys

N = int(sys.stdin.readline())
array = []

for i in range(N):
    name, korean, english, mathematics = sys.stdin.readline().split()
    array.append([name, int(korean), int(english), int(mathematics)])

array = merge_sort(array)    

for i in range(N):    
    print(array[i][0])


# 입력
# 12
# Junkyu 50 60 100
# Sangkeun 80 60 50
# Sunyoung 80 70 100
# Soong 50 60 90
# Haebin 50 60 100
# Kangsoo 60 80 100
# Donghyuk 80 60 100
# Sei 70 70 70
# Wonseob 70 70 90
# Sanghyun 70 70 80
# nsj 80 80 80
# Taewhan 50 60 90
```



## 설명

- 병합 정렬 기법 사용
- 내림차순, 오름차순을 반복하는 것을
  - counter 변수의 0, 1로 표현
- index가 변하는 것을
  - aim 변수가 clock 변수를 가리키는 것으로 표현

- **현상을 그대로 따라 표현하지 말고 좀 더 효율적으로 행동해야 함**



### 주의사항

자료형에 주의

- 이번에도 int 형으로 안 바꿨다가 순서가 엉망이 됐었다.



## 다른 방법

### `sort()` 활용

```python
import sys
caseCnt = int(input())
arr = []
for i in range(caseCnt):
    name, kor, eng, math = sys.stdin.readline().strip().split()
    arr.append((-int(kor), int(eng), -int(math), name))
arr.sort()
for i in range(len(arr)):
    print(arr[i][3])
```

- `sys.stdin`을 쓰면 조금 더 빨라질듯
- 굉장히 영리한 방법
- list 내의 튜플의 순서를 바꾸는 방식으로 sorting 순을 정함
  - 나의 `aim`과 `clock` 변수는 필요없었던 것
- int 값의 저장을 `-int()`로 표현함으로써 내림차순 표현
  - 나의 `counter` 변수는 필요없었던 것
