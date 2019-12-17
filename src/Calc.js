import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline'
import GeneralUtil from './Util';
import { Methods } from './Util';
import Option from './Option';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const forRandom = [Methods.Addition,Methods.Subtraction,Methods.Multiplication,Methods.Division];

// 足し算用：とりあえず繰り上がりになる問題を固定で定義
const list = [
	[2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9],
	[2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
	[3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
	[4, 6], [5, 6], [6, 6],
	[5, 5]
];

export default class CalcCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			page: 'Home',
			qNo: 0,
			q: null,
			method: Methods.Addition,
		};


		this.startCalc = this.startCalc.bind(this);
		this.answer = this.answer.bind(this);
		this.next = this.next.bind(this);

	}

	startCalc(method) {

		const count = Number(GeneralUtil.getOptions().count);

		this.setNewQuestion();
		this.setState({ page: 'Q' });
		this.setState({ qNo: 0 });
		this.setState({ method });
		this.setState({ count });

	}
	randomIntMinMax(min, max) {
		var rand = Math.floor(Math.random() * (max + 1 - min)) + min

		return rand
	}

	setNewQuestion(){

		let nextMethod = this.state.method;
		if (nextMethod === Methods.All){
			const methodIdx = this.randomIntMinMax(0, 3);
			nextMethod = forRandom[methodIdx];
		}
		let q;
		switch (nextMethod) {
			case Methods.Addition: q = this.generate4Addition(); break;
			case Methods.Subtraction: q = this.generate4Subtraction(); break;
			case Methods.Multiplication: q = this.generate4Multiplication(); break;
			case Methods.Division: q = this.generate4Division(); break;
			default:

		}
		this.setState({q});
	}

	generateQuestions(method){

		let q = [];

		for (let i = 0; i < GeneralUtil.getOptions().count; i++) {
			let nextMethod = method;
			if (nextMethod === Methods.All){
				const methodIdx = this.randomIntMinMax(0, 3);
				nextMethod = forRandom[methodIdx];
			}

			switch (nextMethod) {
				case Methods.Addition: q.push(this.generate4Addition()); break;
				case Methods.Subtraction: q.push(this.generate4Subtraction()); break;
				case Methods.Multiplication: q.push(this.generate4Multiplication()); break;
				case Methods.Division: q.push(this.generate4Division()); break;
				default:
	
			}
		}

		return q;

	}

	// 掛け算
	generate4Multiplication() {

		const leftNum = this.randomIntMinMax(2, 9);
		const rightNum = this.randomIntMinMax(2, 9);
		return [Methods.Multiplication,leftNum, rightNum];
	}

	// 割り算
	generate4Division() {

		const leftNum = this.randomIntMinMax(2, 9);
		const rightNum = this.randomIntMinMax(2, 9);
		//　いったん掛け算して答えから逆算（割り切れるように）
		const answer = leftNum * rightNum;
		return [Methods.Division, answer, rightNum];
	}

	// 足し算の問題を作成
	generate4Addition() {
		const idx = this.randomIntMinMax(0, list.length - 1);
		const item = list[idx];
		let q = null;
		if (this.randomIntMinMax(0, 1) === 0) {
			q = [Methods.Addition, item[0], item[1]];
		} else {
			q = [Methods.Addition, item[1], item[0]];
		}

		return q;
	}

	// 引き算の問題
	generate4Subtraction() {
		const lastDigit = this.randomIntMinMax(1, 8);   // 1の位は1～8にする
		const secondDigit = 10; // とりあえず10台のみ
		const leftNum = secondDigit + lastDigit;
		const rightNum = this.randomIntMinMax(lastDigit + 1, 9);
		return [Methods.Subtraction, leftNum, rightNum];
	}

	answer() {
		this.setState({ page: 'A' });
	}

	next() {
		const qNo = this.state.qNo + 1;
		

		if (this.state.count !== -1 && this.state.count <= qNo) {

			this.setState({ qNo: 0, page: 'Home' });
			return;
		}

		this.setNewQuestion();
		this.setState({ qNo, page: 'Q' });
	}

	getPage() {

		const variant = "text";
		const color = "primary";

		if (this.state.page === "Home") {
			return <div>
				<div>
					<Button className="Start" variant={variant} color={color} onClick={() => this.startCalc(Methods.Addition)}>
						{GeneralUtil.getMethodMark(Methods.Addition)}
					</Button>
					<Button className="Start" variant={variant} color={color} onClick={() => this.startCalc(Methods.Subtraction)}>
						{GeneralUtil.getMethodMark(Methods.Subtraction)}
					</Button>
				</div>
				<div>
					<Button className="Start" variant={variant} color={color} onClick={() => this.startCalc(Methods.Multiplication)}>
						{GeneralUtil.getMethodMark(Methods.Multiplication)}
					</Button>
					<Button className="Start" variant={variant} color={color} onClick={() => this.startCalc(Methods.Division)}>
						{GeneralUtil.getMethodMark(Methods.Division)}
					</Button>
				</div>
				<div>
					<Button className="StartAll" variant={variant} color={color} onClick={() => this.startCalc(Methods.All)}>
						{GeneralUtil.getMethodMark(Methods.All)}
					</Button>
				</div>
			</div>;

			//return "";
		} else if (this.state.page === "Q") {
			return this.getQuestion();
		} else if (this.state.page === "A") {
			return this.getAnswer();
		} else if (this.state.page === "Option") {
			return <Option />;
		}

	}

	getQuestion() {

		const variant = "text";
		const color = "primary";
		const q = this.state.q;
		const mark = GeneralUtil.getMethodMark(q[0]);
		return <Button className="Question" variant={variant} color={color} onClick={this.answer}><div className="Calc">{q[1]} {mark} {q[2]}</div></Button>
	}

	getAnswer() {

		const variant = "text";
		const color = "primary";

		const q = this.state.q;

		let answer;

		switch (q[0]) {
			case Methods.Addition: answer = q[1] + q[2]; break;
			case Methods.Subtraction: answer = q[1] - q[2]; break;
			case Methods.Multiplication: answer = q[1] * q[2]; break;
			case Methods.Division: answer = q[1] / q[2]; break;
			default:

		}

		return <Button className="Answer" variant={variant} color={color} onClick={this.next}><span className="Calc">{answer}</span></Button>
	}

	getFooter() {

		let footerConent;
		const variant = "text";
		const color = "primary";

		if (this.state.page !== "Home") {

			footerConent = <Button variant={variant} color={color} onClick={() => this.setState({ page: "Home" })}><FontAwesomeIcon className="HomeButton" icon={['fas', 'home']} /></Button>
		} else {

			footerConent = <Button variant={variant} color={color} onClick={() => this.setState({ page: "Option" })}><FontAwesomeIcon className="HomeButton" icon={['fas', 'cog']} /></Button>
		}

		return footerConent;
	}

	render() {
		
		const content = this.getPage();
		const footer = this.getFooter();

		return (

			<div style={{ width: "100%" }}>

				<CssBaseline />   {/* 追加 */}
				<div>{content}</div>

				<div className="Home">{footer}</div>

			</div>
		);
	}
}