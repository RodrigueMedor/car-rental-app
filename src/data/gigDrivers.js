export const gigPlans = [
  { id: 1, name: 'Standard Rental', weeklyPrice: 250, mileageLimit: 'Unlimited', vehicleTypes: ['Sedan', 'SUV'], commitment: 'Weekly', features: ['Basic insurance', 'Roadside assistance', 'Unlimited mileage'], idealFor: 'Uber / Lyft drivers' },
  { id: 2, name: 'Premium Rental', weeklyPrice: 375, mileageLimit: 'Unlimited', vehicleTypes: ['SUV', 'Luxury SUV'], commitment: 'Weekly', features: ['Full coverage insurance', 'Roadside assistance', 'Unlimited mileage', 'Toll pass included', 'Free car washes'], idealFor: 'Uber Black / Lux drivers' },
  { id: 3, name: 'Delivery Van', weeklyPrice: 320, mileageLimit: 'Unlimited', vehicleTypes: ['Cargo Van'], commitment: 'Weekly', features: ['Commercial insurance', 'Roadside assistance', 'Unlimited mileage', 'Cargo tie-downs', 'GPS tracking'], idealFor: 'Amazon Flex / DoorDash drivers' },
  { id: 4, name: 'Heavy Duty Truck', weeklyPrice: 450, mileageLimit: 'Unlimited', vehicleTypes: ['Pickup Truck', 'Moving Truck'], commitment: 'Weekly', features: ['Commercial insurance', 'Roadside assistance', 'Unlimited mileage', 'Towing equipment', 'Loading ramp'], idealFor: 'Delivery / moving drivers' },
]

export const gigEarningsSample = {
  weeklyAverage: 1240,
  dailyAverage: 177,
  topEarners: [
    { name: 'Carlos R.', vehicle: 'Toyota Camry', weekly: 1850, platform: 'Uber' },
    { name: 'Maria G.', vehicle: 'Honda CR-V', weekly: 1620, platform: 'Lyft' },
    { name: 'James K.', vehicle: 'Ford Transit', weekly: 2100, platform: 'Amazon Flex' },
  ],
}
