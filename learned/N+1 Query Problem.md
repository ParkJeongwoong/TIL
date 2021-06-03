# N+1 Query Problem

쿼리 한 번으로 N 개의 데이터를 가져오고, 해당 데이터들과 관련된 정보를 얻기위해 N 번의 쿼리를 추가로 소행하는 문제

즉, 특정 정보를 얻기 위해 쿼리가 N+1 번 발생하는 문제

## 비슷한 문제 경험

vuetube를 만들면서 특정 검색어에 대해 검색을 진행할 때,

Youtube API에서 동영상의 개략적인 정보는 search 요청을 통해 얻을 수 있지만 해당 영상의 재생시간은 videos 요청을 통해 개별적으로 N 번 다시 요청해야 받을 수 있었다.



=> 즉, 검색 결과에 대한 동영상 + 동영상의 재생시간을 얻기 위해, search 요청 `1번`과 videos 요청 `N번`이 필요함

(이건 API 기능의 문제라서 해결을 못했지만, 본인의 DB에서는 이런 문제를 막을 수 있다)



## Django에서 발생하는 이유

ORM의 특징인 Lazy Loading 때문.

[Lazy Loading]

DB hit은 쿼리셋이 평가**(순회, 스텝 슬라이싱, len, list, test)**를 한 순간 발생

=> 즉, Model. object.all()로는 쿼리 실행 X



&&



callable 한 객체 (FK, 1to1, MtoM)은 cache하지 않고, 팽가될 때마다 매번 새롭게 쿼리를 발생시키기 때문



## Django 예시

```
for data in Model.objects.all():
	print(data.OtherModel.name)
```

이렇게 하면 print 할 때마다 매번 쿼리 발생



## 해결

**[기존]**

```python
reviews = Review.objects.order_by('-pk')
```

```django
{{ review.user.username }}
{{ review.comment_set.count }}
```



### `join`

>  <u>두 개의 테이블을 합치는 것</u>

#### select_related

- <u>**Foreign Key를 정참조**</u>

```python
reviews = Review.objects.select_related('user').order_by('-pk')
```

```django
{% for review in reviews %}
	{{ review.user.username }}
{% endfor %}
```

#### prefetch_related

- <u>**ManyToMany 정참조, Foreign Key 역참조**</u>

```python
reviews = Review.objects.prefetch_related('comment_set').order_by('-pk')
```

```django
{% for comment in review.comment_set.all %}
	<li>{{ comment.content }}</li>
{% endfor %}
```

#### 종합

```python
reviews = Review.objects.prefetched_related(
    prefetch('comment_set', queryset=Comment.objects.select_related('user'))
).order_by('-pk')
```

```django
{% for review in reviews %}
	<li>{{ review.title }}</li>
	{% for comment in review.comment_set.all %}
		<li>{{ comment.user.username }} : {{ comment.content }}</li>
	{% endfor %}
{% endfor %}
```



### `annotate`

>  <u>새로운 필드를 만드는 것</u>

```python
from django.db.models import Count
reviews = Review.objects.annotate(Count('comment')).order_by('-pk')
```

```django
{% for review in reviews %}
	{{ review.comment__count }}
{% endfor %}
```



## 참고자료

> https://velog.io/@kim6515516/npuls
>
> https://velog.io/@ikswary/n1-query-problem