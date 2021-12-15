# JDBC

Java를 이용해서 DB와 연동하는 방법



## SQL 문법

- member 테이블 생성

```sql
CREATE TABLE member (
	memId VARCHAR2(10) CONSTRAINT memId_pk PRIMARY KEY,
    memPw VARCHAR2(10),
    memMail VARCHAR2(15),
    memPurcNum NUMBER(3) DEFAULT 0 CONSTRAINT memPurcNum_ck CHECK (memPurcNum < 3)
);
```

- member 테이블에 memId가 'b'인 계정 삽입

```sql
INSERT INTO member (memId, memPw, memMail)
	values ('b', 'bb', 'bbb@gmail.com');
```

- member 테이블에서 memId가 'b'인 정보 삭제

```sql
DELETE FROM member WHERE memId = 'b';
```

- member 테이블의 모든 정보 출력

```sql
SELECT * FROM member;
```

- member 테이블 삭제

```sql
DROP TABLE member;
```



## JDBC

### Flow

[`드라이버 로딩`] - [`DB 연결`] - [**SQL 작성 및 전송**] - [`자원 해제`]



### DAO 파일

```java
@Repository
public class MemberDao implements IMemberDao {

    // Driver Loading 용도
	private String driver = "oracle.jdbc.driver.OracleDriver"; // Load 할 Driver
	private String url = "jdbc:oracle:thin:@localhost:1521:xe"; // 경로 w. Port
	private String userid = "scott";
	private String userpw = "tiger";
	
	private Connection conn = null; // SQL에 있는 Conncetion
	private PreparedStatement pstmt = null; // SQL에 있는 PreparedStatement
	private ResultSet rs = null; // 결과값을 받기 위한 SQL의 ResultSet
	
	...

}
```

- Insert Method

```java
@Override
public int memberInsert(Member member) {

    int result = 0;

    try {
        // 1) 드라이버 로딩
        Class.forName(driver);
        // 2) DB 연결
        conn = DriverManager.getConnection(url, userid, userpw);
        // 3) SQL 작성 및 전송
        String sql = "INSERT INTO member (memId, memPw, memMail) values (?,?,?)"; // 3-1) query문 작성
        // 3-2) query문 전송
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, member.getMemId());
        pstmt.setString(2, member.getMemPw());
        pstmt.setString(3, member.getMemMail());
        result = pstmt.executeUpdate(); // 성공한 횟수가 result로 return됨 (1이 return 됨)
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        try {
            // 4) 자원 해제
            if(pstmt != null) pstmt.close();
            if(conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    return result;

}
```

- Select Method

```java
@Override
public Member memberSelect(Member member) {

    Member mem = null;

    try {
        // 1) 드라이버 로딩
        Class.forName(driver);
        // 2) DB 연결
        conn = DriverManager.getConnection(url, userid, userpw);
        // 3) SQL 작성 및 전송
        String sql = "SELECT * FROM member WHERE memId = ? AND memPw = ?"; // 3-1) query문 작성
        // 3-2) query문 전송
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, member.getMemId());
        pstmt.setString(2, member.getMemPw());
        rs = pstmt.executeQuery();

        while (rs.next()) {
            String memId = rs.getString("memid");
            String memPw = rs.getString("mempw");
            String memMail = rs.getString("memMail");
            int memPurcNum = rs.getInt("memPurcNum");

            mem = new Member();
            mem.setMemId(memId);
            mem.setMemPw(memPw);
            mem.setMemMail(memMail);
            mem.setMemPurcNum(memPurcNum);
        }

    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        try {
            // 4) 자원 해제
            if(rs != null) rs.close();
            if(pstmt != null) pstmt.close();
            if(conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    return mem;

}
```

- Update Method

```java
@Override
public int memberUpdate(Member member) {

    int result = 0;

    try {
        // 1) 드라이버 로딩
        Class.forName(driver);
        // 2) DB 연결
        conn = DriverManager.getConnection(url, userid, userpw);
        // 3) SQL 작성 및 전송
        String sql = "UPDATE member SET memPw = ?, memMail = ? WHERE memId = ?"; // 3-1) query문 작성
        // 3-2) query문 전송
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, member.getMemPw());
        pstmt.setString(2, member.getMemMail());
        pstmt.setString(3, member.getMemId());
        result = pstmt.executeUpdate(); // 성공한 횟수가 result로 return됨 (1이 return 됨)

    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        try {
            // 4) 자원 해제
            if(pstmt != null) pstmt.close();
            if(conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    return result;

}
```

- Delete Method

```java
@Override
public int memberDelete(Member member) {

    int result = 0;

    try {
        // 1) 드라이버 로딩
        Class.forName(driver);
        // 2) DB 연결
        conn = DriverManager.getConnection(url, userid, userpw);
        // 3) SQL 작성 및 전송
        String sql = "DELETE member WHERE memId = ? AND memPw = ?"; // 3-1) query문 작성
        // 3-2) query문 전송
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, member.getMemId());
        pstmt.setString(2, member.getMemPw());
        result = pstmt.executeUpdate(); // 성공한 횟수가 result로 return됨 (1이 return 됨)

    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        try {
            // 4) 자원 해제
            if(pstmt != null) pstmt.close();
            if(conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    return result;

}
```

SQL문 작성 및 전송 외에는 중복된 부분이 많음

=> JDBC Template으로 중복 해결





## 출처

인프런 - 자바 스프링 프레임워크(renew ver.) - 신입 프로그래머를 위한 강좌
