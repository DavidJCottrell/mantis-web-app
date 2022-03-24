import Nav from "./nav/Nav";

// Toast Notifications
import { Toaster } from "react-hot-toast";

import Loading from "./Loading";

const Page = (props) => {
	return (
		<div id='page'>
			<Toaster />
			<Nav {...props} />
			{!props.isLoading ? props.children : <Loading />}
		</div>
	);
};

export default Page;
