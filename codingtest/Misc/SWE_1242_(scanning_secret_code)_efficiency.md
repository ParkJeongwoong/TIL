# SWE 1242. 암호코드 스캔

모의 SW 역량 테스트 문제

https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15JEKKAM8CFAYD

---

##  내 코드

### 코드1

```python
secret_code = {'[0, 2, 1, 1]':0, '[0, 2, 2, 1]':1, '[0, 1, 2, 2]':2, '[0, 4, 1, 1]':3, '[0, 1, 3, 2]':4, '[0, 2, 3, 1]':5, '[0, 1, 1, 4]':6, '[0, 3, 1, 2]':7, '[0, 2, 1, 3]':8, '[0, 1, 1, 2]':9}
def converter(arr):
    # 2진법으로 변경
    data_converted = []
    for d in arr:
        if d in ['A', 'B', 'C', 'D', 'E', 'F']:
            d = ord(d) - 55
        else:
            d = int(d)
        for i in range(3, -1, -1):
            if d & (1 << i):
                data_converted.append(1)
            else:
                data_converted.append(0)

    return data_converted

for tc in range(1, int(input())+1):
    N, M = map(int,input().split())
    codes = [converter(input()) for _ in range(N)]
    M *= 4
    collections = []
    for code in codes:
        searched = []
        i = M - 1
        while i > 5:
            if code[i]: # 발견
                switch = 3
                arg = [0]*4
                idx = 1
                counter = 1
                flag = True
                while switch:
                    if code[i-idx] == flag:
                        counter += 1
                    else:
                        arg[switch] = counter
                        counter = 1
                        switch -= 1
                        flag = not flag
                    idx += 1
                # resizing : arg 변수의 최소값이 1이 되어야 함
                size = min(arg[1:])
                for j in range(1,4):
                    arg[j] //= size

                key = str(arg)
                if key in secret_code:
                    searched.append(secret_code[key])
                    if len(searched) == 8:
                        if searched not in collections:
                            collections.append(searched)
                        searched = []
                    i -= 7*size-1
            i -= 1
            
    result = 0
    for ans in collections:
        if ((ans[7]+ans[5]+ans[3]+ans[1])*3+ans[6]+ans[4]+ans[2] + ans[0])%10 == 0:
            result += sum(ans)
    print('#{} {}'.format(tc, result))
```

- 패턴은 1<->0 으로 총 3번 바뀜
  - switch 변수를 두고 3번 변화가 감지되면 하나의 패턴으로 인식
  - arg에 저장된 0과 1의 비율을 secret_code와 대조해서 숫자를 찾아냄



- 시원하게 FAIL - runtime error 발생 `??`



### 코드2

```python
secret_code = {'[0, 2, 1, 1]':0, '[0, 2, 2, 1]':1, '[0, 1, 2, 2]':2, '[0, 4, 1, 1]':3, '[0, 1, 3, 2]':4, '[0, 2, 3, 1]':5, '[0, 1, 1, 4]':6, '[0, 3, 1, 2]':7, '[0, 2, 1, 3]':8, '[0, 1, 1, 2]':9}
def converter(arr):
    # 2진법으로 변경
    data_converted = []
    for d in arr:
        if d in ['A', 'B', 'C', 'D', 'E', 'F']:
            d = ord(d) - 55
        else:
            d = int(d)
        for i in range(3, -1, -1):
            if d & (1 << i):
                data_converted.append(1)
            else:
                data_converted.append(0)

    return data_converted

for tc in range(1, int(input())+1):
    N, M = map(int,input().split())
    codes = [converter(input()) for _ in range(N)]
    M *= 4
    collections = []
    result = 0
    for code in codes:
        searched = []
        i = M - 1
        while i > 5:
            if code[i]: # 발견!
                switch = 3
                arg = [0]*4
                idx = 1
                counter = 1
                flag = True
                while switch and i >= idx:
                    if code[i-idx] == flag:
                        counter += 1
                    else:
                        arg[switch] = counter
                        counter = 1
                        switch -= 1
                        flag = not flag
                    idx += 1
                # resizing : arg 변수의 최소값이 1이 되어야 함
                size = min(arg[1:])
                if not switch:
                    for j in range(1,4):
                        arg[j] //= size

                    key = str(arg)
                    if key in secret_code:
                        searched.append(secret_code[key])
                        if len(searched) == 8:
                            if searched not in collections:
                                collections.append(searched)
                                if ((searched[7]+searched[5]+searched[3]+searched[1])*3+searched[6]+searched[4]+searched[2] + searched[0])%10 == 0:
                                    result += sum(searched)
                            searched = []
                        i -= 7*size-1
            i -= 1

    print('#{} {}'.format(tc, result))
```

