import React, { useState } from "react";

// MUI
import TextField from "@mui/material/TextField";

import ResponseInput from "./ResponseInput";
import PreconditionInput from "./PreconditionInput";
import ComplexBuilder from "./ComplexBuilder";

const RequirementForm = ({ reqType }) => {
	const [complexComponents, setComplexComponents] = useState([]);

	const setComponents = (newComponents) => {
		setComplexComponents(newComponents);
	};

	let form = null;
	switch (reqType) {
		case "Ubiquitous":
			form = (
				<React.Fragment>
					<p>The</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
						name='System Name'
					/>

					<p>shall</p>
					<ResponseInput />
				</React.Fragment>
			);
			break;
		case "State Driven":
			form = (
				<React.Fragment>
					<p>While the</p>
					<PreconditionInput />

					<p>, the</p>
					<TextField
						id='outlined-basic'
						label='system name'
						variant='outlined'
						name='System Name'
					/>

					<p>shall</p>
					<ResponseInput />
				</React.Fragment>
			);
			break;
		case "Event Driven":
			form = (
				<React.Fragment>
					<p>When</p>
					<TextField
						id='outlined-basic'
						label='Trigger'
						variant='outlined'
						name='Trigger'
					/>
					<p>, the</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
						name='System Name'
					/>
					<p>shall</p>
					<ResponseInput />
				</React.Fragment>
			);
			break;
		case "Optional Feature":
			form = (
				<React.Fragment>
					<p>Where</p>
					<TextField
						id='outlined-basic'
						label='Feature is Included'
						variant='outlined'
						name='Feature'
					/>
					<p>, the</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
						name='System Name'
					/>
					<p>shall</p>
					<ResponseInput />
				</React.Fragment>
			);
			break;
		case "Unwanted Behaviour":
			form = (
				<React.Fragment>
					<p>If</p>
					<TextField
						id='outlined-basic'
						label='Trigger'
						variant='outlined'
						name='Trigger'
					/>
					<p>then the</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
						name='System Name'
					/>
					<p>shall</p>
					<ResponseInput />
				</React.Fragment>
			);
			break;
		case "Complex":
			form = (
				<React.Fragment>
					<ComplexBuilder
						setComponents={setComponents}
						components={complexComponents}
					/>
					{complexComponents.map((el, i) => (
						<React.Fragment key={i}>{el}</React.Fragment>
					))}
				</React.Fragment>
			);
			break;
	}

	return reqType ? <form id='req-form'>{form}</form> : null;
};

export default RequirementForm;
