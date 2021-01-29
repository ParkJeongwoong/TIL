# 백준 2798번

블랙잭

브루투스 포스란? 가능한 모든 방법 탐색

## 문제

카지노에서 제일 인기 있는 게임 블랙잭의 규칙은 상당히 쉽다. 카드의 합이 21을 넘지 않는 한도 내에서, 카드의 합을 최대한 크게 만드는 게임이다. 블랙잭은 카지노마다 다양한 규정이 있다.

한국 최고의 블랙잭 고수 김정인은 새로운 블랙잭 규칙을 만들어 상근, 창영이와 게임하려고 한다.

김정인 버전의 블랙잭에서 각 카드에는 양의 정수가 쓰여 있다. 그 다음, 딜러는 N장의 카드를 모두 숫자가 보이도록 바닥에 놓는다. 그런 후에 딜러는 숫자 M을 크게 외친다.

이제 플레이어는 제한된 시간 안에 N장의 카드 중에서 3장의 카드를 골라야 한다. 블랙잭 변형 게임이기 때문에, 플레이어가 고른 카드의 합은 M을 넘지 않으면서 M과 최대한 가깝게 만들어야 한다.

N장의 카드에 써져 있는 숫자가 주어졌을 때, M을 넘지 않으면서 M에 최대한 가까운 카드 3장의 합을 구해 출력하시오.



## 입출력

| 입력           | 출력 |
| -------------- | ---- |
| 5 21           | 21   |
| 5 21 5 6 7 8 9 |      |

입력: 카드수 N과 목표숫자 M

| 입력                                  | 출력 |
| ------------------------------------- | ---- |
| 10 500                                | 497  |
| 93 181 245 214 315 36 185 138 216 295 |      |



## 코드1

```python
import sys
N, M = map(int,sys.stdin.readline().split())
cards = list(map(int,sys.stdin.readline().split()))

def nblackjack(cl,idx,result):
    if len(cl) == 3 and sum(cl) > result:
        result = sum(cl)
        return result

    for i, card in enumerate(cards[idx:]):
        if not sum(cl) + card > M and len(cl) < 3:
            card_list = cl + [card]
            card_index = i + 1
            result = nblackjack(card_list,card_index,result)
    return result

print(nblackjack([],0,0))
```

## 코드2

```python
import sys
N, M = map(int,sys.stdin.readline().split())
cards = list(map(int,sys.stdin.readline().split()))

def clone(idx,cnt,sum):
    global result
    if cnt == 3 and sum <= M:
        result = max(result,sum)
        return
    if idx >= N or cnt >3 or sum > M:
        return
    clone(idx+1,cnt+1,sum+cards[idx]) # 카드를 고르는 경우
    clone(idx+1,cnt,sum) # 카드를 고르지 않는 경우
result = 0
clone(0,0,0)
print(result)
```

> 코드1은 오답
>
> 코드2는 정답



## 고민

- Backtracking 기법을 사용하려고 했었다.
- 위 두 코드의 차이는 뭘까??
  - 지금 위의 코드를 보면 계속 return result를 하고 있다.
  - 이 result는 두 번째 for문의 끝에서 저장된 값인데
  - result에 값이 잘못 덮어씌워지는 경우가 가능하지 않을까...?



## 분석

결국 test_machine을 만들어서 분석에 성공했다.

원인은 두 번째 포문의 index 지정이 문제가 있어서였다.

처음에도 이쪽에 문제가 있어서 `card_index = idx + 1`를 수정했는데,

수정한 `enumerate`, `card_index = i + 1`도 문제가 있었다.

=> 처음으로 세 장을 모으는 과정에서, 첫 번째 이후 card_index = 1이 된다.

​	그리고 두 번째에서 idx를 1로 받는데, 포문에서 enumerate로 받은 i가 0부터 시작이라 세 번째도 idx를 1로 받는 문제가 생긴다.

=> idx를 활용하는 방법을 생각해야 함. (세 번째 케이스에서 idx가 2가 되도록)



### 수정된 코드

```python
import sys
N, M = map(int,sys.stdin.readline().split())
cards = list(map(int,sys.stdin.readline().split()))

def nblackjack(cl,idx,result):
    print(cl,idx)
    if len(cl) == 3 and sum(cl) > result:
        result = sum(cl)
        print('result',cl)
        return result

    for i, card in enumerate(cards[idx:]):
        if not sum(cl) + card > M and len(cl) < 3:
            card_list = cl + [card]
            card_index = idx + i + 1 # 간단히 idx를 추가하는 게 답
            result = nblackjack(card_list,card_index,result)
    return result

print(nblackjack([],0,0))
```

- idx만 있을 때, enumerate의 i 값이 반영 안 되는 걸 보고 i를 추가했는데,
- 이번엔 idx가 없어서 문제가 생겼지만 알아내는데, 한참이 걸렸다.



- 두 함수를 비교하는 테스트 머신의 역할이 굉장히 컸는데,

  앞으로도 종종 사용하면 좋을 것 같다.



## 다른 사람의 코드

### for문 반복

```python
cardNum, target = map(int,input().split())
cards = list(map(int,input().split()))
sortedCards = [i for i in cards if i <= target-3]
sortedCards.sort()
cardsLen = len(sortedCards)
def find(cardsLen,sortedCards):
    a = []
    for i in range(cardsLen-1,1,-1):
        for j in range(i-1,0,-1):
            for k in range(j-1,-1,-1):
                sum = sortedCards[i] + sortedCards[j] + sortedCards[k]
                if sum <= target:
                    a.append(sum)
                    break
    
    return max(a)

print(find(cardsLen,sortedCards))
```

- 3번만 반복하면 되기 때문에 for문을 많이 사용

- 파이썬의 경우 속도가 느려 재귀함수 사용이 지양된다고 한다.
- 그래서 거의 모든 사람이 for문으로 품
  - 몇몇은 combinations를 쓰거나 permutations 함수를 사용



- 먼저 받은 카드를 크기 순으로 정렬

- 3장을 먼저 만들고, 더한 값을 리스트에 저장
- 리스트의 값 중 가장 큰 값을 return
