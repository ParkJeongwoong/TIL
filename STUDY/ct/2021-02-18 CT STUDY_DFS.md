# 2021-02-18 CT STUDY

네 번째 코딩테스트 스터디

지난 번 문제였던 `불 끄기`는 따로 정리하여 기록했다.

나머지 문제는 특이사항이 없었다.



## 오목 판정

https://swexpertacademy.com/main/code/problem/problemDetail.do

### 1차 코드

```python
T = int(input())

def omoking(o):
    if o == 'o':
        return 1
    else:
        return 0

for tc in range(1, T+1):
    N = int(input())
    stones = [] # 돌의 정보
    for o in range(N):
        omok = list(map(omoking,input())) # 오목 판 만들기
        idx = -1 # 찾는 시작점
        for oo in range(omok.count(1)): # 돌 위치 찾기
            idx = omok.index(1,idx+1) # idx 위치부터 돌 찾고 x좌표 위치 반환
            stones.append((idx,o)) # 돌의 x, y 좌표 저장       

    # print(stones)
    # print('------------------------------------------')
    isomok = False
    # 백트래킹이 적합함 (DFS 사용)
    stack = [(stones.pop(0),0,0)] # x, y, count, way
    visited = [0]*(len(stones))

    while stack:
        (x, y), count, way = stack.pop()
        count += 1

        # print(x,y,'!!count = ',count,'@way = ',way)
        
        for nb in range(len(stones)):
            if visited[nb]:
                continue

            if stones[nb] == (x,y+1) and (not way or way ==1):
                stack.append((stones[nb],count,1))
                visited[nb] = 1
                
            if stones[nb] == (x+1,y+1) and (not way or way ==2):
                stack.append((stones[nb],count,2))
                visited[nb] = 1
            if stones[nb] == (x+1,y) and (not way or way ==3):
                stack.append((stones[nb],count,3))
                visited[nb] = 1
            if stones[nb] == (x+1,y-1) and (not way or way ==4):
                stack.append((stones[nb],count,4))  
                visited[nb] = 1

            if stones[nb] == (x,y-1) and (not way or way ==5):
                stack.append((stones[nb],count,5))
                visited[nb] = 1     
                
            if stones[nb] == (x-1,y+1) and (not way or way ==6):
                stack.append((stones[nb],count,6))
                visited[nb] = 1
            if stones[nb] == (x-1,y) and (not way or way ==7):
                stack.append((stones[nb],count,7))
                visited[nb] = 1
            if stones[nb] == (x-1,y-1) and (not way or way ==8):
                stack.append((stones[nb],count,8))
                visited[nb] = 1
        
        # print(stack)

        if count == 5:
            isomok = True
            break

        if not stack and stones:
            stack = [(stones.pop(0),0,0)]
            visited = [0]*(len(stones))
            
    print('#{} {}'.format(tc, 'YES' if isomok else 'NO'))
```

- DFS를 적용하면 쉽게 풀 수 있을 거라고 생각했는데, 이상하게 테스트 케이스 100개 중 19개만 성공했다.
  - 완전 탐색으로 구현해보고 테스트 머신을 만들어 다른 결과가 나오는 게 어떤 경우인지 확인해봐야겠다.



### 확인용 코드

```python
def omoking(omok):
    for y in range(N-4):
        for x in range(N-4):
            # 가로 확인
            for garo in range(5):
                if 'ooooo' in omok[y+garo][x:x+5]:
                    return True
            # 세로 확인
            for sero in range(5):
                if 'o' in omok[y][x+sero] and 'o' in omok[y+1][x+sero] and 'o' in omok[y+2][x+sero] and 'o' in omok[y+3][x+sero] and 'o' in omok[y+4][x+sero]:
                    return True
            # 우상향 확인
            if 'o' in omok[y][x] and 'o' in omok[y+1][x+1] and 'o' in omok[y+2][x+2] and 'o' in omok[y+3][x+3] and 'o' in omok[y+4][x+4]:
                return True
            # 우하향 확인
            if 'o' in omok[y+4][x] and 'o' in omok[y+3][x+1] and 'o' in omok[y+2][x+2] and 'o' in omok[y+1][x+3] and 'o' in omok[y][x+4]:
                return True
    return False
                

T = int(input())

for tc in range(1, T+1):
    N = int(input())
    omok = [] # 오목판
    for o in range(N):
        omok.append(input()) # 오목 판 만들기
    
    isomok = omoking(omok)


    print('#{} {}'.format(tc, 'YES' if isomok else 'NO'))
```



