# Sample Size

필요한 표본의 크기를 어떻게 계산합니까?

## 결론

[**분산을 아는 경우**]
$$
n=Z^2\frac { \hat{σ}^2 } { d^2 }
$$
n : 표본의 크기

Z : 신뢰수준과 관련된 값

σ_hat^2 : 모집단 분산의 추정치

d: 허용오차

---

[**분산을 모르는 경우**]
$$
n=Z^2\frac { \hat{p} \times \hat{q} } { d^2 }
$$
p_hat : 특성값을 가지고 있는 비율의 추정치

q_hat : 특성값을 가지고 있찌 않은 비율의 추정치 (1-p_hat)

---

++ Z : 신뢰수준 95%일 때는 1.96 / 99%일 때는 2.58



## 표본의 크기 결정 방법

1. 허용 오차를 구한다!

![표준오차, 표본오차, 오차한계 개념 구분 : 네이버 블로그](data:image/png;base64,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)

2. 허용 오차에서 표본의 크기를 구한다!

- 분산을 아는 경우

  - 허용 오차 식
    $$
    d=Z\frac { \hat{σ} } { \sqrt{n} }
    $$
    여기서 위의 식을 도출



- 분산을 모르는 경우

  - 허용 오차 식
    $$
    d=Z\sqrt{\frac { \hat{p} \times \hat{q} } { n }}
    $$
    여기서 위의 식을 도출



# 참고

https://math100.tistory.com/56

https://swmh.tistory.com/124

https://ko.wikipedia.org/wiki/%ED%97%88%EC%9A%A9_%EC%98%A4%EC%B0%A8