import React from 'react';

const statusMap = {
  approved: '/assets/img/check-circle.svg#check-circle',
  review: '/assets/img/clock.svg#clock',
  bell: '/assets/img/bell.svg#bell',
  slashBell: '/assets/img/bell-slash.svg#bell-slash',
  edit: '/assets/img/pencil-square.svg#pencil-square',
  create: '/assets/img/plus-circle.svg#plus-circle',
  cash: '/assets/img/cash-stack.svg#cash-stack',
  download: '/assets/img/download.svg#download',
  funnel: '/assets/img/funnel.svg#funnel',
}

const Icon = ({icon, color, className, style}) => {
  const logo = statusMap[icon];
  return (
    <svg className={`${className} bi-icon`} style={{...style, height: '16px', width: '16px', background: color}}>
      <use href={logo}></use>
    </svg>
  );
};

export default Icon;