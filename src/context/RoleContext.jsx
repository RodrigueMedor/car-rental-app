import { createContext, useContext, useMemo } from 'react'
import { useAuth } from './AuthContext'
import { ROLES } from '../data/users'

const PERMISSIONS = {
  [ROLES.CUSTOMER]: {
    canBrowse: true,
    canBook: true,
    canManageOwnBookings: true,
    canViewFavorites: true,
    canPurchaseAddons: true,
    canManageProfile: true,
    canLeaveReviews: true,
    canViewTripDetails: true,
  },
  [ROLES.HOST]: {
    canBrowse: true,
    canBook: true,
    canManageOwnBookings: true,
    canViewFavorites: true,
    canPurchaseAddons: true,
    canManageProfile: true,
    canAddVehicles: true,
    canEditOwnVehicles: true,
    canDeleteOwnVehicles: true,
    canManageAvailability: true,
    canManagePricing: true,
    canViewOwnBookings: true,
    canViewEarnings: true,
    canViewReviews: true,
    canOfferExperiences: true,
    canOfferConcierge: true,
    canUploadPhotos: true,
    canViewAnalytics: true,
  },
  [ROLES.FLEET_OWNER]: {
    canBrowse: true,
    canBook: true,
    canManageOwnBookings: true,
    canViewFavorites: true,
    canPurchaseAddons: true,
    canManageProfile: true,
    canAddVehicles: true,
    canEditOwnVehicles: true,
    canDeleteOwnVehicles: true,
    canManageAvailability: true,
    canManagePricing: true,
    canViewOwnBookings: true,
    canViewEarnings: true,
    canViewReviews: true,
    canBulkUpdateVehicles: true,
    canManageFleet: true,
    canViewFleetAnalytics: true,
    canViewFleetRevenue: true,
    canManageEmployees: true,
    canViewUtilizationReports: true,
  },
  [ROLES.SUPPORT_AGENT]: {
    canViewSupportTickets: true,
    canManageCustomerIssues: true,
    canViewBookings: true,
    canProcessRefunds: true,
    canRespondToInquiries: true,
    canViewCustomerData: true,
  },
  [ROLES.CLAIMS_MANAGER]: {
    canViewDamageReports: true,
    canManageInsuranceClaims: true,
    canReviewIncidentReports: true,
    canUploadClaimDocuments: true,
    canApproveClaims: true,
    canRejectClaims: true,
    canViewClaimDetails: true,
  },
  [ROLES.SUPER_ADMIN]: {
    canBrowse: true,
    canBook: true,
    canManageOwnBookings: true,
    canViewFavorites: true,
    canPurchaseAddons: true,
    canManageProfile: true,
    canAddVehicles: true,
    canEditOwnVehicles: true,
    canDeleteOwnVehicles: true,
    canManageAvailability: true,
    canManagePricing: true,
    canViewOwnBookings: true,
    canViewEarnings: true,
    canViewReviews: true,
    canOfferExperiences: true,
    canOfferConcierge: true,
    canManageAllUsers: true,
    canManageAllVehicles: true,
    canManageAllBookings: true,
    canManageSubscriptions: true,
    canManageExperiences: true,
    canManageConcierge: true,
    canManagePlatformSettings: true,
    canManagePromotions: true,
    canViewAnalytics: true,
    canViewReports: true,
    canModerateContent: true,
    canManageAllClaims: true,
    canManageSupportTickets: true,
    canSuspendUsers: true,
    canActivateUsers: true,
    canVerifyUsers: true,
    canApproveHosts: true,
    canApproveVehicles: true,
    canManageFees: true,
    canManageCommission: true,
    canViewPlatformRevenue: true,
  },
}

const RoleContext = createContext(null)

export function RoleProvider({ children }) {
  const { currentUser, hasRole } = useAuth()

  const value = useMemo(() => {
    const role = currentUser?.role || null
    const permissions = PERMISSIONS[role] || {}
    return {
      role,
      roles: ROLES,
      hasRole,
      permissions,
      can: (permission) => !!permissions[permission],
      isCustomer: role === ROLES.CUSTOMER,
      isHost: role === ROLES.HOST,
      isFleetOwner: role === ROLES.FLEET_OWNER,
      isSupportAgent: role === ROLES.SUPPORT_AGENT,
      isClaimsManager: role === ROLES.CLAIMS_MANAGER,
      isSuperAdmin: role === ROLES.SUPER_ADMIN,
      isLoggedIn: !!currentUser,
    }
  }, [currentUser, hasRole])

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}

export { ROLES }
