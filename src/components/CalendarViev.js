import React from 'react'

export default class CalendarViev extends React.Component {

    render() {
        return(
            <section className='main__section--calendarViev'>
                <header className='calendarViev__header'>
                    <i
                       onClick={ (e) => this.handleNavClick(e) }
                       className='calendarViev__navigation fas fa-arrow-left'
                    ></i>
                    <div className='calendarViev__title'>
                       { this.renderMonthName() }
                       { this.renderCurrentData() }
                    </div>
                    <i
                       onClick={ (e) => this.handleNavClick(e) }
                       className='calendarViev__navigation fas fa-arrow-right'
                    ></i>
                </header>
                <div className='calendarViev__days--names'> { this.renderDaysNames() } </div>
                <div className='calendarViev__days--numbers'> { this.renderNumberOfDays() } </div>
            </section>
        )
    }


    handleNavClick = (e) => {
        const { date , setDate } = this.props;
        e.target.className.includes('fa-arrow-left') ? setDate( date.setMonth(date.getMonth() - 1 ) ) : setDate( date.setMonth(date.getMonth() + 1 ) )
    }

    handleDayClick = (e) => {
        const { meetings, setSelectedMeetings } = this.props;

        const meetingData = []

        meetings.forEach ( meeting => {
            if( meeting.date === e.target.dataset.date ) {
                const data = { meeting: meeting, date: e.target.dataset.date }
                meetingData.push(data)
            }
        })

        setSelectedMeetings(meetingData)
    }

    renderDaysNames = () => {
        const { dateData: { daysNames } } = this.props;

        return daysNames.map( day => {
            const { dayName , key } = day

            return(
                <span
                    className='calendarViev__day--name'
                    key={key}
                >
                    {dayName}
                </span>
            )
        })
    }

    renderMonthName = () => {
        const { dateData: { monthsNames } } = this.props;
        const currentDate = this.props.date
        const currentMonth = currentDate.getMonth();

        return(
            <h2
                className='calendarViev__month'
            >
                { monthsNames[currentMonth].monthName }
            </h2>
        )
    }

    renderCurrentData = () => {
        const currentDate = this.props.date
        const fullDate = currentDate.toDateString()

        return(
            <p
                className='calendarViev__fullDate'
            >
                { fullDate }
            </p>
        )
    }

    renderNumberOfDays = () => {
        const currentDate = this.props.date

        return [
            this.renderPrevMonthDays(currentDate),
            this.renderCurrentMonthDays(currentDate),
            this.renderNextMonthDays(currentDate)
        ]

    }

    meetingNotification = (dayDate) => {
        const { meetings } = this.props;
        const meetingNotification = []

        meetings.forEach( meeting => {
            if( meeting.date === dayDate ) {
                const icon = String.fromCodePoint(10029)
                meetingNotification.push( icon )
            }
        })
        return meetingNotification[0]
    }

    renderCurrentMonthDays = (currentDate) => {
        const currentMonthDays = this.getCurrentMonthDays(currentDate);

        return currentMonthDays.map( day => {

            const { dayNumber, fullDate } = day;
            const meetingNotification = this.meetingNotification(fullDate)


            if( this.highlightToday(currentDate, dayNumber) ) {
                return(
                    <span
                        className='calendarViev__day--number day__number--current today'
                        key={fullDate}
                        data-date={fullDate}
                        data-meeting={meetingNotification}
                        onClick={ (e) => this.handleDayClick(e) }
                    >
                        {dayNumber}
                    </span>
                )
            }
            return(
                <span
                    className='calendarViev__day--number day__number--current'
                    key={fullDate}
                    data-date={fullDate}
                    data-meeting={meetingNotification}
                    onClick={ (e) => this.handleDayClick(e) }
                >
                    {dayNumber}
                </span>
            )
        })
    }

