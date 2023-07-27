---
title: 'HashTable'
date: '2021-06-23'
tag: 'Etc'
description: '자료구조 중에 하나인 HashTable 에 대한 정리'
---

### 데이터를 저장하는 자료구조 중 하나로 빠르게 데이터를 검색할 수 있는 자료구조이다.

HashTable은 key, 해시 함수, 해시, 값, 저장소(bucket, slot)으로 이루어져 있다.

- key : 고유한 값이며, 해시 함수의 input이다.
- 해시함수 : key를 해시로 바꿔주는 역할을 하며, 다양한 길이를 가지고 있는 key를
  일정한 길이를 가지는 해시로 변경한다.
- hash : 해시 함수의 결과물이며, 저장소에서 value와 매칭되어 저장된다.
- value : 저장소에서 최종적으로 저장되는 값으로 key와 매칭되어 저장된다.

![hashtable](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb1zOw1%2FbtqL6HAW7jy%2FjpBA5pPkQFnfiZcPLakg00%2Fimg.png)

1. key와 value가 ("John Smith", "521-1234")
2. 해시 함수
3. output(hash)
4. 저장소에 key와 value 저장됨

> index = hash_function("john Smith") => array[index] = "521-1234" 로 저장된다.

# 해시 함수

해시 함수에서 중요한 것은 고유한 인덱스 값을 설정하는 것이다. 해시 테이블에 사용되는 대표적인 해시 함수로는 아래의 3가지가 있다.

1. Division Method: 나눗셈을 이용하는 방법으로 입력값을 테이블의 크기로 나누어 계산한다.( 주소 = 입력값 % 테이블의 크기)

2. Digit Folding: 각 Key의 문자열을 ASCII 코드로 바꾸고 값을 합한 데이터를 테이블 내의 주소로 사용하는 방법이다.

3. Univeral Hashing: 다수의 해시함수를 만들어 집합 한곳에 넣어두고, 무작위로 해시함수를 선택해 해시값을 만드는 기법이다.

> 좋은 해쉬 함수란, 데이타를 되도록이면 고르게 분포하여, 충돌을 최소화할 수 있는 함수이다.

# 해시 충돌

> 해시 함수 결과가 동일한 출력(주소) 값을 가지게 될 때 충돌이 일어난다.
> ![collision](https://media.vlpt.us/post-images/cyranocoding/99252300-b226-11e9-89af-8fc0a61dbc3e/1YWWO5pFPN70lM7jOKsPHw.png)

John과 Sandra의 hash가 같다. 이런 현상을 hash collision이라고 한다.

1. Separate Chaining

   ![Separate Chaining](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbTF67c%2FbtqL7xx3OGw%2FDM8KEKU5x7dx6Nks4JR7K1%2Fimg.png)

이러한 Chaining 방식은 해시 테이블의 확장이 필요없고 간단하게 구현이 가능하며, 손쉽게 삭제할 수 있다는 장점이 있다. 하지만 데이터의 수가 많아지면 동일한 버킷에 chaining되는 데이터가 많아지며 그에 따라 캐시의 효율성이 감소한다는 단점이 있다.

![chaining](https://media.vlpt.us/post-images/cyranocoding/7c9f8040-b226-11e9-89af-8fc0a61dbc3e/19O8Eyd9wEhZKhwrXzKJaw.png)

2. 개방 주소법(Open Addressing)

Open Addressing이란 추가적인 메모리를 사용하는 Chaining 방식과 다르게 비어있는 해시 테이블의 공간을 활용하는 방법이다.따라서 개방주소법에서의 해시테이블은 1개의 해시와 1개의 값(value)가 매칭되어 있는 형태로 유지된다.

1. Linear Probing: 현재의 버킷 index로부터 고정폭 만큼씩 이동하여 차례대로 검색해 비어 있는 버킷에 데이터를 저장한다.
2. Quadratic Probing: 해시의 저장순서 폭을 제곱으로 저장하는 방식이다. 예를 들어 처음 충돌이 발생한 경우에는 1만큼 이동하고 그 다음 계속 충돌이 발생하면 2^2, 3^2 칸씩 옮기는 방식이다.

![Open](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FWR1fv%2FbtqL5APCcSa%2FBZN6wvxUXzJBEiOfOMLfR0%2Fimg.png)

장점 :

- 또 다른 저장공간 없이 해시테이블 내에서 데이터 저장 및 처리가 가능하다.
- 또 다른 저장공간에서의 추가적인 작업이 없다.

단점 :

- 해시 함수(Hash Function)의 성능에 전체 해시테이블의 성능이 좌지우지된다.
- 데이터의 길이가 늘어나면 그에 해당하는 저장소를 마련해 두어야 한다.
