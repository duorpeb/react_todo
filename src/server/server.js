// 설치한 라이브러리를 변수로 받아오기
  // express 
const express = require('express');
  // body-parser
const bodyParser = require('body-parser');
  // mysql 
const mysql = require('mysql');
  // cors
const cors = require('cors');


// create an app to use express 
const app = express();

// express server port set  
const PORT = process.env.PORT || 5000; // 그냥 

// code to use in app 
app.use(cors());
app.use(bodyParser.json());

// code to set mysql connection
  // ALTER USER 'reactUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql';
const db = mysql.createConnection({
  host : 'localhost',
  user : 'reactUser',
  password : 'mysql',
  port : '3306',
  database : 'todo'
})

// express connection
app.listen(PORT,() => {
  console.log(`server connecting.. (Port : ${PORT})`);
})

// mysql connection
db.connect((err) => {
  if(!err){ console.log('Successed..!'); }
  else { console.log('Failed..!'); } 
})

// when init connection, user screen of root 
app.get('/',(req, res) => {
  res.send("Hello React World!");
})


// todo post 
app.post('/insert',(req, res) => {
  const { category, tit, date } = req.body;

  const tmpQuery = `insert into usertodo (category, title, date) value (?,?,?)`;

  db.query(tmpQuery, [category, tit, date], (err, data) => {
    if(err) { console.log('insert Error..!') }
    else{
      res.sendStatus(200);
    }
  })
})



// today's schedule
 // db.query(sql: string, params?: any[]
 // , callback: (err: Error, results: any, fields: any) => void)

 // Promise 패턴 (mysql2)
 // const [rows, fields] = await db.promise().query(sql, params);
app.get('/todaysch', (req, res) => {
  const todayStr = new Date().toLocaleDateString('ko-KR'); // ex) "2025. 5. 29."

  const tmpQuery = 
    `select id, category, title
     from usertodo
     where date LIKE ?  
      and category not in ('must')
     order by id desc
    `

    db.query(tmpQuery,[`%${todayStr}%`],(err, data) => {
      if(err){ console.log(err); res.send('todaysch Error..!'); }
      else{
        // API 응답용으로는 res.json(data), HTML/TEXT/File 전송 시에는 res.send(data)
         // API 서버를 구현할 땐 JSON 전용 응답에는 res.json()
         // 그 외 HTML 이나 파일 전송 시에는 res.send() 를 쓰는 게 보편적
        res.send(data);
      }
    })
})


// must to do 
app.get('/must', (req, res) => {
  const tmpQuery = 
    `select id, title,contents
     from usertodo 
     where category = 'must'
     order by id desc 
    `;

  db.query(tmpQuery, (err, data) => {
    if(err){ console.log(err); res.send('must Error..!'); }
    else{
      res.send(data);
    }
  })
})


// print shpae of List 
app.get('/printlist',(req,res) => {
  // 쿼리스트링으로 넘어온 page, pageSize 를 숫자로 바꿔서 가져오기
  const page     = parseInt(req.query.page)     || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // OFFSET (건너뛸 로우 수) 계산 : (페이지 번호 – 1) × 한 페이지당 개수
  const offset = (page - 1) * pageSize;

  // 페이지 전체 개수 구하기 
  const tmpQuery = `select count(*) as total from usertodo order by id desc`;

  db.query(tmpQuery, (err, countRows) => {
    if(err){ console.log(err); res.send('printlist tmpQuery Error..!'); }
    const total = countRows[0].total; 
    // 확인,
    console.log(total);

    const tmpQuery2 = `select * from usertodo order by id desc limit ? offset ?`;

    db.query(tmpQuery2, [pageSize, offset], (err, rows) => {
      if(err) { res.send('printlist tmpQuery2 Error..!'); }
      // page, pageSize, total, rows 모두 클라이언트로 전달
      res.json({page, pageSize, total, data : rows});
    })
  })
})


// print shape of Calendar 
app.get('/printcalendar',(req,res) => {
  const tmpQuery = `select * from usertodo order by id desc `;

  db.query(tmpQuery, (err, data) => {
    if(err) { res.send('printcalendar Error..!'); }
    res.json(data);
  })
})


// print detail page of each Category 
app.get('/detailcategory/:category',(req, res) => {

})


// code for selecting, updating and deleting data thatmatch each id in the today's schedule list

 // load previous data - app.get(`view/:id)
app.get(`/view/:id`,(req, res) => {
  // Route Parameter 에서 Elem 가져오기
  const id = req.params.id;

  const tmpQuery = `select * from usertodo where id = ${id}`;

  db.query(tmpQuery,(err, data) => {
    if(err){ res.send('/view/id Error..!'); }
    else{ res.send(data); }
  })
})

// update - app.post(`update/:id`), 
app.post(`/update/:id`,(req, res) => {
  const id = req.params.id;

  const { category, tit, cont, date } = req.body;

  const tmpQuery 
    = `update usertodo 
       set category = ?, title = ?, contents = ?, date = ?
       where id = ?`;

  db.query(tmpQuery,[category, tit, cont, date, id],(err, data) => {
    if(err){ res.send('/update/:id Error..!'); }
    else{ res.sendStatus(200); }
  })

  // from 절 생략
  // const = 'update usertodo set '
})


// delete - app.post(`delete/:id`)
app.get(`/delete/:id`,(req, res) => {
  const id = req.params.id;

  const tmpQuery = `delete from usertodo where id = ${id}`;

  db.query(tmpQuery, (err, data) => {
    if(err){ res.send('delete/id Error..!'); }
    else{ res.sendStatus(200); }
  })
})

