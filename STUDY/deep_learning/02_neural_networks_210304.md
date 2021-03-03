# Deep Learning 스터디

3월4일 6시 반

---

## 3장. 신경망

퍼셉트론은 수동으로 가중치를 설정해야 하지만, 신경망을 이용하면 데이터로부터 학습이 가능하다.



- 신경망의 구조

![image](https://user-images.githubusercontent.com/77447841/109824573-4deb7e80-7c7c-11eb-80a3-40f61396315d.png)

### 활성화 함수 `h()`

- 퍼셉트론 식

(식1)

![image](https://user-images.githubusercontent.com/77447841/109824664-60fe4e80-7c7c-11eb-87c9-8573e5c4a89d.png)

 (식2)

![image](https://user-images.githubusercontent.com/77447841/109824722-6fe50100-7c7c-11eb-89ac-7194dcdfa234.png)

> 퍼셉트론을 표현한 식

- 활성화 함수

위의 (식1)은 아래와 같이 바꿀 수 있다.

(식1-1)

![image](https://user-images.githubusercontent.com/77447841/109824803-7ecbb380-7c7c-11eb-9c99-016f11ca1ce6.png)

(식1-2) `활성화 함수 h()`

![image](https://user-images.githubusercontent.com/77447841/109824837-8b500c00-7c7c-11eb-9505-7706eccaaadf.png)

즉, 퍼셉트론을 아래와 같이 표현 가능

![QGIS에서 신경망 활성화 함수(activation function) 그려보기](https://t1.daumcdn.net/cfile/blog/99DE213359DA43BE34)

### 활성화 함수의 종류

#### 계단 함수

퍼셉트론에서 사용하는 활성화 함수

![image](https://user-images.githubusercontent.com/77447841/109824956-ae7abb80-7c7c-11eb-807b-9af6b52a5655.png)

![계단 함수, 시그모이드 함수, ReLU 함수(ft.파이썬)](http://snowdeer.github.io/assets/machine-learning/009.jpg)

#### 시그모이드 함수

신경망에서 사용하는 활성화 함수

![image](https://user-images.githubusercontent.com/77447841/109825030-c18d8b80-7c7c-11eb-9d24-bc23b25ec191.png)

![딥러닝에서 사용하는 활성화함수](https://mlnotebook.github.io/img/transferFunctions/sigmoid.png)

#### ReLU 함수

최근 신경망 분야에서 시그모이드 함수를 대체하는 함수

![image](https://user-images.githubusercontent.com/77447841/109825169-e3870e00-7c7c-11eb-8a1c-1c1c5b458cb4.png)

![img](https://t1.daumcdn.net/cfile/blog/997FCD3359DA510726)



### 다차원 배열의 계산

A(3X2)와 B(2X4)를 곱할 때,

- 3 X **2**, **2** X 4 => 사이에 있는 숫자가 같아야 곱셈 가능
- **3** X 2, 2 X **4** => 결과값은 양 끝에 있는 숫자와 같은 형태를 가짐 (**3X4**)



이 때, 앞에 있는 배열(A)는 `행`을 담당 / 뒤에 있는 배열(B)는 `열`을 담당





### 항등 함수와 소프트맥스 함수

- 회귀 문제 - 항등 함수 사용
- 분류 문제 - 소프트맥스 함수 사용

#### 항등 함수

> 입력을 그대로 출력하는 함수 | 입력과 출력이 항상 같다



#### 소프트맥스 함수

![image](https://user-images.githubusercontent.com/77447841/109825211-ef72d000-7c7c-11eb-8fa0-51136ca4c5f6.png)

> 입력이 덜마나 특정 분류와 가까운지 표시(각 분류에 대해 0~1사이 값 출력)



##### 주의점

소프트맥스 함수의 지수 함수는 매우 큰 값을 다룸 -> 오버플로우 문제 발생 가능

소프트맥스 함수식은 다음과 같이 바꿀 수 있으므로,    ![image](https://user-images.githubusercontent.com/77447841/109825223-f4378400-7c7c-11eb-85a5-97fc30ca67b7.png)

입력신호중 최대값의 마이너스 값을 `C`자리에 넣어 빼줌으로써, 지수 함수의 크기를 줄인다.



#### 특징

- 소프트맥스 함수의 출력은 입력값 원소들의 대소관계와 같다.
- 소프트맥스 함수의 출력값은 **확률**을 의미





## 출처

밑바닥부터 시작하는 딥러닝1

https://ml4a.github.io/ml4a/ko/neural_networks/
