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
    // DeepCopy
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

복사해서 사용할 구현체

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

구현체에 주입할 클래스 (필수적인 건 아니고 ShallowCopy, DeepCopy 비교용)

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
  GithubIssue githubIssue2 = (GithubIssue) githubIssue1.clone(); // clone의 결과물은 object라 형변환이 필요함
  System.out.println(githubIssue2.getUrl());

  // 비교
  System.out.println(githubIssue2 != githubIssue); // True
  System.out.println(githubIssue2.equals(githubIssue)); // True
  System.out.println(githubIssue2.getClass() == githubIssue1.getClass()); // True
  System.out.println(githubIssue2.getRepository() == githubIssue1.getRepository()); // True

  repository.setUser("Jeongwoong"); // whiteship -> Jeongwoong
  System.out.println(githubIssue2.getUrl()); // ShallowCopy라면 바뀐 user가 DeepCopy라면 원래 user가 출력 
}
```

(app.java)

## Clone()

`Object`의 메서드

- 동일한 인스턴스는 아니지만 (`==`이 다름)
- 동일한 Class를 반환 (`getClass()`가 같음)
- 동일한 내용 참조를 하는 객체를 반환 (`equals()`가 같음)

하지만 clone은 그냥은 사용할 수 없다.
- 접근제어자가 **protected**인 메서드이기 때문
=> **Override**가 필요

```java
@Override
protected Object clone() throws CloneNotSupportedException {
  return super.clone(); // ShallowCopy

  // // DeepCopy (과정을 그대로 서술하면 됨)
  // GithubRepository repository = new GithubRepository();
  // repository.setUser(this.repository.getUser());
  // repository.setName(this.repository.getName());

  // // GithubIssue 생성
  // GithubIssue githubIssue = new GithubIssue(repository);
  // githubIssue.setId(this.id);
  // githubIssue.setTitle(this.title);

  // return githubIssue;
}
```

형태로 super를 사용해서 그대로 사용 가능
