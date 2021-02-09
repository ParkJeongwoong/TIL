# 2021-02-09 CT STUDY

두 번째 코딩테스트 스터디

4문제를 미리 풀어오고, 코드 리뷰를 하는 형식으로 진행했다.



## 신규 아이디 추천

https://programmers.co.kr/learn/courses/30/lessons/72410

### 코드

```python
def solution(new_id):
    new_id = list(new_id.lower())
    
    chging = ['.']
    idx = 0
    
    for ch in new_id:
        o = ord(ch)
        if (o > 96 and o < 123) or o == 45 or o == 95 or (o > 47 and o <58):
            chging.append(ch)
        if o==46 and chging[-1] != '.' :
            chging.append(ch)
    
    new_str = ''.join(chging).strip('.')
    
    if not new_str:
        return 'aaa'
    
    if len(new_str) > 15:
        return new_str[:15].rstrip('.')
    
    if len(new_str) < 3:    
        return new_str + new_str[-1] * (3-len(new_str))
    
    return new_str
```

- 뭔가 조금 복잡하다는 느낌이 든다.



### 프로그래머스 코드

```python
import re

def solution(new_id):
    st = new_id
    st = st.lower()
    st = re.sub('[^a-z0-9\-_.]', '', st) # a-z,0-9,-,_,. 빼고 지우기
    st = re.sub('\.+', '.', st) # .이 여러개면 .한 개로
    st = re.sub('^[.]|[.]$', '', st) # 처음과 끝이 .이면 지우기
    st = 'a' if len(st) == 0 else st[:15]
    st = re.sub('^[.]|[.]$', '', st) # 처음과 끝이 .이면 지우기
    st = st if len(st) > 2 else st + "".join([st[-1] for i in range(3-len(st))])
    return st
```

- 정규 표현식 re 모듈을 사용

#### 정규 표현식 re 모듈

`re`는 따로 공부가 필요할 정도로 복잡한 내용이 많다.

##### method

- **re.sub('패턴', '바꿀문자열', '문자열', 바꿀횟수)**
  - <u>문자열</u>에서 <u>패턴</u>을 찾아 <u>바꿀 문자열</u>로 바꿈

##### 메타문자

- | : or
- ^ : 문자열의 처음과 매치
- $ : 문자열의 끝과 매치
- [] : []안의 요소 중 하나와 매치
  - !!! **[]안에서 `^`는 not을 의미**
- \- : from-to
  - 0-9 : 숫자 모두
  - a-zA-Z : 알파벳 모두

- \*, +
  - \* : 0번 이상 반복
  - \+ : 1번 이상 반복

- \ : 이스케이프 문자

- . : 모든 문자와 매치 (\n 제외)



## 소감
새로 배운 method

.isdigit

.startswith()

.endswith()

새로 배운 방법

아스키 코드보단 list로 묶어서 in으로 처리하는 게 나음
