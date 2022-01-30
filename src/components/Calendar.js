import React from 'react';

import CalendarList from './CalendarList';
import CalendarViev from './CalendarViev';
import CaledarForm from './CalendarForm'

import Api from '../providers/Api'
import formFieldsData from './../providers/formFieldsData'
import dateData from './../providers/dateData'

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.api = new Api();
    }

    state = {
        meetings: [],
        date: new Date(),
        selectedMeetings: [],
        currentDayMeetings: []
    }


    render() {
        return(
            <div className='calendar__app'>
                <header className='calendar__app--header'>
                    <h1 className='header__title'>Welcome to the meeting planner app</h1>
                </header>
                <main className='calendar__app--main'>
                        <CaledarForm formFields={formFieldsData} onSubmit={this.addMeeting} />
                        <CalendarViev date={this.state.date} dateData={dateData} meetings={this.state.meetings} setSelectedMeetings={this.setStateOfSelectedMeeting}  setDate={this.setStateOfDate}/>
                </main>
                <section className='calendar__app--meetings'>
                        <CalendarList meetings={this.state.meetings} currentDayMeetings={this.state.currentDayMeetings} selectedMeetings={this.state.selectedMeetings} removeMeeting={this.removeMeeting}/>
                </section>
            </div>
        )
    }

    componentDidMount = () => {
        this.loadMeetings()
    }

    addMeeting = (data) => {
        this.api.addData(data)
            .then( () => this.loadMeetings() )
            .catch((err) => console.error(err));
    }

    removeMeeting = (id) => {
        this.api.delateData(id)
            .then( () => this.loadMeetings() )
            .catch((err) => console.error(err));
    };

    setStateOfSelectedMeeting = (data) => {
        this.setState({
            selectedMeetings: data
        })
    }

    setStateOfDate = (date) => {
        this.setState( {
            date: new Date(date)
        })
    }

    setStateOfCurrentDayMeeting = (data) => {
        const { date } = this.state
        const currentDay = date.toISOString().split('T')[0];

        data.forEach( meeting => {
            if( meeting.date === currentDay ) {
                const meetingDate = { meeting: meeting , date: currentDay}

                this.setState({
                        currentDayMeetings: [...this.state.currentDayMeetings , meetingDate ]
                })
            }
        })
    }

    setStateMeetingsData = (data) => {
        this.setState({
            meetings: data
        });
        return data
    }

    loadMeetings = () => {
        this.api.loadData()
            .then( data => this.setStateMeetingsData(data) )
            .then( data => this.setStateOfCurrentDayMeeting(data) )
            .catch( err => console.log(err) )
    }
}
