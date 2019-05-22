
### 환경

mongodb@4.0.9, nodejs@8.16, react@16.8
다음 명령을 통해 패키지를 설치할 수 있습니다.
```bash
npm run --prefix /workspace/mission/textarea-mission "install:all"
```

### 실행

도메인으로 접속하면 react proxy 설정에 문제가 생겨 IP:PORT로 접속해주셔야 합니다.
다음을 실행하신 후 포트포워딩되는 주소에 접속하시면 됩니다.
```bash
npm run --prefix /workspace/mission/textarea-mission "dev:all"
```
EX) http://13.125.217.17:52090

### 흐름

- 모든 요청에 토큰을 발급하는데, 1시간짜리 쿠키(\_sid)에 저장하도록 합니다.
- 로그인을 하면 서버의 sessions Map에 `{ _sid: username }`의 형태로 저장되어 관리됩니다.
- socket.io의 클라이언트는 기본값대로 발급되는 키가 아닌, 앞에서 발급된 토큰을 id로 갖게 됩니다.
- socket.io 연결시에 쿠키의 \_sid를 사용하여 로그인 여부를 확인합니다. 
- 채팅, 파일 매니저 기능은 로그인을 해야만 사용할 수 있습니다. 서버에서도 요청을 검증합니다.
- 채팅 내역에서 각 리스트를 클릭하면 해당 메세지 송신자에게 개인 메세지를 보낼 수 있습니다. placeholder에 표시됩니다.
- input이 focus된 상태에서 esc를 누르면 다시 공개 메세지를 작성할 수 있습니다.

### 부족한 부분

- 로그인할 때 사용자의 정보를 POST 요청의 body에 그냥 평문으로 담아 보내고 있는데, 개선이 필요합니다.
- 회원가입할 때 두 번의 패스워드를 입력하지만 서로 비교하지 않고 첫 번째의 패스워드만 그대로 DB에 반영됩니다.
- 회원가입 및 로그인할 때에 입력받는 문자열의 형식을 검증하지 않습니다.
- reactstrap을 사용하면서 전체 화면 css를 일부 구현했는데, 내부의 div에 height가 제대로 적용되지 않아 스크롤 기능이 없습니다.
- textarea에 별다른 CSS가 적용되지 않아 파일의 내용을 더 많이 보려면 직접 마우스로 textarea를 조작해야 합니다.
- 폴더 트리의 파일명이 상위 경로를 포함하면서 점점 길어지고 있는데, 하위 파일/폴더 확장 기능이 있기 때문에 불필요하지 않나 생각됩니다.
- 파일 업로드 혹은 압축 해제 이후에 리스트가 자동으로 업데이트되지 않고 폴더 트리를 접었다 펴야 반영됩니다.
- DB에 저장될 유저 혹은 체팅 메세지에 대한 스키마를 별도의 파일로 구분했으면 더 좋았을 것 같습니다.

### API

```
/api/user
POST: 회원가입 - 새 사용자를 생성하며, 해싱된 비밀번호를 db에 저장합니다.

/api/session
POST: 로그인 - 사용자의 username과 password가 평문으로 body에 담겨 옵니다. 세션에 사용자의 쿠키(_sid)를 등록
DELETE: 로그아웃 - 사용자의 쿠키(_sid)를 세션에서 제거하며 응답으로 사용자의 쿠키(_sid)를 만료시킵니다.

/api/file
GET: 파일이면 파일의 내용을 Editor에, 폴더라면 하위 파일 목록을 FolderTree에 업데이트합니다.
POST: 파일 생성: 하나 이상의 파일 업로드에 사용됩니다.
PUT: 파일 업데이트, 압축해제 요청

/api/ws
socket.io의 pooling 요청에 사용됩니다.
```

### 폴더구조

```bash
├── README.md
├── data                           // 몽고DB 경로로 사용됩니다
├── back
│   ├── app.js                     // 서버 애플리케이션을 시작합니다. db와 연결됩니다. 세션이 Map으로 정의됩니다.
│   ├── ctrlr
│   │   ├── file.js                // 파일/폴더 내용/리스트(GET), 파일업로드(POST), 파일수정(PUT), 압축해제(PUT)
│   │   ├── index.js
│   │   ├── routes.js              // 각 api endpoint로 들어오는 요청을 처리할 수 있도록 함수와 연결시킵니다.
│   │   ├── session.js             // 로그인(POST), 로그아웃(DELETE)
│   │   ├── static.js              // 구현되어 있지 않습니다. 리액트의 proxy server기능을 통해 서버와 연결됩니다.
│   │   ├── user.js                // 회원가입(POST)
│   │   └── ws.js                  // Socket.io 연결을 처리합니다. 
│   ├── lib
│   │   └── util.js                // 요청을 처리할 때 사용하는 함수들이 있습니다. 
│   ├── mdl
│   │   ├── chat.js                // Socket.io가 사용하는 DB제어 함수가 정의되어 있습니다.
│   │   ├── index.js
│   │   ├── session.js             // 사용자 로그인/로그아웃시에 DB를 확인하여 세션을 유지/삭제합니다.
│   │   └── user.js                // 사용자 회원가입시에 DB에 사용자 정보를 저장합니다.
│   ├── package-lock.json
│   └── package.json
├── front
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   └── src
│       ├── App.js
│       ├── App.module.scss         // sass 사용해 보려 하였으나 index.css에 대부분의 스타일이 정의되어 있습니다.
│       ├── App.test.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── parts
│       │   ├── ChatRoom.js         // 채팅 컴포넌트: 소켓이 정의되고 연결됩니다.
│       │   ├── Editor.js           // 파일을 수정할 수 있는 textarea를 담고 있습니다.
│       │   ├── FileManager.js      // FileUpload, FolderTree, Editor 컴포넌트와 관련 스테이트를 가집니다.
│       │   ├── FileUpload.js       // 파일을 업로드합니다. 
│       │   ├── FolderTree.js       // 서버에 업로드된 파일을 트리 형태로 보여줍니다.
│       │   ├── LogoutButton.js     // 로그아웃 버튼입니다.
│       │   ├── NavBar.js           // 상단의 네비게이션 바: 로그인 모달과 로그아웃 버튼을 가집니다.
│       │   ├── SigninModal.js      // 로그인 모달이며 회원가입 모달을 포함하고 있습니다.
│       │   ├── SignupModal.js      // 회원가입 모달입니다.
│       │   ├── TreeUnit.js         // 각각의 파일/폴더를 표현하는 단위 컴포넌트입니다.
│       │   └── index.js
│       └── serviceWorker.js
├── mongod.conf                     // 몽고DB가 실행하는 데에 사용되는 설정 파일입니다.
├── mongod.log
├── package-lock.json
└── package.json                     
```

