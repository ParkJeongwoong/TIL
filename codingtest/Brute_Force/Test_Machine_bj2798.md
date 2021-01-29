# Test Machine

[첫 번째 Test Machine] [백준 2798번용]

---

내가 보기에 도저히 잘못된 점을 찾을 수 없는데

코드 제출 시 틀렸다고 나오는 문제를 해결하기 위해

테스트 케이스를 자동으로 입력하고

정답 코드와 비교하여 다른 케이스가 있으면 출력하는 함수

```python
import random
import sys
case = int(input())

for i in range(case):
    # TestCase 생성
    N = random.randint(3,10) # 최대 100
    M = random.randint(10,1000) # 최대 300000 
    cards = []
    for i in range(N):
        cards.append(random.randint(1,M//2))
	# 문제 함수
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
	# 비교 함수
    def clone(idx,cnt,sum):
        global result
        if cnt == 3 and sum <= M:
            result = max(result,sum)
            return
        if idx >= N or cnt >3 or sum > M:
            return
        clone(idx+1,cnt+1,sum+cards[idx])
        clone(idx+1,cnt,sum)
    result = 0
    clone(0,0,0)
    # 출력
    if not result == nblackjack([],0,0):
        print(N,M, cards)
        print(result,nblackjack([],0,0))

```
