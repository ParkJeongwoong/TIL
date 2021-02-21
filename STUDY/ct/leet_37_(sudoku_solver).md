# LeetCode

37. Sudoku Solver

https://leetcode.com/problems/sudoku-solver/submissions/

## Description

- Write a program to solve a Sudoku puzzle by filling the empty cells.

  A sudoku solution must satisfy **all of the following rules**:

  1. Each of the digits `1-9` must occur exactly once in each row.
  2. Each of the digits `1-9` must occur exactly once in each column.
  3. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.

  The `'.'` character indicates empty cells.



## Code1

```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        ############################################################ from prob #36
        # row

        # column
        cboard = list(map(list,zip(*board)))
        # box
        box = []
        for i in range(9):
            tmp = []
            for j in range(9):
                tmp.append(board[3*(i//3) + j//3][3*(i%3) + j%3])
            box.append(tmp)
        #############################################################
        left = 0 # numbers left
        for i in board:
            left += i.count('.')

        while left > 0:
            for r in range(9):
                for c in range(9):
                    if board[r][c] == '.': # if it is empty
                        nums = {'1','2','3','4','5','6','7','8','9'}
                        nums -= set(board[r]) 
                        nums -= set(cboard[c])
                        nums -= set(box[3*(r//3) + (c//3)])

                        if len(nums) == 1:
                            num = nums.pop()
                            board[r][c] = num
                            cboard[c][r] = num
                            box[3*(r//3) + (c//3)][3*(r%3) + c%3] = num

                            left -= 1
```

- 테스트 케이스는 통과했지만 제출 시 `Time Limit Exceeded` 발생

  - 이것만으로는 풀 수 없는 케이스가 있기 때문

    (그 케이스에서 while문을 못 빠져나와 문제가 생긴 것으로 보인다)

- 근데 원래 스도쿠는 박스 단위로 풀어야 함



## Code2

VS Code 버전

```
board = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]

def solveSudoku(board):
    """
    Do not return anything, modify board in-place instead.
    """
    for i in range(9):
        print(' '.join(board[i]))
    print('====================================')
    ############################################################ from prob #36
    # row
    
    # column
    cboard = list(map(list,zip(*board)))
    # box
    box = []
    for i in range(9):
        tmp = []
        for j in range(9):
            tmp.append(board[3*(i//3) + j//3][3*(i%3) + j%3])
        box.append(tmp)
    #############################################################
    left = 0 # 채워야 하는 칸 수
    for i in board:
        left += i.count('.')
    
    while left > 0:
        sleft = left
        # 마지막 숫자를 찾는 경우
        for boxnum in range(9): # box number
            candidate = [set()]*9
            for cell in range(9): # cell number
                r = 3*(boxnum//3) + cell//3
                c = 3*(boxnum%3) + cell%3

                if board[r][c] == '.': # if it is empty
                    candidate[cell] = {'1','2','3','4','5','6','7','8','9'}
                    candidate[cell] -= set(board[r])
                    candidate[cell] -= set(cboard[c])
                    candidate[cell] -= set(box[boxnum])

                    if len(candidate[cell]) == 1:
                        num = candidate[cell].pop()
                        board[r][c] = num # update data
                        cboard[c][r] = num
                        box[boxnum][cell] = num
                        for can in candidate: # discard from candidate
                            can.discard(num)
                        print(num,'into',r,c)
                        left -= 1
            print('---')

            # 주변과 비교해서 하나의 숫자만 가능한 경우
            for cell in range(9):
                tmp = set(candidate[cell])
                for neighbor in range(9):
                    if cell != neighbor:
                        tmp -= candidate[neighbor]
                if len(tmp) == 1:
                    print(candidate)
                    r = 3*(boxnum//3) + cell//3
                    c = 3*(boxnum%3) + cell%3

                    num = tmp.pop()
                    board[r][c] = num # update data
                    cboard[c][r] = num
                    box[boxnum][cell] = num
                    for can in candidate: # discard from candidate
                        can.discard(num)
                    print(num,'into',r,c)
                    left -= 1
            print('///')


        for i in range(9):
            print(' '.join(board[i]))
        print('==========================================')

        if sleft == left:
            break
        

solveSudoku(board)
```

문제의 테스트 케이스

