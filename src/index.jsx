import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import App from "./App";

const queryClient = new QueryClient();
// const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			refetchOnWindowFocus: false,
// 			refetchOnmount: false,
// 			refetchOnReconnect: false,
// 			retry: false,
// 			staleTime: twentyFourHoursInMs,
// 		},
// 	},
// });

ReactDOM.render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
