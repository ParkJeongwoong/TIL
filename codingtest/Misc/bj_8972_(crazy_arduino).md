# 백준 3649번

로봇 프로젝트

https://www.acmicpc.net/problem/8972

## 문제

요즘 종수는 아두이노를 이용해 "Robots"이라는 게임을 만들었다. 종수는 아두이노 한대를 조정하며, 미친 아두이노를 피해다녀야 한다. 미친 아두이노는 종수의 아두이노를 향해 점점 다가온다. 하지만, 미친 아두이노의 움직임은 예측할 수 있다.

게임은 R×C크기의 보드 위에서 이루어지며, 아래와 같은 5가지 과정이 반복된다.

1. 먼저, 종수가 아두이노를 8가지 방향(수직,수평,대각선)으로 이동시키거나, 그 위치에 그대로 놔둔다.
2. 종수의 아두이노가 미친 아두이노가 있는 칸으로 이동한 경우에는 게임이 끝나게 되며, 종수는 게임을 지게 된다.
3. 미친 아두이노는 8가지 방향 중에서 종수의 아두이노와 가장 가까워 지는 방향으로 한 칸 이동한다. 즉, 종수의 위치를 (r1,s1), 미친 아두이노의 위치를 (r2, s2)라고 했을 때, |r1-r2| + |s1-s2|가 가장 작아지는 방향으로 이동한다.
4. 미친 아두이노가 종수의 아두이노가 있는 칸으로 이동한 경우에는 게임이 끝나게 되고, 종수는 게임을 지게 된다.
5. 2개 또는 그 이상의 미친 아두이노가 같은 칸에 있는 경우에는 큰 폭발이 일어나고, 그 칸에 있는 아두이노는 모두 파괴된다.

종수의 시작 위치, 미친 아두이노의 위치, 종수가 움직이려고 하는 방향이 주어진다. 입력으로 주어진 방향대로 종수가 움직였을 때, 보드의 상태를 구하는 프로그램을 작성하시오. 중간에 게임에서 지게된 경우에는 몇 번째 움직임에서 죽는지를 구한다.



## 입출력

| 입력  | 출력  |
| ----- | ----- |
| 4 5   | .I... |
| I.... | .RR.. |
| ..... | ....  |
| .R.R. | ....  |
| ..... |       |
| 6     |       |

