# Controller, Service, DAO, DTO, Domain

스프링에서는 역할에 따라 객체를 분리하여 관리한다.



## Controller

사용차의 <u>요청(request)</u>을 **어떻게 처리할 지 결정**

```
@Controller
@RequestMapping
```



## Service

사용차의 <u>요청(request)</u>에 대해 **어떤 처리를 할 지 결정**

Controller로 부터 요청을 전달받고 정보를 가공해서 Controller로 데이터를 전달

```
@Service
```



## DAO

Database Access Object, **DB에 접근하는 객체**



## DTO

Data Transfer Object. **계층 간의 데이터 교환을 위한 객체**

Controller, Service, DAO 간 요청을 처리하고 전달할 때 사용하는 양식 (오직 데이터를 담는 용도로만 사용)



### Entity

DB 테이블과 1대1 대응



![시리즈 | 스프링부트 - agugu95.log](https://media.vlpt.us/images/agugu95/post/189b4d5e-002c-4e7c-a4fb-89f0dd60f435/image.png?w=768)



## Domain

**비즈니스 로직을 처리**하는 객체

서비스 객체는 Transaction(DAO가 수행)과 비즈니스 로직(Domain이 수행)의 순서만 보장



## 비즈니스 로직

[트랜젝션 스크립트 패턴 -  Service에서 비즈니스 로직 처리]

- Service에서 주문 취소를 위한 **DAO 객체 생성** - (**배송 상태 확인** - **조건문을 이용하여 상태에 따른 배송 취소 여부 결정 **) - **DB 업데이트**를 수행

  - DAO 객체 생성 : 주문 정보 DAO, 결제 정보 DAO, 배송 정보 DAO

  - 배송 상태 확인 : 배송 정보 DAO (method)

  - 배송 취소 : 배송 정보 DAO (method)

  - DB 업데이트 : 주문 정보 DAO (method), 결제 정보 DAO (method)



[도메인 모델 패턴 - Domain에서 비즈니스 로직 처리]

- Service에서 주문 취소를 위한 **DAO 객체 생성** - **DB 업데이트**를 순서대로 DAO와 Domain을 이용해 수행

  - DAO 객체 생성 : 주문 정보 DAO, 결제 정보 DAO, 배송 정보 DAO

  - DB 업데이트 : 배송 정보 DAO (method), 주문 정보 DAO (method), 결제 정보 DAO (method)
    - 이 때 배송 정보 DAO에 배송 상태에 따른 처리 로직이 모두 들어있음





## 출처

https://frtt0608.tistory.com/7

https://velog.io/@ohzzi/Entity-DAO-DTO%EA%B0%80-%EB%AC%B4%EC%97%87%EC%9D%B4%EB%A9%B0-%EC%99%9C-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C

https://blog.naver.com/PostView.nhn?blogId=good_ray&logNo=222267722516