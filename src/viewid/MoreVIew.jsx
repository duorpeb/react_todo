import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import axios from 'axios';
import './moreView.css';

const MoreVIew = () => {
  // useState()
  const [ view, setView ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ err, setError ] = useState(null);
  const { id } = useParams();

  const getViewId = async() => {
    try {
      const res = await axios.get(`/view/${id}`);
      console.log(res.data[0]);

      setView(res.data[0]);
    } catch (err) {
      console.log('getViewId Error..!');
      setError(err);
    } finally {
      setLoading(false);
    }  
  }

  // 삭제 
  const onDelete = async() => {
    const res = await axios.get(`/delete/${id}`);
    window.location.href = '/';
  }

  // useEffect(), 마운트 될 때 한 번만 실행 
  useEffect(() => {
    getViewId();
  }, [])

  // useState() 처리 
  if (loading) return <p>로딩 중…</p>;
  if (err)   return <p>데이터를 불러오는 중 에러가 발생했습니다.</p>;


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

  const { tmpCategory, bgc, bdc, color} = tdBadgeSet(view.CATEGORY);

  return (
    <>
    <div className="viewConDiv">
      <div 
        className='txtBox'>
        <div className="txtBoxCate">
          <h2 style = {{
            backgroundColor : bgc,
            borderColor : bdc,
            color : color
          }}>
            {tmpCategory}
          </h2>
        </div>
        
        <div 
          className='txtBoxCon'
          style = {{
            backgroundColor : bgc,
            borderColor : bdc
          }}>
          <div 
            className='txtBoxTit'
            style = {{
              borderColor : bgc
            }}>
            제목 : {view.TITLE}
          </div>

          <div className='txtBoxCont'>
             <p>상세내용</p>
             <p>{view.CONTENTS}</p>
          </div>

          <div className='txtBoxDate'>
            기간 : {view.DATE} 
          </div>
        </div>

        <div className='txtBoxBtn'>
          <Link to={`/update/${view.ID}`}>
            <button>
              <FiEdit size = {30}/>
            </button>
          </Link>
        
          {/* <Link to = {`/delete/${view.ID}`}></Link> */}
          <button onClick = {onDelete}>
            <GoTrash size = {30}/>
          </button>
        </div>

      </div>
    </div>
    </>
  );
};

export default MoreVIew;