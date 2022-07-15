# 빌더 패턴

> 동일한 프로세스로 다양한 인스턴스를 만드는 패턴

```java
TourPlan tourplan1 = new TourPlan();
tourplan1.setTitle("칸쿤 여행");
tourplan1.setNights(2);
...
tourPlan1.addPlan(2, "체크아웃");


tourplan2.setTitle("제주도 여행");
tourplan2.setNights(2);
...
tourPlan2.addPlan(2, "기념품 사기");
```

이렇게 매 스텝 마다 setter를 사용하여 객체를 생성하는 건 코드도 길어지고 비효율적

## 이론

`Client` 코드는 `Director` 코드를 사용해서 인터페이스 `Builder`를 사용
(Builder의 구현체가 Product를 생성)

## 구현

빌더 패턴을 쓰면 위의 장황한 코드 대신 간단하게 인스턴스를 생성할 수 있다

```java
TourDirector director = new TourDirector(new DefaultTourBuilder());
TourPlan tourPlan1 = director.cancunTrip();
TourPlan tourPlan2 = director.jejuTrip();
```

(client)

Director를 이용해서 Product 생성

```java
public class TourDirector {

  private TourPlanBuilder tourPlanBuilder;

  public TourDirector(TourPlanBuilder tourPlanBuilder) {
    this.tourPlanBuilder = tourPlanBuilder;
  }

  public TourPlan cancunTrip() {
    return tourPlanBuilder.title("칸쿤 여행")
            .nightsAndDays(2, 3)
            .startDate(LocalDate.of(2020, 12, 9))
            .whereToStay("리조트")
            .addPlan(0, "체크인하고 짐 풀기")
            .addPlan(0, "저녁 식사")
            .getPlan();
  }

  public TourPlan jejuTrip() {
    return tourPlanBuilder.title("제주 여행")
            .startDate(LocalDate.of(2021, 9, 24))
            .getPlan();
  }
  
}
```

(director)

Director는 Concrete Builder를 주입받아 Product를 생성 (정의는 Builder, 의존성 주입은 Concrete Builder)

```java
public interface TourPlanBuilder {

  TourPlanBuilder nightsAndDays(int nights, int days);

  TourPlanBuilder title(String title);

  TourPlanBuilder startDate(LocalDate localDate);

  TourPlanBuilder whereToStay(String whereToStay);

  TourPlanBuilder addPlan(int day, String plan);

  TourPlan getPlan();

}
```

(interface builder)

**Builder의 메서드는 자기자신을 리턴** => 이렇게 해서 메서드를 이어붙일 수 있음

```java
public class DefaultTourBuilder implements TourPlanBuilder {

  private String title;
  private int nights;
  private int days;
  private LocalDate startDate;
  private String whereToStay;
  private List<DetailPlan> plans;

  @Override
  public TourPlanBuilder nightsAndDays(int nights, int days) {
    this.nights = nights;
    this.days = days;
    return this;
  }

  @Override
  public TourPlanBuilder title(String title) {
    this.title = title;
    return this;
  }

  @Override
  public TourPlanBuilder startDate(LocalDate startDate) {
    this.startDate = startDate;
    return this;
  }

  @Override
  public TourPlanBuilder whereToStay(String whereToStay) {
    this.whereToStay = whereToStay;
    return this;
  }

  @Override
  public TourPlanBuilder addPlan(int day, String plan) {
    if (this.plans == null) {
        this.plans = new ArrayList<>();
    }

    this.plans.add(new DetailPlan(day, plan));
    return this;
  }

  @Override
  public TourPlan getPlan() {
    return new TourPlan(title, nights, days, startDate, whereToStay, plans);
  }

}
```
(concrete builder)