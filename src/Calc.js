import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline'

export const Methods = {
    Addition: 'Addition',
    Subtraction: 'Subtraction',
    Multiplication: 'Multiplication',
    Division: 'Division',
};
Object.freeze(Methods);

export default class CalcCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 'Home',
            qNo: 0,
            q: [],
            method: Methods.Addition,
            count: 10,
        };


        this.startCalc = this.startCalc.bind(this);
        this.answer = this.answer.bind(this);
        this.next = this.next.bind(this);

    }

    startCalc(method) {

        let q;

        switch (method) {
            case Methods.Addition: q = this.generate4Addition(); break;
            case Methods.Subtraction: q = this.generate4Subtraction(); break;
            case Methods.Multiplication: q = this.generate4Multiplication(); break;
            case Methods.Division: q = this.generate4Division(); break;
            default:

        }

        this.setState({ page: 'Q' });
        this.setState({ qNo: 0 });
        this.setState({ q });
        this.setState({ method });
    }
    randomIntMinMax(min, max) {
        var rand = Math.floor(Math.random() * (max + 1 - min)) + min

        return rand
    }

    // 掛け算
    generate4Multiplication(){

        let q = [];

        for (let i = 0; i < this.state.count; i++){

            const leftNum = this.randomIntMinMax(2, 9);
            const rightNum = this.randomIntMinMax(2, 9);
            q.push([leftNum,rightNum])
        }

        return q;
    }

    // 割り算
    generate4Division(){

        let q = [];

        for (let i = 0; i < this.state.count; i++){

            const leftNum = this.randomIntMinMax(2, 9);
            const rightNum = this.randomIntMinMax(2, 9);
            //　いったん掛け算して答えから逆算（割り切れるように）
            const answer = leftNum * rightNum;
            q.push([answer,rightNum])
        }

        return q;
    }

    // 足し算の問題を作成
    generate4Addition() {

        // とりあえず繰り上がりになる問題を固定で定義
        const list = [
            [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9],
            [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
            [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
            [4, 6], [5, 6], [6, 6],
            [5, 5]
        ];
        
        let q = [];

        for (let i = 0; i < this.state.count; i++){

            const idx = this.randomIntMinMax(0, list.length -1);
            const item = list[idx];
            if (this.randomIntMinMax(0,1) === 0){
                q.push([item[0], item[1]]);
            }else{
                q.push([item[1], item[0]]);
            }

        }

        return q;
    }

    // 引き算の問題
    generate4Subtraction(){

        let q = [];
        
        for (let i = 0; i < this.state.count; i++){
            const lastDigit = this.randomIntMinMax(1, 8);   // 1の位は1～8にする
            const secondDigit = 10; // とりあえず10台のみ
            const leftNum = secondDigit + lastDigit;
            const rightNum = this.randomIntMinMax(lastDigit + 1, 9);
            q.push([leftNum,rightNum])
        }

        return q;
    }

    answer() {

        this.setState({ page: 'A' });


    }

    next() {
        const qNo = this.state.qNo + 1;
        if (this.state.q.length <= qNo) {

            this.setState({ qNo: 0, page: 'Home' });
            return;
        }

        this.setState({ qNo, page: 'Q' });
    }

    getPage() {

        if (this.state.page === "Home") {
            return <div>
                    <Button className="Start" onClick={() => this.startCalc(Methods.Addition)}>+</Button>
                    <Button className="Start" onClick={() => this.startCalc(Methods.Subtraction)}>-</Button>
                    <Button className="Start" onClick={() => this.startCalc(Methods.Multiplication)}>×</Button>
                    <Button className="Start" onClick={() => this.startCalc(Methods.Division)}>÷</Button>
                </div>;

            //return "";
        } else if (this.state.page === "Q") {
            return this.getQuestion();
        } else if (this.state.page === "A") {
            return this.getAnswer();
        }



    }

    getQuestion() {

        let mark;

        switch (this.state.method) {
            case Methods.Addition: mark = <i class="fas fa-plus"></i>; break;
            case Methods.Subtraction: mark = <i class="fas fa-minus"></i>; break;
            case Methods.Multiplication: mark = <i class="fas fa-times"></i>; break;
            case Methods.Division: mark = <i class="fas fa-divide"></i>; break;
            default:

        }

        switch (this.state.method) {
            case Methods.Addition: mark = '+'; break;
            case Methods.Subtraction: mark = <i class="fas fa-minus"></i>; break;
            case Methods.Multiplication: mark = <i class="fas fa-times"></i>; break;
            case Methods.Division: mark = '÷'; break;
            default:

        }

        const q = this.state.q[this.state.qNo];
        return <Button onClick={this.answer}><div class="Calc">{q[0]} {mark} {q[1]}</div></Button>
    }

    getAnswer() {


        const q = this.state.q[this.state.qNo];

        let mark;

        switch (this.state.method) {
            case Methods.Addition: mark = q[0] + q[1]; break;
            case Methods.Subtraction: mark = q[0] - q[1]; break;
            case Methods.Multiplication: mark = q[0] * q[1]; break;
            case Methods.Division: mark = q[0] / q[1]; break;
            default:

        }

        return <Button onClick={this.next}><span class="Calc">{mark}</span></Button>
    }

    render() {

        const content = this.getPage();

        return (

            <div style={{ width: "100%" }}>

                <CssBaseline />   {/* 追加 */}
                {content}

            </div>
        );
    }
}