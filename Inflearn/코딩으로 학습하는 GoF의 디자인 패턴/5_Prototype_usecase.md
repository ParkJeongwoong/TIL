# 프로토타입 패턴 활용

- Java Object 클래스의 clone 메소드 & Cloneable 인터페이스
- Shallow Copy & Deep Copy
- ModelMapper

<br>

## Java에서의 활용 (Collection의 clone)

> 결론부터 말하자면 Collection 인터페이스는 clone을 사용하지 않는 Shallow Copy를 활용하는 것이 알반적

- List 인터페이스는 Cloneable 인터페이스를 상속 X
  
  - List의 구현체인 ArrayList는 Cloneable을 상속
  
  - 하지만 객체의 추상적인 사용이 중요하므로 List 타입으로 받는 게 일반적

=> 이 때 사용하는 `프로토타입 패턴은 아니지만` **Shallow Copy**를 하는 일반적인 방법

```java
List<Student> students = new ArrayList<>();
...
List<Student> clone = new ArrayList<>(students);
```

<br>

## ModelMapper

> [공식문서](http://modelMapper.org)

ModelMapper 클래스를 사용해서 데이터 복사 가능

ModelMapper 클래스의 메서드인 `map`는 Input으로 들어온 데이터를 함께 들어온 Input 클래스로 손쉽게 변환시켜 준다.

```java
GithubRepository repository = new GithubRepository();
GithubIssue githubIssue = new GithubIssue(repository);

// ModelMapper를 사용해서 GithubIsssue를 GithubIssueData에 담기
ModelMapper modelMapper = new ModelMapper():
GithubIssueData githubIssueData = modelMapper.map(githubIssue, GithubIssueData.class);
```

map 메서드는 Reflection을 사용해서 Target Class(여기서는 GithubIssueData 클래스)의 정보를 읽어서 매핑해 준다.

이렇게 만들어진 githubIssueData는 githubIssue에 담긴 정보를 그대로 가지고 있다.

<br>

```java
// GithubRepository
public class GithubRepository {
  private String user;
  private String name;
}
// GithubIssue
public class GithubIssue implements Cloneable {
  private int id;
  private String title;
  private GithubRepository repository;
  ...
}

// GithubIssueData
public class GithubIssueData {
  private int id;
  private String title;
  private String repositoryUser;
  private String repositoryName;
  ...
}
```

GithubIssueData는 GithubIssue와 GithubRepository의 변수를 담고 있다.
(만약 데이터가 하나도 일치하지 않는다면 `ValidationException` 에러를 발생시킨다)