- 비효율을 조금 개선한 코드 & 숫자를 찾는 idx 변수가 마이너스가 되는 것을 방지
  - 무의미한 발버둥



- Runtime Error



### 코드3

```python
secret_code = {'[0, 2, 1, 1]':0, '[0, 2, 2, 1]':1, '[0, 1, 2, 2]':2, '[0, 4, 1, 1]':3, '[0, 1, 3, 2]':4, '[0, 2, 3, 1]':5, '[0, 1, 1, 4]':6, '[0, 3, 1, 2]':7, '[0, 2, 1, 3]':8, '[0, 1, 1, 2]':9}
def converter(arr):
    # 2진법으로 변경
    data_converted = []
    for d in arr:
        if d in ['A', 'B', 'C', 'D', 'E', 'F']:
            d = ord(d) - 55
        else:
            d = int(d)
        for i in range(3, -1, -1):
            if d & (1 << i):
                data_converted.append(1)
            else:
                data_converted.append(0)

    return data_converted

for tc in range(1, int(input())+1):
    N, M = map(int,input().split())
    codes = [converter(input()) for _ in range(N)]
    M *= 4
    collections = []
    result = 0
    for code in codes:
        searched = []
        i = M - 1
        while i > 5:
            if code[i]: # 발견!
                switch = 3
                arg = [0]*4
                idx = 1
                counter = 1
                flag = True
                while switch and i >= idx:
                    if code[i-idx] == flag:
                        counter += 1
                    else:
                        arg[switch] = counter
                        counter = 1
                        switch -= 1
                        flag = not flag
                    idx += 1
                # resizing : arg 변수의 최소값이 1이 되어야 함
                size = min(arg[1:])
                if not switch and i >= size*7-1:
                    for last_check in range(-1,7*size-sum(arg)-1):
                        if code[i-idx-last_check]:
                            break
                    else:
                        for j in range(1,4):
                            arg[j] //= size

                        key = str(arg)
                        if key in secret_code:
                            searched.append(secret_code[key])
                            if len(searched) == 8:
                                if searched not in collections:
                                    collections.append(searched)
                                    if ((searched[7]+searched[5]+searched[3]+searched[1])*3+searched[6]+searched[4]+searched[2] + searched[0])%10 == 0:
                                        result += sum(searched)
                                searched = []
                            i -= 7*size-1
            i -= 1

    print('#{} {}'.format(tc, result))
```

- 마지막 0이 조건을 만족하는지 확인하는 부분을 추가 (`Error와는 관련이 없었지만 문제점이긴 했다`)

  - 이런 문제들은 runtime error가 아니라 틀렸습니다를 만든다




- 따라서 Runtime Error



### 코드4

