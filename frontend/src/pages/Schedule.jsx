import React, {useContext} from 'react';
import ScheduleTable from "../components/ScheduleTable.jsx";
import TableHeader from "../components/TableHeader.jsx";
import TableFilter from "../components/TableFilter.jsx";
import {Card} from "react-bootstrap";
import {Context} from "../components/ContextProvider.jsx";
import "../styles/table.scss";
import classNames from "classnames";

const Schedule = () => {
  const {device: {isMobile}} = useContext(Context);

  return (
    <div className={classNames(
      'd-flex',
      'h-100',
      {'w-100': isMobile}
    )}>
      {
        !isMobile && <TableFilter/>
      }
      <Card className={classNames(
        'shadow',
        'h-100',
        {
          'w-100': isMobile,
          'mx-3': isMobile
        }
        )}>
        <Card.Header>
          <TableHeader />
        </Card.Header>
        <Card.Body className={classNames(
          'h-100',
          {
            'w-100': isMobile,
            'overflow-auto': isMobile,
          }
          )}>
          <ScheduleTable isMobile={isMobile}/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Schedule;