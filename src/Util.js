//import React from 'react';

export const Methods = {
	Addition: 'Addition',
	Subtraction: 'Subtraction',
	Multiplication: 'Multiplication',
	Division: 'Division',
};
Object.freeze(Methods);

export default class GeneralUtil {

	static getMethodMark = (method) => {
		let mark;

		switch (method) {
			case Methods.Addition: mark = "+"; break;
			case Methods.Subtraction: mark = "-"; break;
			case Methods.Multiplication: mark = "×"; break;
			case Methods.Division: mark = "÷"; break;
			default:

		}
		return mark
	};

	static getOptions = () => {

		let options = localStorage.getItem('Options');

		if (options === null){
			options = {count:10};
			localStorage.setItem('Options', JSON.stringify(options));
		}else{
			options = JSON.parse(options);
		}
		return options;

	}
}
