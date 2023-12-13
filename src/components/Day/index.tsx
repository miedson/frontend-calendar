import "./day.css";
import Event from "../../entities/Event";
import { MouseEvent } from "react";

const getColorsEvents = (events: Event[]) => {
  const colors = events.map(event => event.color);
  const uniqueColors = colors.filter((color, index) => colors.indexOf(color) === index && colors.length > 0)
  return uniqueColors;
}

function Day({date, firstDayOfMonth, events, eventModal, updateStateDataModal}: PropsCalendarDay) {
  const classNameList = [];
  let text = '';
  const colors = getColorsEvents(events);
  if(events.length > 0) {
    classNameList.push('event');
    events.forEach(event => text += `${event.type_event} ${event.classification} ${event.title}\n`);
  }
  (date < firstDayOfMonth) ? classNameList.push('day-month-previous') : '';
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLButtonElement;
      if(target.classList.contains("day-month-previous")){
        return;
      }
    eventModal();
    updateStateDataModal({date, events});
  }
    const classNames = classNameList.join(' ');
    const style = {
      borderColor: colors[0] ?? '',
      borderStyle: colors[0] ? 'solid' : 'none',
      borderRadius: colors[0] ? '.4rem' : 0,
    };
  return (
    <div className={classNames} onClick={handleClick} data-tooltip={text} style={style}>{date.getDate()}</div>
  )
}

type PropsCalendarDay = {
    date : Date,
    firstDayOfMonth: Date,
    events: Event[];
    eventModal: () => void
    updateStateDataModal: (newState: any) => void
}

export default Day;