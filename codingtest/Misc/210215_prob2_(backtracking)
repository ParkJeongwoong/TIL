# 210215 연습문제 2번

1부터 10까지 나열된 숫자에서 합이 10이되는 부분집합 구하기

---

완전탐색으로 찾는다면, 굉장히 많은 경우의 수를 계산해야 함

-> 오름차순으로 정렬되어 있다는 것을 이용해서 백트래킹 사용

```python
nums = list(range(1,11))
# 합이 10이되는 부분집합 구하기

def my_sum(lst):
    result = 0
    for i in lst:
        result += i
    return result


numlist = []
answer = []
i = -1
while True:
    i += 1
    if i == 10:
        break
    if my_sum(numlist) + nums[i] > 10:
        i = numlist.pop() - 1
        continue
    else:
        numlist.append(nums[i])
    if my_sum(numlist) == 10:
        answer.append(numlist[:])

print(answer)
```

- 만약 i+1번째 값이 10보다 크다면, i+n 번째 값들도 10보다 클 것이므로 볼 필요 없음
- 또한 현재 리스트에서 어떤 값을 추가해도 10보다 커지기 때문에 현재 리스트의 마지막 값을 pop -> +1 한 값을 다음 반복문에서 시도함
- 위의 동작을 반복