```python
secret_code = {'[1, 2, 1, 1]':0, '[1, 2, 2, 1]':1, '[1, 1, 2, 2]':2, '[1, 4, 1, 1]':3, '[1, 1, 3, 2]':4, '[1, 2, 3, 1]':5, '[1, 1, 1, 4]':6, '[1, 3, 1, 2]':7, '[1, 2, 1, 3]':8, '[1, 1, 1, 2]':9}
searched = []
def converter(arr):
    # 2진법으로 변경
    data_converted = []
    for d in arr:
        if d in ['A', 'B', 'C', 'D', 'E', 'F']:
            d = ord(d) - 55
        else:
            d = int(d)
        for i in range(3, -1, -1):
            if d & (1 << i):
                data_converted.append(1)
            else:
                data_converted.append(0)
    return data_converted

for tc in range(1, int(input())+1):
    N, M = map(int,input().split())
    codes = [converter(input()) for _ in range(N)]
    M *= 4
    result = 0
    for th in range(N):
        code = codes[th]
        if 1 not in code:
            continue
        searched.clear()
        i = M - 1
        while i > 5:
            if code[i] and (not codes[th-1][i] or not th): # 발견!
                switch = 3 # 3번 바뀜
                arg = [1]*4 # 비율
                idx = 1
                flag = True
                while switch and i >= idx:
                    if code[i-idx] == flag:
                        arg[switch] += 1
                    else:
                        switch -= 1
                        flag = not flag
                    idx += 1
                # resizing : arg 변수의 최소값이 1이 되어야 함
                size = min(arg[1:])

                if not switch and i >= size*7-1: # 3번 다 바뀌고 0이 들어갈 공간이 충분히 남았다면
                    for last_check in range(-1,7*size-sum(arg)-1): # 마지막으로 0이 필요한 만큼 있는지 확인
                        # print(last_check)
                        # print(i-idx-last_check)
                        if code[i-idx-last_check]:
                            break
                    else:
                        # print('check out')
                        for j in range(1,4): # resizing
                            arg[j] //= size

                        key = str(arg)
                        if key in secret_code: # resizing한 값이 secret_code에 있는지 확인
                            searched.append(secret_code[key]) # 숫자 추가 (역순으로 추가 됨)
                            if len(searched) == 8: # 숫자 8개가 모이면
                                if ((searched[7]+searched[5]+searched[3]+searched[1])*3+searched[6]+searched[4]+searched[2] + searched[0])%10 == 0: # 유효성 검사
                                    result += sum(searched)
                                searched.clear()
                            i -= 7*size-1
            i -= 1

    print('#{} {}'.format(tc, result))
```

- 비효율의 문제
  - 애초에 너무 많은 연산을 요구해서 서버에서 거부한 것



- **문제 해결 1. 반복을 줄인다**
  - code 계산을 전부 하고 있음 => 중복 코드는 확인 X



### 코드5

```python
secret_code = {'[1, 2, 1, 1]':0, '[1, 2, 2, 1]':1, '[1, 1, 2, 2]':2, '[1, 4, 1, 1]':3, '[1, 1, 3, 2]':4, '[1, 2, 3, 1]':5, '[1, 1, 1, 4]':6, '[1, 3, 1, 2]':7, '[1, 2, 1, 3]':8, '[1, 1, 1, 2]':9}
searched = []
def converter(arr):
    # 2진법으로 변경
    data_converted = []
    for d in arr:
        d = '0123456789ABCDEF'.index(d)
        for i in range(3, -1, -1):
            if d & (1 << i):
                data_converted.append(1)
            else:
                data_converted.append(0)
    return data_converted

for tc in range(1, int(input())+1):
    N, M = map(int,input().split())
    codes = [converter(input()) for _ in range(N)]
    M *= 4
    # collections = []
    result = 0
    for th in range(1,N):
        code = codes[th]
        if code == codes[th-1] or 1 not in code:
            continue
        # print(code)
        searched.clear()
        i = M - 1
        while i > 5:
            if code[i] and (not codes[th-1][i] or not th): # 발견!
                switch = 3 # 3번 바뀜
                arg = [1]*4 # 비율
                idx = 1
                flag = True
                while switch and i >= idx:
                    if code[i-idx] == flag:
                        arg[switch] += 1
                    else:
                        switch -= 1
                        flag = not flag
                    idx += 1
                # resizing : arg 변수의 최소값이 1이 되어야 함
                size = min(arg[1:])

                if not switch and i >= size*7-1: # 3번 다 바뀌고 0이 들어갈 공간이 충분히 남았다면
                    for last_check in range(7*size-sum(arg)): # 마지막으로 0이 필요한 만큼 있는지 확인
                        if code[i-idx-last_check]:
                            break
                    else:
                        for j in range(1,4): # resizing
                            arg[j] //= size

                        key = str(arg)
                        if key in secret_code: # resizing한 값이 secret_code에 있는지 확인
                            searched.append(secret_code[key]) # 숫자 추가 (역순으로 추가 됨)
                            if len(searched) == 8: # 숫자 8개가 모이면
                                if ((searched[7]+searched[5]+searched[3]+searched[1])*3+searched[6]+searched[4]+searched[2] + searched[0])%10 == 0: # 유효성 검사
                                    result += sum(searched)
                                searched.clear()
                            i -= 7*size-1
            i -= 1

    print(f'#{tc} {result}')
```

