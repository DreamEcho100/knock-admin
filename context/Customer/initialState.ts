import type { IInitialState } from './ts';

export const initIsVisible = (): IInitialState['isVisible'] => ({
	sideNav: false,
	headerCart: false
});

export const initState = (): IInitialState => ({
	isVisible: initIsVisible()
});
