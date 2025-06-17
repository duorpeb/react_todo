// KoreanDatePicker.jsx
import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

// 1) date-fns 의 ko 로케일을 “ko”라는 이름으로 등록
registerLocale('ko', ko);

export default function KoreanDatePicker() {
  // 단일 날짜 예시. 범위 선택도 동일하게 처리할 수 있습니다.
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePicker
      // 2) 한글 로케일 적용 (위에서 registerLocale 한 “ko”를 참조)
      locale="ko"

      // 3) 날짜 포맷: YYYY-MM-DD
      dateFormat="yyyy-MM-dd"

      // // 4) 선택된 날짜와 바뀔 때 호출될 핸들러
      // selected={selectedDate}
      // onChange={date => setSelectedDate(date)}

      // 5) 커스텀 헤더로 이전/다음 버튼과 연/월 드롭다운, “년”/“월” 텍스트 붙이기
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        changeYear,
        changeMonth
      }) => (
        <div style={{
          margin: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            이전 달
          </button>
          <select
            value={format(date, 'yyyy', { locale: ko })}
            onChange={e => changeYear(+e.target.value)}
          >
            {Array.from({ length: 20 }, (_, i) => {
              const y = new Date().getFullYear() - 10 + i;
              return <option key={y} value={y}>{y}년</option>;
            })}
          </select>
          <select
            value={format(date, 'M', { locale: ko })}
            onChange={e => changeMonth(e.target.value - 1)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}월
              </option>
            ))}
          </select>
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            다음 달
          </button>
        </div>
      )}

      // 6) 주/요일 이름도 자동으로 한글(일·월·화…)로 표시됩니다
      //    (ko 로케일이 적용되므로 별도 설정 불필요)

      // 7) 초기화 버튼
      isClearable
      placeholderText="날짜 선택"
    />
  );
}
