# DRF를 활용한 RESTful API

> 기존보다 훨씬 RESTful한 코드

## Serializer

- **데이터의 구조나 객체 상태를 동일하거나 다른 컴퓨터 환경에 저장 / 나중에 재구성할 수 있는 포맷으로 변환하는 과정**

- 예를 들어 DRF의 Serializer는 Django의 Quertset 및 Model Instance 같은 복잡한 데이터를 JSON/XML 등의 쉽게 변환할 수 있는 데이터 타입으로 바꿔줌

- DRF의 Serializer는 <u>Django의 Form/ModelForm과 매우 유사하게 작동</u>



# 시작

1. project 생성 및 `api` app 생성

2. 'django-extensions', 'django-seed', 'rest-framework' 설치

3. settings.py

   ```python
   INSTALLED_APPS = [
       'api',
   
       'django_extensions',
       'django_seed',
       'rest_framework',
   
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
   ]
   ```





# List & Create

## project 폴더

### urls.py

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
```





## App 폴더 (api)

1. serials.py 파일 생성
2. urls.py 파일 생성



### models.py

```python
from django.db import models

# Create your models here.
class Artist(models.Model):
    name = models.CharField(max_length=20)


class Music(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='musics')
    title = models.CharField(max_length=20)
    lyric = models.TextField()
```

- Article 모델 생성

- Music 모델 생성

- migrate

  ```bash
  $ python manage.py makemigrations
  $ python manage.py migrate
  ```

- seed dump

  ```bash
  $ python manage.py seed api --number=20
  ```

  

### serializers.py

```python
from rest_framework import serializers
from .models import Artist, Music

class ArtistListSerializer(serializers.ModelSerializer):
    # Validation Check
    name = serializers.CharField(max_length=20)

    class Meta:
        model = Artist
        fields = ['id', 'name', 'musics',]
        read_only_fields = ('musics',)


class MusicListSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=20)
    
    class Meta:
        model = Music
        fields = ['id', 'title', 'artist',]
```

- ArticleListSerializer 생성
- MusicListSerializer 생성



### urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('artists/', views.artist_list_or_create),
    path('musics/', views.music_list),
]
```

- 전체 Read & Create path 설정



### views.py

```python
from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import ArtistListSerializer, MusicListSerializer
from rest_framework.response import Response
from .models import Artist, Music
from rest_framework import status

# Create your views here.
@api_view(['GET','POST'])
def artist_list_or_create(request):
    if request.method == 'GET':
        artists = Artist.objects.all()
        serializer = ArtistListSerializer(data=request.data)
        return Response(serializer.data)

    elif request.method == 'POST':
        # serializer = ArtistListSerializer(artists, many=True) # 이 부분은 이렇게하면 안 된다. 지금은 CharField만 있어서 괜찮지만, Field가 여러 개가 오면 문제가 생긴다.
        serializer = ArtistSerializer(artists, many=True) # 이렇게 List용과 분리해서 단일 CRUD 통합 Serializer가 있어야 한다.
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
def music_list(request):
    musics = Music.objects.all()
    serializer = MusicListSerializer(musics, many=True)
    return Response(serializer.data)
```

- List용 Serializer와 단일 용 Serializer를 구분해야 한다.
  - 같은 view 함수(`List & Create`에서 Serializer는 2개가 다르게 들어가야 함)





## Postman

- `GET` - `localhost:8000/api/artists/` => artist 전체 List 확인

- `POST` - `localhost:8000/api/articles/` - body/raw/json/`{ "name": "new_artist" }` => artist 추가
- `GET` - `localhost:8000/api/musics/` => music 전체 List 확인






# Detail & Edit & Delete

## App 폴더 (api)

### serializers.py

```python
class MusicSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=20)
    
    class Meta:
        model = Music
        fields = ['id', 'title', 'artist', 'lyric',]
        read_only_fields = ['artist',]


class ArtistSerializer(serializers.ModelSerializer):
    musics = MusicSerializer(many=True, read_only=True) # id 값이 아니라 곡 정보가 나오도록
    music_count = serializers.IntegerField(source='musics.count')
    
    class Meta:
        model = Artist
        fields = ['id', 'name', 'musics', 'music_count',]
```



### urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('artists/', views.artist_list_or_create),
    path('musics/', views.music_list),
    
    path('artists/<int:artist_pk>/', views.artist_detail),
    path('artists/<int:artist_pk>/music/', views.music_create),
    path('musics/<int:music_pk>/', views.music_detail_or_update_or_delete),
]
```



### views.py

```python
from django.shortcuts import get_object_or_404
from .serializers import ArtistSerializer, MusicSerializer

@api_view(['GET'])
def artist_detail(request, artist_pk):
    artist = get_object_or_404(Artist, pk=artist_pk)
    serializer = ArtistSerializer(artist) # instance = artist
    return Response(serializer.data)


@api_view(['POST'])
def music_create(request, artist_pk):
    artist = get_object_or_404(Artist, pk=artist_pk)
    serializer = MusicSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(artist=artist)
        return Response(serializer.data)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET','PUT','DELETE'])
def music_detail_or_update_or_delete(request, music_pk):
    music = get_object_or_404(Music, pk=music_pk)
    
    if request.method == 'GET':
        serializer = MusicSerializer(instance=music)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MusicSerializer(data=request.data, instance=music) # serialized된 data(request.data)를 instance(music)에 넣는다는 뜻
        if serializer.is_valid(raise_exception=True):
            serializer.save(artist=music.artist)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        music.delete()
        data = {
            "success": True,
            "message": f'{music_pk}번째 노래의 데이터가 삭제되었습니다.',
        }
        return Response(data, status.HTTP_204_NO_CONTENT)
```





## Postman

- `GET` - `localhost:8000/api/artists/artist_pk/` => 특정 artist 확인

- `POST` - `localhost:8000/api/artists/artist_pk/music/` - body/raw/json/`{ "title": "Hit Song", "lyric": "so good, soso goood" }`

  => 특정 artist에 music 추가

- `GET` - `localhost:8000/api/musics/music_pk/` => 특정 music 확인

- `PUT` - `localhost:8000/api/musics/music_pk/` - body/raw/json/`{ "title": "Remake of good song", "lyric": "This is betteeerrrrrr" }`

  => 특정 music 정보 변경

- `DELETE` - `localhost:8000/api/musics/music_pk/` => 특정 music 삭제