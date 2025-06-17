import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import './css/initPrint.css';
import axios from 'axios';
import '../shared/jsx/TdBadgeSet';
import { RefreshContext } from '../RefeshContext';

// import TdBadgeSet from '../shared/jsx/TdBadgeSet';

const InitPrint = () => {
  // useContext()
  const { refresh } = useContext(RefreshContext);

  // useState 초기화
  const [toDoDb, setToDoDb] = useState([]); // 오늘의 일정 
  const [mustToDo, setMustToDo] = useState([]); // 해야 할 일 
  const [loading, setLoading] = useState(true); // 로딩 상태 체크
  const [error, setError] = useState(null); // 에러 상태 체크
  const [flag, setFlag] = useState({}); // 할 일 완료 


  // getTodaySch() - 오늘의 일정 불러오는 메소드 
  const getTodaySch = async () => {
    try {
      const res = await axios.get('/todaysch');
      setToDoDb(res.data);
    } catch (err) {
      console.error(err); console.log('getTodaySch Error..!');
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  // getMustToDo() - 해야 할 일 불러오는 메소드 
  const getMustToDo = async() => {
    try{
      const res = await axios.get('/must');
      setMustToDo(res.data);
    } catch(err){
      console.log(err); console.log('getMustToDo Error..!'); 
    } finally {
      setLoading(false);
    }
  }

  // 렌더링 될 때마다, 오늘의 일정 출력
  useEffect(() => { getTodaySch(); getMustToDo(); }, [refresh]);

  // useState() 처리 
  if (loading) return <p>로딩 중…</p>;
  if (error)   return <p>데이터를 불러오는 중 에러가 발생했습니다.</p>;
  if (toDoDb.length === 0) return <p>오늘의 일정이 없습니다.</p>;


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
      
      case 'wish' : 
        tmpCategory = '하고 싶은 일'; bgc = '#e0227b20'; 
        bdc = '#e0227b'; color = '#e0227b';
        break;
    }

    return { tmpCategory, bgc, bdc, color } ;
  }


  // toggleFlag() - 취소선을 긋는 메소드
  const toggleFlag = (id) => {
    setFlag({
      ...flag,
      [id] : !flag[id]
    });
  };


  // toggleFlagtoMust() 
  const toggleFlagMust = (id) => {
    setFlag({
      ...flag,
      [id] : !flag[id]
    });
  };


  // return
  return (
    <>
      <div className='todayTodoPrint'>
        <div className='tdpRight'> 
          <h2>오늘의 일정</h2>
          { // map 의 요소에 함수를 사용할 때, toDoDb.map (v => { return(); })  
            toDoDb.map(v => {
              // const { tmpCategory, bgc, bdc, color } = <TdBadgeSet userCategory = {v.category} />
              const { tmpCategory, bgc, bdc, color } = tdBadgeSet(v.category);
              const isDoneTdTxt = flag[v.id]; // 완료 확인

              return (
                <div 
                  key = {v.id}
                  className='tdSchContDiv'>
                  <div
                    className='tdBadge'
                    
                    // 요소가 여러 개인 경우 {} 
                    style = {{
                        // 하이픈이 아닌 대문자
                        backgroundColor : bgc,
                        borderColor : bdc
                      }
                    }
                  >

                  <Link 
                    to = {`/detailcategory/${v.category}`}
                    style = { { color : color } } 
                  >
                    {tmpCategory}
                  </Link>
                </div> 

                <div
                  key = {v.id} 
                  className='tdTxt'
                  style = {{
                    textDecoration : isDoneTdTxt ? 'line-through' : 'none',
                    // 취소선의 색상
                    textDecorationColor: isDoneTdTxt ? 'rgba(0, 0, 0, 0.6)' : 'none',
                    // 취소선 두께 
                    textDecorationThickness: isDoneTdTxt ? '4px' : 'none'
                  }}>
                  <Link to = {`view/${v.id}`}>{v.title}</Link>
                  <button 
                    id = 'tdTxtBtn'
                    // Too many re-renders
                     // onClick={toggleFlag(v.id)} 로 작성하면 렌더링 마다 
                     // toggleFlag 가 즉시 실행되면서 setFlag 가 호출 
                     // 그러면 상태가 바뀌면서 컴포넌트가 또 리렌더 되고 다시 
                     // toggleFlag 를 호출 
                    
                    // 클릭 시에만 실행되도록 함수 참조만 넘기기 
                    onClick = {() => toggleFlag(v.id)}>
                      <FaCheck size = {20} />
                  </button>
                </div> 
              </div>
              );
            })
          }
        </div>  { /* fin tdpRight */}

        <div className='tdpLeft'> 
          <h2>해야 할 일</h2>

          <div className='mustToOoDiv'>
            {
              mustToDo.map(v => {
                const isDoneMtdTit = flag[v.id];
              
                return (
                <>
                <div 
                  className ='mtdTitDiv'
                  style = {{
                    // ch 단위는 글자 하나에 해당하는 너비
                    width : `${v.title.length + 2}ch`,
                    textDecoration : isDoneMtdTit ? 'line-through' : 'none'
                  }}> 
                  <Link to = {`/detailcategory/must`}>{v.title}</Link>  
                </div>
                
                  { 
                    // ? 를 사용하면 옵셔널 체이닝 (조건을 만족할 때, 호출할 메소드) 를 
                    // 활용할 수도 있음 
                    v.contents && (
                      <div 
                        key = {v.id}
                        className='mtdContDiv'
                        style={{
                          // 취소선의 유무
                          textDecoration : isDoneMtdTit ? 'line-through' : 'none',
                          // 취소선의 색상
                          textDecorationColor: isDoneMtdTit ? 'rgba(0, 0, 0, 0.6)' : 'none',
                          // 취소선 두께 
                          textDecorationThickness: isDoneMtdTit ? '4px' : 'none'
                        }}>
                        <Link to = {`view/${v.id}`}>{v.contents}</Link>
                      </div>
                    )
                  }

                  {
                    !v.contents && (
                      <>
                      <div 
                        className='mtdContDiv'
                        style={{
                          // 취소선의 유무
                          textDecoration : isDoneMtdTit ? 'line-through' : 'none',
                          // 취소선의 색상
                          textDecorationColor: isDoneMtdTit ? 'rgba(0, 0, 0, 0.6)' : 'none',
                          // 취소선 두께 
                          textDecorationThickness: isDoneMtdTit ? '4px' : 'none'
                        }}>

                        <Link to = {`view/${v.id}`}>
                          상세 사항이 없습니다! 
                        </Link>

                        <button 
                          id = 'mtdContBtn'
                          onClick = {() => toggleFlag(v.id)}>
                          
                          <FaCheck size = {20} />
                        </button>
                      </div>
                      </>
                    )
                  }
                </>
                ) // return fin
              })
            }
          </div>

        </div>  
      </div>


      {/* div 1 */}
      <div className='initPrintFirLine'>
        <div className='categoryTit'>
          카테고리 별 조회/추가/수정 
        </div>
      </div>

      <div className='allCategory'>
        <div className = 'initPrintSecLine'>
          <div className='studyDiv'>
            <Link>공부</Link>
          </div>

          <div className='testDiv'>
            <Link>시험</Link>
          </div>

          <div className='meetDiv'>
            <Link>약속</Link>
          </div>
        </div>

        <div className = 'initPrintThiLine'>
          <div className='taskDiv'>
            <Link>업무</Link>
          </div>

          <div className='tripDiv'>
            <Link>여행</Link>
          </div>

          <div className='exerciseDiv'>
            <Link>운동</Link>
          </div>
        </div>


        <div className = 'initPrintFourLine'>
          <div className='hobbyDiv'>
            <Link>취미/여가</Link>
          </div>

          <div className='mustDiv'>
            <Link>해야 할 일</Link>
          </div>

          <div className='wishDiv'>
            <Link>하고 싶은 일</Link>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default InitPrint;