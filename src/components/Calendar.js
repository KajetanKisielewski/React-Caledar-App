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
        selectedMeetings: [],
        currentDayMeetings: []
    }


    render() {
        console.log(this.state)
        return(

            <div className='calendar__app'>
                <header className='calendar__app--header'>
                    <h1 className='header__title'>Welcome to the meeting planner app</h1>
                </header>
                <main className='calendar__app--main'>
                        <CaledarForm formFields={formFieldsData} onSubmit={this.addMeeting} />
                        <CalendarViev dateData={dateData} meetings={this.state.meetings} setSelectedMeetings={this.setStateOfSelectedMeeting} setCurrentDayMeetings={this.setStateOfCurrentDayMeeting} />
                </main>
                <section className='calendar__app--meetings'>
                        <CalendarList meetings={this.state.meetings} currentDayMeetings={this.state.currentDayMeetings} selectedMeetings={this.state.selectedMeetings} />
                </section>
            </div>
        )
    }
    componentDidMount = () => {
        this.loadMeetings();
    }

    addMeeting = (data) => {
        this.api.addData(data)
            .then( this.loadMeetings() )
    }

    setStateOfSelectedMeeting = (data) => {
        this.setState({
            selectedMeetings: data
        })
    }

    setStateOfCurrentDayMeeting = (data) => {
        this.setState({
            currentDayMeetings: data
        })
    }

    setStateMeetingsData = (data) => {
        this.setState({
            meetings: data
        })
    }

    loadMeetings = () => {
        this.api.loadData()
            .then( data => this.setStateMeetingsData(data) )
            .catch( err => console.log(err) );
    }
}
