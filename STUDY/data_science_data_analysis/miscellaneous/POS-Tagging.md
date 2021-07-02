# POS Tagging

POS 태깅은 무엇인가요? 가장 간단하게 POS tagger를 만드는 방법은 무엇일까요?

## POS Tagging 이란?

Part Of Speech tagging, 즉 **형태소 분석**

=> 원시 말뭉치를 형태소 단위로 쪼개고, 각 <u>형태소에 품사 정보를 부착</u>하는 것

! 형태소란?

: **일정한 의미가 있는 가장 작은 말의 단위** (더 쪼개면 뜻이 없어진다)



[오픈 소스 한국어 형태소 분석기]

| 이름      | 연도     | 언어  | 라이센스         |
| --------- | -------- | ----- | ---------------- |
| KTS       | 1995     | C/C++ | GPL v2           |
| 한나눔    | 1999     | Java  | GPL v3           |
| MACH      | 2002     | C/C++ | custom           |
| Arirang   | 2009     | Java  | Apache v2        |
| 꼬꼬마    | 2010     | Java  | GPL v2           |
| **KoNLP** | **2011** | **R** | **GPL v3**       |
| Mecab-ko  | 2013     | C/C++ | GPL v2,LGPI, BSD |
| KOMORAN   | 2013     | Java  | custom           |

(가장 많이 쓰이는 KoNLPy는 세종 말뭉치를 사용) - KoNLPy는 형태소 분석 패키지 : KOMORAN 같은 다른 형태소 분석기를 호출 가능



## POS Tagger 만들기

> https://wikidocs.net/33532

- 역시 LSTM을 통해 직접 만들 수 있다 (만능 도구)



[큰 과정]

1. 사람이 학습 문서에 품사를 태깅해 놓았음: Tagged Corpora `trainX`
2. 학습 `model.fit`
3. POS Tagger 완성
4. 추후 input text 입력 시 `test X`
5. POS Tagger 거치면 `model.predict(testX)`
6. Tagging 돼서 출력



[Detail]

- 양방향 LSTM 사용

```python
from keras.models import Sequential
from keras.layers import Dense, LSTM, InputLayer, Bidirectional, TimeDistributed, Embedding
from keras.optimizers import Adam
```

```python
model = Sequential()
model.add(Embedding(vocab_size, 128, input_length=max_len, mask_zero=True))
model.add(Bidirectional(LSTM(256, return_sequences=True)))
model.add(TimeDistributed(Dense(tag_size, activation=('softmax'))))
model.compile(loss='categorical_crossentropy', optimizer=Adam(0.001), metrics=['accuracy'])
```

```python
model.fit(X_train, y_train, batch_size=128, epochs=6,  validation_data=(X_test, y_test))
```



```
Train on 3131 samples, validate on 783 samples
Epoch 1/6
3131/3131 [==============================] - 133s 42ms/sample - loss: 0.5747 - acc: 0.1458 - val_loss: 0.5087 - val_acc: 0.1611
... 중략 ...
Epoch 6/6
3131/3131 [==============================] - 132s 42ms/sample - loss: 0.0711 - acc: 0.9105 - val_loss: 0.0680 - val_acc: 0.9002
```



```python
print("\n 테스트 정확도: %.4f" % (model.evaluate(X_test, y_test)[1]))
```

```
783/783 [==============================] - 11s 14ms/step
테스트 정확도: 0.9002
```

- TEST

```python
index_to_word=src_tokenizer.index_word
index_to_tag=tar_tokenizer.index_word

i=10 # 확인하고 싶은 테스트용 샘플의 인덱스.
y_predicted = model.predict(np.array([X_test[i]])) # 입력한 테스트용 샘플에 대해서 예측 y를 리턴
y_predicted = np.argmax(y_predicted, axis=-1) # 원-핫 인코딩을 다시 정수 인코딩으로 변경함.
true = np.argmax(y_test[i], -1) # 원-핫 인코딩을 다시 정수 인코딩으로 변경함.

print("{:15}|{:5}|{}".format("단어", "실제값", "예측값"))
print(35 * "-")

for w, t, pred in zip(X_test[i], true, y_predicted[0]):
    if w != 0: # PAD값은 제외함.
        print("{:17}: {:7} {}".format(index_to_word[w], index_to_tag[t].upper(), index_to_tag[pred].upper()))
```

- 결과

```
단어             |실제값  |예측값
-----------------------------------
in               : IN      IN
addition         : NN      NN
,                : ,       ,
buick            : NNP     NNP
is               : VBZ     VBZ
a                : DT      DT
relatively       : RB      RB
respected        : VBN     VBN
nameplate        : NN      NN
among            : IN      IN
american         : NNP     NNP
express          : NNP     NNP
card             : NN      NN
holders          : NNS     NNS
,                : ,       ,
says             : VBZ     VBZ
0                : -NONE-  -NONE-
*t*-1            : -NONE-  -NONE-
an               : DT      DT
american         : NNP     NNP
express          : NNP     NNP
spokeswoman      : NN      NN
.                : .       .
```





# 참고

http://kkma.snu.ac.kr/documents/?doc=postag

https://cth127.github.io/nlp/NLP-05-pos-tag/

**https://wikidocs.net/33532**

https://jynee.github.io/NLP%EA%B8%B0%EC%B4%88_2/