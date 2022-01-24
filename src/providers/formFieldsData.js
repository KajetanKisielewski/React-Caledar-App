import { v4 as uuid } from 'uuid';

const formFieldsData = [
    { name: "firstName", label: "First Name: ", type: "text", key:uuid(), pattern: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, error: 'First name must be at least two characters long'},
    { name: "lastName", label: "Last Name: ", type: "text", key:uuid(), pattern: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, error: 'Last name must be at least two characters long'},
    { name: "email", label: "Email: ", type: "email", key:uuid(), pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, error:'E-mail must contain @' },
    { name: "date", label: "Date: ", type: "date", key:uuid(), pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, error:'Date must be in the correct YYYY-mm-dd format' },
    { name: "time", label: "Time: ", type: "time", key:uuid(), pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, error:'Time must be in the correct HH:mm format'},
];

export default formFieldsData;