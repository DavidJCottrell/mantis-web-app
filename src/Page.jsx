import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

// APIs
// import * as userApis from "../apis/user";
// import * as projectApis from "../apis/project";

// Custom components
// import Nav from "../nav/Nav";
import Nav from "./nav/Nav";

// Toast Notifications
import { Toaster } from "react-hot-toast";

const Page = (props) => {
	return (
		<React.Fragment>
			<Toaster />
			<Nav {...props} />
			{props.children}
		</React.Fragment>
	);
};

export default Page;
