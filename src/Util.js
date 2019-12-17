// import React from 'react';
export const Methods = {
	Addition: 'Addition',
	Subtraction: 'Subtraction',
	Multiplication: 'Multiplication',
	Division: 'Division',
	All: 'All',
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
			//case Methods.All: mark = <div><div>+-</div><div>×÷</div></div>; break;
			case Methods.All: mark = "All"; break;
			default:

		}
		return mark
	};

	static getOptions = () => {
		const baseOptions = {count:10,isAuto:false,intervalQuestion:1000,intervalAnswer:1000};
		let options = localStorage.getItem('Options');

		if (options !== null){
			options = JSON.parse(options);

			Object.keys(baseOptions).forEach(function(key) {
				if(options[key] !== undefined) baseOptions[key] = options[key];
			  });
		}
		
		localStorage.setItem('Options', JSON.stringify(baseOptions));
		return baseOptions;

	}
}
