# Django

## Django 환경 준비

1. 빈 폴더(프로젝트 Root)를 만든다

   1. `.gitignore` 생성
   2. `$ git init`으로 REPO 초기화
   3. `README.md` 생성
   4. 원격 저장소 생성 후 연결
   5. `add` => `commit` => `push`

2. 해당 폴더로 이동해서 `$ python -m venv venv` 명령어를 통해 `venv/` (가상독립환경)을 만든다.

3. 가상독립환경을 활성화(`source venv/Scripts/activate`)한다. (or vscode로 열기)

4. `$ pip install django (+a)`를 통해 필요한 패키지들을 설치한다.

5. `$ django-admin startproject <PROJECT NAME> .` 명령어를 통해 프로젝트를 초기화한다.

6. 프로젝트 준비

   - `python manage.py startapp articles` : 앱 생성

     - 앱 생성 후 항상 `settings`의 INSTALLED_APPS에 등록

       (이 때 순서는 local app, 3rd-party app, django app 순)

   - `python manage.py runserver` : 서버 구동



---

## Django 기초

**MTV** (=MVC) : Model - Template - View

1. Model을 먼저 작성: DB의 구조 - DB의 뼈대는 수정이 힘들다
2. urls.py의 path 설정: request을 어디로 보낼지 결정
3. views.py에서 view함수 작성: urls.py에서 온 request를 처리 => HTML 반환 / DB 데이터 CRUD
4. templates/.html 작성: 사용자가 보는 화면



- **즉 url => view로 request가 전달되고, view에서 request의 종류에 따라 처리 후 model, template을 동작하게 하는 구조**



---

## Form에 대한 이해

- model_form의 구조 => `form = ArticleForm(request.POST)` : form 변수에 request.POST를  모델폼 클래스로 만들어 놓는다

- `article = form.save()`에서 form.save()가 데이터 저장, article은 아래 return 구문에서 `redirect('detail', pk=reserved.pk)`로 쓰려고 넣는다.
