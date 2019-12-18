// import React from 'react';
export const Methods = {
	Addition: 'Addition',
	Subtraction: 'Subtraction',
	Multiplication: 'Multiplication',
	Division: 'Division',
	All: 'All',
	FromKeep: 'FromKeep',
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
		const baseOptions = {count:10,isAuto:false,intervalQuestion:1000,intervalAnswer:1000, maxKeeps:100};
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

	static setKeeps = (keeps)=>{
		localStorage.setItem('Keeps',JSON.stringify(keeps));
	}

	static getKeeps = () => {
		
		let keeps = localStorage.getItem('Keeps');
		if (keeps == null){
			keeps = [];
		}else{
			keeps = JSON.parse(keeps);
		}
		return keeps;
	}

	static removeQuestionInKeeps = (qd) => {

		const keeps = this.getKeeps();

		for (let i = keeps.length -1 ; i >= 0 ; i--) {
			const q = keeps[i];
			if (q[0] === qd[0] && q[1] === qd[1] && q[2] === qd[2]){
				keeps.splice(i,1);
			}
		}

		localStorage.setItem('Keeps', JSON.stringify(keeps));
	}

	static keepQuestion = (q) => {
		const keeps = this.getKeeps();

		// このメソッドではため込むだけにする。苦手リスト計算の初期処理でメンテする
		keeps.push(q);

		localStorage.setItem('Keeps', JSON.stringify(keeps));
	}
}
