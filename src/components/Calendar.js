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
        meetings: []
    }


    render() {
        return(

            <div className='calendar__app'>
                <header className='calendar__app--header'>
                    <h1 className='header__title'>Welcome to the meeting planner app</h1>
                </header>
                <main className='calendar__app--main'>
                        <CaledarForm formFields={formFieldsData} onSubmit={this.addMeeting}/>
                        <CalendarViev dateData={dateData} meetings={this.state.meetings}/>
                </main>
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

    loadMeetings = () => {
        this.api.loadData()
            .then( data => this.setStateData(data) )
            .catch( err => console.log(err) );
    }

    setStateData = (data) => {
        this.setState({
            meetings: data
        })
    }
}
