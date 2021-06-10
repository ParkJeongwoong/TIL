# SWE 4317. 칩 생산

https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWL21nCaM8wDFAUE

DP를 한 단계 더 깊게 들어가는 문제

---

##  김재현 님 코드 (김재현_0534838)

```python
def is_mark(y: int, x: int) -> bool:
    if not (0 <= x < w - 1 and 0 <= y < h - 1):
        return False
 
    if data[y][x] == 0 and data[y + 1][x] == 0 and data[y][x + 1] == 0 and data[y + 1][x + 1] == 0:
        return True
    else:
        return False
 
 
def mark(y: int, x: int, flag: int) -> None:
    data[y][x] = data[y][x + 1] = data[y + 1][x] = data[y + 1][x + 1] = flag
 
 
def go(y: int, x: int, cnt: int) -> None:
    global ans
    if x == w:
        ans = max(ans, cnt)
        return
 
    if y == h:
        go(0, x + 1, cnt)
        return
 
    if y == 0:
        col = 0
        for row in range(h):
            if data[row][x] == 1:
                col += 1 << row
 
        if dp[x][col] >= cnt:
            return
        else:
            dp[x][col] = cnt
 
    if is_mark(y, x):
        mark(y, x, 1)
        go(y + 1, x, cnt + 1)
        mark(y, x, 0)
 
    go(y + 1, x, cnt)
 
 
for test in range(1, int(input()) + 1):
    h, w = map(int, input().split())
 
    data = [list(map(int, input().split())) for _ in range(h)]
    dp = [[-1 for _ in range(1 << 10)] for _ in range(w)]  # W x 1024
 
    ans = 0
 
    go(0, 0, 0)
 
    print("#" + str(test), ans)
```

`368 ms` `66,792 kb`

- **`dp` 변수 부분이 핵심**

사실 이 문제의 핵심은 브루트포스 + 유망성 검사 이다 (나는 이전에 그리디하게 풀다가 답이 나오지 않았었다)

문제는 유망성 검사를 어떻게 하냐는 건데...



일단 먼저 알아야 할 점은,

- 이 분은 세로 탐색을 함
- 각 열을 세로 탐색로 탐색하기 전(즉 row가 0일 때), 해당 열의 상태를 <u>**비트마스킹** 형태로 변환, 그 때의 count 값을 dp에 저장</u>

방법은 간단하지만 중요한 건 왜 그렇게 하냐는 거다.



- `먼저 세로 탐색을 하는 이유`.

  - 가로 최대가 25, 세로 최대가 10이라서 가로 탐색을 하면 dp의 크기가 훨씬 커진다
    - 세로 탐색 시 dp의 크기는 25 * 2^10 이며 가로 탐색 시 dp의 크기는 10 * 2^25 이다

- `두 번째로 비트마스킹을 하고 그에 대응하는 열에 dp를 저장하는 이유`

  - n열에 대해 칩을 채운 뒤에는, 그 결과가 **n열**과 **n+1열**에 반영이 됨 (2*2 짜리 칩이니까)

  - 탐색은 매 번 오른쪽으로 이동하며 진행하므로 n열 탐색이 끝난 뒤에는, n+1열을 탐색하게 되고
  - <u>이미 지나간 n열은 신경 쓸 필요 X</u>
  - <u>**이번에 진행할 n+1열은 지금까지의 탐색 결과와 같다고 보면 됨**</u>

즉! n열 탐색 수행 => n열과 n+1열에 결과가 나타남 => n열은 지나왔으므로 의미 X // n+1열은 n열의 탐색 결과가 반영된 상태 => n+1열을 비트마스킹하면 이전 결과를 비트마스킹 한 것과 동일한 효과가 나타남



- **이전에 풀었던 dp 문제를 한 단계 더 진화시킨 문제라고 생각**

