# beans

JSP 페이지의 자바 코드의 묶음

- 반복되는 Java 코드를 묶어서 유지 보수를 간변하게 함

- DTO, DAO 역시 beans임





## DTO beans (Data Transfer Object)

`데이터를 오브젝트로 변환하는 객체`

하나의 DB 레코드와 대응되는 형태

**setter / getter**



## DAO beans (Data Access Object)

`DB에 접근하는 객체`

DTO 객체를 만들어 편집 및 조작

**DB 조회 및 저장**



# Entity

DB 테이블에 존재하는 Column을 필드로 가지는 객체 -> DB 테이블과 1:1 대응 (구조가 정확히 일치해야 함)





# 정리

**DAO**를 통해 <u>DB에 접근</u>, 데이터를 가져와서 **Entity** 형태로 <u>값 저장</u> => Entity를 **DTO**로 변환하여 <u>Data를 다른 계층으로 전달</u>