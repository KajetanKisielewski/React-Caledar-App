import React from "react";

export default class CaledarForm extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
    }

    render() {
        return(
            <section className='main__section--form'>
                <header className='form__header'>
                    <h2 className='form__title'>Schedule a meeting</h2>
                </header>
                <div className='form__wrapper'>
                    <form
                        className='form__form'
                        onSubmit={ this.handleSubmit }
                    >
                        { this.renderFormFields() }
                        <button
                            className="form__button"
                            type='submit'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        )
    }


    renderFormFields = () => {
        const { formFields } = this.props;

        return formFields.map( field => {

            const { name, label, type, key, pattern, error } = field;
            return(
                <div
                    className='form__field'
                    key={key}
                >
                    <label
                        className='form__label'
                        htmlFor='{name}'
                    >
                        {label}
                        <input
                            className='form__input'
                            id={name}
                            name={name}
                            type={type}
                            value={ this.state[name].value }
                            onChange={ (e) => this.handleInput(e, pattern, error) }
                        />
                    </label>
                </div>
             )
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { firstName , lastName, email, date, time } = this.state;

        if( this.validation(e, this.state) ) {
            const meetingData = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                date: date.value,
                time: time.value
            }

            this.props.onSubmit(meetingData)
        }
    }

    validation = (e , data) => {
        const stateData = Object.values(data)
        const validationArray = []

        stateData.forEach( item => {
            if(item.isValid === true) {
                validationArray.push(true)
            }
        })

        if(validationArray.length === 5) {
            this.clearError(e.target)
            return true
        }
        else {
            this.addError(e.target, 'All fields must be completed correctly')
        }
    }



    handleInput = (e, regex, error) => {
        e.preventDefault();
        this.clearError(e.target)

        const { name, value } = e.target;

        if ( regex.test(value) ) {

            this.setState({
                [name]: { value: value, isValid: true }
            })
        }
        else {
            this.addError(e.target , error)
            this.setState({
                [name]: { value: value, isValid: false }
            })
        }
    }

    addError = (item , error) => {
        item.parentElement.parentElement.setAttribute('data-error' , error)
    }

    clearError = (item) => {
        item.parentElement.parentElement.setAttribute('data-error' , "")
    }





}