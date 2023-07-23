import { Validator } from 'node-input-validator';

export default data => new Validator(data, 
         { 
            name: 'required|minLength:5',
            amount: 'required|between:0,100',
            TotalAmount: 'required',
            type:'',
            notes:''
        },
);