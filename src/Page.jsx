import React from "react";
import Nav from "./nav/Nav";

// Toast Notifications
import { Toaster } from "react-hot-toast";

import Loading from "./Loading";

const Page = (props) => {
	return (
		<React.Fragment>
			<Toaster />
			<Nav {...props} />
			{!props.isLoading ? props.children : <Loading />}
		</React.Fragment>
	);
};

export default Page;
