# NVL 사용 시 주의 점

## Null의 NOT IN

`A NOT IN (A, B, NULL)` 쿼리문은

=> `A <> A AND A <> B AND A <> NULL` 쿼리문과 동일

=> 그리고 NULL 과의 비교는 `IS NULL`, `IS NOT NULL`를 제외하고는 **UNKNOWN**이 결과물로 나오므로 이 연속 조건문의 결과는 **항상 FALSE**가 됨

**즉, NULL 이 포함된 NOT IN 구문은 항상 FALSE**



## Cartesian Product

Join을 제대로 안 한 경우 발생 가능한 모든 경우의 수가 출력됨

=> 3개의 데이터가 있는 테이블 A와 2개의 데이터가 있는 테이블 B를 그냥 조건 없이 조인하면 3 X 2 = 6 개의 결과값이 나옴



## Literal SQL

단 한 번만 실행하는 경우는 문제되지 않지만 여러 값들을 반복해서 찾아야할 때 Literal SQL은 문제가 생길 수 있음



오라클은 SQL문을 실행하면 문자를 Parsing해서 쿼리를 어떻게 실행할지 실행계획을 세움

이 계획은 Hashing을 통해 저장되고 특정 쿼리문이 이미 저장되어 있다면 별도의 Parsing 없이 저장된 실행계획을 재사용

Bind Variable SQL은 실행될 때 사용하는 변수만 변하고 SQL문 자체는 그대로기 때문에 오라클이 매번 동일한 쿼리문이라고 생각해서 실행계획을 재사용

Literal SQL은 SQL문 자체가 바뀌기 때문에 오라클이 매번 새로 실행계획을 세워 비효율적
