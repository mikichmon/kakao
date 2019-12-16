//import React from 'react';

export const Methods = {
    Addition: 'Addition',
    Subtraction: 'Subtraction',
    Multiplication: 'Multiplication',
    Division: 'Division',
};
Object.freeze(Methods);

export default class GeneralUtil{

    static getMethodMark = (method) => {
        let mark;
        // switch (method) {
        //     case Methods.Addition: mark = <i class="fas fa-plus"></i>; break;
        //     case Methods.Subtraction: mark = <i class="fas fa-minus"></i>; break;
        //     case Methods.Multiplication: mark = <i class="fas fa-times"></i>; break;
        //     case Methods.Division: mark = <i class="fas fa-divide"></i>; break;
        //     default:

        // }
        
        switch (method) {
            case Methods.Addition: mark = "+"; break;
            case Methods.Subtraction: mark = "-"; break;
            case Methods.Multiplication: mark = "×"; break;
            case Methods.Division: mark = "÷"; break;
            default:

        }
        return mark
    };
}