```
. . 9 7 4 8 . . .
7 . . . . . . . .
. 2 . 1 . 9 . . .
. . 7 . . . 2 4 .
. 6 4 . 1 . 5 9 .
. 9 8 . . . 3 . .
. . . 8 . 3 . 2 .
. . . . . . . . 6
. . . 2 7 5 9 . .
```

```
. . 9 7 4 8 . . 2
7 . . 6 . 2 . . 9
. 2 . 1 . 9 . . .
. . 7 9 8 6 2 4 1
2 6 4 3 1 7 5 9 8
1 9 8 5 2 4 3 6 7
9 . . 8 6 3 . 2 .
. . 2 4 9 1 . . 6
. . . 2 7 5 9 . .
```

아래 단계까지에서 더 이상 풀리지 않는다.



스도쿠 기술적인 접근보다는 알고리즘적인 접근의 문제라고 생각된다.

백트래킹이 후보인데 경우의 수를 버틸 수 있을지 모르겠다.



```python
import copy
board = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]
def backtracking(bboard,candlist,left):
    if left == 0:
        board = bboard
        return
    for r in range(9):
        for c in range(9):
            if type(candlist[r][c]) == set:
                tmpcandlist = candlist[r][c]
                while tmpcandlist:
                    tmp = tmpcandlist.pop()
                    tmpboard = copy.deepcopy(bboard)
                    tmpboard[r][c] = tmp
                    if isvalid(tmpboard):
                        newcandlist = copy.deepcopy(candlist)
                        newcandlist[r][c] = tmp
                        for rr in range(9):
                            if type(newcandlist[rr][c]) == set:
                                newcandlist[rr][c].discard(tmp)
                        for cc in range(9):
                            if type(newcandlist[r][cc]) == set:
                                newcandlist[r][cc].discard(tmp)
                        backtracking(bboard,newcandlist,left-1)
                



def isvalid(board):
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



def solveSudoku(board):
    """
    Do not return anything, modify board in-place instead.
    """
    for i in range(9):
        print(' '.join(board[i]))
    print('====================================')
    ############################################################ from prob #36
    # row
    
    # column
    cboard = list(map(list,zip(*board)))
    # box
    box = []
    for i in range(9):
        tmp = []
        for j in range(9):
            tmp.append(board[3*(i//3) + j//3][3*(i%3) + j%3])
        box.append(tmp)
    #############################################################
    left = 0 # 채워야 하는 칸 수
    for i in board:
        left += i.count('.')
    
    while left > 0:
        sleft = left
        # 마지막 숫자를 찾는 경우
        for boxnum in range(9): # box number
            candidate = [set()]*9
            for cell in range(9): # cell number
                r = 3*(boxnum//3) + cell//3
                c = 3*(boxnum%3) + cell%3

                if board[r][c] == '.': # if it is empty
                    candidate[cell] = {'1','2','3','4','5','6','7','8','9'}
                    candidate[cell] -= set(board[r])
                    candidate[cell] -= set(cboard[c])
                    candidate[cell] -= set(box[boxnum])

                    if len(candidate[cell]) == 1:
                        num = candidate[cell].pop()
                        board[r][c] = num # update data
                        cboard[c][r] = num
                        box[boxnum][cell] = num
                        for can in candidate: # discard from candidate
                            can.discard(num)
                        print(num,'into',r,c)
                        left -= 1
            print('---')

            # 주변과 비교해서 하나의 숫자만 가능한 경우
            for cell in range(9):
                tmp = set(candidate[cell])
                for neighbor in range(9):
                    if cell != neighbor:
                        tmp -= candidate[neighbor]
                if len(tmp) == 1:
                    print(candidate)
                    r = 3*(boxnum//3) + cell//3
                    c = 3*(boxnum%3) + cell%3

                    num = tmp.pop()
                    board[r][c] = num # update data
                    cboard[c][r] = num
                    box[boxnum][cell] = num
                    for can in candidate: # discard from candidate
                        can.discard(num)
                    print(num,'into',r,c)
                    left -= 1
            print('///')


        for i in range(9):
            print(' '.join(board[i]))
        print('==========================================')

        if sleft == left:
            break
    #### 여기서부턴 후보군으로 접근

    ### 백트래킹의 부담을 줄이기 위해 여기서부터 백트래킹 적용

    # 후보군 그룹을 만듦. 확정 숫자의 경우 string, 미정의 경우 set type
    candlist = [[0]*9 for _ in range(9)]
    for r in range(9):
        for c in range(9):
            if board[r][c] == '.':
                candidate = {'1','2','3','4','5','6','7','8','9'}
                candidate -= set(board[r])
                candidate -= set(cboard[c])
                candidate -= set(box[3*(r//3) + (c//3)])
                # print(r,c,':',candidate)
                candlist[r][c] = candidate
            else:
                candlist[r][c] = board[r][c]

    # print(candlist)
######################################################################
    print(candlist)
    board = backtracking(board[:],candlist[:],left) # 색칠할 board와 후보군과 남은 수를 같이 준다.


    
solveSudoku(board)
```