    renderPrevMonthDays = (currentDate) => {
        const prevMonthDays = this.getPrevMonthDays(currentDate);

        return prevMonthDays.map( day=> {
            const { dayNumber, fullDate } = day;
            const meetingNotification = this.meetingNotification(fullDate)

            return(
                <span
                    className='calendarViev__day--number day__number--prev'
                    key={fullDate}
                    data-date={fullDate}
                    data-meeting={meetingNotification}
                    onClick={ (e) => this.handleDayClick(e) }
                >
                    {dayNumber}
                </span>
            )
        })
    }

    renderNextMonthDays = (currentDate) => {
        const nextMonthDays = this.getNextMonthDays(currentDate);

        return nextMonthDays.map( day => {
            const { dayNumber, fullDate } = day;
            const meetingNotification = this.meetingNotification(fullDate)

            return(
                <span
                    className='calendarViev__day--number day__number--next'
                    key={fullDate}
                    data-date={fullDate}
                    data-meeting={meetingNotification}
                    onClick={ (e) => this.handleDayClick(e) }
                >
                    {dayNumber}
                </span>
            )
        })
    }

    getCurrentMonthDays = (currentDate) => {
        const numberOfCurrentMonthDays = this.getNumberOfMonthDays(currentDate , 1)
        const daysOfTheCurrentMonth = [];

        for(let i=1; i<=numberOfCurrentMonthDays; i++) {
            const dayData = this.setDayData(i , currentDate, 0)
            daysOfTheCurrentMonth.push(dayData);
        };

        return daysOfTheCurrentMonth;
    }


    getPrevMonthDays = (currentDate) => {
        const numberOfPrevMonthDays = this.getNumberOfMonthDays(currentDate, 0)
        const indexOfCurrentDay = this.getIndexOfFirstDayInMonth(currentDate)
        const daysofThePrevMonth = [];

        for(let i=indexOfCurrentDay; i>0; i--) {

            const index = parseInt(`${numberOfPrevMonthDays - i + 1}`);
            const dayData = this.setDayData(index, currentDate , -1)

            daysofThePrevMonth.push(dayData);
        };
        return daysofThePrevMonth;
    }

    getNextMonthDays = (currentDate) => {
        const daysInTheWeek = 7;
        const indexOfLastDayInMounth = this.getIndexOfLastDayInMounth(currentDate);
        const nextMonthDays = `${ daysInTheWeek - indexOfLastDayInMounth}`;
        const daysOfTheNextMonth = [];

        for(let i=1; i<= nextMonthDays; i++) {
            const dayData = this.setDayData(i , currentDate, 1)
            daysOfTheNextMonth.push(dayData);
        };

        return daysOfTheNextMonth;
    }

    setDayData = (index, date, value) => {
        const dayData = {
            dayNumber: index,
            fullDate: this.getFullDateForThisDay(index , date, value)
        }
        return dayData
    }

    getFullDateForThisDay = (day , date, value) => {

        if( `${value}` === `${0}` ) {
            const formattedDate = new Date( date.getFullYear(), date.getMonth(), day + 1 ).toISOString().split('T')[0];
            return formattedDate;
        } else if( `${value}` === `${-1}` ) {
            const formattedDate = new Date( date.getFullYear(), date.getMonth() - 1, day + 1 ).toISOString().split('T')[0];
            return formattedDate;
        } else if( `${value}` === `${1}`) {
            const formattedDate = new Date( date.getFullYear(), date.getMonth() + 1, day + 1 ).toISOString().split('T')[0];
            return formattedDate;
        }
    }

    highlightToday = (currentDate, day) => {
        if( day === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() ) { return true }
    }

    getNumberOfMonthDays = (currentDate , value) => {
        const numberOfMonthDays = new Date( currentDate.getFullYear(), currentDate.getMonth() + value, 0).getDate();
        return numberOfMonthDays;
    }

    getIndexOfFirstDayInMonth = (currentDate) => {
        const firstDayInCurrentMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(), 1)
        return firstDayInCurrentMonth.getDay() ? firstDayInCurrentMonth.getDay() - 1 : 6;
    }

    getIndexOfLastDayInMounth = (currentDate) => {
        const lastDayInCurrentMonth = new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();
        return lastDayInCurrentMonth;
    }
}