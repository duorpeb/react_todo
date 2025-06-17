import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './list.css';

const List = () => {
  const [loading, setLoading] = useState(true); // 로딩 상태 체크
  const [error, setError] = useState(null); // 에러 상태 체크
  const [allToDo, setAllToDo] = useState([]); // db
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  // server.js 로 axios.get('/printlist') 요청 보내기
  const getAllToDo = async () => {
    try {
      const res = await axios.get('/printlist', {
        params : { page : currentPage, pageSize }
      });
      console.log('a');
      console.log(res.data.data);
      setAllToDo(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err); console.log('getAllToDo Error..!');
      setError(err);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => { getAllToDo(); }, [currentPage]);

  if (loading) return <p>로딩 중…</p>;
  if (error)   return <p>데이터를 불러오는 중 에러가 발생했습니다.</p>;

  const pageCount = Math.ceil(total / pageSize); 

  // tdBadgeSet() - tdBadge 의 css 를 결정하는 메소드 
  const tdBadgeSet = (userCategory) => {
    let tmpCategory = ''; let bgc = ''; 
    let bdc = ''; let color = '';

    switch(userCategory){
      case 'study' : 
        tmpCategory = '공부'; bgc = '#de838320'; 
        bdc = '#de8383'; color = '#de8383';
        break;
      
      case 'test' :
        tmpCategory = '시험'; bgc = '#f5BE2620'; 
        bdc = '#f5BE26'; color = '#f5BE26';
        break;

      case 'meeting' : 
        tmpCategory = '약속'; bgc = '#83b4de20'; 
        bdc = '#83b4de'; color = '#83b4de';
        break;

      case 'task' : 
        tmpCategory = '업무'; bgc = '#a391d220'; 
        bdc = '#a391d2'; color = '#a391d2';
        break;

      case 'trip' : 
        tmpCategory = '여행'; bgc = '#9dd3d320'; 
        bdc = '#9dd3d3'; color = '#9dd3d3';
        break;

      case 'exercise' :
        tmpCategory = '운동'; bgc = '#f3600b20'; 
        bdc = '#f3600b'; color = '#f3600b';
        break;
      
      case 'hobby' :
        tmpCategory = '취미/여가'; bgc = '#c27fbb20'; 
        bdc = '#c27fbb'; color = '#c27fbb';
        break;
      
      case 'must' : 
        tmpCategory = '해야 할 일'; bgc = '#60d8a020'; 
        bdc = '#60d8a0'; color = '#60d8a0';
        break;

      case 'wish' : 
        tmpCategory = '하고 싶은 일'; bgc = '#e0227b20'; 
        bdc = '#e0227b'; color = '#e0227b';
        break;
    }

    return { tmpCategory, bgc, bdc, color } ;
  }

  return (
    <>
    <div className="listCon">
        {
          allToDo.map(v => {
            let { tmpCategory, bgc, bdc, color } = tdBadgeSet(v.CATEGORY); 
            
            return(
              <div 
              key={v.id}
              className='todoDiv'>
                {/* 원하는 출력 */}
                {/* MySQL에서 SELECT * 를 쓰면 드라이버가 반환하는 객체 키는 
                테이블에 정의된 컬럼명 그대로 (TITLE, CONTENTS 등)일 수 있으며
                JavaScript 는 대/소문자를 구분하기 때문에 v.title 은 v.TITLE 과 다릅 */}
                <div 
                  className='vCate'
                  style = {{
                    fontSize : '12px',
                    backgroundColor : bgc,
                    borderColor : bdc,
                    color : color
                  }}>
                  {tmpCategory}
                </div>
                
                <div className='vTit'>
                  {v.TITLE} ｜
                  {
                    v.CONTENTS && (<p>v.CONTENTS</p>)
                  }  

                  {
                    !v.CONTETNS && (
                      <>
                        <p>상세 사항이 없습니다..!</p>
                      </>
                    )
                  }
                </div>  
                
                <div className='vCont'>
                  
                </div>
              </div>
            );
          })
        }
      

      {/* 페이징 컨트롤 */}
      <div className="paginationDiv">
        <button 
          id = 'prevBtn'
          onClick={() => setCurrentPage(p => Math.max(1, p-1))}
          disabled={currentPage===1}
        >
          이전
        </button>

        {Array.from({ length: pageCount }, (_, i) => (
          <button
            id = 'curBtn'
            key={i+1}
            className={currentPage===i+1 ? 'active' : ''}
            onClick={() => setCurrentPage(i+1)}
          >
            {i+1}
          </button>
        ))}

        <button
          id = 'nextBtn'
          onClick={() => setCurrentPage(p => Math.min(pageCount, p+1))}
          disabled={currentPage===pageCount}
        >
          다음
        </button>
      </div>
    </div>
    </>
  );
};

export default List;