- 입력
  1. 보드의 크기 R과 C
  2. R개 줄에는 보드의 상태가 C개의 문자로 주어진다
     - . : 빈간
     - R : 미친 아두이노
     - I : 종수
  3. 종수가 움직이려고 하는 방향이 길이가 100을 넘지않는 문자열이 주어진다
     - 5 : 제자리
     - ![img](https://upload.acmicpc.net/a5693c73-112b-416c-8398-42fddd09c6e7/-/preview/)

- 출력
  - 중간에 게임이 끝나는 경우에는 "kraj X"를 출력 (X는 종수가 게임이 끝나기 전 까지 이동한 횟수)
  - 그 외의 경우에는 보드의 상태를 입력과 같은 형식으로 출력



## 코드

### step1

```python
import sys
input = sys.stdin.readline

dr = [False,1,1,1,0,0,0,-1,-1,-1]
dc = [False,-1,0,1,-1,0,1,-1,0,1]

R, C = map(int, input().split())
boards = [list(input().rstrip()) for _ in range(R)]
moves = input().rstrip()

crazies = []
for r in range(R):
    for c in range(C):
        if boards[r][c] == 'I':
            jongsu = [r,c]
        elif boards[r][c] == 'R':
            crazies.append([r,c])
crazies_index = list(range(len(crazies))) ### 문제


for i in range(len(moves)):
    move = int(moves[i])
    # 1
    boards[jongsu[0]][jongsu[1]] = '.'
    jongsu[0] += dr[move]
    jongsu[1] += dc[move]

    # 2
    if boards[jongsu[0]][jongsu[1]] == 'R':
        print(f'kraj {i+1}')
        break
    boards[jongsu[0]][jongsu[1]] = 'I'

    # 3 ### 문제
    explodes = set() ### 문제
    next_crazies = set() ### 문제
    for crazy_index in crazies_index: ### 문제 => for crazy in crazies:
        crazy = crazies[crazy_index] ### 문제
        boards[crazy[0]][crazy[1]] = '.'
        if jongsu[0] > crazy[0]:
            crazy[0]+=1
        elif jongsu[0] < crazy[0]:
            crazy[0]-=1
        if jongsu[1] > crazy[1]:
            crazy[1]+=1
        elif jongsu[1] < crazy[1]:
            crazy[1]-=1
        # 4
        if boards[crazy[0]][crazy[1]] == 'I':
            print(f'kraj {i+1}')
            break
        #5
        for explode_check in next_crazies:
            if crazy == crazies[explode_check]:
                explodes.add(crazy_index)
                explodes.add(explode_check)
                break
        else:
            next_crazies.add(crazy_index)
    else:
        # 5
        crazies_index = list(next_crazies-explodes)
        for crazy_index in crazies_index:
            crazy = crazies[crazy_index]
            boards[crazy[0]][crazy[1]] = 'R'
        continue
    break
else:
    for i in range(R):
        print(''.join(boards[i]))
```

`시간초과`



### step2

```python
import sys
input = sys.stdin.readline

dr = [False,1,1,1,0,0,0,-1,-1,-1]
dc = [False,-1,0,1,-1,0,1,-1,0,1]

R, C = map(int, input().split())
boards = [list(input().rstrip()) for _ in range(R)]
moves = input().rstrip()

crazies = []
for r in range(R):
    for c in range(C):
        if boards[r][c] == 'I':
            jongsu = [r,c]
        elif boards[r][c] == 'R':
            crazies.append([r,c])


for i in range(len(moves)):
    move = int(moves[i])
    # 1
    boards[jongsu[0]][jongsu[1]] = '.'
    jongsu[0] += dr[move]
    jongsu[1] += dc[move]

    # 2
    if boards[jongsu[0]][jongsu[1]] == 'R':
        print(f'kraj {i+1}')
        break
    boards[jongsu[0]][jongsu[1]] = 'I'

    # 3
    for crazy in crazies:
        boards[crazy[0]][crazy[1]] = '.'
        if jongsu[0] > crazy[0]:
            crazy[0]+=1
        elif jongsu[0] < crazy[0]:
            crazy[0]-=1
        if jongsu[1] > crazy[1]:
            crazy[1]+=1
        elif jongsu[1] < crazy[1]:
            crazy[1]-=1
        # 4
        if boards[crazy[0]][crazy[1]] == 'I':
            print(f'kraj {i+1}')
            break
    else:
        # 5
        checked = [False]*len(crazies)
        for i in range(len(crazies)):
            if checked[i]:
                continue
            crazy = crazies[i]
            if boards[crazy[0]][crazy[1]] == '.':
                boards[crazy[0]][crazy[1]] = 'R'
            else:
                boards[crazy[0]][crazy[1]] = '.'
                # 제거할 목록 작성
                for j in range(len(crazies)):
                    if crazy == crazies[j]:
                        checked[j] = True
        crazies = [crazies[i] for i in range(len(crazies)) if not checked[i]]        

        # print()
        # for i in range(R):
        #     print(boards[i])
        # print(jongsu)
        continue
    break
else:
    for i in range(R):
        print(''.join(boards[i]))
```

`1648 ms` `130748 KB` `PyPy3`

- crazy index를 불필요하게 사용한 문제
- 5번 부분에서 불필요한 for문, 불필요한 set, list 변수 반복 생성 등의 문제
- 특정 미친 아두이노를 제거하기 위해 index를 부여했는데, 이게 문제를 일으킴



- 이를 해결하기 위해 3번 스텝에서 미친 아두이노의 기호, R을 렌더링 하지 않음
- 대신 5번에서 폭발 체크를 하면서 R을 표시
  - 아무 것도 없으면 R 표시
  - R이 표시되어 있으면 . 표시 & crazies 리스트를 돌면서 동일한 좌표를 전부 checked 표시(폭발했다는 뜻. 다음 번에 skip)
  - 폭발하지 않은 (checked가 false) 미친 아두이노를 모은 리스트 생성



## 기타

놀랍게도, 내가 생각했던 방식이 정석이다.