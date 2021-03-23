from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import get_user_model # User 모델 가져 옴
from .forms import CustomUserCreationForm # 계정 생성 모델 폼
from .forms import CustomUserCreationForm, CustomUserChangeForm # 계정 수정 모델 폼
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm # session 저장 폼 / 비밀번호 저장 폼
from django.contrib.auth import login as auth_login # 로그인 함수
from django.contrib.auth import logout as auth_logout # 로그아웃 함수
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST

User = get_user_model()

def index(request):
    users = User.objects.all()
    context = {'users': users, }
    return render(request, 'accounts/index.html', context)


def profile(request, username):
    user = get_object_or_404(User, username=username)
    context = {'user_profile': user, }

    if request.user == user:
        if request.method == 'POST':
            form = CustomUserChangeForm(request.POST, instance=user)
            if form.is_valid():
                form.save()
                return redirect('accounts:profile', username=user.username)
        else:
            form = CustomUserChangeForm(instance=user)

        context['form'] = form

    return render(request, 'accounts/profile.html', context)


@login_required
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():

            from django.contrib.auth import update_session_auth_hash # 비밀번호 변경 후 로그아웃을 방지하는 코드
            update_session_auth_hash(request, form.user) # 근데 잘 안 되나..?

            form.save()
            return redirect('accounts:profile', request.user.username)
    else:
        form = PasswordChangeForm(request.user)

    context = {'form': form, }
    return render(request, 'accounts/change_password.html', context)


def login(request):
    if request.user.is_authenticated:
        return redirect('accounts:index')

    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            # user_found_in_db = form.get_user()
            # auth_login(request, user_found_in_db)
            auth_login(request, form.get_user()) # 반복을 피함

            # next_url = request.GET.get('next') # 다음으로 가야할 url이 있으면 / 없으면 None
            # return redirect(next_url or 'articles:index') # 단축 평가 활용
            return redirect(request.GET.get('next') or 'articles:index') # 반복을 피함

    else:
        form = AuthenticationForm()
    context = {'form': form, }
    return render(request, 'accounts/login.html', context)



def signup(request):
    if request.user.is_authenticated:
        return redirect('articles:index')

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('accounts:profile', user.username)

    else:
        form = CustomUserCreationForm()
    context = { 'form': form, }

    return render(request, 'accounts/signup.html', context)



def logout(request):
    auth_logout(request)    
    return redirect('articles:index')


@login_required
@require_POST
def withdraw(request):
    request.user.delete()
    auth_logout(request)
    return redirect('articles:index')



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
