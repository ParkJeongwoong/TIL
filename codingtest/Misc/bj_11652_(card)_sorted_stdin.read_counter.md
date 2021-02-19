# 백준 11652번

카드

## 문제

준규는 숫자 카드 N장을 가지고 있다. 숫자 카드에는 정수가 하나 적혀있는데, 적혀있는 수는 -2\*\*62보다 크거나 같고, 2\*\*62보다 작거나 같다.

준규가 가지고 있는 카드가 주어졌을 때, 가장 많이 가지고 있는 정수를 구하는 프로그램을 작성하시오. 만약, 가장 많이 가지고 있는 정수가 여러 가지라면, 작은 것을 출력한다.



## 입출력

| 입력 | 출력 |
| ---- | ---- |
| 5    | 1    |
| 1    |      |
| 2    |      |
| 1    |      |
| 2    |      |
| 1    |      |

- 입력
  - 카드 수와 카드



| 입력 | 출력 |
| ---- | ---- |
| 6    | 1    |
| 1    |      |
| 2    |      |
| 1    |      |
| 2    |      |
| 1    |      |
| 2    |      |



| 입력 | 출력 |
| ---- | ---- |
| 2    | -1   |
| 1    |      |
| -1   |      |





## 코드

```python
import sys
input = sys.stdin.readline

N = int(input())
nums = {}
for i in range(N):
    card = int(input())
    if card in nums:
        nums[card] += 1
    else:
        nums[card] = 1

array = []
for k,v in nums.items():
    array.append((k,v))

result = sorted(array, key=lambda array: (-array[1], array[0]))

# print(result)
print(result[0][0])
```



### 설명

- sort를 두 번 해서 정렬했다.
- key 값의 경우 lambda를 사용해서 조금 더 복잡한 형태의 정렬을 할 수 있고,
- 복수 조건의 정렬인 경우 우선순위대로 튜플로 묶어주면 된다.
  - 위의 경우 array[0]으로 먼저 정렬 후 array[1]로 정렬
  - 즉 array[1] 순서대로 정렬되어 있으나 동일 값이면 array[0] 순으로 정렬
- array[1] 앞에 붙은 -의 경우 내림차순으로 정렬하게 해준다.



## 다른 사람의 코드

```python
import sys
k=sorted(list(map(int,sys.stdin.read().split()[1:])))
a,b,r,c=k[0],1,0,k[0]
for i in range(1,len(k)):
	if k[i]==a:b+=1
	else:
		if r<b:c=a;r=b;
		a=k[i];b=1
if r<b:c=a;r=b;
print(c)
```

[minjunkweon](https://www.acmicpc.net/user/minjunkweon) `124 ms` - 최단시간

- 값을 한 번에 받아서 이를 정렬
- 같은 값의 갯수만큼 앞에서 count => b에 저장
  - 저장된 최대값(r)보다 b가 크면 숫자를 c에 저장
  - c 출력
  - 마지막 if는 마지막 idx의 값은 비교를 안 해서 한 번 해주는 것



### `sys.stdin.read()`

검색 결과 자세히 나오지는 않았지만, `sys.stdin`만 썼을 때 처럼 엔터값까지 계속 이어지는 것 같다. 그럼 `readlines()`랑도 같은데??

=> 엔터를 받으면 종료되는 `stdin`보다는 `readlines`에 더 가까운 메서드

---

#### *readlines()와 비교

```python
a = sys.stdin.read(5)
1
2
3
# '1\n2\n3' <= 엔터를 포함하여 str으로 반환

b=sys.stdin.readlines(5)
1
2
3
# ['1\n', '2\n', '3\n'] <= 엔터로 끊어서 하여 list로 반환
```

- read()의 경우, 엔터를 포함하여 정확히 요소의 갯수가 입력

- 그런데 readlines()의 경우,
  - (1) : ['1\n']
  - (2) : ['1\n', '2\n']
  - (3) : ['1\n', '2\n']
  - (4) : ['1\n', '2\n', '3\n']
  - (5) : ['1\n', '2\n', '3\n']
  - (6) : ['1\n', '2\n', '3\n', '4\n']
- 이런 식으로 저장 됨



## 다른 사람의 코드

```python
# python3

import sys
from collections import Counter

num = int(sys.stdin.readline())
nlist = [int(x) for x in sys.stdin.read().split()]
ndict = Counter(nlist)
m = max(ndict.values())
for i in sorted(ndict.keys()):
	if ndict[i] == m:
		print(i)
		break
```

[snowchori](https://www.acmicpc.net/user/snowchori)

- Counter 활용



### `Counter`

리스트의 요소를 카운팅하는 클래스

> https://www.daleseo.com/python-collections-counter/
>
> https://dongdongfather.tistory.com/70

collections 모듈 내부의 클래스이기 때문에 collections에서 받아와야 한다.

`from collections import Counter`



- Counter를 사용하면 dict를 이용한 카운팅이 가능

```python
from collections import Counter

Counter('hello world') # Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})
```

```python
Couter(a=5,b=3) # Counter({'a': 5, 'b': 3})
```





- `most_common()` 메서드를 사용하면 많은 순으로 정렬 후 리턴
  - 입력한 숫자의 갯수만큼 리턴하기 때문에 1을 넣으면 최대값을 얻을 수 있다.

```python
from collections import Counter

Counter('hello world').most_common() # [('l', 3), ('o', 2), ('h', 1), ('e', 1), (' ', 1), ('w', 1), ('r', 1), ('d', 1)]
```

```python
from collections import Counter

Counter('hello world').most_common(1) # [('l', 3)]
```



- Counter 클래스끼리 +,- 가능 (0이 되면 요소가 사라진다)



- `.substract()`로 각 요소의 수를 뺄 수 있다.



- 합집합 `&`와 교집합 `|` 연산



- `.elements()`로 카운트 된 숫자만큼 요소 반환

```python
cc = Counter(a=5,b=3) # Counter({'a': 5, 'b': 3})
list(cc.elements()) # ['a', 'a', 'a', 'a', 'a', 'b', 'b', 'b']

lst(cc) # ['a', 'b'] <- 그냥 요소만 반환
```

