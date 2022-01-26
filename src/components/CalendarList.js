import React from 'react'

export default class CalendarList extends React.Component {
    render() {
        return(

            <div className='meetings__selected'>
                <header className='meetings__selected--header'>
                    { this.renderTitle() }
                </header>
                <main className='meetings__selected--main'>
                    <div className='main__meetings--list'>
                        { this.renderMeetingsList() }
                    </div>
                </main>
            </div>
        )
    }

    // renderMeetingsForCurrentDay = () => {
    //     const { currentDayMeeting } = this.props.currentDayMeetings;

    //     if(currentDayMeeting !== undefined && currentDayMeeting !== '') {

    //         return currentDayMeeting.map( meeting => {

    //             return(
    //                 <div
    //                     className='meeting__selected--currentMeeting'
    //                     key={meeting.date}
    //                 >
    //                     <p
    //                         className='currentMeeting--date'
    //                     >
    //                         You have an appointment scheduled for today at {meeting.time}</p>
    //                     <p
    //                         className='currentMeeting--date'
    //                     >
    //                         You have a meeting with {meeting.firstName}{meeting.lastName}</p>
    //                     <a
    //                         className='currentMeeting--email'
    //                         href={`mailto:${meeting.email}`}
    //                     >
    //                         {meeting.email}
    //                     </a>
    //                     <button
    //                         className='meeting__selected--button'
    //                         onClick={ () => this.removeMeeting(meeting.id)} >
    //                     >
    //                         remove meeting
    //                     </button>
    //                 </div>
    //             )
    //         })
    //     }
    // }

    // renderMeetingsForSelectedDay = () => {
    //     const selectedMeetings = this.props.selectedMeetings;

    //     if(selectedMeetings) {
    //         return selectedMeetings.map( meeting => {
    //             return(
    //                 <div
    //                     className='meeting__selected--selectedMeeting'
    //                     key={ `${meeting.date}-selected`}
    //                 >
    //                     <p
    //                         className='selectedMeeting--date'
    //                     >
    //                         You have an appointment scheduled for {meeting.selectedDay} at {meeting.time}</p>
    //                     <p
    //                         className='selectedMeeting--date'
    //                     >
    //                         You have a meeting with {meeting.firstName}{meeting.lastName}</p>
    //                     <a
    //                         className='selectedMeeting--email'
    //                         href={`mailto:${meeting.email}`}
    //                     >
    //                         {meeting.email}
    //                     </a>
    //                     <button
    //                         className='meeting__selected--button'
    //                         onClick={ () => this.removeMeeting(meeting.id)}
    //                     >
    //                         remove meeting
    //                     </button>
    //                 </div>
    //             )
    //         })
    //     }
    // }


    renderMeetingsList = () => {
        const meetings = this.props.meetings;

        if(meetings) {
            return meetings.map( meeting => {
                return(
                    <div
                        className='meetings__list--meeting'
                        key={ `${meeting.date}--list` }
                    >
                        <p
                            className='list__meeting--date'
                        >
                            You have an appointment scheduled for {meeting.date} at {meeting.time}</p>
                        <p
                            className='list__meeting--date'
                        >
                            You have a meeting with {meeting.firstName} {meeting.lastName}</p>
                        <a
                            className='list__meeting--email'
                            href={`mailto:${meeting.email}`}
                        >
                            {meeting.firstName} {meeting.lastName} email:<span className='email__highlight'> {meeting.email} </span>
                        </a>
                        <button
                            className='list__meeting--button'
                            onClick={ () => this.removeMeeting(meeting.id)}
                        >
                            Remove Meeting
                        </button>
                    </div>
                )
            })
        }
    }

    removeMeeting(id) {
        this.props.removeMeeting(id)
    }

    renderTitle = () => {
        return(
            <h2 className='meetings__selected--title'>
                { this.getTitle() }
            </h2>
        )
    }

    getTitle = () => {

        return 'Appointments List'

        // const selectedDayMeeting =  this.props.selectedMeetings[0]
        // const selectedDay = this.props.selectedMeetings[1];
        // const currentDayMeeting =  this.props.currentDayMeetings[0];
        // const currentDay = this.props.currentDayMeetings[1];

        // console.log(selectedDayMeeting);
        // console.log(selectedDay)
        // console.log(currentDayMeeting);
        // console.log(currentDay)

        // if( selectedDay === undefined ) {
        //     if( currentDayMeeting === '' ) { return 'You do not have meetings scheduled for today' }
        //     return `Your appointments for Today ${currentDay}`
        // } else {
        //     if( selectedDayMeeting === '' ) { return `You do not have meetings scheduled for ${selectedDay}`}
        //     return `Your appointments for ${selectedDay}`
        // }

        // return selectedDay === undefined ?
        //     currentDayMeeting === '' ? 'You do not have meetings scheduled for today' : `Your appointments for Today ${currentDay}`
        //     :
        //     selectedDayMeeting === '' ? `You do not have meetings scheduled for ${selectedDay}` : `Your appointments for ${selectedDay}`
    }




}