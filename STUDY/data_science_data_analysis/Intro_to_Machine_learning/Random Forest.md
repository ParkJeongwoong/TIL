# Random Forest

> Decision Tree의 한계 - 학습 데이터에 따라 생성되는 DT가 매우 달라져(overfitting 발생) 일반화하여 사용하기 어려움 & 학습 결과와 성능의 변동 폭이 큼

=> 이를 극복하기 위해 Random Forest 등장 (일반화된 Decision Tree를 만드는 방법)

- 여러 Decision Tree를 만들고 이 Forest에 Data를 통과시켜 각 트리의 결과값의 평균 or 최다 득표 결과를 선택

- 무작위의 Decision **Tree**들이 모인 **Forest**



## 학습 원리

**[Bagging]**

1. Training Data set에서 <u>무작위</u>로 <u>중복</u>을 허용해서 n개의 데이터 선택 - `Bootstrap`

2. n개의 데이터 샘플에서 Feature를 중복 없이 d개 선택

   - 일반적으로 전체 속성(m)개의 제곱근 만큼 선택
     $$
     d = \sqrt{m}
     $$

3. Decision Tree 학습 & 생성
4. 1~3 단계를 k번 반복

**[Ensemble]**

5. 1~4 단계를 통해 생성된 k개의 DT를 이용해 예측 => 예측 결과의 <u>평균</u> or <u>가장 많이 등장</u>한 예측 결과를 선택 => **최종 예측값 결정**



![img](https://miro.medium.com/max/1678/1*Wf91XObaX2zwow7mMwDmGw.png)





## scikit-learn 활용

```python
from sklearn.ensemble import RandomForestClassifier # sklearn을 통해 RandomForestClassifier를 import

classifier = RandomForestClassifier(n_estimators = 100, max_leaf_nodes = 16, n_jobs = -1) # n_estimators는 DT의 갯수
classifier.fit(X_train, Y_train)

y_predict_rf = classifier.predict(X_test)
print(accuracy_score(Y_test, y_predict_rf))
```

- Decision Tree를 기반으로 동작하기 때문에 `DecisionTreeClassifier`와 동일한 메서드를 사용 가능
  - `.fit()`, `.predict()`, `.score()` 등
- `n_estimators`는 Decision Tree의 개수
- `max_leaf_nodes`는 리프 노드의 최대 개수 / default는 None(무제한)
- `n_jobs`는 병렬적으로 활용할 CPU 코어 개수 / -1은 모든 Processor를 다 사용한다는 뜻 / Default는 None(1개)
