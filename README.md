# Todo + Calendar App

## 간략 설명

**Calendar**와 **Todo-List** 기능을 한 곳에서 제공하는 캘린더 웹/애플리케이션입니다.  

**Calendar**<br/>
무한 스크롤을 통해 이전 달, 다음 달을 계속해서 탐색 가능합니다.<br/>
1년이 지나갈 때 마다 상단에 표시된 ----년 표시는 자동으로 변경 됩니다.<br/>
하단의 현재 버튼을 눌렀을 땐 현재 날짜에 맞는 달력을 보여줌으로서 편리함을 갖췄습니다.<br/>

**Todo-List**<br/>
유저는 특정 날짜를 클릭해서 그 날의 할 일을 직접 작성할 수 있습니다.<br/>
'+' 버튼을 통해 특정 날짜에 일정을 추가할 수 있습니다.<br/>
Check Box를 통해 완료한 일정을 표시할 수 있으며 삭제할 수 있습니다.<br/>
모든 일정을 완료한 후, 일정을 모두 삭제할 시 달력의 이벤트 표시는 사라집니다.<br/>


### 디자인
개인적으로 깔끔하고 직관적인 **I-phone calendar** 디자인을 좋아해<br/>
참고하여 사용자가 쉽게 탐색할 수 있도록 개발하였습니다.<br/>

## 와이어프레임

### 캘린더 기본 화면
<img src="./src/assets/first.png" alt="캘린더 기본 화면" width="400">

### 날짜를 직접 선택 시 화면
<img src="./src/assets/second.png" alt="날짜를 직접 선택 시 화면" width="400">

### + 버튼을 통해 자유로운 날짜 입력 화면
<img src="./src/assets/third.png" alt="+ 버튼을 통해 자유로운 날짜 입력 화면" width="400">

### ToDO-List를 작성한 후의 완료 표시와 삭제 버튼 화면
<img src="./src/assets/fourth.png" alt="ToDO-List를 작성한 후의 완료 표시와 삭제 버튼 화면" width="400">

### 날짜와 Todo-List가 표시된 날짜
<img src="./src/assets/fifth.png" alt="날짜와 Todo-List가 표시된 날짜" width="400">

## 소스 빌드 및 실행 방법

### 1. 요구 사항
**개발 당시 버전**
- Node.js : v20.10.0
- npm : v10.8.3

### 2. 설치 및 실행

1. 프로젝트 클론
   git clone <url>

2. 의존성 설치
   npm install

3. 개발 서버 실행
   npm run dev

### 3. 주력으로 사용한 컴포넌트에대한 설명 및 사용 이유 