### Test Machine

```python
import random
import sys
case = int(input())

wrong = 0
for tc in range(case):

    N = int(random.randint(5,20)) # 20
    omok = []
    for i in range(N):
        row = ''
        for ii in range(N):
            row += 'o' if random.randint(0,1) else '.'
        omok.append(row)

################################## ( 1 ) 
    def omoking(omok):
        for y in range(N-4):
            for x in range(N-4):
                # 가로 확인
                for garo in range(5):
                    if 'ooooo' in omok[y+garo][x:x+5]:
                        return True
                # 세로 확인
                for sero in range(5):
                    if 'o' in omok[y][x+sero] and 'o' in omok[y+1][x+sero] and 'o' in omok[y+2][x+sero] and 'o' in omok[y+3][x+sero] and 'o' in omok[y+4][x+sero]:
                        return True
                # 우상향 확인
                if 'o' in omok[y][x] and 'o' in omok[y+1][x+1] and 'o' in omok[y+2][x+2] and 'o' in omok[y+3][x+3] and 'o' in omok[y+4][x+4]:
                    return True
                # 우하향 확인
                if 'o' in omok[y+4][x] and 'o' in omok[y+3][x+1] and 'o' in omok[y+2][x+2] and 'o' in omok[y+1][x+3] and 'o' in omok[y][x+4]:
                    return True
        return False
    

    t1 = omoking(omok)
    
################################################ (2)
    stones = []
    for o in range(N):
        idx = -1 # 찾는 시작점
        for oo in range(omok[o].count('o')): # 돌 위치 찾기
            idx = omok[o].index('o',idx+1) # idx 위치부터 돌 찾고 x좌표 위치 반환
            stones.append((idx,o)) # 돌의 x, y 좌표 저장
    
    
    
    isomok = False
    # DFS 사용
    stack = [(stones.pop(0),0,0)] # x, y, count, way
    visited = [0]*(len(stones))

    while stack:
        (x, y), count, way = stack.pop() # 돌의 좌표, 지금까지 몇 개가 연속되었는지, 현재의 진행 방향을 불러옴
        count += 1

        # print(x,y,'!!count = ',count,'@way = ',way)
        
        for nb in range(len(stones)):
            if visited[nb]:
                continue

            # 방향이 정해지지 않거나(way=0) | 같은 방향일 경우에만 stack에 쌓음
            if stones[nb] == (x,y+1) and (not way or way ==1):
                stack.append((stones[nb],count,1))
                visited[nb] = 1
                
            if stones[nb] == (x+1,y+1) and (not way or way ==2):
                stack.append((stones[nb],count,2))
                visited[nb] = 1
            if stones[nb] == (x+1,y) and (not way or way ==3):
                stack.append((stones[nb],count,3))
                visited[nb] = 1
            if stones[nb] == (x+1,y-1) and (not way or way ==4):
                stack.append((stones[nb],count,4))  
                visited[nb] = 1

            if stones[nb] == (x,y-1) and (not way or way ==5):
                stack.append((stones[nb],count,5))
                visited[nb] = 1     
                
            if stones[nb] == (x-1,y+1) and (not way or way ==6):
                stack.append((stones[nb],count,6))
                visited[nb] = 1
            if stones[nb] == (x-1,y) and (not way or way ==7):
                stack.append((stones[nb],count,7))
                visited[nb] = 1
            if stones[nb] == (x-1,y-1) and (not way or way ==8):
                stack.append((stones[nb],count,8))
                visited[nb] = 1
        
        # print(stack)
		
        # 5개가 되면 break
        if count == 5:
            isomok = True
            break
		
        # stack이 비엇꼬 stones가 남아있는 경우(한 돌에 대해서 모든 방향으로 확인을 끝마침)
        if not stack and stones:
            stack = [(stones.pop(0),0,0)]
            visited = [0]*(len(stones))

    t2 = isomok

    ##################################################
    
    if t1 != t2:
        print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1!!!!!!!!!!!!!!!!')
        wrong += 1
    print(t1,t2)
    print('-------케이스 {}---------'.format(tc+1))
    for o in omok:
            print(o)
    print('----------------')
print('최종 갯수 :',wrong)
```

