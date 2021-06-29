# Hash

## 개념

key => [Hash function] => address

이렇게 나온 address에 값을 저장

- 만약 hash function이 동일한 값을 반환한다면?? => 충돌 문제
  - Chaining
  - Linear Probing



## Chaining

```python
hash_table = list([0 for i in range(8)])

def get_key(data):
    return hash(data) # 숫자 형태로 반환 (나머지를 구할 수 있도록)

def hash_function(key):
    return key % 8


# Chaining
def save_data(data, value):
    index_key = get_key(data)
    hash_address = hash_function(index_key)
    if hash_table[hash_address] != 0: # 해당 address에 값이 존재
        for index in range(len(hash_table[hash_address])):
            if hash_table[hash_address][index][0] == index_key:
                hash_table[hash_address][index][1] = value # address-index가 동일하면 덮어쓰기
                return
        hash_table[hash_address].append([index_key, value]) # address-index가 다르면 새로 추가
    else:
        hash_table[hash_address] = [[index_key, value]]

        
def read_data(data):
    index_key = get_key(data)
    hash_address = hash_function(index_key)

    if hash_table[hash_address] != 0:
        for index in range(len(hash_table[hash_address])):
            if hash_table[hash_address][index][0] == index_key:
                return hash_table[hash_address][index][1]
        return None
    else:
        return None

    
save_data('Da', '1201023010')
save_data('Dave', '3301023010')
save_data('Data', '3301023010')
print(read_data('Da'))
print(read_data('Dave'))
print(hash_table)
```



## Linear Probing

```python
hash_table = list([0 for i in range(8)])

def get_key(data):
    return hash(data) # 숫자 형태로 반환 (나머지를 구할 수 있도록)

def hash_function(key):
    return key % 8


# Linear Probing
def save_data(data, value):
    index_key = get_key(data)
    hash_address = hash_function(index_key)
    if hash_table[hash_address] != 0: # 해당 address에 값이 존재
        for index in range(hash_address, len(hash_table)): # address부터 검색
            if hash_table[index] == 0: # 비어있으면 값 저장, 없으면 다음 address 탐색
                hash_table[index] = [index_key, value]
                return
            elif hash_table[index][0] == index_key: # address의 key가 동일하면 덮어쓰기
                hash_table[index][1] = value
                return
    else:
        hash_table[hash_address] = [index_key, value]


def read_data(data):
    index_key = get_key(data)
    hash_address = hash_function(index_key)

    if hash_table[hash_address] != 0:
        for index in range(hash_address, len(hash_table)):
            if hash_table[index] == 0:
                return None
            elif hash_table[index][0] == index_key:
                return hash_table[index][1]
    else:
        return None


save_data('dk', '01200123123')
save_data('dw', '3333333333')
save_data('dc', '23456781234')
print(read_data('dc'))
print(hash_table)
```



## SHA

### SHA-1

```python
import hashlib

data = 'test'.encode()
hash_object = hashlib.sha1()
hash_object.update(data)
hex_dig = hash_object.hexdigest()
print (hex_dig)
```



### SHA-256

```python
import hashlib

data = 'test'.encode()
hash_object = hashlib.sha256()
hash_object.update(data)
hex_dig = hash_object.hexdigest()
print (hex_dig)
```



### SHA-256 사용

```python
import hashlib

/* ... */

def get_key(data):
        hash_object = hashlib.sha256()
        hash_object.update(data.encode())
        hex_dig = hash_object.hexdigest()
        return int(hex_dig, 16)
```

