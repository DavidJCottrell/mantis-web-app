import React from "react";

// MUI
import TextField from "@mui/material/TextField";

import ResponseInput from "./ResponseInput";
import PreconditionInput from "./PreconditionInput";
import ComplexBuilder from "./ComplexBuilder";

const RequirementForm = ({
	reqType,
	complexComponents,
	setComplexComponents,
	requirement,
	handleSubmit,
}) => {
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
						required
						defaultValue={requirement ? requirement.systemName : ""}
					/>

					<p>shall</p>
					<ResponseInput
						responses={requirement ? requirement.systemResponses : undefined}
					/>
				</React.Fragment>
			);
			break;
		case "State Driven":
			form = (
				<React.Fragment>
					<p>While the</p>
					<PreconditionInput
						preconditions={
							requirement ? requirement.preconditions : undefined
						}
					/>

					<p>, the</p>
					<TextField
						id='outlined-basic'
						label='system name'
						variant='outlined'
						name='System Name'
						required
						defaultValue={requirement ? requirement.systemName : ""}
					/>

					<p>shall</p>
					<ResponseInput
						responses={requirement ? requirement.systemResponses : undefined}
					/>
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
						required
						defaultValue={requirement ? requirement.trigger : ""}
					/>
					<p>, the</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
						name='System Name'
						required
						defaultValue={requirement ? requirement.systemName : ""}
					/>
					<p>shall</p>
					<ResponseInput
						responses={requirement ? requirement.systemResponses : undefined}
					/>
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
						required
						defaultValue={requirement ? requirement.feature : ""}
					/>
					<p>, the</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
						name='System Name'
						required
						defaultValue={requirement ? requirement.systemName : ""}
					/>
					<p>shall</p>
					<ResponseInput
						responses={requirement ? requirement.systemResponses : undefined}
					/>
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
						required
						defaultValue={requirement ? requirement.trigger : ""}
					/>
					<p>then the</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
						name='System Name'
						required
						defaultValue={requirement ? requirement.systemName : ""}
					/>
					<p>shall</p>
					<ResponseInput
						responses={requirement ? requirement.systemResponses : undefined}
					/>
				</React.Fragment>
			);
			break;
		case "Complex":
			form = (
				<React.Fragment>
					<ComplexBuilder
						setComponents={setComplexComponents}
						components={complexComponents}
						requirement={requirement}
					/>
					{complexComponents.map((comp, i) => (
						<React.Fragment key={i}>{comp.element}</React.Fragment>
					))}
				</React.Fragment>
			);
			break;
	}

	return reqType ? (
		<form id='req-form' onSubmit={handleSubmit}>
			{form}
		</form>
	) : null;
};

export default RequirementForm;
