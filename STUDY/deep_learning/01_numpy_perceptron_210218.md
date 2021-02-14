# Deep Learning 스터디

2월18일 6시 반 / 첫 모임

---

## 1장. 파이썬 기초

### numpy

배열을 다루는 method가 내장된 모듈

---

#### 배열 생성

- 1차원 배열

`x = numpy.array([1,2,3])`

- 2차원 배열

`A = numpy.array([[1,2,], [3,4]])`

- `Array.shape`를 통해 array의 크기 속성을 확인할 수 있음
- `Array.flatten()`을 통해 Array를 1차월 배열로 변환한 값을 반환



#### 산술 연산

두 배열의 요소의 개수가 같으면, 동일 인덱스 간 사칙연산 가능

##### 브로드캐스트

- 스칼라 값을 배열의 연산에 넣으면 배열의 각 원소마다 하나씩 연산

- [1\*2] 1차원 배열을 [2\*2] 2차원 배열과 연산하면 자동으로 2차원 배열로 변하며 연산



#### 원소 접근

- 괄호 안에 (1)`숫자를 쓰면 index`, (2)`조건을 쓰면 filter`역할

```
X[2] : 배열 X의 3번째 원소
X[X>15] : 배열 X의 원소 중 15보다 큰 조건을 가진 원소
```

`X>15`만 적으면 X의 원소가 조건식에 맞는지를 표현한 bool 배열로 표시됨



### matplotlib

데이터 시각화 모듈 (그래프 / 이미지)

---

> 아래의 method는 하나의 그래프를 꾸미는 용도

#### pyplot

`import matplotlib.pyplot as plt`

- `plt.plot(x,y, label='sin')` : x, y에 대한 그래프 그리기 / label은 sin으로 (선택사항)
- `plt.show()` : 그래프를 화면에 출력
- `plt.xlable('x')` : x축 이름 설정
- `plt.ylabel('y')` : y축 이름 설정
- `plt.title('sin graph')` : 그래프의 제목 설정
- `plt.legend()` : 그래프의 범례 설정

#### image & imread

`from matplotlib.image import imread`

- `img = imread('./dataset/cactus.jpg')` : 해당 디렉토리의 이미지 파일 읽기
- `plt.imshow(img)` : 그래프에 이미지 파일 붙이기
- `plt.show()` : 이걸 해야 이미지 출력



## 2장. 퍼셉트론

신경망(딥러닝)의 기원이 되는 알고리즘

> 이 장에서 기술하는 퍼셉트론은 정확히는 '인공 뉴런', '단순 퍼셉트론'으로 불리는 것

---

**`다수의 신호 (입력)`** => **`하나의 신호 (출력)`**

신호의 상태 : 1 or 0

![퍼셉트론 이미지 검색결과](https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99BDCE4D5B98A1022C)

x = 입력신호 / w = 가중치 / y = 출력신호

원 = 뉴럭or노드

- 입력신호 * 가중치 => 도착 신호 **|** `도착 신호가 임계값을 넘어야 출력신호 1 출력`

![퍼셉트론 수식 이미지 검색결과](https://t1.daumcdn.net/cfile/tistory/9979C74F5B83619A28)

b는 '-세타'로 bias(편향)을 뜻함

(가중치는 전류에서 저항에 해당됨)



### 논리회로

논리회로의 `입출력 x,y에 대한 진리표`를 `가중치와 임계값에 대한 진리표`로 변환 필요

- AND 게이트 : 두 가중치를 합해야 임계값을 넘어서도록 작성
- NAND 게이트 : 가중치와 임계값을 음수로 설정, 두 가중칠를 더하면 임계값 아래로 내려가도록 작성 (ex. -0.5, -0.5, -0.7)
- OR 게이트 : 두 가중치 중 하나만 있어도 임계값을 넘어서도록 작성



- XOR 게이트의 경우 단층 퍼셉트론으론 표현 불가능

> 머신러닝에서 '**학습**'이란 적절한 매개변수 값을 정하는 작업



### 구현

numpy를 이용해 입력신호와 가중치 사이의 값을 손쉽게 더할 수 있다.

- `가중치` : 입력 신호가 <u>결과에 주는 영향력</u>(중요도)을 조절

- `편향` : 뉴런이 <u>얼마나 쉽게 활성화</u>하는지를 조정



### 시각화

하나의 퍼셉트론은 2차원 그래프에서 선을 긋는 것으로 표현 가능 => 이 때 XOR은 하나의 선으로 표현 불가



### 다층 퍼셉트론 (XOR 게이트)

![img](https://upload.wikimedia.org/wikipedia/commons/a/a2/254px_3gate_XOR.jpg)

이 외에도 다양한 방법으로 XOR 게이트를 구현 가능 // 즉 다층형 퍼셉트론으로는 **비선형적인 표현 가능**

위의 구조를 퍼셉트론으로 표현하면 아래와 같다.

![image](https://user-images.githubusercontent.com/77447841/107851021-f8c10780-6e49-11eb-8ddb-a97b7cae2e87.png)

=> 다층 구조를 이용하면 XOR 게이트 구현 가능

위의 구조는 가중치를 갖는 층이 2개 뿐이므로 `2층 퍼셉트론` (3층으로 분류하기도 함)