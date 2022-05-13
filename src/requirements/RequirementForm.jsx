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
					<p>While</p>
					<PreconditionInput
						preconditions={requirement ? requirement.preconditions : undefined}
					/>

					<p>, the</p>
					<TextField
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
						label='Trigger'
						variant='outlined'
						name='Trigger'
						required
						defaultValue={requirement ? requirement.trigger : ""}
					/>
					<p>, the</p>
					<TextField
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
						label='Feature is Included'
						variant='outlined'
						name='Feature'
						required
						defaultValue={requirement ? requirement.feature : ""}
					/>
					<p>, the</p>
					<TextField
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
						label='Trigger'
						variant='outlined'
						name='Trigger'
						required
						defaultValue={requirement ? requirement.trigger : ""}
					/>
					<p>then the</p>
					<TextField
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
