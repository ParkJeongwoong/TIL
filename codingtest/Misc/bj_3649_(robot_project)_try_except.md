# 백준 3649번

로봇 프로젝트

https://www.acmicpc.net/problem/3649

## 문제

상근이와 선영이는 학교 숙제로 로봇을 만들고 있다. 로봇을 만들던 중에 구멍을 막을 두 레고 조각이 필요하다는 것을 깨달았다.

구멍의 너비는 x 센티미터이고, 구멍에 넣을 두 조각의 길이의 합은 구멍의 너비와 정확하게 일치해야 한다. 정확하게 일치하지 않으면, 프로젝트 시연을 할 때 로봇은 부수어질 것이고 상근이와 선영이는 F를 받게 된다. 구멍은 항상 두 조각으로 막아야 한다.

지난밤, 상근이와 선영이는 물리 실험실에 들어가서 레고 조각의 크기를 모두 정확하게 재고 돌아왔다. 구멍을 완벽하게 막을 수 있는 두 조각을 구하는 프로그램을 작성하시오.



## 입출력

| 입력    | 출력          |
| ------- | ------------- |
| 1       | yes 1 9999999 |
| 4       |               |
| 9999998 |               |
| 1       |               |
| 2       |               |
| 9999999 |               |

- 입력
  - <u>여러 개의 테스트 케이스</u>
  - 목표 X
  - 케이스 수 N
  - 레고 길이



## 코드

### step1

```python
import sys
input = sys.stdin.readline

target = int(input()) * 10000000

N = int(input())
blocks = [0]*N
start = 0

if N:
    for end in range(N): # 변수 아껴쓰기
        blocks[end] = int(input())

    blocks.sort()

    while start < end:
        maybe = blocks[start] + blocks[end]
        if maybe < target:
            start += 1
        elif maybe > target:
            end -= 1
        else: # 같을 때
            print('yes',blocks[start],blocks[end])
            break
    else:
        print('danger')
else:
    print('danger')
```

- N이 0일 때를 대비해서 `if N:` 추가
- 논리적으로 틀릴 수 없는 코드인데 오답이 떴다.



### step2

```python
import sys
input = sys.stdin.readline

while True:
    try:
        target = int(input()) * 10000000
        N = int(input())
        blocks = [0]*N
        start = 0

        if N:
            for end in range(N): # 변수 아껴쓰기
                blocks[end] = int(input())

            blocks.sort()
            
            while start < end:
                maybe = blocks[start] + blocks[end]
                if maybe < target:
                    start += 1
                elif maybe > target:
                    end -= 1
                else: # 같을 때
                    print('yes {} {}'.format(blocks[start],blocks[end]))
                    break
            else:
                print('danger')
        else:
            print('danger')
    except:
        break
```

- 정말 어이없게도 입력이 여러 개가 들어오고 거기에 맞춰서 출력을 하는 형식이었다.

  (여러 입력 처리를 내가 따로 해줘야 함)

- `while`로 계속 입력을 받게 만들고
- `try-except`로 끊어줘야 함

> 평소랑 정답 처리 과정이 달라서 당황스러웠던 문제



## 기타

놀랍게도, 내가 생각했던 방식이 정석이다.
