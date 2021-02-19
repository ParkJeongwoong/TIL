# LeetCode

36. Valid Sudoku

https://leetcode.com/problems/valid-sudoku/submissions/

## Description

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:

1. Each row must contain the digits `1-9` without repetition.
2. Each column must contain the digits `1-9` without repetition.
3. Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

**Note:**

- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.



## Code

```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        # row
        r_board = []
        for i in range(9):
            r_board.append(''.join(board[i]).replace('.',''))
        # print(r_board)
        
        # column
        cboard = list(zip(*board))
        c_board = []
        for i in range(9):
            c_board.append(''.join(cboard[i]).replace('.',''))
        # print(c_board)
        
        # box
        box = []
        for i in range(9):
            tmp = []
            for j in range(9):
                tmp.append(board[3*(i//3) + j//3][3*(i%3) + j%3])
            box.append(''.join(tmp).replace('.',''))
        # print(box)
        
        for i in range(9):
            if len(r_board[i]) != len(set(r_board[i])):
                return False
            
            if len(c_board[i]) != len(set(c_board[i])):
                return False
            
            if len(box[i]) != len(set(box[i])):
                return False
            
        return True
```

![image](https://user-images.githubusercontent.com/77447841/108459786-b3259400-72ba-11eb-86b6-99a6e563a95b.png)

- 각 행, 열, 3x3 박스 안의 숫자를 구한다.
- set을 이용해서 겹치는 지 확인



## Improved Code

```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        # row
        for i in range(9):
            r_board = (''.join(board[i]).replace('.',''))
            if len(r_board) != len(set(r_board)):
                return False
        
        # column
        cboard = list(zip(*board))
        for i in range(9):
            c_board = (''.join(cboard[i]).replace('.',''))
            if len(c_board) != len(set(c_board)):
                return False    
        
        # box
        for i in range(9):
            tmp = []
            for j in range(9):
                tmp.append(board[3*(i//3) + j//3][3*(i%3) + j%3])
            box = (''.join(tmp).replace('.',''))
            if len(box) != len(set(box)):
                return False
            
        return True
```

![image](https://user-images.githubusercontent.com/77447841/108462096-54164e00-72bf-11eb-9d90-ba50da2c9569.png)

- False 계산을 나중에 하는 게 보기엔 편하지만 매 step마다 하는 게 훨씬 빠르게 함수를 종료시킬 수 있다.

