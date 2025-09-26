// 1. Role-Based Access Control (RBAC)

// Scenario: Your application from Day 3 now needs to differentiate between regular users and administrators. 
// Admins should be able to access routes that regular users cannot.
// Task:

// Extend your JWT payload from Day 3 to include a role (e.g., 'user' or 'admin').

// Create a new middleware requireRole(role). 
// This middleware should be configurable to check for a specific role.

// It should use the req.user object created by your jwtAuth middleware. 
// If req.user.role matches the required role, it should call next(). Otherwise, 
// it should return a 403 Forbidden error.

// Create a new admin-only route, e.g., GET /api/admin/dashboard, 
// and protect it using jwtAuth and requireRole('admin').