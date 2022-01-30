import React from 'react'
import ListItem from '../ListItem';

export default class CalendarList extends React.Component {
    render() {
        return(

            <div className='meetings__container'>
                <header className='meetings__container--header'>
                    { this.renderTitle() }
                </header>
                <main className='meetings__container--main'>

                    <div className='main__meetings--currentDay'>
                        { this.renderMeetings() }
                    </div>

                    <h2 className='meetings__list--title'>appointments list</h2>
                    <div className='main__meetings--list'>
                        { this.renderAllMeetingsList() }
                    </div>

                </main>
            </div>
        )
    }


    renderMeetings = () => {
        const { selectedMeetings } = this.props

        return selectedMeetings.length === 0 ? this.renderMeetingsForCurrentDay() : this.renderMeetingsForSelectedDay()
    }

    renderMeetingsForCurrentDay = () => {
        const { currentDayMeetings, removeMeeting } = this.props

        if( currentDayMeetings.length !== 0 ) {
            return currentDayMeetings.map( dayMeeting => {
                const { meeting: { id , date, time, firstName, lastName, email } } = dayMeeting

                return <ListItem key={ `${id}--currentDayMeeting`} date={date} time={time} firstName={firstName} lastName={lastName} email={email} className={'currentDayMeeting'} id={id} removeMeeting={removeMeeting} />
            })
        }
    }

    renderMeetingsForSelectedDay = () => {
        const { selectedMeetings, removeMeeting } = this.props;

        return selectedMeetings.map( selectedMeeting => {
            const { meeting: { id , date, time, firstName, lastName, email } } = selectedMeeting
            return <ListItem key={ `${id}--selectedDayMeeting`} date={date} time={time} firstName={firstName} lastName={lastName} email={email} className={'selectedDayMeeting'} id={id} removeMeeting={removeMeeting}  />
        })
    }


    renderAllMeetingsList = () => {
        const { meetings , removeMeeting } = this.props;
        return meetings.map( meeting => {
            return <ListItem key={ `${meeting.id}--allMeetings`} date={meeting.date} time={meeting.time} firstName={meeting.firstName} lastName={meeting.lastName} email={meeting.email} className={'allMeetings'} id={meeting.id} removeMeeting={removeMeeting}/>
        })
    }

    renderTitle = () => {
        return(
            <h2 className='meetings__container--title'>
                { this.getTitle() }
            </h2>
        )
    }

    getTitle = () => {
        const { selectedMeetings } = this.props

        return selectedMeetings.length === 0 ? this.renderTitleForCurrentDay() : this.renderTitleForSelectedDay();
    }

    renderTitleForSelectedDay = () => {
        const { selectedMeetings } = this.props

        const selectedDayDate = selectedMeetings.map( selectedMeeting => {
            const { meeting: { date } } = selectedMeeting;
            return date;
        })

        return `Your appointments for ${selectedDayDate[0]}`;
    }

    renderTitleForCurrentDay = () => {

        const { currentDayMeetings } = this.props;

        const currentDayDate = currentDayMeetings.map( dayMeeting => {
            const { meeting: { date } } = dayMeeting;
            return date;
        })

        return currentDayMeetings.length === 0 ? 'You do not have meetings scheduled for today' : `Your appointments for Today( ${currentDayDate[0]} )`;
    }




}