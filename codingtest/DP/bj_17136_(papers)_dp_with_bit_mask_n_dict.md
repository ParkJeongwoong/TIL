# 백준 17136번

색종이 붙이기

> https://www.acmicpc.net/problem/17136

## 문제

1×1, 2×2, 3×3, 4×4, 5×5 색종이를 5개씩 가지고 있으며, 이를 10×10 종이 위에 붙이려고 할 때 1이라고 적힌 칸을 모두 덮는데 필요한 색종이의 최소 개수를 구하시오.

(모두 덮는 것이 불가능한 경우 -1을 출력)

## 코드

```python
import sys
input = sys.stdin.readline

def checkcheck(r, c, count):
    global paper_count, failed
    if count >= paper_count:
        return
    
    if r == 10:
        if count < paper_count:
            paper_count = count
        return
    if c == 0:
        col_check = 0
        for i in range(10):
            if board[r][i]:
                col_check |= 1<<i
        
        if str(papers) in dp[r][col_check]:
            if dp[r][col_check][str(papers)] > count:
                dp[r][col_check][str(papers)] = count
            else:
                return
        else:
            dp[r][col_check][str(papers)] = count
            
    elif c == 10:
        checkcheck(r+1, 0, count)
        return
    
    marked = is_marked(r,c)
    if marked:
        for i in range(1, marked+1):
            if papers[i-1]>0:
                mark(r,c,i,0)
                papers[i-1]-=1
                checkcheck(r,c+i,count+1)
                mark(r,c,i,1)
                papers[i-1]+=1
            else:
                failed = True
    else:
        checkcheck(r,c+1,count)
    return


def is_marked(r,c):
    if board[r][c]:
        if r < 6 and c < 6:
            if sum([sum(board[r+i][c:c+5]) for i in range(5)]) == 25:
                return 5
        if r < 7 and c < 7:
            if sum([sum(board[r+i][c:c+4]) for i in range(4)]) == 16:
                return 4
        if r < 8 and c < 8:
            if sum([sum(board[r+i][c:c+3]) for i in range(3)]) == 9:
                return 3
        if r < 9 and c < 9:
            if sum([sum(board[r+i][c:c+2]) for i in range(2)]) == 4:
                return 2
        return 1
    else:
        return 0

def mark(r,c,size, flag):
    for dr in range(size):
        for dc in range(size):
            board[r+dr][c+dc] = flag
   

board = [list(map(int,input().split())) for _ in range(10)]
papers = [5,5,5,5,5]
dp = [[{} for _ in range(1024)] for _ in range(10)]
paper_count = 30
failed = False
checkcheck(0,0,0)
if paper_count == 30:
    paper_count = 0
if not paper_count and failed:
    print(-1)
else:
    print(paper_count)
```

`236 ms` `30476 KB` `Python 3`

### 설명

이전의 비트마스크와 dp를 합친 SWEA 문제(칩 생산)와 비슷한 방법으로 해결.

이 때 발생한 문제는 색종이의 개수가 제한적이라는 것.

즉 dp에 값을 저장할 때, 현재 **board의 상태** + **사용한 색종이의 총 개수**만으로는 부족

```
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
```

(예시) 위의 경우 2,3,1,0,1(작은 것부터 순서대로)를 사용해서 7개를 쓰는게 최적



**즉 중간에 유망성 검사를 했을 때 <u>board의 상태가 똑같고</u> <u>사용한 색종이 숫자가 더 많다</u>고 불리하다고 판단하면 안 됨**

사용한 색종이의 종류에 따라 오히려 이게 더 유리할 수도 있음<u>(초반에 큰 걸 너무 많이 써서 완성을 못하게 되는 경우가 존재 가능)</u>



이를 해결하기 위해 사용한 갯수르 비트 마스킹을 하려니 dp의 크기가 6^6^6^6^6 배 증가하게 되어 포기

=> 딕셔너리를 사용 (딕셔너리는 저장 시간이 길지만, 어짜피 그렇게 많이 저장되지는 않을 거라고 판단)

=> dp를 1024x10 짜리 배열로 만들고 그 안에 빈 딕셔너리를 넣었다.

=> 그리고 남은 색종이의 개수인 papers 변수를 string으로 변환해 key값으로 지정하고 여기다가 count 값을 저장!

=> 이렇게 하면 많은 메모리를 쓰지 않고 **board의 상태, 남은 색종이의 상태, count를 모두 저장 가능**



### 결과

![image-20210611192608751](bj_17136_(papers)_dp_with_bit_mask_n_dict.assets/image-20210611192608751.png)

![image-20210611192755259](bj_17136_(papers)_dp_with_bit_mask_n_dict.assets/image-20210611192755259.png)

매우 효율적인 코드 (기존의 가장 효율적인 코드보다 3배 이상 효율적으로 연산, PyPy3보다도 빠른 코드)

dp를 활용한 덕분에 가지치기를 굉장히 효율적으로 진행할 수 있었기 때문이라고 생각