- 이 방식대로 하면 VS Code로 그냥 돌려도 안 된다. (식이 잘못 되었을 수도 있다)



## Code3

생각을 해보니 이미 특정 Board가 주어졌을 때 유일항을 찾아 넣는 기법은 완성했다.

지금 찾아야 하는 건 경우의 수를 집어 넣는 구조.

 

- 유일항을 찾는 코드

```python
def solveSudoku(board):
    """
    Do not return anything, modify board in-place instead.
    """
    for i in range(9):
        print(' '.join(board[i]))
    print('====================================')
    ############################################################ from prob #36
    # row
    
    # column
    cboard = list(map(list,zip(*board)))
    # box
    box = []
    for i in range(9):
        tmp = []
        for j in range(9):
            tmp.append(board[3*(i//3) + j//3][3*(i%3) + j%3])
        box.append(tmp)
    #############################################################
    left = 0 # 채워야 하는 칸 수
    for i in board:
        left += i.count('.')
    
    while left > 0:
        sleft = left
        # 마지막 숫자를 찾는 경우
        for boxnum in range(9): # box number
            candidate = [set()]*9
            for cell in range(9): # cell number
                r = 3*(boxnum//3) + cell//3
                c = 3*(boxnum%3) + cell%3

                if board[r][c] == '.': # if it is empty
                    candidate[cell] = {'1','2','3','4','5','6','7','8','9'}
                    candidate[cell] -= set(board[r])
                    candidate[cell] -= set(cboard[c])
                    candidate[cell] -= set(box[boxnum])

                    if len(candidate[cell]) == 1:
                        num = candidate[cell].pop()
                        board[r][c] = num # update data
                        cboard[c][r] = num
                        box[boxnum][cell] = num
                        for can in candidate: # discard from candidate
                            can.discard(num)
                        print(num,'into',r,c)
                        left -= 1
            print('---')

            # 주변과 비교해서 하나의 숫자만 가능한 경우
            for cell in range(9):
                tmp = set(candidate[cell])
                for neighbor in range(9):
                    if cell != neighbor:
                        tmp -= candidate[neighbor]
                if len(tmp) == 1:
                    print(candidate)
                    r = 3*(boxnum//3) + cell//3
                    c = 3*(boxnum%3) + cell%3

                    num = tmp.pop()
                    board[r][c] = num # update data
                    cboard[c][r] = num
                    box[boxnum][cell] = num
                    for can in candidate: # discard from candidate
                        can.discard(num)
                    print(num,'into',r,c)
                    left -= 1
            print('///')


        for i in range(9):
            print(' '.join(board[i]))
        print('==========================================')

        if sleft == left:
            break



        
solveSudoku(board)
```

여기다가, 새로운 경우의 수를 집어 넣고 재귀를 돌리면 된다.

- Class method에서의 재귀 함수 꼴

```python
class Solution:
    count = 10
    def solveSudoku(self, board):
        print(Solution.count,board)
        Solution.count -= 1
        if Solution.count > 0:
            Solution.solveSudoku(self,2) # 이렇게 메서드 형식으로 호출
        
Solution.solveSudoku('a',1)
print(Solution.count)
```



- 추가적으로 해야하는 작업은?

  1. 새로운 board(deep copy)를 만들고 후보군 중 하나의 값 추가

  2. 새로운 board 변수를 인자로 하여 solvesudoku를 재귀함수로 호출

  3. 새로운 isvalid 함수 : <u>set이면서(확정이 아니면서)</u>, <u>len가 0</u>인 후보가 있으면 False

  4. left가 0이 되는 순간 새로운 board 변수를 기존의 board 변수에 입력

