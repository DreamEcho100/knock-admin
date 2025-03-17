import { ECustomerContextConsts } from './constants';
import type { IInitialState, TCustomerDispatch } from './ts';

export const setIsVisibleOnly = (
	dispatch: TCustomerDispatch,
	isVisible: keyof IInitialState['isVisible']
) => {
	dispatch({
		type: ECustomerContextConsts.SET_TOGGLE_IS_VISIBLE_ONE_ITEM_AND_INIT_EVERYTHING_ELSE,
		payload: {
			isVisible
		}
	});
};

export const customerGlobalActions = {
	setIsVisibleOnly
};
