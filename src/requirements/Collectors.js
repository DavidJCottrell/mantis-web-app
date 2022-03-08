const getResponseValues = (responseElements) => {
	let responseValues = [];
	try {
		responseElements.forEach((input) => responseValues.push(input.value));
	} catch (error) {
		if (responseElements !== undefined) responseValues.push(responseElements.value);
	}
	return responseValues;
};

const getText = (values) => {
	let fullText = "";
	values.forEach((res, i) => {
		if (i > 0) fullText += " and " + res;
		else fullText += res;
	});
	return fullText;
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
	const systemName = elements["System Name"].value;

	const responseFullText = getText(responseValues);

	let requirement = {
		type: reqType,
		systemName: systemName,
		systemResponses: responseValues,
		fullText: "The " + systemName + " shall " + responseFullText,
	};
	return requirement;
};

const collectStateDriven = (elements, reqType) => {
	const responseValues = getResponseValues(elements["System Responses"]);
	const preconditionValues = getPreconditionValues(elements["Preconditions"]);
	const systemName = elements["System Name"].value;

	const responseFullText = getText(responseValues);
	const preconditionFullText = getText(preconditionValues);

	let requirement = {
		type: reqType,
		preconditions: preconditionValues,
		systemName: systemName,
		systemResponses: responseValues,
		fullText:
			"While the " +
			preconditionFullText +
			", the " +
			systemName +
			" shall " +
			responseFullText,
	};
	return requirement;
};

const collectEventDrivenOrUnwanted = (elements, reqType) => {
	const responseValues = getResponseValues(elements["System Responses"]);
	const systemName = elements["System Name"].value;
	const trigger = elements["Trigger"].value;
	const responseFullText = getText(responseValues);

	let fullText = "";

	if (reqType === "Event Driven")
		fullText =
			"When " + trigger + ", the " + systemName + " shall " + responseFullText;
	else
		fullText =
			"If " + trigger + ", then the " + systemName + " shall " + responseFullText;

	let requirement = {
		type: reqType,
		systemResponses: responseValues,
		systemName: systemName,
		trigger: trigger,
		fullText: fullText,
	};
	return requirement;
};

const collectOptionalFeature = (elements, reqType) => {
	const responseValues = getResponseValues(elements["System Responses"]);
	const systemName = elements["System Name"].value;
	const responseFullText = getText(responseValues);
	const feature = elements["Feature"].value;

	let requirement = {
		type: reqType,
		systemResponses: responseValues,
		systemName: systemName,
		feature: feature,
		fullText:
			"Where " + feature + ", the " + systemName + " shall " + responseFullText,
	};
	return requirement;
};

const collectComplex = (elements, complexComponents, reqType) => {
	// Get all preconditions (if there are any)
	const preconditionValues = getPreconditionValues(elements["Preconditions"]);
	const preconditionFullText = getText(preconditionValues);

	// Get all system responses (if there are any)
	const responseValues = getResponseValues(elements["System Responses"]);
	const responseFullText = getText(responseValues);

	// Get the system name
	const systemName = elements["System Name"].value;

	// Get the feature (if there is one)
	const feature = elements["Feature"] ? elements["Feature"].value : "";

	// Get the trigger (if there is one)
	const trigger = elements["Trigger"] ? elements["Trigger"].value : "";

	// Get the unwanted trigger (if there is one)
	const unwantedTrigger = elements["UnwantedTrigger"]
		? elements["UnwantedTrigger"].value
		: "";

	let orderOfComponents = [];
	for (let comp of complexComponents) orderOfComponents.push(comp.type);

	let fullText = "";

	let preconditionAdded,
		triggerAdded,
		responseAdded,
		nameAdded,
		unwantedTriggerAdded = false;

	for (let index = 0; index < elements.length; index++) {
		const elementName = elements[index].name;
		if (elementName) {
			if (elementName === "Preconditions" && !preconditionAdded) {
				fullText += " while the " + preconditionFullText;
				preconditionAdded = true;
			} else if (elementName === "Trigger" && !triggerAdded) {
				fullText += " when " + trigger + " ";
				triggerAdded = true;
			} else if (elementName === "System Name" && !nameAdded) {
				fullText += " the " + systemName + " ";
				nameAdded = true;
			} else if (elementName === "System Responses" && !responseAdded) {
				fullText += " shall " + responseFullText + " ";
				responseAdded = true;
			} else if (elementName === "Unwanted Trigger" && !unwantedTriggerAdded) {
				fullText += " if " + unwantedTrigger + " then the " + systemName + " ";
				unwantedTriggerAdded = true;
			}
		}
	}

	let requirement = {
		type: reqType,
		systemResponses: responseValues,
		preconditions: preconditionValues,
		systemName: systemName,
		feature: feature,
		trigger: trigger,
		unwantedTrigger: unwantedTrigger,
		fullText: fullText,
		order: orderOfComponents,
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
