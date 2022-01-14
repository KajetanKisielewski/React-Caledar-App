import React from 'react';
import CalendarList from './CalendarList';
import CaledarForm from './CalendarForm'
import Api from '../providers/Api'
import formFields from './../providers/formFields'

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.api = new Api();
    }

    state = {
        meetings: []
    }


    render() {

        console.log(this.state)
        return(

            <div className='calendar__app'>
                <header className='calendar__app--header'>
                    <h1 className='header__title'>Welcome to the meeting planner app</h1>
                </header>
                <main className='calendar__app--main'>
                        <CaledarForm formFields={formFields} onSubmit={this.addMeeting}/>
                </main>
            </div>
        )
    }

    addMeeting(data) {
        this.api.addData(data)
            .then( this.loadMeetings() )
    }

    loadMeetings() {
        this.api.loadData()
            .then( data => this.setState( { meetings: data} ))
            .catch( err => console.log(err) );
    }
}
