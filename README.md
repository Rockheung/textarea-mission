
### static
```
/
GET: set-cookie {sessionId: "hashString"} if no sessionId in req.
```

### api

```
/api/user
OPTIONS:
POST: 회원가입

/session
OPTIONS:
POST: 로그인
DELETE: 로그아웃

/file
OPTIONS:
GET: 파일내용
POST: 파일 생성
PUT: 파일 업데이트
DELETE: 파일삭제
```
