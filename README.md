# Song2Vec과 CBF을 활용한 User interactive 음악 추천 서비스


### 요약
> Song2Vec 알고리즘과 CBF를 통해 사용자가 선택한 음악과 비슷한 음악을 추천해주는 서비스입니다.
> 사용자가 선택한 추천 카테고리를 기반하여 CBF의 결과를 조정할 수도 있습니다.

<br/>

### 팀원 구성

김환 - [github](https://github.com/hwankim123)  
노강호 - [github](https://github.com/kangho-Noh)  
이준성 - [github](https://github.com/JoMars0722)

---

## 연구배경
 기존의 음악 스트리밍 서비스 제공 업체에서 주로 사용하는 추천 방식은 **협업 필터링(Collaborative Filtering)** 이다. 협업 필터링은 컨텐츠에 대한 고객들의 선호도와 관심 표현을 바탕으로 선호도, 관심에서 비슷한 패턴을 가진 고객들을 식별해 내는 기법이다. 협업 필터링은 높은 정확성을 가지는 한편, 구현을 하기 위해서는 많은 사용자 데이터가 필요하다. 기업은 사용자 데이터를 외부에 공개하기 어려우며, 기업에 속하지 않은 개발자의 입장에서 이런 데이터를 접하는 기회는 더더욱 어렵다.  
<br>
협업 필터링을 사용할 수 없는 상황에서 기존 음악 스트리밍 업체와 비슷한 성능의 추천 시스템을 개발하고, 높은 사용자 경험을 제공할 수 있는 음악 스트리밍 서비스를 구현하는 것을 목표로 한다.

<br/>

---
## 관련 연구
### Song2Vec
Song2Vec는 자연어 처리 기술인 Word2Vec을 음악 추천 도메인으로 확장시킨 임베딩 알고리즘이다. Word2Vec은 단어의 의미를 다차원 공간에 임베딩하는 알고리즘으로, 분포 가설에 의해 만들어진 단어 표현 방법이다. 분포 가설이란 비슷한 문맥에서 등장하는 단어들은 비슷한 의미를 갖는다는 가설이다.  
  

#### Word2Vec
Word2Vec은 주변 단어를 통해 중심 단어를 예측하는 CBOW와 중심 단어를 통해 주변 단어를 예측하는 Skip-gram으로 나뉜다. 두 모델은 예측의 목표만 다를 뿐 원리는 동일하다. Word2Vec은 입력층과 출력층, 그리고 하나의 은닉층으로 이루어진 신경망이다. 입력층에는 단어의 원-핫 벡터가 주어지고, 입력층의 벡터가 가중치 행렬과 곱해져 은닉층을 이룬다. 은닉층의 벡터는 두 번째 가중치 행렬과 곱해져 그 결과로 입력층의 원-핫 벡터와 동일한 차원을 갖는 벡터가 생성된다. 생성된 벡터는 소프트맥스 함수를 지나면서 벡터의 각 원소들의 값은 0과 1사이의 실수로, 총 합은 1이 된다. 예측 대상의 벡터와의 오차를 줄이기 위한 손실 함수로 크로스 엔트로피(cross-entropy) 함수를 사용한다. Word2Vec은 손실 함수의 결과를 역전파를 수행하며 오차를 줄이는 방향으로 가중치 벡터를 학습한다.  
  
Word2Vec은 NNLM(Neural Net Language Model)과 같은 기존의 워드 임베딩 모델보다 더 적은 연산량을 갖고, 간단한 모델임에도 높은 성능을 보인다.[4] 또한 Word2Vec는 자연어 처리 분야 뿐만 아니라 다른 도메인으로 확장되었다. 추천 시스템에서 Word2Vec은 아이템의 특성을 다차원 벡터에 임베딩하고, 임베딩된 아이템 간의 유사도를 측정하여 추천을 진행하는 식으로 활용된다.



### Content-Based Filtering (CBF)
CBF은 아이템 자체의 특성을 바탕으로 추천하는 방법론이다. 사용자가 선호한 아이템을 기반으로, 해당 아이템과 내용(content)이 비슷하거나 특별한 관계가 있는 다른 아이템을 추천하는 방식이다. 아이템의 내용은 아이템을 표현할 수 있는 데이터를 의미한다. 이러한 데이터에는 아이템의 카테고리, 이름, 태그와 같은 텍스트 데이터, 이미지 데이터, 음악 추천 시스템의 경우 음악의 파형 데이터 등이 사용된다. 다양한 데이터들을 컴퓨터가 계산할 수 있도록 벡터화하고, 벡터 간의 유사도 계산을 통해 사용자가 선호한 아이템과 유사한 아이템을 추천하게 된다.  
  
CBF는 아이템에 대한 정보만 있으면 추천이 가능하기 때문에 과거의 데이터가 필요하지 않다는 장점이 있다. 이러한 특성으로 인해 CBF는 신규 사용자나, 신규 아이템에 대한 추천이 이루어지지 않는 콜드 스타트(cold start) 문제를 해결하기 위한 방법으로 사용된다. 하지만 CBF를 단독으로 사용하는 방법은 다른 추천 방법에 비해 정확도가 낮고, 추천의 다양성 및 신선함이 다른 추천 방법에 비해 낮다는 단점이 있다.

<br/>

---
## 프로그램 아키텍처
![](https://user-images.githubusercontent.com/43146778/173767106-7831a2d0-770e-44ff-ab86-7efdb84ebe42.png)


<br/>

---
## 서비스 Flow Chart

![](https://user-images.githubusercontent.com/43146778/173764119-d6fb040f-714a-47d2-a494-2317fb4ffa3d.png)  
*Flow Chart 1 - 사용자 서비스 이용 주 흐름도*

<br/>

![](https://user-images.githubusercontent.com/43146778/173761715-b09d42c4-c249-4a8c-94f6-7d051725505e.png)  
*Flow Chart 2 - 사용자의 seed 음악 기반 추천 기능*

<br/>

![](https://user-images.githubusercontent.com/43146778/173761978-3554e288-1e20-42a1-8dda-7135bc885d6f.png)  
*Flow Chart 3 - 플레이리스트 기반 추천 기능*

<br/>

<br/>

---
## Installation
### Client Manual
React Client - [README.md]()

### Server Manual
Spring main server  - [README.md](https://github.com/capstone-cheer/music-recommendation-service/blob/main/back/music/README.md)  
Flask & Gensim server -  [README.md]()  

<br/>

---
## 실행화면


### 로그인 화면
### 음악 검색
### 음악 하나에 대한 추천 리스트
### 플레이리스트에 대한 추천 리스트



<br/>

---
## 결론

<br/>

---
## 참조문헌
[1] 김찬수, “스포티파이의 고객경험 접근방식 [2부] - Push방식: 추천모델과 리워드”, 투이컨설팅,  https://www.2e.co.kr/news/articleView.html?idxno=210541. 
  
[2] 이현수, 홍성은, 방준일, 김화종 (2020). “데이터 임베딩을 활용한 사용자 플레이리스트 기반 음악 추천에 관한 연구”, 한국정보기술학회논문지, Vol. 18, No. 9, pp 27-34.
  
[3] 전재호, “멜론에서 음악 추천을 어떻게 할까?”, kakao tech, https://tech.kakao.com/2020/04/29/kakaoarena-3rd-part1/.
  
[4] 카카오 아레나 (2020). “Melon Playlist Continuation”, https://arena.kakao.com/c/8/data.  
  
[5] J.A. Konstan, J. Riedl, (2012). “Recommender systems: from algorithms to user experience”, User Model User-Adapt Interact, 22 pp. 101-123.  
  
[6] Spotify Web API. “Get Track’s Audio Features” https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features.  

[7] Tomas Mikolo, Kai Chen, Greg Corrado, and Jeffrey Dean, (2013). “Efficient Estimation of Word Representations in Vector Space”, arXiv:1301.3718v3.   