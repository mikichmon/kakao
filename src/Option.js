import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import GeneralUtil from './Util';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
//import Tooltip from '@material-ui/core/Tooltip';

import { withStyles/*, makeStyles*/ } from '@material-ui/core/styles';

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
	{
		value: 500,
	},
	{
		value: 1000,
	},
	{
		value: 1500,
	},
	{
		value: 2000,
	},
];

const IOSSlider = withStyles({
	root: {
		color: '#3880ff',
		height: 2,
		padding: '15px 0',
	},
	thumb: {
		height: 28,
		width: 28,
		backgroundColor: '#fff',
		boxShadow: iOSBoxShadow,
		marginTop: -14,
		marginLeft: -14,
		'&:focus,&:hover,&$active': {
			boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				boxShadow: iOSBoxShadow,
			},
		},
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 11px)',
		top: -22,
		'& *': {
			background: 'transparent',
			color: '#000',
		},
	},
	track: {
		height: 2,
	},
	rail: {
		height: 2,
		opacity: 0.5,
		backgroundColor: '#bfbfbf',
	},
	mark: {
		backgroundColor: '#bfbfbf',
		height: 8,
		width: 1,
		marginTop: -3,
	},
	markActive: {
		opacity: 1,
		backgroundColor: 'currentColor',
	},
})(Slider);

export default class Option extends Component {

	handleCountChange(e) {
		const count = e.target.value;
		const options = GeneralUtil.getOptions();
		options.count = count;
		localStorage.setItem('Options', JSON.stringify(options));
	}
	handleChangeAuto(e) {
		const v = e.target.checked;
		const options = GeneralUtil.getOptions();
		options.isAuto = v;
		localStorage.setItem('Options', JSON.stringify(options));
	}
	handleChangeIntervalQ(e,v){
		//const v = e.target.value;
		const options = GeneralUtil.getOptions();
		options.intervalQuestion = v;
		localStorage.setItem('Options', JSON.stringify(options));
	}
	handleChangeIntervalA(e,v){
		//const v = e.target.value;
		const options = GeneralUtil.getOptions();
		options.intervalAnswer = v;
		localStorage.setItem('Options', JSON.stringify(options));
	}
	render() {
		const options = GeneralUtil.getOptions();

		return <FormControl component="fieldset">
			<FormLabel component="legend">問題数</FormLabel>
			<RadioGroup defaultValue={options.count + ""} aria-label="count" onChange={this.handleCountChange} name="customized-radios" row>
				<FormControlLabel value="5" control={<Radio />} label="5" />
				<FormControlLabel value="10" control={<Radio />} label="10" />
				<FormControlLabel value="50" control={<Radio />} label="50" />
				<FormControlLabel value="-1" control={<Radio />} label="ずっと" />

			</RadioGroup>
			<FormControlLabel
				control={
					<Checkbox
						defaultChecked={options.isAuto}
						onChange={this.handleChangeAuto}
						//value="checkedB"
						color="primary"
					/>
				}
				label="自動"
			/>
			<Typography gutterBottom>問題の間隔</Typography>
			<IOSSlider aria-label="ios slider" min={500} max={2000} defaultValue={options.intervalQuestion} onChangeCommitted={this.handleChangeIntervalQ} marks={marks} valueLabelDisplay="on" />
			<Typography gutterBottom>答えの間隔</Typography>
			<IOSSlider aria-label="ios slider" min={500} max={2000} defaultValue={options.intervalAnswer} onChangeCommitted={this.handleChangeIntervalA} marks={marks} valueLabelDisplay="on" />
		</FormControl>;

	}
}