- 최대한 불필요한 반복을 줄였는데 Runtime Error
  - ??????????????????????????????????????????



### 최종 코드

```python
secret_code = {'[1, 2, 1, 1]':0, '[1, 2, 2, 1]':1, '[1, 1, 2, 2]':2, '[1, 4, 1, 1]':3, '[1, 1, 3, 2]':4, '[1, 2, 3, 1]':5, '[1, 1, 1, 4]':6, '[1, 3, 1, 2]':7, '[1, 2, 1, 3]':8, '[1, 1, 1, 2]':9}
searched = []
def converter(arr):
    # 2진법으로 변경
    data_converted = [0]*(M*4)
    for di in range(M):
        d = arr[di]
        d = '0123456789ABCDEF'.index(d)
        for i in range(3, -1, -1):
            if d & (1 << i):
                data_converted[di*4+3-i] = 1
            else:
                data_converted[di*4+3-i] = 0
    return data_converted

for tc in range(1, int(input())+1):
    N, M = map(int,input().split())
    codes = [converter(input()) for _ in range(N)]
    M *= 4
    result = 0
    for th in range(1,N):
        code = codes[th]
        searched.clear()
        i = M - 1
        while i > 5:
            if code[i] and not codes[th-1][i]: # 발견!
                switch = 3 # 3번 바뀜
                arg = [1]*4 # 비율
                idx = 1
                flag = True
                while switch and i >= idx:
                    if code[i-idx] == flag:
                        arg[switch] += 1
                    else:
                        switch -= 1
                        flag = not flag
                    idx += 1
                # resizing : arg 변수의 최소값이 1이 되어야 함
                size = min(arg[1:])

                # print(arg, switch, size)
                if not switch and i >= size*7-1: # 3번 다 바뀌고 0이 들어갈 공간이 충분히 남았다면
                    for last_check in range(7*size-sum(arg)): # 마지막으로 0이 필요한 만큼 있는지 확인
                        if code[i-idx-last_check]:
                            break
                    else:
                        for j in range(1,4): # resizing
                            arg[j] //= size

                        key = str(arg)
                        if key in secret_code: # resizing한 값이 secret_code에 있는지 확인
                            searched.append(secret_code[key]) # 숫자 추가 (역순으로 추가 됨)
                            if len(searched) == 8: # 숫자 8개가 모이면
                                if ((searched[7]+searched[5]+searched[3]+searched[1])*3+searched[6]+searched[4]+searched[2] + searched[0])%10 == 0: # 유효성 검사
                                    result += sum(searched)
                                searched.clear()
                            i -= 7*size-1
            i -= 1

    print('#{} {}'.format(tc, result))
```

`1,238 ms` `190,816 kb` `Python 3`

- **문제의 원인. `APPEND`**
  - append를 400만 번 정도 수행 => 너무 많은 연산
