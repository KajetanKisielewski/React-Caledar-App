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

        console.log(this.state)

        return(
            <section className='main__section--form'>
                <header className='form__header'>
                    <h2 className='form__title'>Schedule a meeting</h2>
                </header>
                <div className='form__wrapper'>
                    <form className='form__form'>
                        { this.renderFormFields() }
                    </form>
                </div>
            </section>
        )
    }


    renderFormFields = () => {
        const { formFields } = this.props;
        // console.log(formFields)

        return formFields.map( field => {

            const { name, label, type, key, pattern } = field;

            return(
                 <label
                    className="form__label"
                    htmlFor="{name}"
                    key={key}
                >
                    {label}
                    <input
                        className="form__input"
                        id={name}
                        name={name}
                        type={type}
                        onChange={this.handleInput}
                        pattern={pattern}
                    />
                 </label>
             )
        })
    }

    handleInput = (e) => {
        e.preventDefault();

        const { pattern } = e.target;

        const { name, value } = e.target;
        console.log('name' , name)
        console.log(' value' , value)

        const reg = pattern
        console.log('reg' , reg)

        const reg1 = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
        console.log('reg1' , reg1)

        console.log(reg1.test(value))
        console.log(pattern.test(value))

        // if ( pattern.test(value) ) { return console.log('true') }
        // else { return console.log('false')  }

        // this.setState( state => ({
        //     [name]: { ...state[name] , value }
        // }))
    }
}