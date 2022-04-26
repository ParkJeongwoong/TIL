# 백엔드 프레임워크 만들기 : Step 1 - Servlet

## BoardServlet

1. HttpServlet을 상속받아 BoardServlet 구현
2. CallList, CallWrite, ExeWrite의 서비스를 실행



=> WAS에서 톰캣이 실행





## RunCode5BySimple

main 메소드가 있는 톰캣 실행기



1. 톰캣 객체 생성 - `new Tomcat()`
2. 톰캣 실행 포트 설정 - `setPort()`
3. 톰캣 실행 경로(BaseDir) 설정 - `setBaseDir()`
4. 톰캣 Context 추가 - `addContext()`



5. 서블릿 객체 생성 - `new BoardServlet()`
6. 톰캣에 서블릿 추가 - `addServlet()`
7. 서블릿에 Context 매핑 - `addServletMappingDecoded()`



8. 톰캣 실행 - `start()`
9. 톰캣 대기 - `getServer().await()`



=> `http://localhost:18080/board?mode=callList`

<u>18080포트</u>(톰캣)의 <u>board 서블릿</u>에 <u>callList 모드</u>로 연결

1. 18080포트로 접근 => 톰캣이 받음
2. /board  경로와 매핑된 board 서블릿 실행
3. mode 인자는 callList값 => callList 서비스 실행
