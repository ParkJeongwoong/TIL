# SWE 5656. 벽돌 깨기

모의 SW 역량 테스트 문제

https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWXRQm6qfL0DFAUo

---

##  내 코드

```python
import copy
def shooting(count, board, W,H, n,N):
    if n == N:
        return count
    ans = []
    for c in range(W):
        for r in range(H):
            if board[r][c]:
                break
        else:
            continue
        c, b = boom(r,c,copy.deepcopy(board), W,H)
        ans.append(shooting(count+c,b, W,H, n+1,N))
    return max(ans) if ans else -1
 
def boom(i,j,board, W,H):
    d = [(1,0), (0,1), (-1,0), (0,-1)]
    stack = [(i,j)]
    count = 0
    while stack:
        r, c = stack.pop()
        if not board[r][c]:
            continue
        for t in range(board[r][c]):
            for dr, dc in d:
                if 0<= r+dr*t <H and 0<= c+dc*t <W and board[r+dr*t][c+dc*t]:
                    stack.append((r+dr*t,c+dc*t))
 
        board[r][c] = 0
        count += 1
     
    return count, fall(board, W,H)
 
def fall(board, W,H):
    for c in range(W):
        for r in range(H-1,-1,-1):
            if board[r][c]:
                rr = r
                while rr+1 != H and not board[rr+1][c]:
                    board[rr+1][c] = board[rr][c]
                    board[rr][c] = 0
                    rr += 1
    return board
 
 
for tc in range(1, int(input())+1):
    N, W, H = map(int,input().split())
    board = [list(map(int,input().split())) for _ in range(H)]
 
    count = 0
    for i in range(H):
        for j in range(W):
            if board[i][j]:
                count+=1
 
    s = shooting(0, board, W, H, 0, N)
    print('#{} {}'.format(tc, count-s if s>0 else 0))
```

`1154 ms` `74,112 KB`



- 함수를 사용해서 구조화
- copy를 안해서 board 객체가 계속 참조되면서 올바른 답이 나오지 않았다. 이 때문에 deepcopy 사용



## 1sss123ss님 코드

```python
def recursive(org_box, idx, org_count):
    global result
    if not result : return
    if idx == N or not org_count:
        result = min(result, org_count)
        return
  
    for w in range(W):
        box = [b[:] for b in org_box]
        stack = list()
        count = org_count
        for h in range(H):
            if box[h][w]:
                stack.append((h, w, box[h][w]))
                box[h][w] = 0
                count -= 1
                break
        if not stack: continue
        while stack:
            y, x, length = stack.pop()
            for l in range(1, length):
                for n, m in (1, 0), (0, 1), (-1, 0), (0, -1):
                    if 0 <= y + n * l < H and 0 <= x + m * l < W and box[y + n * l][x + m * l]:
                        if box[y + n * l][x + m * l] != 1:
                            stack.append((y + n * l, x + m * l, box[y + n * l][x + m * l]))
                        box[y + n * l][x + m * l] = 0
                        count -= 1
        # 맨 밑으로 내리기
        for x in range(W):
            prev = H
            for h in range(H - 1, -1, -1):
                if box[h][x]:
                    if prev - 1 != h: box[prev - 1][x], box[h][x] = box[h][x], box[prev - 1][x]
                    prev -= 1
                else:
                    continue
        recursive(box, idx + 1, count)
  
  
T = int(input())
for t in range(T) :
    N,W,H = map(int,input().split()) # W는 가로, H는 세로
    org_box = [list(map(int,input().split())) for _ in range(H)]
    org_count = sum(True for line in org_box for e in line if e)
    result = org_count+1
    recursive(org_box, 0, org_count)
    print(f"#{t+1} {result}")
```

`397 ms` `63,876 KB`



- deepcopy 대신 직접 [:]로 for문 돌리면서 복사
- 벽돌 숫자+1 => result 변수
  - idx 0부터 recursive 함수 시작(idx는 구슬을 의미)
  - 남은 벽돌이 없거나, 남은 구슬이 없으면 종료
  - 왼쪽부터 오른쪽으로 훝으며 구슬 쏘고->터뜨리고->recursive




- 벽돌 숫자 +1을 하는 이유는??
  - result의 존재 이유가 있나..??
