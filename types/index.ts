import { Product } from '~/libs/shopify/types';

export interface ICustomProduct extends Omit<Product, 'description'> {
	originalDescription: string;
	description: {
		id: number;
		text: string[];
		h3: string;
	}[];
	filesIncluded: {
		id: number;
		li: string;
	}[];
	fileCount: number;
	features: {
		id: number;
		li: string;
	}[];
	youtubeVideo: {
		id: number;
		src: string;
		srcImage: string;
		title: string;
	}[];
}

export interface IAccessToken {
	accessToken: string;
	expiresAt: string;
}

export interface ILoginSuccess {
	success: true;
	token: string;
	message: string;
	user: IAccessToken;
}

export interface ISendVerificationCodeSuccess {
	success: true;
	message: string;
}

export interface IRegisterSuccess {
	success: true;
	message: string; // "Account created successfully!",
	response: {
		id: string; // "gid://shopify/Customer/6439211991263"
	};
}
export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	acceptsMarketing: boolean;
	email: string;
	phone: null;
	createdAt: string;
	roles: [];
	password: string;
	defaultAddress: {
		id: string;
		address1: string;
		address2: string;
		city: string;
		company: null;
		country: string;
		zip: string;
		province: string;
		phone: null;
	};
	addresses: {
		edges: {
			node: {
				id: string;
				address1: string;
				address2: string;
				city: string;
				company: null;
				country: string;
				firstName: string;
				lastName: string;
				province: string;
				zip: string;
				phone: null;
			};
		}[];
	};
	orders: {
		edges: {
			node: {
				id: string;
				orderNumber: number;
				email: string;
				name: string;
				phone: string | null;
				cancelReason: string | null;
				canceledAt: string | null;
				edited: boolean;
				financialStatus: string; // 'PAID';
				fulfillmentStatus: string; // 'FULFILLED';
				statusUrl: string;
				totalPrice: { amount: string; currencyCode: string };
				totalShippingPrice: { amount: string; currencyCode: string };
				totalTax: { amount: string; currencyCode: string };
				totalRefunded: { amount: string; currencyCode: string };
				lineItems: {
					edges: {
						node: {
							currentQuantity: number;
							quantity: number;
							title: string;
							originalTotalPrice: {
								amount: string;
								currencyCode: string;
							};
							variant: {
								id: string;
								image: {
									id: string;
									height: number;
									width: number;
									url: string;
									altText: string | null;
								};
								price: {
									amount: string;
									product: {
										id: string;
										handle: string;
										title: string;
										totalInventory: 994297;
										availableForSale: true;
										description: string;
										images: {
											edges: {
												node: {
													id: string;
													width: number;
													height: number;
													url: string;
												};
											}[];
										};
										updatedAt: string;
										createdAt: string;
									};
									quantityAvailable: number;
									title: string;
								};
							};
						};
					}[];
				};
				processedAt: string;
			};
		}[];
	};
}

export interface IGenericErrorResponse {
	success: false;
	message: string;
}
