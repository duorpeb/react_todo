import React from 'react';


// TdBadgeSet() - tdBadge 의 css 를 결정하는 메소드 
const TdBadgeSet = (userCategory) => {
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
};


export default TdBadgeSet;