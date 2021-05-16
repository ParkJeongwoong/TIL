# Virtual-Circuit Networks: Frame Relay and ATM

![image-20210516232013175](19_SONET_SDH(2).assets/image-20210516232013175.png)

- Switched Network의 종류 (스위칭 방식의 종류)
  - Circuit Switched network
  - Packet Switched network : 패킷으로 데이터를 보냄 (Data link protocol에서의 frame = 네트워크에서 packet)
    - Datagram nework : (ex. IP 프로토콜) - 연결 설정 X (연결 설정을 따로 하지 않고 바로 데이터를 전송시킴)
    - <u>Virtual Circuit network : (ex. X.25, Frame Relay, ATM) - 연결 설정 O (데이터를 전송하기 전에 연결을 먼저 완료하고 보냄. 전화 연결하는 것 처럼)</u>
  - Message Switched network : 메시지를 통째로 데이터로 보냄





## Frame Relay

> X.25 이후에 나온 방식

- X.25의 문제점
  - 최대 속도가 64 Kbps (너무 느림)
  - 케이블 품질이 안 좋은 시절에 만든 프로토콜 => flow 제어, error 제어 기능이 굉장히 많음 => 불필요한 기능들이 엄청난 overhead를 만들어서 속도 저하를 발생시킴
  - private 용도로 만들어진 프로토콜 (인터넷 용도가 아님)

- 이후 T1, T3가 만들어지고 각 private line을 T1, T3로 대체 => 이렇게 <u>private line</u>을 쓰니 **비용이 많이 듦** & **bandwith on demand가 안 됨**
  - T1, T3는 고정 속도라 필요한 만큼 bandwidth(속도)를 효율적으로 사용 불가능



- 이러한 문제를 해결하기 위해 44.736 Mbps의 속도를 가진 Frame Relay를 만듦 (근데 이것도 지금은 느려서 안 씀)

  - **bursty data**를 지원하기 때문에 **bandwith on demand 가능**
    - <u>순간적으로 트래픽을 증가</u> 가능

  - 9000 bytes의 크기를 가짐
  - flow control X
  - error control 방식은 그냥 데이터 버리기



### Architecture

- PVC와 SVC 지원

![image-20210516234047102](19_SONET_SDH(2).assets/image-20210516234047102.png)

- 위쪽의 LAN 부분의 3 갈래 line 중 어느 부분에서 data가 오는지 알아야 하기 때문에, 이를 구분하기 위해 **DLCI**를 각 line의 ID로 사용

![image-20210516234431693](19_SONET_SDH(2).assets/image-20210516234431693.png)

위의 빨간 선들을 구분하기 위해 사용하는 게 DLCI (출발-도착을 표기)



#### PVC (Permanent Virtual Circuit)

> 전화에서 전용 회선과 비슷

**A 에서 B 지점으로 가는 전용 회선을 말함**

ex) `성대 서울캠 ` - `성대 수원캠`을 잇는 고정된 line

- **연결할 route가 이미 지정됨** => **연결 설정 과정이 필요 없음**



#### SVC (Switched Virtual Circuit)

- **매번 연결할 때마다 route를 새로 결정함** <= **연결 설정 과정이 존재**