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
// i used the date function that you and kaitlin made
// added .toDate() after previousPurchase in the equation
export function getDaysBetweenDates(previousPurchase, currentDate) {
	if (!currentDate) {
		currentDate = Date.now();
	}
	return Math.round(
		Math.abs(
			(currentDate - previousPurchase.toDate()) / ONE_DAY_IN_MILLISECONDS,
		),
	);
}
