import type { Dispatch } from 'react';

import { ECustomerContextConsts } from './constants';

export type TInitialStateScreenSize = number;

export interface IInitialState {
	isVisible: {
		sideNav: boolean;
		headerCart: boolean;
	};
}

interface ISetReducerAction<Type, Payload = undefined> {
	type: Type;
	payload: Payload;
}

type TSetItemVisibility = ISetReducerAction<
	ECustomerContextConsts.SET_TOGGLE_IS_VISIBLE_ONE_ITEM_AND_INIT_EVERYTHING_ELSE,
	{
		isVisible: keyof IInitialState['isVisible'];
	}
>;

export type IReducerActions = TSetItemVisibility;

export type TCustomerDispatch = Dispatch<IReducerActions>;
