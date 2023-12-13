import './card-month.css';
import ComponentDay from '../Day';
import { v4 as uuidv4 } from 'uuid';
import Month from '../../entities/Month';
import Day from '../../entities/Day';

function CardMonth({month, daysOfWeek, eventModal, updateStateDataModal}: PropsCardMonth) {
  return (
      <section className='card-month'>
        <h1>{month.description}</h1>
        <div className="card-month-header">
              {daysOfWeek.map((day, index) => (
                <div key={index}>{day}</div>
              ))}
        </div>
        <div className="card-month-body">
          {
            month.days.map((day: Day) => (
              <ComponentDay key={uuidv4()} date={new Date(day.date)} firstDayOfMonth={new Date(month.firstDayOfMonth)} events={day.events} eventModal={eventModal} updateStateDataModal={updateStateDataModal} />
            ))
          }
        </div>
      </section>
    );
  }

  type PropsCardMonth = {
    month: Month,
    daysOfWeek: string[],
    eventModal: () => void,
    updateStateDataModal: (newState: any) => void,
  }

  type Event = {
    title: string,
    description: string
  }
  
  export default CardMonth;