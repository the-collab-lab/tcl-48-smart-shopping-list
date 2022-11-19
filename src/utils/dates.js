const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function getDaysBetweenDates(previousPurchase, futurePurchase) {
	const currentDate = new Date();
	// console.log(previousPurchase, futurePurchase);
	if (previousPurchase && futurePurchase) {
		//console.log(`${previousPurchase && futurePurchase} previous and current`)
		return Math.round(
			Math.abs(
				(previousPurchase.toDate() - futurePurchase.toDate()) /
					ONE_DAY_IN_MILLISECONDS,
			),
		);
	}
	if (previousPurchase < currentDate) {
		// console.log(previousPurchase < currentDate);
		return Math.round(
			(previousPurchase.toDate() - currentDate) / ONE_DAY_IN_MILLISECONDS,
		);
	} else {
		return Math.round(
			(currentDate - previousPurchase.toDate()) / ONE_DAY_IN_MILLISECONDS,
		);
	}
}
