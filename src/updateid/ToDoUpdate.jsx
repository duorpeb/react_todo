// React Hook
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// axios
import axios from 'axios';
// datePicker
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

// bootStrap
import { TbPencilPlus } from "react-icons/tb";
// custom File
import './toDoUpdate.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


const ToDoUpdate = () => {
  // 해당 게시물의 id 가져오기 (update/:id 에서 id 가져오는 것)
  const { id } = useParams();

  // useState
  const [loading, setLoading] = useState(true); // 로딩
  const [err, setErr] = useState(null); // 데이터 
  const [dateRange, setDateRange] = useState([null, null]) // 날짜 
   // db 로 보낼 useState 초기화 
  const [ todo, setTodo ] = useState({
    category : '',
    tit : '',
    cont : '',
    date : ''
  });


  // getPrevTuple() - 이전 데이터 가져오기 
  const getPrevTuple = async () => {
    try {
      // 해당 id 의 데이터 가져오기 
      const res = await axios.get(`/view/${id}`);
      const result = res.data[0];
      console.log(result);

      // 속성 별로 데이터 가져오기 
      setTodo({
        category : result.CATEGORY,
        tit : result.TITLE,
        cont : result.CONTENTS,
        date : result.DATE  
      })

      // 추가 코드 
      // if(date != null || date != ''){

      // }
      const [ from, to ] = result.DATE.split('~').map(s => s.trim());
      setDateRange([
        // new Date(from),
        moment(from, 'YYYY. M. D.').toDate(),
        // new Date(to)
        moment(to,   'YYYY. M. D.').toDate()
      ]);
    } catch (error) {
      console.error(err); console.log('getPrevTuple Error..!');
      setErr(err);
    } finally { 
      setLoading(false);
    }
  }

  // 마운트 시 한 번만 실행
   // useEffect 앞 return 구문이 있으면 Error 발생
   // Hook은 항상 컴포넌트 최상단 (렌더 흐름 상 조건문 없이) 에서 선언되어야 함
  useEffect(() => { getPrevTuple(); }, []);
 

  // 처리
  if (loading) return <p>로딩 중…</p>;
  if (err)     return <p>오류가 발생했습니다.</p>;


  // 구조 분해 할당 
   // todo 
  const { category, tit, cont } = todo;
   // date 
  const [ startDate, endDate ] = dateRange;



  // onChange() - 수정
  const onChange = (e) => {
    const { name, value } = e.target;

    setTodo({
      ...todo,
      [name] : value
    })
  }

  // sendTuple() - DB 에 Tuple 전송하는 메서드 
  const sendTuple = async () => {
    try {
      let formattedDate = '';
      formattedDate = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;

      // server 에 전송시 서버와 같은 필드명으로 전송해야 함 
       // e.g., server.js 의 field 가 title 이라면 tit 가 아니라 title 로 보내야 함 
      const payload = {
        category,
        tit,
        cont,
        date : formattedDate
      };

      // app.post(`/update/:id)
      const res = await axios.post(`/update/${id}`, payload);
      if(res.status == 200) { alert('성공적으로 추가되었습니다..!'); }
      window.location.href =`/view/${id}`
    } catch (error) {
      console.log('sendTuple Error..!')
    }
  }

  // return
  return (
    <div className = 'modifyCon'>
      <div className='headerColorDiv'>
        할 일 수정
      </div>

      <div className='cateDiv'>
        <div className='cateDivTxt'>
          카테고리 선택
        </div>
        
        <div className='cateSelecDiv'>
          <select 
            name = 'category'
            value = {category}
            onChange = {onChange}
            // ref = {selectRef}
          >
            <option value ="">카테고리 선택</option>
            <option value ="study">공부</option>
            <option value ="meeting">시험</option>
            <option value ="test">약속</option>
            <option value ="trip">업무</option>
            <option value ="task">여행</option>
            <option value ="hobby">운동</option>
            <option value ="exercise">취미/여가활동</option>
            <option value ="must">해야할 일</option>
            <option value ="wish">하고싶은 일</option>
          </select>
        </div>
      </div>

      <div className='titDiv'>
        <div className='titDivTxt'>
          제목 
        </div>
        <input 
          name = 'tit'
          value = {tit}
          onChange = {onChange}
          type="text" />
      </div>

      <div className='calDiv'>
        <div className='calDivTxt'>
          날짜 선택
        </div>
        <div className='calDivDtpicker'>
        <DatePicker 
          name = 'date'
          locale = {ko}

          // // selectsRange 는 react-datepicker 에서 
          // // 날짜 범위 (Date Range) 를 선택할 수 있게 해 주는 boolean 변수
          selectsRange
          startDate = {startDate}   
          endDate = {endDate} 
          onChange = {(update) => { setDateRange(update); }}    

          // 선택 초기화 옵션 
          isClearable

          // placeholder 
          placeholderText='날짜 선택'
        />

        {/* 조건부 렌더링 &&  */}
        {
          startDate && endDate && (
            <p id = 'choiceDateInUpdate'>
              선택일: {startDate.toLocaleDateString()} ~ {' '}
              {endDate.toLocaleDateString()}
            </p>
          )
        }
        </div> 
      </div>

      <div className='contDiv'>
        <div 
          className='contDivTit'>
          상세 내용
        </div>
        
        <div className='contDivTxt'>
        <textarea
          className='contDivTxtInput'
          name = 'cont'
          value = {cont}
          onChange={onChange} 
          type="text" 
        />
        </div>
      </div>

      <div className='enrollBtnDiv'>
        <button
          onClick = {sendTuple}>
          <TbPencilPlus size = {30}/>
        </button> 
      </div>
    </div>
  );
};

export default ToDoUpdate; 