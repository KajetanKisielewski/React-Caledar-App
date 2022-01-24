import { v4 as uuid } from 'uuid';

const daysNames = [
  { dayName: 'Mon', key: uuid() },
  { dayName: 'Tue', key: uuid() },
  { dayName: 'Wen', key: uuid() },
  { dayName: 'Thu', key: uuid() },
  { dayName: 'Fri', key: uuid() },
  { dayName: 'Sat', key: uuid() },
  { dayName: 'Sun', key: uuid() }
]

const monthsNames = [
  { monthName: 'January'},
  { monthName: 'February'},
  { monthName: 'March'},
  { monthName: 'April'},
  { monthName: 'May'},
  { monthName: 'June'},
  { monthName: 'July'},
  { monthName: 'August'},
  { monthName: 'September'},
  { monthName: 'October'},
  { monthName: 'November'},
  { monthName: 'December'},
]

const dateData = {
  daysNames: daysNames,
  monthsNames: monthsNames,
}

export default dateData;
