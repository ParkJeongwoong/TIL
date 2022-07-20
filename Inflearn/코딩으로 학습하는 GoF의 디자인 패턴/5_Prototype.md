# 프로토타입 패턴

> 기존 인스턴스를 복제해서 새로운 인스턴스를 만드는 패턴

- 복제 기능을 가진 기존 인스턴스를 프로토타입으로 사용 -> 새로운 인스턴스 생성
  - `clone()`이라는 메섯드 존재
- 기존의 객체를 응용해서 새로운 객체를 만들 때 사용 (새로운 객체 생성 시간이 오래 걸릴 때; DB나 네트워크 요청이 필요한다던가)

## 이론

- (interface) **Prototype** : `clone()` 메서드 존재
- ConcretePrototypeA : 구현체 A
- ConcretePrototypeB : 구현체 B

## 구현

```java
public static void main(String[] args) throws CloneNotSupportedException {
  GithubRepository repository = new GithubRepository();
  repository.setUser("whiteship");
  repository.setName("live-study");

  // GithubIssue 생성
  GithubIssue githubIssue1 = new GithubIssue(repository);
  githubIssue1.setId(1);
  githubIssue1.setTitle("1주차 과제: JVM은 무엇이며 자바 코드는 어떻게 실행하는 것인가.");

  String url = githubIssue1.getUrl();
  System.out.println(url);

  // GithubIssue 클론 생성
  GithubIssue githubIssue2 = (GithubIssue) githubIssue1.clone();
  System.out.println(githubIssue2.getUrl());

  repository.setUser("Keesun");

  // 비교
  System.out.println(githubIssue2 != githubIssue); // True
  System.out.println(githubIssue2.equals(githubIssue)); // True
  System.out.println(githubIssue2.getClass() == githubIssue1.getClass()); // True
  System.out.println(githubIssue2.getRepository() == githubIssue1.getRepository()); // True

  System.out.println(githubIssue2.getUrl());
}
```

(app.java)

```java
public class GithubRepository {

  private String user;
  private String name;

  public String getUser() { return user; }
  public String getName() { return name; }

  public void setUser(String user) { this.user = user; }
  public void setName(String name) { this.name = name; }

}
```

(GithubRepository.java)

```java
public class GithubIssue implements Cloneable {

  private int id;
  private String title;
  private GithubRepository repository;

  public GithubIssue(GithubRepository repository) { this.repository = repository; }

  public int getId() { return id; }
  public String getTitle() { return title; }
  public GithubRepository getRepository() { return repository; }
  public String getUrl() {
    return String.format("https://github.com/%s/%s/issues/%d",
            repository.getUser(),
            repository.getName(),
            this.getId());
  }

  public void setId(int id) { this.id = id; }
  public void setTitle(String title) { this.title = title; }

  @Override
  protected Object clone() throws CloneNotSupportedException {
    GithubRepository repository = new GithubRepository();
    repository.setUser(this.repository.getUser());
    repository.setName(this.repository.getName());

    GithubIssue githubIssue = new GithubIssue(repository);
    githubIssue.setId(this.id);
    githubIssue.setTitle(this.title);

    return githubIssue;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    GithubIssue that = (GithubIssue) o;
    return id == that.id && Objects.equals(title, that.title) && Objects.equals(repository, that.repository);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, title, repository);
  }
  
}
```

(GithubIssue.java)