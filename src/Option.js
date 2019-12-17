import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import GeneralUtil from './Util';

export default class Option extends Component {

	handleCountChange(e) {
		const count = e.target.value;		
		const options = GeneralUtil.getOptions();
		options.count = count;
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
		</FormControl>;

	}
}