
### static
```
/
GET: set-cookie {sessionId: "hashString"} if no sessionId in req.
```

### api

```
/api/user
OPTIONS: set-cookie {sessionId: "hashString"} if no sessionId in req.
POST: 회원가입

/session
OPTIONS: set-cookie {sessionId: "hashString"} if no sessionId in req.
POST: 로그인
DELETE: 로그아웃

/file
OPTIONS: set-cookie {sessionId: "hashString"} if no sessionId in req.
GET: 파일내용
POST: 파일 생성
PUT: 파일 업데이트
DELETE: 파일삭제
```