놀랍게도 문제가 없었다.

그런데 왜 실패가 뜨지..??



지금 보니 Runtime error라고 뜬다.



### 2차 코드

```python
T = int(input())

def omoking(o):
    if o == 'o':
        return 1
    else:
        return 0

for tc in range(1, T+1):
    N = int(input())
    stones = [] # 돌의 정보
    for o in range(N):
        omok = list(map(omoking,input())) # 오목 판 만들기
        idx = -1 # 찾는 시작점
        for oo in range(omok.count(1)): # 돌 위치 찾기
            idx = omok.index(1,idx+1) # idx 위치부터 돌 찾고 x좌표 위치 반환
            stones.append((idx,o)) # 돌의 x, y 좌표 저장


    ### 오류 해결
    if not stones:# 비어있으면
        print('#{} {}'.format(tc, 'NO'))
        continue

   

    # print(stones)
    # print('------------------------------------------')
    isomok = False
    # 백트래킹이 적합함 (DFS 사용)
    stack = [(stones.pop(0),0,0)] # x, y, count, way
    visited = [0]*(len(stones))

    while stack:
        (x, y), count, way = stack.pop()
        count += 1

        # print(x,y,'!!count = ',count,'@way = ',way)
        
        for nb in range(len(stones)):
            if visited[nb]:
                continue

            if stones[nb] == (x,y+1) and (not way or way ==1):
                stack.append((stones[nb],count,1))
                visited[nb] = 1
                
            if stones[nb] == (x+1,y+1) and (not way or way ==2):
                stack.append((stones[nb],count,2))
                visited[nb] = 1
            if stones[nb] == (x+1,y) and (not way or way ==3):
                stack.append((stones[nb],count,3))
                visited[nb] = 1
            if stones[nb] == (x+1,y-1) and (not way or way ==4):
                stack.append((stones[nb],count,4))  
                visited[nb] = 1

            if stones[nb] == (x,y-1) and (not way or way ==5):
                stack.append((stones[nb],count,5))
                visited[nb] = 1     
                
            if stones[nb] == (x-1,y+1) and (not way or way ==6):
                stack.append((stones[nb],count,6))
                visited[nb] = 1
            if stones[nb] == (x-1,y) and (not way or way ==7):
                stack.append((stones[nb],count,7))
                visited[nb] = 1
            if stones[nb] == (x-1,y-1) and (not way or way ==8):
                stack.append((stones[nb],count,8))
                visited[nb] = 1
        
        # print(stack)

        if count == 5:
            isomok = True
            break

        if not stack and stones:
            stack = [(stones.pop(0),0,0)]
            visited = [0]*(len(stones))
            
    print('#{} {}'.format(tc, 'YES' if isomok else 'NO'))
```

성공!!! 런타임 에러의 원인이

```
.....
.....
.....
.....
.....
```

이렇게 됐을 때 stones가 비어있어 pop을 못해서 에러가 나는 것이었다.

그래서 오류 해결 용으로 중간에 비어있으면 넘어가는 코드를 추가했다.



하지만...결론은 확인용 코드보다 결과가 더 안 좋다..

![image](https://user-images.githubusercontent.com/77447841/108177011-062a0a80-7146-11eb-8977-8bab5960f105.png)



굳이 어렵게 풀 필요 없이 간단한 게 좋을 때도 많다는 것을 배웠다.





## 소감
124 나라의 숫자 문제의 경우

우기님과 성호님이 프로그래머스와 동일한 로직으로 풀어서 설명을 들을 수 있었다.

나의 경우 3진법을 풀어낸다는 느낌으로 풀었는데, 3으로 나눈 나머지가 자리수로 활용될 수 있다는 패턴을 활용하니 훨씬 쉽게 풀 수 있다는 것을 배웠다. 

패턴을 찾아보는 것도 때론 좋은 방법같다.



또 국현님과 은상님으로 부터 등비수열의 합 공식 `a(r**n-1)/(r-1)`에 대해 들으며 확실히 수학 공식을 알면 계산이 빨라진다는 것을 생각했다.
