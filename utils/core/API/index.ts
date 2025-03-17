import axios from 'axios';
import { Product } from '~/libs/shopify/types';

const throwIfResponseError = async (response: Response) => {
	if (!response.ok) {
		let errorMessage: string;
		const text = await response.text();

		errorMessage = text;

		throw new Error(`Error, ${response.statusText}, ${errorMessage}`);
	}
};

// const tryCatch = async <T>(func: T) => {
// 	try {
// 		if (typeof func === 'function') func();
// 	} catch (error) {}
// };

export const getBanner = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-banner`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data.banner;
};

export const getDTKproduct = async (data: string) => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-DTK-product?productHandle=${data}`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data.banner;
};

export const getHomePageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-homepage`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data;
};

export const getTermsOfService = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-terms-of-service`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data.termsOfService;
};

export const getShippingPolicy = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-shipping-policy`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data.ShippingPolicy[0];
};

export const getRefundPolicy = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-refund-policy`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data.RefundPolicy;
};

export const getPrivacyPolicy = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-privacy-policy`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data.PrivacyPolicy;
};

export const getFaqPageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-FAQ`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data;
};

export const getKnockPageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knockpage`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data;
};

export const getKnockClipperPageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knockclipperpage`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data;
};

export const getDTKPageData = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-DTK`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data;
};

export const getKnockMainSection = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knock-main-section`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data;
};

export const getKnockClipperMainSection = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-knock-clipper-main-section`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data;
};

export const getPopup = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-popup`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data.popup;
};

export const getUpSellingPopup = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-upselling-popup`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data;
};

export const getMainSection = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-main-section`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return response.data.main;
};

const getAppApiPath = () =>
	typeof window === 'undefined'
		? // !!!
		  process.env.NEXT_PUBLIC_APP_DOMAINE
			? `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}/api`
			: process.env.NEXT_PUBLIC_BACKEND_ABSOLUTE_PATH
		: process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH;
