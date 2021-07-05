# Block Chain

## 개념

- 블록 : 관리 대상 데이터
- 체인 : 연결고리



![img](https://blog.kakaocdn.net/dn/erNKrJ/btqNQ2WOVmF/hkpemOKMIloWMnTv0LKU21/img.png)

- 단순한 블록의 구성요소 (위에서 블록 헤더의 6가지 정보들) => 이 6가지를 통해 블록 해쉬(ID같은 존재)를 구한다
  1. 이전 블록의 해시값(이전 블록의 ID)
  2. 현재 블록의 데이터
  3. `Nonce`



- 작업 증명 (Proof Of Work)
  - Nonce 값을 올려가면서 최종 해시를 구하는 과정



- 블록을 수정하면 해시를 다시 구해야 함! 즉 중간에 블록을 바꾸면 이후의 모든 블록을 다 바꿔야 한다



## 간단한 블록체인 구현

sha256 사용

```python
import hashlib

class Block:
    def __init__(self, data, prevhash = ''):
        self.nonce = 0
        self.data = data
        self.prevhash = prevhash
        self.hash = self.cal_hash()

    def cal_hash(self):
        header_data = str(self.prevhash) + str(self.data) + str(self.nonce)
        return self.sha256_hashing(header_data)

    def sha256_hashing(self, data):
        hash_object = hashlib.sha256()
        hash_object.update(data.encode())
        hex_dig = hash_object.hexdigest()
        return hex_dig

    def mine_block(self):
        while self.hash[:5] != '00000':
            self.nonce += 1
            self.hash = self.cal_hash()

    def __str__(self):
        String = "nonce: " + str(self.nonce) + '\n'
        String += "data: " + str(self.data) + '\n'
        String += "prevhash: " + str(self.prevhash) + '\n'
        String += "hash: " + str(self.hash)

        return String


class BlockChain():
    def __init__(self):
        genesis_block = self.generate_genesis_block()
        self.chain = [genesis_block, ]
        print(genesis_block)
        print()

    @staticmethod
    def generate_genesis_block():
        return Block("Genesis Block")

    def get_last_block(self):
        return self.chain[-1]

    def add_block(self, new_data):
        new_prevhash = self.get_last_block().hash
        new_block = Block(new_data, new_prevhash)
        new_block.mine_block()
        self.chain.append(new_block)
        print(new_block)
        print()

block_chain = BlockChain()
block_chain.add_block('2nd')
block_chain.add_block('3rd')
```



![image-20210702171408133](간단한 Block Chain.assets/image-20210702171408133.png)







## 참고

https://rudalson.tistory.com/entry/%EA%B0%84%EB%8B%A8%ED%95%9C-%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8%EC%9D%84-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EB%A9%B0-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0