- append 문제를 해결하니 `pass`



- `진실`
  - 리눅스와 윈도의 개행문자 처리방법이 달라서 생기는 에러
  - CRLF



### 개선된 코드

```python
secret_key = {'211': 0, '221': 1, '122': 2, '411': 3, '132': 4, '231': 5, '114': 6, '312': 7, '213': 8, '112': 9}
 
 
def converter(arr):
    # 2진법으로 변경
    data_converted = [0] * (len(arr) * 4)
    for di in range(len(arr)):
        d = arr[di]
        d = '0123456789ABCDEF'.index(d)
        for i in range(3, -1, -1):
            if d & (1 << i):
                data_converted[di * 4 + 3 - i] = 1
            else:
                data_converted[di * 4 + 3 - i] = 0
    return data_converted
 
 
def counter(binary_arr):
    data_converted = [0]
    flag = False
    switch = 0
    for d in binary_arr:
        if d == flag:
            data_converted[switch] += 1
        else:
            data_converted.append(data_converted[switch] + 1)
            flag = not flag
            switch += 1
    return data_converted
 
 
for tc in range(1, int(input()) + 1):
    N, M = map(int, input().split())
    codes = [counter(converter(input().rstrip())) for _ in range(N)]
    result = 0  # 출력할 정답
    patterns = {}
    for th in range(1, N):
        code = codes[th]
        # print(code)
        if len(code) == 1:
            continue
        got_code = [0] * 9
        code_index = 0
        idx_one = 0
        # print(code)
        while idx_one < len(code) - 3:
            pattern_key = str(code[idx_one])
            if pattern_key in patterns:
                if patterns[pattern_key][0] + 1 == th:
                    for find in range(idx_one+1,len(code)):
                        # print('skipped')
                        if code[find] == patterns[pattern_key][1]:
                            break
                    if find < len(code)-1:
                        idx_one = find+1
                        patterns[pattern_key][0] += 1
                        continue
 
            for desc in range(code[idx_one + 3] - code[idx_one + 2]):
                alpha = code[idx_one + 1] - code[idx_one]
                beta = code[idx_one + 2] - code[idx_one + 1]
                gamma = code[idx_one + 3] - desc - code[idx_one + 2]
                size = min(alpha, beta, gamma)
 
                left_for_z = 7 * size - (code[idx_one + 3] - desc - code[idx_one])
 
                if not idx_one or code[idx_one] - code[idx_one - 1] >= left_for_z:  # 7자리수 찾음
                    key = str(alpha // size) + str(beta // size) + str(gamma // size)
                    if key in secret_key:  # 암호키에 있는지
                        if not code_index:
                            got_code[code_index] = code[idx_one]
                            code_index += 1
                        # 이진수 패턴에 대응하는 10진수 숫자를 찾음
                        got_code[code_index] = secret_key[key]
                        code_index += 1
                        if code_index == 9:
                            if not ((got_code[1] + got_code[3] + got_code[5] + got_code[7]) * 3 + got_code[2] +
                                    got_code[4] + got_code[6] + got_code[8]) % 10:  # 유효성 검사
                                # 해독 및 result에 추가
                                # print(got_code,th)
                                result += got_code[1] + got_code[2] + got_code[3] + got_code[4] + got_code[5] + \
                                          got_code[6] + got_code[7] + got_code[8]
                            patterns[str(got_code[0])] = [th, code[idx_one + 3]]
                            got_code = [0] * 9
                            code_index = 0
                        idx_one += 2
                        break
            idx_one += 2
    print('#{} {}'.format(tc, result))
```

`1,055 ms` `75,616 kb` `Python 3`

- 일단 서버 쪽에서 input값에 리눅스 개행문자가 추가되는 문제 때문에 런타임에러가 발생한 것
  - rstrip()을 추가함으로써 해결



