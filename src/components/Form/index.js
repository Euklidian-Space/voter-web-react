import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const onChange = (name, data) => e => {
	data[name.toLowerCase()] = e.target.value;
}

let data;
let errs;


const Form = ({ fields, onClickHandler, errors }) => {
	if (!data) {
		data = {};
		fields.forEach(f => data[f] = null);
	}


	return (
		<div>
			{ fields.map(f => {
				// let prop = f === "Password" ? `${f.toLowerCase()}_hash` : f.toLowerCase();
				let err;
				if (errors) {
					err = errors[f.toLowerCase()];
				}
				// console.log("err: ", err);
				return (
					<div key={f}>
						<TextField
							hintText={`${f} field`}
							floatingLabelText={f}
							errorText={ err }
							onChange={ onChange(f, data)}
						/> <br/>
					</div>
				);
			}) }
			<RaisedButton
				label="Submit"
				onClick={ () => onClickHandler(data) }
			/>
		</div>
	);
};

export default Form;
