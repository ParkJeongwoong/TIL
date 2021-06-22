# Topic-Modeling

뉴스 기사를 주제별로 자동 분류하는 시스템을 어떻게 구축할까요?

## Topic Modeling

1. 잠재 의미 분석 (Latent Semantic Analysis, LSA)

   > 차원 축소 하여 축소 차원에서 근접 단어들을 토픽으로 묶는다.

   - 토픽 모델링에 대한 아이디어를 제공한 알고리즘
   - 단어의 빈도 수를 이용한 주제 분류는 단어의 의미를 고려하지 못한다는 단점 존재
   - 이를 해결하기 위해 단어에 잠재된(Latent) 의미를 이끌어내기 위한 방법이 제안됨
   - **Principal Component Analysis(PCA)를 통해 중요도가 낮은 요소를 제거 => 함축된 의미 (Latent Semantic) 생성 => 유사한 의미를 묶어 주제 분류**

   

2. **잠재 디리클레 할당 (Latent Dirichlet Allocation, LDA)**

   > 단어가 특정 토픽에 존재할 확률과 문서에 특정 토픽이 존재할 확률을 결합확률로 추정하여 토픽을 추출한다.

   - LSA의 단점을 개선한 토픽 모델링에 적합한 알고리즘 (LSA는 한 번도 보지 못한 문서에 대해서는 일반화가 불가능함)

   - **디리클레 분포를 사용**

   - 특정 문서에 특정 주제가 있을 **확률**을 계산 (이 때, 주제의 개수 k는 사용자가 정해야 함)

   - 과정

     - 알고리즘에 사용할 토픽 개수 k 설정
     - 모든 단어에 하나의 토픽을 할당

     - 모든 문서의 모든 단어에 대해 아래의 과정 반복
       - 특정 단어 w는 잘못된 토픽이 할당, 다른 모든 단어는 올바른 토픽이 할당 되었다고 가정
       - `특정 문서 d의 단어 중 토픽 t에 해당하는 단어의 비율` & `각 토픽 t에 대해 해당 단어 w의 분포` 를 바탕으로 토픽 재할당
     - 각 단어에 대해 주제 할당이 완료됨

## Text Classification

> https://wikidocs.net/22933 - 로이터 뉴스 분류하기

**LSTM을 활용해 뉴스 주제 분류**

- 각 단어에 인덱스를 부여 -> 주제 추출



# 참고

> **https://wikidocs.net/30707** -> TOPIC MODELING
>
> **http://bigdata.emforce.co.kr/index.php/2020072401/** -> LDA
>
> **https://bab2min.tistory.com/585** -> LSA, LDA
>
> https://wiserloner.tistory.com/929 -> RNN-LSTM
>
> https://ebbnflow.tistory.com/151 -> BERT

