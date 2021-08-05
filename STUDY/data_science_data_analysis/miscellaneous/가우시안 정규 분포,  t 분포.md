# 가우시안 정규 분포 / t 분포

## 가우시안 정규 분포

> `정규분포`의 공식 명칭

### 정의

**평균에 가까울수록 발생확률이 높고, 멀어질수록 발생확률이 떨어지는 것을 표현하는 분포**

![img](https://t1.daumcdn.net/cfile/blog/24444D48581310A92D)



### 성질

- 기대값, 최빈값, 중앙값이 모두 같다
- 평균과 표준편차가 주어졌을 때 엔트로피를 최대화하는 분포



### 사용처

(가장 많이 활용됨)

- 가설검정, 회귀분석 등 대부분의 통계기법에 활용
- 대부분의 통계치와 유사함



## t 분포 (Student's t-Distribution)

(<u>기네스 맥주 공장에 다니던 Student가 맥주의 질을 높이기 위해 개발!!!</u>)

### 정의

독립적인 표준정규분포 *x*와 자유도가 *k*인 카이제곱분포 *χ*2에 대한 **x/(*y*/*k*)^0.5**

(카이제곱분포? *k*개의 서로 독립적인 표준 정규 확률 변수를 각각 제곱한 다음 합해서 얻어지는 분포)

![Story 7.5 [연속형] t 분포(Student t Distribution) : 네이버 블로그](https://mblogthumb-phinf.pstatic.net/20161010_246/yunjh7024_1476080510413L4IWo_PNG/%C1%A6%B8%F1_%BE%F8%B4%C2_%B1%D7%B8%B2.png?type=w800)

=> 굉장히 복잡한 이 확률밀도 함수는 직접 활용할 일 거의 X



#### 자유도?

**통계적 추정을 할 때 표본자료 중 모집단에 대한 정보를 주는 독립적인 <u>자료의 수</u>**



#### 형태

![img](https://mblogthumb-phinf.pstatic.net/20161010_43/yunjh7024_1476082253020Lyv1s_PNG/%C1%A6%B8%F1_%BE%F8%B4%C2_%B1%D7%B8%B2.png?type=w800)

파랑 : t 분포

빨강 : 표준정규분포



### 사용처

**정규분포를 따르지만 표본의 수가 적은 데이터의 경우에 쓰이게 됨** (둘이 생긴 게 비슷하기 때문)



# 참조

https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=definitice&logNo=220950767553

https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=yunjh7024&logNo=220832689977