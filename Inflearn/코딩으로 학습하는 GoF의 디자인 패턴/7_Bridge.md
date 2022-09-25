# 브릿지 패턴

> 추상적인 것과 구체적인 것을 연결하는 패턴

- 추상적인 것과 구체적인 것을 <u>나누는 것</u>
- Client 코드는 추상적인 부분을 사용
- 추상적인 부분은 구체적인 부분의 인터페이스를 사용
- 인터페이스를 구현한 구체적인 부분이 존재



## 이론

- Abstraction : 클라이언트가 사용하는 추상적인 인터페이스

- Refined Abstraction : Abstraction의 구현체

- Implemetation : Abstraction이 사용하는 구체적인 인터페이스

- Concrete Implementation : Implemetation의 구현체



### 예시

- LOL -> Champion 인터페이스 사용

- Champion -> Skin 인터페이스 사용

- DefaultChampoin -> Champion 인터페이스 구현

- Skin 인터페이스

- PoolPartySkin, KDASKin -> Skin 인터페이스 구현

- 