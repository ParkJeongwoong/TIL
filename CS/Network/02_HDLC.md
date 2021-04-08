http://www.kocw.net/home/search/kemView.do?kemId=299067

# HDLC

Data Link Control을 지원하는 Protocol은 2가지가 있음

1. **Character-oriented protocol** (=Byte-oriented protocol)
2. **Bit-oriented protocol**

데이터를 잘게 쪼갠 것 = Frame -> 이 Frame을 Bit 단위로 쪼개 볼거냐, Byte 단위로 쪼개 볼 거냐를 구분 짓는 게 위 2개의 protocol



## Character-oriented protocols

> Frame을 문자(혹은 byte)의 나열로 해석하는 것
>
> 1 Character = 8bit = 1byte

- 현재는 많이 사용하지 않음
  - 대부분 Bit-oriented protocol 사용



❗ 구조

[Flag]<Header> `[Characters]` <Trailer>[Flag]

> Flag : Frame의 시작과 끝을 구분지음
>
> Header, Trailer : Data 외의 추가적인 정보



❓만약 Data에 Flag 신호와 똑같은 Byte가 들어간다면..??

[`투명성 문제`] (Transparency Problem)

- **byte-stuffing**

  이를 해결하기 위해 `escape character (ESC)`를 추가한다

  - ESC를 넣는 위치
    1. **Flag와 동일**한 신호 앞
    2. **ESC와 동일**한 신호 앞



## Bit-oriented protocols

> Frame을 bit의 나열로 해석하는 것

- 오늘날 대부분의 경우 사용하는 protocol

- 대부분의 protocol을 **`01111110`**이라는 8-bit pattern을 flag로 사용



❗ 구조

[01111110] <Header> `[Bits]` <Trailer> [01111110]



❓만약 Data에 Flag 신호와 똑같은 Bit가 들어간다면..??

- **Bit-stuffing**

  data에 1이 연속으로 6개가 나오는 것을 방지하기 위해

  **1이 5개가 연속으로 나오면 extra 0를 붙인다**



---

## Flow and Error Control

### Flow control

> 수신자 측에서, 데이터의 양을 조절하는 것

- `acknowledgement`를 이용해 제어

- 기법
  1. **XON/XOFF** : Start or Stop transmission
  2. **Stop-and-wait** : send <u>one frame</u> at a time
  3. **Sliding window** : send <u>several frames</u> at a time



#### XON/XOFF

> Serial terminal에서 많이 사용됨 (프린터, 복사기 등)

- 더 이상 데이터를 받을 수 없을 때 Xoff 신호를 보냄 / *프린터의 메모리(버퍼)가 어느정도 차면 신호를 보냄*

- 다시 작업이 가능해지면 Xon 신호를 보냄



#### Stop-and-wait

- 한 번에 **하나의 frame**을 보냄 -> 잘 받으면 **acknowledgment**를 회신 -> 다시 한 **frame** 송신
- 간단하다는 장점 / 비효율적이라는 단점



#### Sliding window

- **Window size** : 한 번에 보내는 <u>frame의 개수</u> = **# of outstanding frame**(=unacknowledged frame)
- frame의 Header 부분에 frame 번호가 들어감 (보통 3비트를 사용)



- 한 번에 **여러 개의 frame**을 보냄 (<u>window size 만큼</u>) -> **acknowledgment**를 회신 -> **window size 갱신** -> 다시 **frame** 송신



### Error Control

- 받은 데이터가 손상되었는지 확인, 복원
  1. Error Detection
  2. Error Correction

- 기법
  1. **Discarding the errors** : 무시 (복구 X), 꽤 많이 씀
  2. **Forward Error Correction (FEC)** : 수신 측에서 Error **복구**
  3. **Automatic repeat request (ARQ)** : 가장 많이 사용됨. Error 발생시 **재전송**



- Error의 종류
  - frame의 소실 (도착 X)
  - frame의 손상
