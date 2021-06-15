# Speach-to-Text

음성 인식 시스템에서 생성된 텍스트를 자동으로 수정하는 시스템을 어떻게 구축할까요?

## 음성 인식 방법

### 방법 1

1. 음성 입력

[전처리]

2. 특징 추출 -> `딥러닝`

[패턴인식]

3. 음소 인식 -> `딥러닝`

4. 언어 모델 -> `딥러닝`

[후처리]

5. 후처리 -> `딥러닝`

6. 인식 결과



### 방법 2 (End-to-End)

1. 음성
2. 음성 자체를 `딥러닝`에 넣음
3. 결과



## 방법 1의 후처리

`필요성`

- 한국어의 경우, 인식 단위로 의사 형태소를 사용 => 후처리 단계에서 어절 단위로 재구성 필요
- 인식 결과가 완전하지 않기 때문에 오류 보정을 위한 노이즈 채널 모델이 후처리 단계에서 필요(노이즈 분석)
- <u>동어 반복, 추임새, 단어 실수 등 불필요하고 의미 도출에 영향을 줄 수 있는 요소 수정 필요</u>
- <u>연속된 음성 속에서 의미 도출을 위한 문장 분리 필요</u>

`방법`

- **Sentence segmentation**: 음성 멈춤이나 문장 끝 억양(intonation) 등 특성으로 문장 경계를 나누는 모델
- **Disfluency detection**: 화자가 잘못 말한 단어를 캐치해 제거하거나 폰트 변화 등으로 표시. 혹은 음성 인식 결과 오류를 바로 잡는 역할



### Sentence segmentation

문장 분리는 음성 인식 결과로 출력된 각 단어 사이사이 모두에 대해 <u>문장 `경계`인지(sentence boundary) 아닌지(sentence-internal)</u> 가려내는 **이진 분류(binary classification)** 문제로 볼 수 있음

![img](https://i.imgur.com/CjBKirA.png)

[<u>문장 분리 모델</u>에 사용되는 분리 방법]

1. **Duration** : 현재 분석 대상 구간(그림1에서 각 단어 사이사이) 앞에 있는 음소의 길이 정보. 보통 문장 마지막 단어는 길게 발음하는 경향이 있다.

2. **Pause** : 현재 분석 대상 구간에 휴지(pause)가 끼어 있는지, 있다면 얼마나 긴지에 대한 정보. 대개 사람들은 다음 문장을 말할 때 살짝 시간을 둔다.
3. **F0 features** : 현재 분석 대상 구간의 피치(pitch) 변화. 문장이 끝날 때는 대개 피치가 발화자의 F0 베이스라인에 가깝게 떨어진다(final fall).



### Disfluency detection

문장 중간에 별 의미 없이 말한 ‘아, 음’ 같은 간투사(間投詞), 반복된 단어, 문장의 재시작 등 등이 교정 대상

![img](https://i.imgur.com/4ogjBQU.png)

![img](https://i.imgur.com/Pro0ULv.png)

음성 특질(feature)을 활용해 단어와 단어 사이의 경계를 문장 중단(interuption), 문장 재개(repair), 문장 계속(sentence-internal) 등 범주별로 분류

(상당히 어려운 작업)

[<u>Disfluency detection 모델</u>에 사용되는 방법]

1. 품사 등의 텍스트 정보
2. 피치
3. 기타 모든 음성 정보







# 참고

> https://www.korean.go.kr/nkview/nklife/2017_4/27_0405.pdf
>
> https://blog.ncsoft.com/%EA%B2%8C%EC%9E%84%EA%B3%BC-ai-6-%EC%9D%8C%EC%84%B1-%EC%9D%B8%EC%8B%9D-%EA%B8%B0%EC%88%A0/
>
> **https://ratsgo.github.io/speechbook/docs/sophisticated/post#tasks**