- 변경점

  1. solvesudoku는 return을 할 수 없기 때문에 재귀로 사용할 수 없다.

     (함수에서 사용한 변수들은 함수가 끝나면 사라지기 때문에 상위 레벨로 전달할 수 있는 건 return 뿐)

     => rec 함수를 새로 추가하여 재귀로 사용)

  2. 생각해보니 백트래킹을 쓸 거면 조건에 안 맞을 때 거르는 작업이 더 중요하다.



## Code4

```python
import copy

######################################################################################
##################################### RECURSIVE ######################################
######################################################################################

def rec(board): ######## 기본 함수랑 같음!!!!!!!!!!! <= 기본 함수는 return을 못해서 새로 만든 거
    ############################################################ from prob #36
    # row
    
    # column
    cboard = list(map(list,zip(*board)))
    # box
    box = []
    for i in range(9):
        tmp = []
        for j in range(9):
            tmp.append(board[3*(i//3) + j//3][3*(i%3) + j%3])
        box.append(tmp)
    #############################################################
    left = 0 # 채워야 하는 칸 수
    for i in board:
        left += i.count('.')
    
    while left > 0:
        sleft = left
        # 마지막 숫자를 찾는 경우
        for boxnum in range(9): # box number
            candidate = [set()]*9
            for cell in range(9): # cell number
                r = 3*(boxnum//3) + cell//3
                c = 3*(boxnum%3) + cell%3

                if board[r][c] == '.': # if it is empty
                    candidate[cell] = {'1','2','3','4','5','6','7','8','9'}
                    candidate[cell] -= set(board[r])
                    candidate[cell] -= set(cboard[c])
                    candidate[cell] -= set(box[boxnum])

                    if len(candidate[cell]) == 1:
                        num = candidate[cell].pop()
                        board[r][c] = num # update data
                        cboard[c][r] = num
                        box[boxnum][cell] = num
                        for can in candidate: # discard from candidate
                            can.discard(num)
                        left -= 1

            # 주변과 비교해서 하나의 숫자만 가능한 경우
            for cell in range(9):
                tmp = set(candidate[cell])
                for neighbor in range(9):
                    if cell != neighbor:
                        tmp -= candidate[neighbor]
                if len(tmp) == 1:
                    r = 3*(boxnum//3) + cell//3
                    c = 3*(boxnum%3) + cell%3

                    num = tmp.pop()
                    board[r][c] = num # update data
                    cboard[c][r] = num
                    box[boxnum][cell] = num
                    for can in candidate: # discard from candidate
                        can.discard(num)
                    left -= 1

        if sleft == left:
            break
    
    
    if left == 0:
        return board
    
    print('recursive')
    for i in range(9):
        print(' '.join(board[i]))
    # print(board)
    print('==========================================')
    #### 여기서부턴 후보군으로 접근

    ### 백트래킹의 부담을 줄이기 위해 여기서부터 백트래킹 적용

    # 후보군 그룹을 만듦. 확정 숫자의 경우 string, 미정의 경우 set type
    candlist = [[0]*9 for _ in range(9)]
    for r in range(9):
        for c in range(9):
            if board[r][c] == '.':
                candidate = {'1','2','3','4','5','6','7','8','9'}
                candidate -= set(board[r])
                candidate -= set(cboard[c])
                candidate -= set(box[3*(r//3) + (c//3)])
                candlist[r][c] = candidate
            else:
                candlist[r][c] = board[r][c]
######################################################################
    #### is valid? : to be valid, every cell should have number(string) or candidates(set, have more than one element)
    # which means, if there's a set type and have no candidate in candlist, that board is invalid
    isvalid = True
    for r in range(9):
        for c in range(9):
            if type(candlist[r][c]) == set and len(candlist[r][c]) == 0:
                isvalid = False
                break
        if isvalid == False:
            break
######################################################################
    print(candlist)
    maybe = None
    if isvalid:
        for r in range(9):
            for c in range(9):
                if type(candlist[r][c]) == set:
                    while candlist[r][c]:
                        tryboard = copy.deepcopy(board)
                        trythis = candlist[r][c].pop()
                        tryboard[r][c] = trythis
                        maybe = rec(tryboard)
                        if maybe and isvalidf(maybe):
                            return maybe
                        else: # if not, if left candidate is one, that's the correct value.
                            columnlist = []
                            for column in range(9):
                                if column != c:
                                    if trythis in candlist[r][column]:
                                        columnlist.append(column)
                            if len(columnlist) == 1:
                                board[r][columnlist.pop()] = trythis
                            
                            rowlist = []
                            for row in range(9):
                                if row != r:
                                    if trythis in candlist[row][c]:
                                        rowlist.append(row)
                            if len(rowlist) == 1:
                                board[rowlist.pop()][c] = trythis
                            
                            boxnum = 3*(r//3) + (c//3)
                            cellnum = 3*(r%3) + (c%3)
                            boxlist = []
                            for cell in range(9):
                                if cell != cellnum:
                                    if trythis in candlist[3*(boxnum//3) + cell//3][3*(boxnum%3) + cell%3]:
                                        boxlist.append(cell)
                            if len(boxlist) == 1:
                                lastcellnum = boxlist.pop()
                                board[3*(boxnum//3) + lastcellnum//3][3*(boxnum%3) + lastcellnum%3] = trythis


                if maybe:
                    break
            if maybe:
                break
    


######################################################################################
###################################### ISVALID #######################################
######################################################################################
def isvalidf(board):
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

######################################################################################
######################################## MAIN ########################################
######################################################################################

# main
# board = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]
# debugging
board = [['.', '.', '9', '7', '4', '8', '.', '.', '2'], ['7', '.', '.', '6', '.', '2', '.', '.', '9'], ['.', '2', '.', '1', '.', '9', '.', '.', '.'], ['.', '.', '7', '9', '8', '6', '2', '4', '1'], ['2', '6', '4', '3', '1', '7', '5', '9', '8'], ['1', '9', '8', '5', '2', '4', '3', '6', '7'], ['9', '.', '.', '8', '6', '3', '.', '2', '.'], ['.', '.', '2', '4', '9', '1', '.', '.', '6'], ['.', '.', '.', '2', '7', '5', '9', '.', '.']]
def solveSudoku(board):
    """
    Do not return anything, modify board in-place instead.
    """
    for i in range(9):
        print(' '.join(board[i]))
    print('====================================')
    ############################################################ from prob #36
    # row
    
    # column
    cboard = list(map(list,zip(*board)))
    # box
    box = []
    for i in range(9):
        tmp = []
        for j in range(9):
            tmp.append(board[3*(i//3) + j//3][3*(i%3) + j%3])
        box.append(tmp)
    #############################################################
    left = 0 # 채워야 하는 칸 수
    for i in board:
        left += i.count('.')
    
    while left > 0:
        sleft = left
        # 마지막 숫자를 찾는 경우
        for boxnum in range(9): # box number
            candidate = [set()]*9
            for cell in range(9): # cell number
                r = 3*(boxnum//3) + cell//3
                c = 3*(boxnum%3) + cell%3

                if board[r][c] == '.': # if it is empty
                    candidate[cell] = {'1','2','3','4','5','6','7','8','9'}
                    candidate[cell] -= set(board[r])
                    candidate[cell] -= set(cboard[c])
                    candidate[cell] -= set(box[boxnum])

                    if len(candidate[cell]) == 1:
                        num = candidate[cell].pop()
                        board[r][c] = num # update data
                        cboard[c][r] = num
                        box[boxnum][cell] = num
                        for can in candidate: # discard from candidate
                            can.discard(num)
                        left -= 1

            # 주변과 비교해서 하나의 숫자만 가능한 경우 ** box 뿐만 아니라 여기도 row, column을 추가해야 한다.
            for cell in range(9):
                tmp = set(candidate[cell])
                for neighbor in range(9):
                    if cell != neighbor:
                        tmp -= candidate[neighbor]
                if len(tmp) == 1:
                    r = 3*(boxnum//3) + cell//3
                    c = 3*(boxnum%3) + cell%3

                    num = tmp.pop()
                    board[r][c] = num # update data
                    cboard[c][r] = num
                    box[boxnum][cell] = num
                    for can in candidate: # discard from candidate
                        can.discard(num)
                    left -= 1


        for i in range(9):
            print(' '.join(board[i]))
        print('==========================================')

        if sleft == left:
            break
    #### 여기서부턴 후보군으로 접근

    ### 백트래킹의 부담을 줄이기 위해 여기서부터 백트래킹 적용

    # 후보군 그룹을 만듦. 확정 숫자의 경우 string, 미정의 경우 set type
    candlist = [[0]*9 for _ in range(9)]
    for r in range(9):
        for c in range(9):
            if board[r][c] == '.':
                candidate = {'1','2','3','4','5','6','7','8','9'}
                candidate -= set(board[r])
                candidate -= set(cboard[c])
                candidate -= set(box[3*(r//3) + (c//3)])
                candlist[r][c] = candidate
            else:
                candlist[r][c] = board[r][c]

    print('candlist\n',candlist)
    # print(board)
######################################################################
    #### is valid? : to be valid, every cell should have number(string) or candidates(set, have more than one element)
    # which means, if there's a set type and have no candidate in candlist, that board is invalid
    isvalid = True
    for r in range(9):
        for c in range(9):
            if type(candlist[r][c]) == set and len(candlist[r][c]) == 0:
                isvalid = False
                break
        if isvalid == False:
            break
######################################################################
    maybe = None
    if isvalid:
        for r in range(9):
            for c in range(9):
                if type(candlist[r][c]) == set:
                    while candlist[r][c]:
                        tryboard = copy.deepcopy(board)
                        trythis = candlist[r][c].pop()
                        tryboard[r][c] = trythis
                        maybe = rec(tryboard)
                        if maybe:
                            board = maybe
                            break
                        else: # if not, if left candidate is one, that's the correct value.
                            columnlist = []
                            for column in range(9):
                                if column != c:
                                    if trythis in candlist[r][column]:
                                        columnlist.append(column)
                            if len(columnlist) == 1:
                                board[r][columnlist.pop()] = trythis
                            
                            rowlist = []
                            for row in range(9):
                                if row != r:
                                    if trythis in candlist[row][c]:
                                        rowlist.append(row)
                            if len(rowlist) == 1:
                                board[rowlist.pop()][c] = trythis
                            
                            boxnum = 3*(r//3) + (c//3)
                            cellnum = 3*(r%3) + (c%3)
                            boxlist = []
                            for cell in range(9):
                                if cell != cellnum:
                                    if trythis in candlist[3*(boxnum//3) + cell//3][3*(boxnum%3) + cell%3]:
                                        boxlist.append(cell)
                            if len(boxlist) == 1:
                                lastcellnum = boxlist.pop()
                                board[3*(boxnum//3) + lastcellnum//3][3*(boxnum%3) + lastcellnum%3] = trythis



                if maybe:
                    break
            if maybe:
                break


    print('!!!!!result!!!!!')
    for i in range(9):
        print(' '.join(board[i]))
    print(board)
solveSudoku(board)
```

