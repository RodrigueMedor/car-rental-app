export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  HOST: 'HOST',
  FLEET_OWNER: 'FLEET_OWNER',
  SUPPORT_AGENT: 'SUPPORT_AGENT',
  CLAIMS_MANAGER: 'CLAIMS_MANAGER',
  SUPER_ADMIN: 'SUPER_ADMIN',
}

export const users = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(305) 555-0101', role: ROLES.HOST, avatar: 'https://i.pravatar.cc/150?u=sarah', driverScore: 4.9, badges: ['Trust Badge', 'Safe Driver Badge', 'Premium Member Badge'] },
  { id: 2, name: 'Mike Chen', email: 'mike@example.com', phone: '(305) 555-0102', role: ROLES.HOST, avatar: 'https://i.pravatar.cc/150?u=mike', driverScore: 4.7, badges: ['Trust Badge'] },
  { id: 3, name: 'Emily Davis', email: 'emily@example.com', phone: '(305) 555-0103', role: ROLES.HOST, avatar: 'https://i.pravatar.cc/150?u=emily', driverScore: 4.8, badges: ['Trust Badge', 'Safe Driver Badge'] },
  { id: 4, name: 'Carlos Rodriguez', email: 'carlos@example.com', phone: '(305) 555-0104', role: ROLES.CUSTOMER, avatar: 'https://i.pravatar.cc/150?u=carlos', driverScore: 4.5, badges: ['Trust Badge'] },
  { id: 5, name: 'Lisa Thompson', email: 'lisa@example.com', phone: '(305) 555-0105', role: ROLES.CUSTOMER, avatar: 'https://i.pravatar.cc/150?u=lisa', driverScore: 4.6, badges: ['Safe Driver Badge'] },
  { id: 6, name: 'Admin User', email: 'admin@sunshinewheels.com', phone: '(305) 555-0000', role: ROLES.SUPER_ADMIN, avatar: 'https://i.pravatar.cc/150?u=admin', driverScore: 5.0, badges: ['Premium Member Badge'] },
  { id: 7, name: 'David Wilson', email: 'david@example.com', phone: '(305) 555-0106', role: ROLES.CUSTOMER, avatar: 'https://i.pravatar.cc/150?u=david', driverScore: 4.3, badges: [] },
  { id: 8, name: 'Ana Martinez', email: 'ana@example.com', phone: '(305) 555-0107', role: ROLES.HOST, avatar: 'https://i.pravatar.cc/150?u=ana', driverScore: 4.9, badges: ['Trust Badge', 'Premium Member Badge'] },
  { id: 9, name: 'James Fleet', email: 'james@fleet.com', phone: '(305) 555-0201', role: ROLES.FLEET_OWNER, avatar: 'https://i.pravatar.cc/150?u=james', driverScore: 4.8, badges: ['Fleet Manager Badge', 'Trust Badge'] },
  { id: 10, name: 'Support Agent', email: 'support@sunshinewheels.com', phone: '(305) 555-0301', role: ROLES.SUPPORT_AGENT, avatar: 'https://i.pravatar.cc/150?u=support', driverScore: 5.0, badges: ['Support Specialist'] },
  { id: 11, name: 'Claims Manager', email: 'claims@sunshinewheels.com', phone: '(305) 555-0401', role: ROLES.CLAIMS_MANAGER, avatar: 'https://i.pravatar.cc/150?u=claims', driverScore: 5.0, badges: ['Insurance Specialist'] },
]
