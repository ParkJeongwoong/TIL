# Django

## Django 환경 준비

1. 빈 폴더(프로젝트 Root)를 만든다

   1. `.gitignore` 생성
   2. `$ git init`으로 REPO 초기화
   3. `README.md` 생성
   4. 원격 저장소 생성 후 연결
   5. `add` => `commit` => `push`

2. 해당 폴더로 이동해서 `$ python -m venv venv` 명령어를 통해 `venv/` (가상독립환경)을 만든다.

3. `pip install -r requirements`로 필요한 pip 다운로드

4. 가상독립환경을 활성화(`source venv/Scripts/activate`)한다. (or vscode로 열기)

5. `$ pip install django (+a)`를 통해 필요한 패키지들을 설치한다.

6. `$ django-admin startproject <PROJECT NAME> .` 명령어를 통해 프로젝트를 초기화한다.

7. 프로젝트 준비

   - `python manage.py startapp articles` : 앱 생성

     - 앱 생성 후 항상 `settings`의 INSTALLED_APPS에 등록

       (이 때 순서는 local app, 3rd-party app, django app 순)

   - `python manage.py runserver` : 서버 구동

------



## Django 기초

**MTV** (=MVC) : Model - Template - View

1. Model을 먼저 작성: DB의 구조 - DB의 뼈대는 수정이 힘들다
2. urls.py의 path 설정: request을 어디로 보낼지 결정
3. views.py에서 view함수 작성: urls.py에서 온 request를 처리 => HTML 반환 / DB 데이터 CRUD
4. templates/.html 작성: 사용자가 보는 화면

- **즉 url => view로 request가 전달되고, view에서 request의 종류에 따라 처리 후 model, template을 동작하게 하는 구조**

------



## Form

- model_form의 구조 => `form = ArticleForm(request.POST)` : form 변수에 request.POST를 모델폼 클래스로 만들어 놓는다
- `article = form.save()`에서 form.save()가 데이터 저장, article은 아래 return 구문에서 `redirect('detail', pk=reserved.pk)`로 쓰려고 넣는다.



- html 영역에서 입력 제한은 `widget`이 하는 것 (우회가 가능하기 때문에 제대로 된 제한 방법은 아니고 유저 편의 용도)
- `form.is_valid()`를 할 때 forms.py에 있는 정보와 비교하며 데이터 검증을 하는 것





## 프로젝트 작성 예시

1. Root에 templates 추가 / base.html
2. app에 templates/app 추가 / index, form, detail / login, signup, profile
3. app에 urls.py, forms.py 추가



### Model

- models.py - app1

```python
from django.db import models


class AppModel(models.Model):
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(blank=True)
```

모델 정의 후 migration

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```



- forms.py - app1

```python
from django import forms
from .models import AppModel

# forms.Form => 특정 모델과 연동 X 단순히 데이터 검증/HTML생성용 (로그인 용도)
class normalForm(forms.Form):
    name = forms.CharField(min_length=2, max_length=5)
    email = forms.EmailField()
    age = forms.IntegerField(min_value=3, max_value=100)
    content = forms.CharField(widget=forms.Textarea)  # widget => HTML 생성시 주는 옵션

    
# forms.ModelForm => 특정 모델과 연동 / DB에 접근해서 그대로 field를 받아옴
class AppeForm(forms.ModelForm):
    class Meta:
        model = AppModel
        fields = '__all__'
        # exclude = ('certain_field',)
```



### CRUD

- settings.py

```python
INSTALLED_APPS = [
    'app1',
    'accounts',
    
    'django_extensions',
###################################################################
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ BASE_DIR / 'templates' ],
###################################################################
        
STATIC_URL = '/static/'
```



[name space]

이름 중복 방지를 위해 `templates/appname/` 와 urls.py에 `app_name` 설정

- urls.py - master app

```python
from django.contrib import admin
from django.urls import path, include

