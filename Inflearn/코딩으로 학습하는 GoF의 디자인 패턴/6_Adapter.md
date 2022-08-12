# 어댑터 패턴

> 기존 코드를 호환성에 상관없이 사용할 수 있도록 클라이은터가 사용하는 인터페이스의 구현체로 바꿔주는 패턴

- Client 코드는 Target이라는 인터페이스를 사용합니다.
- 기존에 사용하던 Adaptee 코드는 Target 인터페이스와 호환되지 않기 때문에 **Target 인터페이스를 구현하면서 Adaptee와 호환되는**`Adapter 클래스`를 만들어서 Target과 Adaptee를 연결합니다.



## 이론

- (interface) Target : 클라이언트가 사용하는 인터페이스

- **Prototype** : Target의 구현체. Adaptee 클래스를 사용

- Adaptee : Target 코드와 호환되지 않는 기존 코드



## 구현

### Client

```java
public class App {
    public static void main(String[] args) {
        AccountService accountService = new AccountService();
        UserDetailsService userDetailsService = new AccountUserDetailsService(accountService);
        LoginHandler loginHandler = new LoginHandler(userDetailsService);
        String login = loginHandler.login("keesun", "keesun");
        System.out.println(login);
    }
}

public class LoginHandler {
    UserDetailsService userDetailsService;

    public LoginHandler(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public String login(String username, String password) {
        UserDetails userDetails = userDetailsService.loadUser(username);
        if (userDetails.getPassword().equals(password)) {
            return userDetails.getUsername();
        } else {
            throw new IllegalArgumentException();
        }
    }
}
```

(app.java)

- adaptee : Account, AccountService

- Target : UserDetails, UserDetailsService

UserDetailsService의 loadUser를 사용해서 UserDetails을 만들고

User Details에서 userName과 userPassword를 가져와야 한다.

이 때 기존 데이터가 있는 Account에서 데이터를 가져오기 위해 Account와 AccountService를 UserDetails와 UserDetailsService에서 사용하고자 한다.

### Target

```java
public interface UserDetails {
    String getUsername();
    String getPassword();
}
public interface UserDetailsService {
    UserDetails loadUser(String username);
}
```

### Adaptee

```java
public class Account {...}
public class AccountService {...}
```

### Adapter

```java
// AccountUserDetails
// Target : UserDetails
// Adaptee : Account
public class AccountUserDetails implements UserDetails { // Target
    private Account account; // Adapte

    public AccountUserDetails(Account account) {
        this.account = account;
    }

    @Override
    public String getUsername() {
        return account.getName();
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }
}


// AccountUserDetailsService
// Target : UserDetailsService
// Adaptee : AccountService
public class AccountUserDetailsService implements UserDetailsService { // Target
    private AccountService accountService; // Adaptee

    public AccountUserDetailsService(AccountService accountService) {
        this.accountService = accountService;
    }

    @Override
    public UserDetails loadUser(String username) {
        return new AccountUserDetails(accountService.findAccountByUsername(username));
    }
}

```

- Adaptee나 Target의 변형 없이 Adapter 추가만 함으로써 코드 사용이 가능

- 만약 Target이나 Adaptee 코드에 손을 댈 수 있으면 Adapter 없이 직접 해당 소스를 고치면 된다.

- 3rd Party 모듈을 사용하는 등 직접 Adaptee와 Target을 수정할 수 없을 때 Adapter 사용

- SRP에 따르면 Adapter를 분리하는 게 맞지만 원칙을 너무 엄격히 지키기보단 클래스를 줄이는 실용적인 방법이 유용할 때도 있다.

## 장단점

- 장점

기존 코드 변경 없이 인터페이스 구현체만 추가해서 사용 가능

기존 코드와 신규 코드를 연결하는 작업을 클래스를 분리해서 관리 가능 (SRP 만족)

- 단점

새 클래스가 생겨 복잡도가 증가 (경우에 따라 기존 코드를 수정하는 게 더 좋을 수도 있음)
