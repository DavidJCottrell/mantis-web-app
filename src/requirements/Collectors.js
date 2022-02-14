const getResponseValues = (responseElements) => {
	let responseValues = [];
	try {
		responseElements.forEach((input) => responseValues.push(input.value));
	} catch (error) {
		if (responseElements !== undefined) responseValues.push(responseElements.value);
	}
	return responseValues;
};

const getPreconditionValues = (preconditionElements) => {
	let preconditionValues = [];
	try {
		preconditionElements.forEach((input) => preconditionValues.push(input.value));
	} catch (error) {
		if (preconditionElements !== undefined)
			preconditionValues.push(preconditionElements.value);
	}
	return preconditionValues;
};

const collectUbiquitous = (elements, reqType) => {
	const responseValues = getResponseValues(elements["System Responses"]);
	let requirement = {
		type: reqType,
		systemName: elements["System Name"].value,
		systemResponses: responseValues,
	};
	return requirement;
};

const collectStateDriven = (elements, reqType) => {
	const responseValues = getResponseValues(elements["System Responses"]);
	const preconditionValues = getPreconditionValues(elements["Preconditions"]);

	let requirement = {
		type: reqType,
		preconditions: preconditionValues,
		systemName: elements["System Name"].value,
		systemResponses: responseValues,
	};
	return requirement;
};

const collectEventDrivenOrUnwanted = (elements, reqType) => {
	const responseValues = getResponseValues(elements["System Responses"]);

	let requirement = {
		type: reqType,
		systemResponses: responseValues,
		systemName: elements["System Name"].value,
		trigger: elements["Trigger"].value,
	};
	return requirement;
};

const collectOptionalFeature = (elements, reqType) => {
	const responseValues = getResponseValues(elements["System Responses"]);

	let requirement = {
		type: reqType,
		systemResponses: responseValues,
		systemName: elements["System Name"].value,
		feature: elements["Feature"].value,
	};
	return requirement;
};

const collectComplex = (elements, reqType) => {
	// Get all preconditions (if there are any)
	const preconditionValues = getPreconditionValues(elements["Preconditions"]);

	// Get all system responses (if there are any)
	const responseValues = getResponseValues(elements["System Responses"]);

	// Get the system name
	const systemName = elements["System Name"].value;

	// Get the feature (if there is one)
	const feature = elements["Feature"] ? elements["Feature"].value : "";

	// Get the trigger (if there is one)
	const trigger = elements["Trigger"] ? elements["Trigger"].value : "";

	let requirement = {
		type: reqType,
		systemResponses: responseValues,
		preconditions: preconditionValues,
		systemName: systemName,
		feature: feature,
		trigger: trigger,
	};
	return requirement;
};

export {
	collectUbiquitous,
	collectStateDriven,
	collectEventDrivenOrUnwanted,
	collectOptionalFeature,
	collectComplex,
};