from django.conf import settings # Media 추가
from django.conf.urls.static import static # Media 추가


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('app1/', include('app1.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # Media 추가
```

- urls.py - app1

```python
from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('create/', views.create, name='create'),

    path('', views.index, name='index'),
    path('<int:app1_pk>/', views.detail, name='detail'),

    path('<int:app1_pk>/update/', views.update, name='update'),

    path('<int:app1_pk>/delete/', views.delete, name='delete'),
]
```



- views.py - app1

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_safe, require_http_methods, require_POST
from .models import Article
from .forms import ArticleForm


@require_safe
def index(request):
    articles = Article.objects.order_by('-pk')
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)


@require_http_methods(['GET', 'POST'])
def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm()
        
    context = {
        'form': form,
    }
    return render(request, 'articles/create.html', context)


@require_safe
def detail(request, app1_pk):
    article = get_object_or_404(Article, pk=app1_pk)
    context = {
        'article': article,
    }
    return render(request, 'articles/detail.html', context)


@require_POST
def delete(request, app1_pk):
    article = Article.objects.get(pk=app1_pk)
    article.delete()
    return redirect('articles:index')



@require_http_methods(['GET', 'POST'])
def update(request, app1_pk):
    article = get_object_or_404(Article, pk=app1_pk)
    
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid():
            form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm(instance=article)
        
    context = {
        'form': form,
        'article': article,
    }
    return render(request, 'articles/update.html', context)
```



### Admin

```bash
$ python manage.py createsuperuser
```

- admin.py

```python
from django.contrib import admin
from .models import AppModel # AppModel model을 가져온다

# admin에서 여러 column이 표시되게 만드는 방법!
class AppAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'content', 'created_at', 'updated_at',) # 튜플이나 리스트로 작성

# Register your models here.
admin.site.register(AppModel, UserAdmin) # admin site에 AppAdmin을 register
# admin.site.register(AppModel) # AppAdmin이 없으면 이것도 가능
```

- Custom User 등록 후 : 이렇게 해야 admin 페이지에서 Custom User를 관리 가능

```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

admin.site.register(CustomUser, UserAdmin)
```



### Media

- **media**는 사용자가 upload한 파일 저장

- **static**은 개발자가 사용하는 파일 저장



- models.py에서 image를 업로드 하려면 **필수적으로** `pillow`를 설치해야 함

- settings.py

```python
# STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [ 
    BASE_DIR / 'articles' / 'static',
    BASE_DIR / 'static',
    ]

MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = '/media/'
```

- models.py

```python
from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(blank=True) # NULL = True는 DB가 빈 걸 인정 / blank=True는 ORM 단계에서 비어도 인정 / pillow가 필요하다
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

- views.py
  - Media를 추가하려면 request.FILES를 넣어야 한다

```python
@require_http_methods(['POST', 'GET'])
def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST, request.FILES) # Media를 추가하려면 request.FILES를 넣어야 한다
        if form.is_valid():
            article = form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm()
    
    context = {
        'form': form
    }
    return render(request, 'articles/form.html', context)
```





- html 파일에서 `{% load static %}`을 해야 한다.
- 이후 `{% static 'articles/images/sample_img.jpg' %}`처럼 사용
- `<form method="POST" enctype="multipart/form-data">` : enctype을 적어야지 html 파일에 media 파일이 첨부됨1
- forms.html

```django
{% extends 'base.html' %}

{% block content %}
<form method="POST" enctype="multipart/form-data"> <!-- enctype을 적어야지 file이 html 파일에 첨부됨-->
  {% csrf_token %}
  {{ form.as_p }}
  <input type="submit">