- 문제의 테스트 케이스 통과

```
5 1 9 7 4 8 6 3 2
7 8 3 6 5 2 4 1 9
4 2 6 1 3 9 8 7 5
3 5 7 9 8 6 2 4 1
2 6 4 3 1 7 5 9 8
1 9 8 5 2 4 3 6 7
9 7 5 8 6 3 1 2 4
8 3 2 4 9 1 7 5 6
6 4 1 2 7 5 9 8 3
```

- isvalid 통과

```python
# main
# board = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]
# debugging
board = [['.', '.', '9', '7', '4', '8', '.', '.', '2'], ['7', '.', '.', '6', '.', '2', '.', '.', '9'], ['.', '2', '.', '1', '.', '9', '.', '.', '.'], ['.', '.', '7', '9', '8', '6', '2', '4', '1'], ['2', '6', '4', '3', '1', '7', '5', '9', '8'], ['1', '9', '8', '5', '2', '4', '3', '6', '7'], ['9', '.', '.', '8', '6', '3', '.', '2', '.'], ['.', '.', '2', '4', '9', '1', '.', '.', '6'], ['.', '.', '.', '2', '7', '5', '9', '.', '.']]
# ??
board = [['5', '1', '9', '7', '4', '8', '6', '3', '2'], ['7', '8', '3', '6', '5', '2', '4', '1', '9'], ['4', '2', '6', '1', '3', '9', '8', '7', '5'], ['3', '5', '7', '9', '8', '6', '2', '4', '1'], ['2', '6', '4', '3', '1', '7', '5', '9', '8'], ['1', '9', '8', '5', '2', '4', '3', '6', '7'], ['9', '7', '5', '8', '6', '3', '1', '2', '4'], ['8', '3', '2', '4', '9', '1', '7', '5', '6'], ['6', '4', '1', '2', '7', '5', '9', '8', '3']]

for i in range(9):
    print(' '.join(board[i]))

def isvalid(board):
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
    
print(isvalid(board))
```

