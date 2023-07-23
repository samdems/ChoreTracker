import { Validator } from 'node-input-validator';

export default data => new Validator(data, 
         { 
            name: 'required|minLength:5',
            totalDebt: 'required|between:0,10000'
        },
);