</form>
{% endblock content %}
```

#### Resizing

`pip install pilkit django-imagekit`

- models.py

```python
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import Thumbnail

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    # image = models.ImageField(blank=True) # NULL = True는 DB가 빈 걸 인정 => 자동으로 ''가 저장됨 / blank=True는 ORM 단계에서 비어도 인정 / pillow가 필요하다
    # RESIZING
    image = ProcessedImageField(
        upload_to='articles/',
        blank=True,
        processors=[Thumbnail(200,300)],
        format='JPEG',
        options={'quality': 90},
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```





### Auth

- User Model의 기본 값은 `User`
- 하지만 쓰진 않더라도 변경이 가능한 Custom Model을 Forms.py에다 만드는 것을 추천 -> `AbstractUser`를 상속받아 생성

!!!!!!!!! Custom User model을 만들면, settings에다가 **`AUTH_USER_MODEL = 'accounts.Custom_User_name'**`를 추가해야 함

& `UserCreationForm`, `UserChangeForm`은 default User를 위한 form

=>**`CustomUserCreationForm`, `CustomUserChangeForm`을 만들어 custom User를 위한 form을 만들어야 함**



- forms.py - accounts
  - User 모델은 생성과 수정이 분리되어 있음

```python
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth import get_user_model

User = get_user_model() # User 모델은 절대 직접 참조 X

class CustomUserCreationForm(UserCreationForm):
    # little customize
    class Meta:
        model = User
        fields = ['username',]
        # fields = UserCreationForm.Meta.fields + ('email', ) 이렇게도 추가 가능


class CustomUserChangeForm(UserChangeForm):
    address = forms.CharField(min_length=3, max_length=200)
    first_name = forms.CharField(min_length=1, max_length=100)
    last_name = forms.CharField(min_length=1, max_length=100)
    email = forms.EmailField(min_length=1)

    class Meta:
        model = User
        fields = ['last_name', 'first_name', 'address', 'email', ]
```



- models.py - accounts

```python
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser): #
    # username, password, is_active, is_staff, ... etc columns
    address = models.CharField(max_length=100)

    def __str__(self):
        return f'User Class - {self.id}: {self.username}'
```



- settings.py

```python
###################################################################
        
AUTH_USER_MODEL = 'accounts.CustomUser' # 커스텀 유저 모델 설정
```



- urls.py - accounts

```python
from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('profile/password/', views.change_password, name='change_password'),
    path('profile/<str:username>/', views.profile, name='profile'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('withdraw/', views.withdraw, name='withdraw'),
    path('force_logout/', views.force_logout, name='force_logout'),
]
```



- views.py - accounts
  - delete 함수도 `@login_required`가 아니라 `is_authenticated`로 고쳐야 한다

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_safe, require_POST, require_http_methods
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

User = get_user_model()

@require_http_methods(['GET', 'POST'])
def signup(request):
    if request.user.is_authenticated:
        return redirect('articles:index')

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)


@require_http_methods(['GET', 'POST'])
def login(request):
    if request.user.is_authenticated:
        return redirect('articles:index')

    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            next_url = request.GET.get('next') # next url 처리
            return redirect(next_url or 'articles:index')
    else:
        form = AuthenticationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html', context)


def logout(request):
    auth_logout(request)
    return redirect('articles:index')


@login_required
def profile(request, username):
    user = get_object_or_404(User, username=username)
    context = {
        'user_profile': user,
    }

    if user == request.user:
        if request.method == 'POST':
            form = CustomUserChangeForm(request.POST, instance=user)
            if form.is_valid():
                form.save()
                return redirect('accounts:profile', username)
        else:
            form = CustomUserChangeForm(instance=user)
        context['form'] = form

    return render(request, 'accounts/profile.html', context)


@login_required
@require_POST
def withdraw(request):
    request.user.delete()
    auth_logout(request)
    return redirect('articles:index')


@login_required
@require_http_methods(['POST', 'GET'])
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST) # change_password Form은 request가 아니라 request.user를 받는다
        if form.is_valid():
            # 재로그인        
            auth_login(request, form.save())
            return redirect('accounts:profile', request.user.username)
    else:
        form = PasswordChangeForm(request.user)
    
    context = {
        'form': form,
    }
    return render(request, 'accounts/change_password.html', context)



# session 초기화에 대한 설명
@login_required
def force_logout(request):
    from importlib import import_module
    from django.contrib.sessions.models import Session
    from django.conf import settings
    Session_engine = import_module(settings.SESSION_ENGINE)
    # 유효기간 지난 SESSION DATA 모두 삭제(최적화)
    Session_engine.SessionStore.clear_expired()
    sessions = Session.objects.all()
    # 모든 Session에 대해 순회하며 해석 => 비교 후 삭제
    for session in sessions:
        data = session.get_decoded()
        if data.get('_auth_user_id'):
            user_id = int(data.get('_auth_user_id'))
        if request.user.id == user_id:
            session.delete()
    return redirect('articles:index')
```



