# JDBC_Template

JDBC를 이용할 때 생기는 중복을 해결하는 템플릿

(SQL문 작성 및 전송을 제외한 구간에서 반복이 발생)

## JDBC_Template

- JDBC : `드라이버 로딩` - `DB 연결` - **SQL 작성/전송** - `자원해제`
  - 이 때 **SQL 작성/전송**만 바뀌고 나머지는 항상 반복된다.

- JDBC_Template : `JdbcTemplate` - **SQL 작성/전송**
  - 드라이버 로딩, DB 연결, 자원해제를 Template에서 해결해 준다.



## DataSource 클래스

> 데이터베이스 연결과 관련된 정보를 가지고 있는 클래스
>
> 스프링 또는 c3p0 모듈에서 제공하는 클래스를 이용 가능

> 템플릿 설정을 위해 필요



- **DriverManager**
  - 스프링 : `org.springframework.jdbc.datasource.DriverManagerDataSource`
  - c3p0 : `com.mchange.v2.c3p0.DriverManagerDataSource`



## Template 이용 방법

- 의존설정 추가 (pom.xml)

  ```xml
  <!-- 메이븐 레파지토리에 없는 오라클 레파지토리 추가 -->
  <repositories> <!-- 기존 -->
  	<repository>
      	<id>oracle</id>
          <name>ORACLE JDBC Repository</name>
          <url>http://maven.jahia.org/maven2</url>
      </repository>
  </repositories>
  
  ...
  
  <!-- DB -->
  <dependency> <!-- 기존 -->
  	<groupId>com.oracle</groupId>
      <artifactId>objdbc6</artifactId>
      <version>12.1.0.2</version>
  </dependency>
  <dependency> <!-- 스프링에서 제공하는 JDBC 추가 -->
  	<groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>4.1.6.RELEASE</version>
  </dependency>
  <dependency> <!-- JDBC 커넥션 풀을 지원하는 C3P0 모듈 추가 -->
  	<groupId>com.mchange</groupId>
      <artifactId>c3p0</artifactId>
      <version>0.9.5</version>
  </dependency>
  ```

- 템플릿 사용 (Dao.java)

  ```java
  @Repository
  public class MemberDao implements IMmeberDao {
      ...
      // template, dataSource 객체 생성
      private DriverManagerDataSource dataSource; // c3p0 기준
      org.springframework.jdbc.datasource.DriverManagerDataSource dataSource // spring 기준
          
      private JdbcTemplate template;
      
      // 생성자 (c3p0 기준)
      public MemberDao() {
          dataSource = new DriverManagerDataSource();
          dataSource.setDriverClass(driver); // 1-0) 드라이버 로딩 준비
          dataSource.setJdbcUrl(url); // 2-0) DB 연결 준비
          dataSource.setUser(userid); // 2-0) DB 연결 준비
          dataSource.setPassword(userpw); // 2-0) DB 연결 준비
          
      	template = new JdbcTemplate();
          template.setDataSource(dataSource);
      }
      // 생성자 (spring 기준)
      public MemberDao() {
          dataSource = new org.springframework.jdbc.datasource.DriverManagerDataSource();
          dataSource.setDriverClassName(driver); // 1-0) 드라이버 로딩 준비
          dataSource.setUrl(url); // 2-0) DB 연결 준비
          dataSource.setUsername(userid); // 2-0) DB 연결 준비
          dataSource.setPassword(userpw); // 2-0) DB 연결 준비
      
      	template = new JdbcTemplate();
          template.setDataSource(dataSource);
      }
      
      ... // 이후 각 Method 코드는 아래에
  }
  ```

  - Insert Method

  ```java
  @Override
  public int memberInsert(Member member) {
  
      int result = 0;
      
      // 3) SQL 작성 및 전송
      // 3-1) query문 작성
      final String sql = "INSERT INTO member (memId, memPw, memMail) values (?,?,?)";
      // 3-2) query문 전송
      // query문 전송 방법 1
      result = template.update(sql, member.getMemId(), member.getMemPw(), member.getMemMail()); // 1 end
  	// query문 전송 방법 2
      result = template.update(new PreparedStatementCreator() {
  		@Override
  		public PreparedStatement createPreparedStatement(Connection conn)
  				throws SQLException {
  			PreparedStatement pstmt = conn.prepareStatement(sql);
  			pstmt.setString(1, member.getMemId());
  			pstmt.setString(2, member.getMemPw());
  			pstmt.setString(3, member.getMemMail());
  			
  			return pstmt;
  		}
  	}); // 2 end
      // query문 전송 방법 3
      result = template.update(sql, new PreparedStatementSetter() {		
  		@Override
  		public void setValues(PreparedStatement pstmt) throws SQLException {
  			pstmt.setString(1, member.getMemId());
  			pstmt.setString(2, member.getMemPw());
  			pstmt.setString(3, member.getMemMail());				
  		}
  	}); // 3 end
       
      return result;
  
  }
  ```

  - Select Method

  ```java
  @Override
  public Member memberSelect(Member member) {
  
      List<Member> members = null;
      
      // 3) SQL 작성 및 전송
      final String sql = "SELECT * FROM member WHERE memId = ? AND memPw = ?"; // 3-1) query문 작성
      members = template.query(sql, new PreparedStatementSetter() {
          @Override
          public void setValues(PreparedStatement pstmt) throws SQLException {
              pstmt.setString(1, member.getMemId());
              pstmt.setString(2, member.getMemPw());
          }
      }, new RowMapper<Member>() {
          @Override
          public void mapRow(ResultSet rs, int rowNum) throws SQLException {
              Member mem = new Member();
              mem.setMemId(rs.getString("memid"));
              mem.setMemPw(rs.getString("mempw"));
              mem.setMemMail(rs.getString("memMail"));
              mem.setMemPurcNum(rs.getInt("memPurcNum"));
              return mem;
          }
      }); // 3-2) query문 전송
      
      if (members.isEmpty()) return null;
      
      return members.get(0);
  
  }
  ```

  - Update Method

  ```java
  @Override
  public int memberUpdate(Member member) {
  
      int result = 0;
      
      // 3) SQL 작성 및 전송
      final String sql = "UPDATE member SET memPw = ?, memMail = ? WHERE memId = ?"; // 3-1) query문 작성
      result = template.update(sql, member.getMemPw(), member.getMemMail(),  member.getMemId()); // 3-2) query문 전송
  
      return result;
  
  }
  ```

  - Delete Method

  ```java
  @Override
  public int memberDelete(Member member) {
  
      int result = 0;
      
      // 3) SQL 작성 및 전송
      final String sql = "DELETE member WHERE memId = ? AND memPw = ?"; // 3-1) query문 작성
      result = template.update(sql, member.getMemId(), member.getMemPw()); // 3-2) query문 전송
  
      return result;
  
  }
  ```

  



## 출처

인프런 - 자바 스프링 프레임워크(renew ver.) - 신입 프로그래머를 위한 강좌
