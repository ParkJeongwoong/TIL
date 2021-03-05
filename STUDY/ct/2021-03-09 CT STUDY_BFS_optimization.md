from collections import deque
import sys
input = sys.stdin.readline

M, N = map(int, input().split())

d = [(-1, 0), (0, 1), (1, 0), (0, -1)]
tomatos = N * M
queue = deque()
day = 0

box = [[-1] * (M + 2)]  # padding
for i in range(1,N+1):
    box.append([-1] + list(map(int, input().split())) + [-1])  # padding
    
    for j in range(1,M+1):
        if box[i][j] == 1:
            queue.append((i,j))
            tomatos -= 1
        elif box[i][j] == -1:
            tomatos -= 1
            
box.append([-1] * (M + 2))  # padding

while queue:
    r, c = queue.popleft()

    for dr, dc in d:
        if box[r+dr][c+dc] == 0:
            queue.append((r+dr,c+dc))
            box[r+dr][c+dc] = box[r][c]+1
            tomatos -= 1
            day = box[r][c]


if tomatos:
    print(-1)
else:
    print(day)