### Templates

- Base,html

```django
<!DOCTYPE html>
<html lang="en">
<head>
  {% load static %} <!-- static-->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="{% static 'css/bootstrap.min.css' %}"> <!-- static-->
  {% block head %}{% endblock head %}
  <title>{% block title %}{% endblock title %}</title>
</head>

{% include '_navbar.html' %} <!-- 모듈화-->

<div class="container">
  {% block content %}
  {% endblock content %}
</div>

<script src="{% static 'js/bootstrap.bundle.min.js' %}"></script> <!-- static-->
<body>
  
</body>
</html>
```



[유용한 HTML 팁]

- request.user.username // 유저 이름
- request.resolver_match.url_name == 'url_name' // 접근 방식



### Comment

Comment는 Article과 관련된 class



- models.py - articles
  - 여기서는 유저를 참조할 때 `settings.AUTH_USER_MODEL`를 사용해야 한다.

```python
from django.db import models
from django.conf import settings

# Comment를 위해 추가해야 하는 class
class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
```



- admin.py - articles

```python
# Comment 관리를 위해 추가해야 하는 코드
from django.contrib import admin
from .models import Comment

admin.site.register(Comment)
```



- forms.py - articles

```python
# Comment 관리를 위해 추가해야 하는 코드
from django import forms
from .models import Article, Comment


class ArticleForm(forms.ModelForm):

    class Meta:
        model = Article
        fields = ('title', 'content')
        

class CommentForm(forms.ModelForm):

    class Meta:
        model = Comment
        # fields = '__all__'
        exclude = ('article',)
```



- urls.py - articles

````python
path('<int:pk>/comments/', views.comments_create, name='comments_create'),
path('<int:pk>/comments/<int:comment_pk>/delete', views.comments_delete, name="comments_delete"),
````



- views.py - articles

```python
from .forms import CommentForm
from .models import Comment

@require_safe
def detail(request, pk):
    article = get_object_or_404(Article, pk=pk)
    # Comment 구현
    comment_form = CommentForm()
    comments = article.comment_set.all()
    context = {
        'article': article,
        'comment_form': comment_form,
        'comments': comments,
    }
    return render(request, 'articles/detail.html', context)


@require_POST
def comments_create(request, pk):
    if request.user.is_authenticated:
        article = get_object_or_404(Article, pk=pk)
        comment_form = CommentForm(request.POST) # 모델 폼
        if comment_form.is_valid():
            # Foreign key와 아직 연결이 X
            comment = comment_form.save(commit=False) # form에서 받은 데이터로 instance는 만들지만 DB에 저장은 X
            comment.article = article # 추가 데이터 instance에 저장
            comment.save()
            return redirect('articles:detail', article.pk)
        context = {
            'comment_form': comment_form,
            'article': article,
        }
        return render(request, 'articles/detail.html', context) # 이렇게 해야 에러 메세지가 뜸
    return redirect('accounts:login')


@require_POST
def comments_delete(request, pk, comment_pk):
    if request.user.is_authenticated and request.user == comment.user:
        comment = get_object_or_404(Comment, pk=comment_pk)
        comment.delete()
        return redirect('articles:detail', pk)
    return redirect('accounts:login')
```



- detail.html - articles

```django
<!-- Comments-->
<hr>
<h4> 댓글 목록</h4>
<ul>
  {% for comment in comments %}
    <li>
      {{ comment }}
      <form action="{% url 'articles:comments_delete' article.pk comment.pk %}" method="POST">
        {% csrf_token %}
        <input type="submit" value="DELETE">
      </form>
    </li>
  {% endfor %}
</ul>
{% comment %}댓글 작성{% endcomment %}
<form action="{% url 'articles:comments_create' article.pk %}" method="POST">
  {% csrf_token %}
  {{ comment_form }}
  <input type="submit">
</form>
```
