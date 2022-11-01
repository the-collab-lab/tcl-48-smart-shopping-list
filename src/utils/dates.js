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

export function getDaysBetweenDates(previousPurchase) {
	// 	//console.log('in dates=',previousPurchase, Date.now());
	console.log(
		'dates functions=',
		Math.floor(Date.now() / 1000),
		previousPurchase,
	);
	return Math.abs((Date.now() - previousPurchase) / ONE_DAY_IN_MILLISECONDS);
}
