import { isDate } from '~/utils/common/date';

import { ECustomerContextConsts } from './constants';
import { initIsVisible } from './initialState';
import { IInitialState, IReducerActions } from './ts';

export const reducer = (
	state: IInitialState,
	action: IReducerActions
): IInitialState => {
	if (process.env.NODE_ENV === 'development') {
		console.log('%cPrevious State', 'color: darkred');
		console.dir(state);
		console.log('%cAction', 'color: darkred');
		console.dir(action);
	}

	switch (action.type) {
		case ECustomerContextConsts.SET_TOGGLE_IS_VISIBLE_ONE_ITEM_AND_INIT_EVERYTHING_ELSE: {
			return {
				...state,
				isVisible: {
					...initIsVisible(),
					[action.payload.isVisible]: !state.isVisible[action.payload.isVisible]
				}
			};
		}

		default:
			return state;
	}
};
