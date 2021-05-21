import React, { createContext, useReducer } from "react";

type InitialStateType = {
	uuid: string;
};

function AppReducer(state: any, action: any) {
	switch (action.type) {
		case "CHANGE_UUID":
			return {
				...state,
				uuid: action.payload,
			};
		default:
			return state;
	}
}

const initialState = {
	uuid: "",
};

export const AppContext = createContext<{
	state: InitialStateType;
	dispatch: React.Dispatch<any>;
}>({
	state: initialState,
	dispatch: () => null,
});

export function AppProvider(props: any) {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{props.children}
		</AppContext.Provider>
	);
}
