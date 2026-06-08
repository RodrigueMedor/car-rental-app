export const subscriptions = [
  {
    id: 'basic',
    name: 'Basic Plan',
    monthlyPrice: 29,
    features: ['1 vehicle swap per month', '5% discount on bookings', 'Standard support', 'Free GPS on all rentals', 'Cancel anytime'],
    color: 'blue',
    discount: 5,
    swaps: 1,
  },
  {
    id: 'family',
    name: 'Family Plan',
    monthlyPrice: 59,
    features: ['3 vehicle swaps per month', '15% discount on bookings', 'Priority support 24/7', 'Free family package add-on', 'Free GPS & child seats', 'Vacation concierge access'],
    color: 'green',
    discount: 15,
    swaps: 3,
  },
  {
    id: 'business',
    name: 'Business Plan',
    monthlyPrice: 129,
    features: ['10 vehicle swaps per month', '25% discount on bookings', 'Executive support line', 'Free airport concierge', 'Free damage waiver', 'Monthly billing', 'Dedicated account manager', 'Fleet management tools'],
    color: 'purple',
    discount: 25,
    swaps: 10,
  },
]
