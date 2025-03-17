import Button from '~/components/shared/core/Button';
import Image from 'next/image';
import React from 'react';
import classes from '../../../../styles/productsPages.module.scss';
import {
	cartStore,
	getCartLineItemPendingUpsertOrUpdateKey
} from '~/libs/shopify/stores/cart';
import { useStore } from 'zustand';

const ProductDetails = ({ product }) => {
	const isPending = useStore(
		cartStore,
		(state) =>
			state.pendingActions[
				getCartLineItemPendingUpsertOrUpdateKey(
					product.id,
					product.variants[0].id
				)
			]
	);

	return (
		<div className={classes.ProductCardDetailsContainer}>
			<div></div>
			<div className={classes.ProductCardDetails}>
				<div>
					<Image
						alt={product.title}
						width={product.variants[0].image.width}
						height={product.variants[0].image.height}
						src={product.variants[0].image.url}
					/>
				</div>
				<div>
					<h4> DECAP - {product.title}</h4>
					{product.variants[0].compareAtPrice?.amount ? (
						<div className={classes.ProductCardDetailsPriceSales}>
							<p> ${product.variants[0].compareAtPrice.amount}0 </p>{' '}
							<p> ${product.variants[0].price.amount}0 </p>
						</div>
					) : (
						<div className={classes.ProductCardDetailsPrice}>
							<p> ${product.variants[0].price.amount}0 </p>
						</div>
					)}
					<p>
						Pay in 4 interest-free installments of $12.50 with{' '}
						<Image
							width={143}
							height={32}
							src={'/images/shoppay.png'}
							alt='shoppay'
						/>{' '}
					</p>
					<div>
						<Button
							onClick={() =>
								void cartStore.getState().upsertCartItem(product.variants[0], {
									...product,
									description: product.originalDescription
								})
							}
							disabled={isPending}
						>
							Add To Cart
						</Button>
						<div className={classes.cardsPayments}>
							<Image
								alt='paymentCards'
								width={900}
								height={150}
								src={'/images/payment_cards.png'}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
