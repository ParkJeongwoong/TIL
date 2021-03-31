http://www.kocw.net/home/search/kemView.do?kemId=299067

# Data Link Control

> framing, flow control, error control, protocols

라우터 : 신호를 다른 컴퓨터로 연결하는 장치 (일종의 컴퓨터)

=> End System(실제 우리가 다루는 컴퓨터) 사이에 전송되는 Data를 관리하는 기술이 `Data Link Control`



## Data Link Layer의 역할

- Frame synchronization
  	Frame: 데이터 덩어리 / Data는 여러 조각(blcoks)으로 분리해서 보낸다
  	그리고 보내는 쪽과 받는 쪽은 이 데이터 조각이 동기화가 돼야 한다

- Flow control
  	receiver가 sender의 data를 통제하는 것 (너무 많은 데이터가 한 번에 오지 않도록)

- **Error control** (굉장히 중요)

  ​	통신 중 발생하는 error를 조정하는 것

- Physical addressing

  ​	통신을 할 대상을 특정하는 물리적 주소 (식별자)

- Access control

  ​	여러 장치가 같은 link에 연결되어 있을 때, 어떤 장치가 연결될 지 결정하는 것

### 결론

- Data Link Layer의 역할
  1. `Line discipline` (access control) - 누가?
  2. `flow control` - 얼마나 많이?
  3. **`error control` - detect, correct errors**



## Poll / Select

`multidrop`(=`multipoint`)를 사용하면 transmission line costs를 줄일 수 있다

​	=> 여러 터미널이 선 하나를 공유하는 것

- 이 때 <u>한 번에 message block 하나</u>만 보낼 수 있다.

  => 지금은 많이 사용하지 않는 방식

  [Primary computer와 Secondary computer로 나뉘던 옛날 컴퓨터에서 많이 사용]

  - `Polling`: secondary가 send할 때 사용
    - `Roll-call Polling`: primary가 하나씩 다 물어보는 것
    - `Hub Polling`: poll command를 secondary에게 주고 secondary가 서로 command를 돌리며 poll을 결정하는 것 
  - `Select`: primary가 send할 때 사용



## Framing

> Data Link Later는 bits를 frame에 넣어 보낸다 => 각각 구분될 수 있는 frame에 넣음으로 써 data를 구분

만약 message가 매우 큰 frame 하나에 담겨져 보내진다면 하나의 error가 전체 데이터에 큰 영향을 끼침

(Error가 발생하면 해당 frame을 재전송하는데, frame이 크면 error가 발생할 때마다 큰 데이터를 다시 받아와야 함)