- 어짜피 숫자가 반전되는 경계 부분만 중요하므로, `counter 함수`에서 숫자 갯수만 셈
  - 처음에는 갯수만 셌지만, 해당 숫자의 위치를 알 수 없어서(몇 번째 숫자인지) 누적합을 저장하는 것으로 변경
- 패턴을 기록하는 방법
  - 10진수 숫자를 저장한 `got_code` 변수에서 1~8번째까지는 기존의 숫자를 기록, 0번째는 해당 패턴의 시작 위치를 기록
  - 숫자 8개가 모이고 유효성을 검사한 후, `patterns`에 해당 패턴의 시작위치를 key 값으로 패턴의 row값과 패턴의 마지막 위치를 저장
  - 이후 key값과 동일한 위치를 만나면, row값을 확인해서 바로 위의 패턴인지 확인 -> 패턴의 마지막 위치로 이동





## 다른 사람 코드

### 권순현님 코드

```python
num = {
    '3211': '0', '2221': '1', '2122': '2', '1411': '3', '1132': '4',
    '1231': '5', '1114': '6', '1312': '7', '1213': '8', '3112': '9',
}
num16 = {
        '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100', '5': '0101', '6': '0110', '7': '0111',
        '8': '1000', '9': '1001', 'A': '1010', 'B': '1011', 'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111',
}
 
T = int(input())
for tc in range(1,T+1):
    N, M = map(int,input().split())
    data = [input() for _ in range(N)]
    se = []
    result = []
    result_num2 = []
    ans  = 0
    for i in range(N-1,-1,-1):
        sy = 9999999
        for j in range(M-1,-1,-1):
            if data[i][j] != '0' :
                if data[i+1][j] == '0' and j < sy:
                    ex = i
                    ey = j
                    sx = i
                    sy = j
                    while data[sx][ey] != '0':
                        sx -= 1
                    sx += 1
                    while ey >= 0:
                        if data[sx][ey] != data[ex][ey] or data[ex + 1][ey] != '0' or data[sx - 1][ey] != '0':
                            break
                        if data[sx][ey] != '0' and data[sx-1][ey] == '0':
                            sy = ey
                        ey -= 1
                    se.append([sx,sy,j])
    for i in se:
        num2 = data[i[0]][i[1]:i[2]+1]
        result_num2 = []
        for j in num2:
            result_num2.append(num16[j])
        f_num2 = ''.join(result_num2)
        count = len(f_num2)//56
        if len(f_num2) % 56 >= 40:
            count += 1
        result_num = []
        result = []
        for j in range(len(f_num2)-1,-1,-1):
            if f_num2[j] == '1':
                while True:
                    length = count * 7
                    start = j - 55 * count - (count-1)
                    while start < 0 :
                        f_num2 = '0' + f_num2
                        start += 1
                    sample_0 = 0
                    sample_1 = 0
                    result_num = []
                    for k in range(start,len(f_num2)-1):
                        if f_num2[k] == '0' :
                            sample_0 += 1
                            if f_num2[k+1] == '1':
                                result_num.append(str(int(sample_0/count)))
                                sample_0 = 0
                        elif f_num2[k] == '1':
                            sample_1 += 1
                            if f_num2[k+1] == '0':
                                result_num.append(str(int(sample_1/count)))
                                sample_1 = 0
                    result_num.append(str(int((sample_1+1)/count)))
                    for k in range(0,32,4):
                        result.append(int(num[''.join(result_num[k:k+4])]))
                    number = (result[0] + result[2] + result[4] + result[6]) * 3 + (
                                result[1] + result[3] + result[5] + result[7])
                    if number % 10 == 0:
                        ans += sum(result)
                    break
                break
    print('#{} {}'.format(tc,ans))
```

`632 ms` `85,060 kb` `Python 3`

- raw data에서 어짜피 0만 있는 부분은 의미가 없으므로 다 지워버리고, 탐색 범위를 좁혀 row, col1:col2를 append한 `se` 변수 생성

- 좁힌 탐색 범위 내에서 계산
