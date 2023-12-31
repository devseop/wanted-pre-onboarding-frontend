# 원티드 프리온보딩 프론트엔드 - 선발 과제

이 레포지토리는 원티드 프리온보딩 프론트엔드 과정 선발 과제를 위해 만들어졌습니다.

## 과제 정보

#### 참여자: 이윤섭

#### 실행방법

```
git clone https://github.com/devseop/wanted-pre-onboarding-frontend

npm install

npm start
```

#### 사용 라이브러리

```javascript
"dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.10.1",
    "react-router-dom": "^6.14.2",
    "react-scripts": "5.0.1",
  },
"devDependencies": {
  "@babel/plugin-proposal-private-property-in-object": "^7.21.11"
}
```

## 과제 데모영상

### 회원가입
![signup](https://github.com/devseop/wanted-pre-onboarding-frontend/assets/102455161/f411ca14-512a-4058-b3fd-154a52d2774f)

- [x] 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요
  - 이메일 조건: @ 포함
  - 비밀번호 조건: 8자 이상
- [x] 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여해주세요
- [x] 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동해주세요

### 로그인
![sginin](https://github.com/devseop/wanted-pre-onboarding-frontend/assets/102455161/e991e55f-afeb-447c-8e40-a582040594a7)

- [x] 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요

  - 이메일 조건: @ 포함
  - 비밀번호 조건: 8자 이상

- [x] 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동해주세요
  - 응답받은 JWT는 로컬 스토리지에 저장해주세요
- [x] 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
  - 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트 시켜주세요
  - 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트 시켜주세요

### To-Do List
![todo](https://github.com/devseop/wanted-pre-onboarding-frontend/assets/102455161/62804ced-6eb3-42ec-9900-d843b186d7d9)


- [x] `/todo`경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
  - 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
- [x] 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
  - TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에 보여야 합니다.
- [x] TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.
- [x] TODO 우측의 삭제버튼을 누르면 해당 아이템이 삭제되도록 해주세요
- [x] 투두 리스트의 수정 기능을 구현해주세요
  - 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트 될 수 있도록 해주세요
  - 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화 해주세요