```
5 1 9 7 4 8 6 3 2
7 8 3 6 5 2 4 1 9
4 2 6 1 3 9 8 7 5
3 5 7 9 8 6 2 4 1
2 6 4 3 1 7 5 9 8
1 9 8 5 2 4 3 6 7
9 7 5 8 6 3 1 2 4
8 3 2 4 9 1 7 5 6
6 4 1 2 7 5 9 8 3
True
```



분명히 풀었는데, leetcode 상에선 board가 바뀐 것이 반영이 되지 않았다.

재귀로 들어가면서부터의 변경사항이 반영이 안 된다.



## Final Code

```python
import copy

class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        ######################################################################################
        ##################################### RECURSIVE ######################################
        ######################################################################################

        def rec(board): ######## 기본 함수랑 같음!!!!!!!!!!! <= 기본 함수는 return을 못해서 새로 만든 거
            ############################################################ from prob #36
            # row

            # column
            cboard = list(map(list,zip(*board)))
            # box
            box = []
            for i in range(9):
                tmp = []
                for j in range(9):
                    tmp.append(board[3*(i//3) + j//3][3*(i%3) + j%3])
                box.append(tmp)
            #############################################################
            left = 0 # 채워야 하는 칸 수
            for i in board:
                left += i.count('.')

            while left > 0:
                sleft = left
                # 마지막 숫자를 찾는 경우
                for boxnum in range(9): # box number
                    candidate = [set()]*9
                    for cell in range(9): # cell number
                        r = 3*(boxnum//3) + cell//3
                        c = 3*(boxnum%3) + cell%3

                        if board[r][c] == '.': # if it is empty
                            candidate[cell] = {'1','2','3','4','5','6','7','8','9'}
                            candidate[cell] -= set(board[r])
                            candidate[cell] -= set(cboard[c])
                            candidate[cell] -= set(box[boxnum])

                            if len(candidate[cell]) == 1:
                                num = candidate[cell].pop()
                                board[r][c] = num # update data
                                cboard[c][r] = num
                                box[boxnum][cell] = num
                                for can in candidate: # discard from candidate
                                    can.discard(num)
                                left -= 1

                    # 주변과 비교해서 하나의 숫자만 가능한 경우
                    for cell in range(9):
                        tmp = set(candidate[cell])
                        for neighbor in range(9):
                            if cell != neighbor:
                                tmp -= candidate[neighbor]
                        if len(tmp) == 1:
                            r = 3*(boxnum//3) + cell//3
                            c = 3*(boxnum%3) + cell%3

                            num = tmp.pop()
                            board[r][c] = num # update data
                            cboard[c][r] = num
                            box[boxnum][cell] = num
                            for can in candidate: # discard from candidate
                                can.discard(num)
                            left -= 1

                if sleft == left:
                    break


            if left == 0:
                self.board = board
                return board



            #### 여기서부턴 후보군으로 접근

            ### 백트래킹의 부담을 줄이기 위해 여기서부터 백트래킹 적용

            # 후보군 그룹을 만듦. 확정 숫자의 경우 string, 미정의 경우 set type
            candlist = [[0]*9 for _ in range(9)]
            for r in range(9):
                for c in range(9):
                    if board[r][c] == '.':
                        candidate = {'1','2','3','4','5','6','7','8','9'}
                        candidate -= set(board[r])
                        candidate -= set(cboard[c])
                        candidate -= set(box[3*(r//3) + (c//3)])
                        candlist[r][c] = candidate
                    else:
                        candlist[r][c] = board[r][c]
        ######################################################################
            #### is valid? : to be valid, every cell should have number(string) or candidates(set, have more than one element)
            # which means, if there's a set type and have no candidate in candlist, that board is invalid
            isvalid = True
            for r in range(9):
                for c in range(9):
                    if type(candlist[r][c]) == set and len(candlist[r][c]) == 0:
                        isvalid = False
                        break
                if isvalid == False:
                    break
        ######################################################################
            if isvalid:
                maybe = None
                for r in range(9):
                    for c in range(9):
                        if type(candlist[r][c]) == set:
                            while candlist[r][c]:
                                tryboard = copy.deepcopy(board)
                                trythis = candlist[r][c].pop()
                                tryboard[r][c] = trythis
                                maybe = rec(tryboard)
                                if maybe and isvalidf(maybe):
                                    board = maybe
                                    return maybe
                                else: # if not, if left candidate is one, that's the correct value.
                                    columnlist = []
                                    for column in range(9):
                                        if column != c:
                                            if trythis in candlist[r][column]:
                                                columnlist.append(column)
                                    if len(columnlist) == 1:
                                        board[r][columnlist.pop()] = trythis

                                    rowlist = []
                                    for row in range(9):
                                        if row != r:
                                            if trythis in candlist[row][c]:
                                                rowlist.append(row)
                                    if len(rowlist) == 1:
                                        board[rowlist.pop()][c] = trythis

                                    boxnum = 3*(r//3) + (c//3)
                                    cellnum = 3*(r%3) + (c%3)
                                    boxlist = []
                                    for cell in range(9):
                                        if cell != cellnum:
                                            if trythis in candlist[3*(boxnum//3) + cell//3][3*(boxnum%3) + cell%3]:
                                                boxlist.append(cell)
                                    if len(boxlist) == 1:
                                        lastcellnum = boxlist.pop()
                                        board[3*(boxnum//3) + lastcellnum//3][3*(boxnum%3) + lastcellnum%3] = trythis


                        if maybe:
                            break
                    if maybe:
                        break



        ######################################################################################
        ###################################### ISVALID #######################################
        ######################################################################################
        def isvalidf(board):
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
        self.board = board
        rec(board)
        for i in range(9):
            for j in range(9):
                board[i][j] = self.board[i][j]
```

