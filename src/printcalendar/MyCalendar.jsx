import React, { useEffect, useState } from 'react';
import './myCalendar.css';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { parseISO } from 'date-fns';
import moment from 'moment';
// 한국어 로드
import 'moment/locale/ko';

// 한 번만 실행
moment.locale('ko');
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  // useState
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 체크
  const [error, setError] = useState(null); // 에러 상태 체크

  // DB 에서 date 만 가져오기 
  const getDate = async () => {
    try {
      const res = await axios.get('/printcalendar');
      console.log(res.data[0]);

      // data 받아오기
      const evts = res.data.map(v => {
          // date 문자열 분리 
          const [from, to] = v.DATE.split('~').map(s => s.trim());

          // react-big-calendar 에는 기본적으로 start와 end 프로퍼티를 탐색
          return {
            id : v.ID,
            category : v.CATEGORY,
            title : v.TITLE,
            start : moment(from, 'YYYY. M. D.').toDate(),
            end : moment(to,   'YYYY. M. D.').toDate()
          }          
        }
      )
      setDate(evts);

    } catch (err) {
      console.log(err); console.log('printcalendar Error..!');
      setError(err);
    } finally{
      setLoading(false);
    }
  }

  // 마운트 시 실행 (depas : [], 마운트 될 때, 단 한 번 실행)
   // deps 가 없으면, 렌더링마다 실행
  useEffect(() => {
    getDate();
  }, [])

  
  // 문자열 (date) 을 Date 객체로 변환
   // import { parse } from 'date-fns';
  // const 


  // 커스텀 툴바 - 버튼 없이 오직 'label' (월/연도)만 렌더링
  const CustomToolbar = ({ label }) => (
    <div style={{
      textAlign: 'center',
      margin: '1em 0',
      fontSize: '1.5em',
      fontWeight: '700',
      color : 'white'
    }}>
      {label}
    </div>
  );

  // 카테고리 별 이벤트 색상 지정
    // 색상 
  const colorSet = {
    'study': '#de8383',
    'test' : '#f5BE26', 
    'meeting' : '#83b4de', 
    'task' : '#a391d2',
    'trip': '#9dd3d3', 
    'exercise': '#f3600b', 
    'hobby': '#c27fbb', 
    'must': '#60d8a0',     
    'wish': '#e0227b'
  };


   // eventPropGetter
   const getEventStyle = event => {
    let bg = colorSet[event.category];
    return { style: { backgroundColor: bg, borderColor: bg } };
  };

  return (
    <div style={{ height: 600, padding: '1em' }}>
      <Calendar
        localizer={localizer}

        events={date}

        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"

        // 툴바 전체를 CustomToolbar 로 교체 (버튼 없이 label만 렌더링)
        components={{ toolbar: CustomToolbar }}

        // 한국어로 메시지도 한글로 교체 (툴바 버튼을 쓰지 않을 경우만 필요)
        messages={{
          today:    '오늘',
          previous: '이전',
          next:     '다음',
          month:    '월',
          week:     '주',
          day:      '일',
          agenda:   '목록'
        }}

        // 이벤트 객체에서 start/end/title 외에
        // event.category로 스타일을 분기하기 위한 prop getter
        eventPropGetter={getEventStyle}
        
        defaultView="month"
        // 주, 일 버튼이 필요없으므로 ['month', 'week', 'day'] 대신 ['month'] 
        views={['month']}

        // 툴팁 팝업이 필요하면 활성화
        popup={true}
        // 버튼 안보이게 하기, toolbar={false}
      />
    </div>
  );

  // return (
  //   <>
  //   <div className='calendarCon'>
  //     <div className='printCal'>

  //     </div>
  //   </div>
  //   </>
  // );
};

export default MyCalendar;