import React from 'react'

export default class ListItem extends React.Component {
    render() {

        const { date , time, firstName, lastName, email, className , id, removeMeeting } = this.props

        return(
            <div
                className={`meetings__list meetings__list--${className}`}
                key={ `${date}--${className}` }
            >
                <p className={`meeting__title ${className}__title`}>
                    You have an appointment scheduled for:
                </p>
                <p className={`meeting__date ${className}__date`}>
                    {date} at {time}
                </p>
                <p className={`meeting__name ${className}__name`}>
                    You have a meeting with:
                    <span className='meeting__name--highlight'>
                        {firstName} {lastName}
                    </span>
                </p>
                <a
                    className={`meeting__email ${className}__email`}
                    href={`mailto:${email}`}
                >
                    {firstName} {lastName} email:<span className={`meeting__email--highlight ${className}--email--highlight`}> {email} </span>
                </a>
                <button
                    className={`meeting__button ${className}--button`}
                    onClick={ () =>  removeMeeting(id)  }
                >
                    Remove Meeting
                </button>
            </div>
        )
    }


}