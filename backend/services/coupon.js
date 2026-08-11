// shared by the preview and the checkout, so the two can't disagree

const REASON_EXPIRED = "expired"
const REASON_BELOW_MINIMUM = "below_minimum"

// the caller wraps this in its own response shape
function evaluateCoupon(coupon, cartTotal) {
    const now = new Date().getTime()
    const validFrom = new Date(coupon.valid_from).getTime()
    const validTo = new Date(coupon.valid_to).getTime()

    if (now < validFrom || now > validTo) {
        return { valid: false, reason: REASON_EXPIRED }
    }

    if (coupon.min_cart_amount !== null && cartTotal < coupon.min_cart_amount) {
        return {
            valid: false,
            reason: REASON_BELOW_MINIMUM,
            minCartAmount: coupon.min_cart_amount
        }
    }

    const discount = parseFloat(coupon.value)
    const newTotal = Math.max(0, cartTotal - discount)

    return { valid: true, discount, newTotal }
}

module.exports = { evaluateCoupon, REASON_EXPIRED, REASON_BELOW_MINIMUM }
