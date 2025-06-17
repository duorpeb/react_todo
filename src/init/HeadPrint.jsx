import React, { useEffect, useRef, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import './css/headPrint.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RefreshContext } from '../RefeshContext';
import { MdDarkMode } from "react-icons/md";
import { DarkContext } from '../DarkContext';

const dark = false;

const HeadPrint = () => {
  // useContext 
  const { darkMode, setDarkMode } = useContext(DarkContext);
  const { setRefresh } = useContext(RefreshContext);

  // DOM 초기화를 위한 useRef()
  const selectRef = useRef('');
  const titRef = useRef('');
  const datePickerRef = useRef('');

  // addTodo's useState 
    const [ todo, setTodo ] = useState({
      category : '',
      tit : '',
      date : ''
    });

    // 객체 구조 분해 할당
    const { category, tit, date } = todo;
    
    // onChange() 
    const onChange = (e) => {
      const { name, value } = e.target;

      setTodo(({
        ...todo,
        [name] : value
      }));
    };
  // addToDo fin ---------------------------------------------------------------


  // datepicker's useState -----------------------------------------------------------------
   // [시작일, 종료일] 형태의 배열을 state로 관리
    const [ dateRange, setDateRange ] = useState([null, null]);
    
    // 배열 구조 분해 할당
    const [startDate, endDate] = dateRange;

  // datepicker fin -----------------------------------------------------------------
  const sendTuple = async () => {
    let isValidCategory = false; let isValidtit = false; 
    let isValidDate = false; 
    
    
    if(category !== '') { isValidCategory = true; }
    if(tit !== '') { isValidtit = true; }
    if(startDate !== null && endDate !== null){ isValidDate = true; }
  
    if(!isValidCategory && !isValidtit){ alert('카테고리 혹은 내용을 작성하세요 '); return; }

    // sendTuple 안에서 setTodo({ …, date: formattedDate })를 호출한 바로 다음 줄에
    // axios.post('/insert', todo) 를 실행하고 있어서, React의 setState (여기선 setTodo)는 
    // 비동기이기 때문에 아직 todo.date가 바뀌기 전의 옛 상태 (date: '') 가 서버로 전송
    // setTodo({
    //   ...todo,
    //   date : `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
    // })
    
    // 날짜 선택이 선택 사항 (옵션) 인 카테고리 목록을 배열로 정의하여 
    // 해야할 일 혹은 하고싶은 일인 경우 날짜 설정 안해도 추가 가능
    const optionalDateCategories = ['must', 'wish'];


    // arrays.includes(searchElement[, fromIndex]) 를 사용해 배열 안에 category 가 있는지 확인
     // fromIndex 인덱스부터 배열의 각 요소를 순회하며 (fromIndex 인덱스의 기본값 0)
     // 엄격 동등 비교 (===) 로 searchElement와 같은지 검사
     // 일치하는 요소를 발견하면 즉시 true 반환

    // includes()의 결과를 반전(!)해서 needsDate 변수에 저장
     // category가 'must' 혹은 'wish'라면 includes는 true → !true → false → 날짜 불필요
     // 그 외('study', 'trip' 등)라면 includes는 false → !false → true → 날짜 필요
    const needsDate = !optionalDateCategories.includes(category);

    // 날짜 추가
    let formattedDate = '';
    // category 가 optionalDateCategories 안에 존재하면 true, 존재하지 않으면 false 를 반환
    if (needsDate) {
      if (!startDate || !endDate) {
        alert('날짜를 선택해주세요.');
        return;
      }
      // must/wish 카테고리면 formattedDate는 '' 로 둠
      formattedDate = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
    }
    
    
    const payload = {
      category,
      tit,
      date : formattedDate
    };

    try{
      // if(payload.category === 'must' || payload.category === 'wish'){
      //   payload.date = '';
      // }
      const res = await axios.post('/insert',payload);

      if(res.status == 200){ 
        alert('성공적으로 추가되었습니다..!'); 
        setRefresh(r => !r);
      }
      else{ alert('추가 작업이 실패했습니다..!');  }
    } catch(err){
      console.log(err);
      alert('Server Error..!')
    }

    // selectRef.current.reset();
    // titRef.current.reset();
    // datePickerRef.current.reset();
    // 추가 후 초기화
    setTodo({ category: '', tit: '', date: '' });
    setDateRange([null, null]);
  }


  // useEffect() 
  useEffect(() => {
    titRef.current.focus();
  },[todo,dateRange]);


  // return
  return (
    <>
    <div className='headPrintCon'>
      <div className='left headLeft'>
        <select
          id = 'selectCategory' 
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


    <div className='right headRight'>
      <div className = 'headInputDiv'>
        <input 
          className='headInput'
          type = "text" 
          name = 'tit'
          value = {tit}
          placeholder='할 일을 추가해주세요'
          onChange = {onChange}
          ref = {titRef}
          autoFocus
        >
        </input>

        <div className='addIcon'>
          <button 
            id = 'sendTupleBtn'
            onClick = {sendTuple} 
          >
            <IoIosAddCircleOutline 
              size = {35}
            />
          </button>
        </div>
      </div>
 

      <div className='headDpDiv'>
        <DatePicker 
          name = 'date'
          // value = {date} 
          // 언어 설정
          locale = {ko}
          // selectsRange 는 react-datepicker 에서 
          // 날짜 범위 (Date Range) 를 선택할 수 있게 해 주는 boolean 변수
          selectsRange 
          startDate = {startDate}
          endDate = {endDate}
          onChange = {(update) => {
            // update 가 [startDate, endDate] 배열로 넘어옴 
            setDateRange(update);
          }}
          // 선택 초기화 옵션 
          isClearable 
          // placeholder
          placeholderText = '날짜 선택'
          // ref = {datePickerRef}
        />
        {
          startDate && endDate && (
            <p id = 'choiceDate'>
              선택일: {startDate.toLocaleDateString()} ~ {' '}
              {endDate.toLocaleDateString()}
            </p>
          )
        }
      </div>
    </div>
  </div>

  <div className='listAndCalendar'>
    <div>
      <button
        id = 'darkBtn'
        onClick = {() => setDarkMode(d => !d)}>
          
        <MdDarkMode size = {30} />
      </button>

      <button 
        id = 'printListBtn'>
        <Link to = {`/printlist`}> 
          <FaListAlt size = {30}/> 
        </Link>

      </button>

      <button 
        id = 'printCalBtn'>
        <Link to = {`/printcalendar`}>
          <FaRegCalendarCheck size = {30} />
        </Link>
      </button>
    </div>
  </div>
  </>
  );
};

export default HeadPrint;