![image-20210221143628070](leet_37_(sudoku_solver).assets/image-20210221143628070.png)

- 문제의 원인은 **객체**였다.
- 문제에서 `do not return anything, modify board in-place instead`란 말이 해당 객체 자체를 변경하라는 뜻
- 그런데 board는 리스트 이기 때문에 주소를 참조하는 형태라 새로운 리스트 형태의 값을 저장하면 주소가 바뀌어 버리게 됨. (즉 이 전에 print했을 때 나온 값은 board라는 이름을 가진 새로운 객체임)
- 따라서 이를 해결하기 위해 self.board라는 인스턴스 변수에다가 최종 값을 저장하고
- 이중 for문을 이용하여 2차원 리스트의 요소를 하나씩 변경했다. (board 리스트가 참조하는 주소가 바뀌지 않도록)

* **변수를 저장할 때 객체가 바뀌지 않도록 주의해야겠다**.

즉, 실제 동작 구조는 이렇다.

```python
board = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]
Solution().solveSudoku(board)
print(board) # 이게 output
```

입력된 board 객체를 바꾸지 않으면 output에 반영되지 않는다.



- 문제의 결과에 대해 이야기하자면 상위 0.1%의 runtime이 나왔다.
- 아마 여러 스도쿠 기법을 이용해 경우의 수를 최대한 줄였기 때문이라고 생각한다.
- 반면 메모리 사용량는 상위 95%가 나왔다.
  - **이는 deepcopy를 사용했기 때문으로 보인다.**
  - 개선을 위한 여러 방법을 시도했는데, 만약 특정 경로가 False라면 속도 개선을 위해 사용 했던 기법들을 전부 초기화 시키고 원점으로 돌아가야 하는데 이때 deepcopy로 backup을 해놓을 수 밖에 없다는 걸 깨달았다.
  - 즉 deepcopy를 안 쓰고 메모리를 아끼려면 속도 개선을 위한 기법들을 다 뜯어 고쳐야 한다.



- 코드가 지금 굉장히 지저분한데, 정리해야 할 필요성이 있다.
