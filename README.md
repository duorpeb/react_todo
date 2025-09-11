> # 💡 To Do App - To do List 프로그램 (React 개인 프로젝트) 

<img src="https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=To-do-App">


> # 💡 프로젝트 소개 
🖥️ React 를 활용 (create-react-app 패키지를 통해 프로젝트 생성) 하여 To Do List 프로그램을 만들어보았습니다.

<br><br><br><br><br>


### 🖥️ 스크린샷

> 📗 메인 페이지 - 상단 : 일정이 없는 경우 <br><br>
>> <img width="934" height="315" alt="image" src="https://github.com/user-attachments/assets/8e4fcdcb-272f-4653-a138-c5e3489a7c60" />
<br><br><br>

> 📗 메인 페이지 - 상단 : 일정이 있는 경우 <br><br>
>> <img width="940" height="764" alt="image" src="https://github.com/user-attachments/assets/129557ad-be96-4851-b756-75c92036c28d" />
<br><br><br>

> 📗 메인 페이지 - 하단 : 일정이 있는 경우 <br><br>
>> <img width="932" height="506" alt="image" src="https://github.com/user-attachments/assets/244ba487-3b03-4561-ab8a-14b92e28208e" />
<br><br><br>

> 📗 메인 페이지의 다크모드 버튼 (초승달 아이콘) 클릭 시
>> <img width="940" height="770" alt="image" src="https://github.com/user-attachments/assets/a5aa8c0c-2faa-47c8-b4bf-2654db6dfa8e" />
<br><br><br>

> 📗 메인 페이지의 할 일 전체보기 버튼 (가운데 버튼) 클릭 시
>> <img width="924" height="765" alt="image" src="https://github.com/user-attachments/assets/382ee41f-f544-4f1d-b8f8-4baa1d08078f" />
<br><br><br>

> 📗 메인 페이지의 달력 버튼 클릭 시
>> <img width="871" height="822" alt="image" src="https://github.com/user-attachments/assets/f1224b7b-b958-4aca-a43a-d2c2f9adef71" />
<br><br><br>
 
> 📗 카테고리 별 상세 조회 페이지 (e.g., 공부 카테고리 선택 예제) <br><br>
>> <img width="1244" height="693" alt="image" src="https://github.com/user-attachments/assets/f1536f3a-332c-42a7-a542-2e14a3f8ecc9" />

<br><br><br><br><br>



> # 💡개발 기간 및 팀 규모 
### 🖥️ 개발 기간 
2025/05/14 ~ 2025/05/18 (5일) <br><br>

### 🖥️ 개발 인원 
1명 

<br><br><br><br><br>


> # 💡 기술 스택
### 🖥️ LANGUAGE

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <br><br>

### 🖥️ Library 
<img src="https://img.shields.io/badge/react big calendar-blue"> <img src="https://img.shields.io/badge/moment-blue"> <img src="https://img.shields.io/badge/express-blue"> <img src="https://img.shields.io/badge/axios-blue"> <img src="https://img.shields.io/badge/cors-blue"> <img src="https://img.shields.io/badge/json-blue"> <img src="https://img.shields.io/badge/nodemon-blue"> <img src="https://img.shields.io/badge/body parser-blue">     
<br><br><br><br><br>


> # 💡 폴더 구조
```
📁 to-do/
├── 📂 node_moudles/
│ 
├── 📂 public/
│ 
├── 📂 src/
│   ├── 📂 detailcategory/
│   │   ├── categorysPrint.css
│   │   └── categorysPrint.jsx
│   │
│   ├── 📂 init/
│   │   ├── 📂 css
│   │   │   ├── headPrint.css
│   │   │   └── initPrint.css
│   │   ├── datePicker.txt
│   │   ├── Footer.jsx
│   │   ├── headPrint.jsx
│   │   └── initPrint.jsx
│   │
│   ├── 📂 printcalendar/
│   │   ├── myCalendar.css
│   │   └── myCalendar.jsx
│   │
│   ├── 📂 printlist/
│   │   ├── list.css
│   │   └── list.jsx
│   │
│   ├── 📂 server/
│   │   ├── db_info.txt
│   │   └── server.js
│   │
│   ├── 📂 shared/
│   │   ├── 📂 css
│   │   │   ├── App.css
│   │   │   └── reset.css
│   │   │
│   │   ├── 📂 img
│   │   │   ├── logo.png
│   │   │   └── not_exists.png
│   │   │
│   │   ├── 📂 jsx
│   │   │   ├── KoreanDatePircker.jsx
│   │   └── └── TdBadgeSet.jsx
│   │   
│   ├── 📂 updateid/
│   │   ├── toDoUpadte.css
│   │   └── toDoUpdate.jsx
│   │ 
│   ├── 📂 viewid/
│   │   ├── moreView.css
│   │   └── moreView.jsx
│   │ 
│   ├── App.js
│   │ 
│   ├── App.test.js
│   │ 
│   ├── DarkContext.js
│   │ 
│   ├── index.css
│   │ 
│   ├── index.js
│   │ 
│   ├── logo.svg
│   │ 
│   ├── RefreshContext.jsx
│   │ 
│   ├── reportWebVitals.jsx
│   │ 
│   ├── setupTests.jsx
│   │ 
│   ├── Theme.jsx
│   │ 
│   └──  UtcToKorTime.jsx
│   
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── usedLibrary.txt
```
<br><br><br><br><br>


> # 💡기능

### 🖥️ 할 일 생성 · 수정 · 삭제 

### 🖥️ 완료된 할 일을 취소선으로 표시 

### 🖥️ 다크 모드 

### 🖥️ 할 일 전체 조회 (페이지네이션)

### 🖥️ 달력으로 할 일 조회 

### 🖥️ 카테고리 별 조회 · 수정 


<br><br><br><br><br>


> # 💡 프로젝트 소감

- 이전에 프론트엔드웹개발 강의를 들으며 React 를 짧게 접했었는데 이번 기회에 React 를 활용해 개발을 해보니 useState 를 활용한 상태 관리가 Vanila JS 환경에서 개발할 때와는 다른 편리함을 개발자에게 제공하는 것 같다는 생각이 들었습니다. 또한, Vanila JS 를 활용한 개발 환경에서 기존의 작성해둔 코드에서 특정 부분만 필요한 경우, 또하나의 .js 파일을 만들어야 해서 약간 불편했는데 export 를 활용하니 이런 불편함을 겪지 않아도 되서 좋았었습니다. <br><br>

- 일주일이라는 짧은 시간 동안 react 에 대해 가장 기초적인 부분들만 배우고 시간에 쫓겨 프로젝트를 급하게 마무리 하다보니 상황에 적합한 렌더링 (e.g., SSR / SSG / ISR / CSR / RSC / RSC + SSR/SSG 혼합) 방식을 선택해 성능을 개선시키기 위해 고민하는 시간, 수업시간에 배운 CRA 방식으로도 만들어보고 Next.js 를 활용하여도 만들어보는 것과 같은 시간이 없었기에 아쉬웠습니다. 다음에 React 를 활용하여 프로젝트를 진행한다면 React 에 대해 공부를 하여 보다 완성도가 높은 결과물을 만들어보고 싶은 마음입니다. 

