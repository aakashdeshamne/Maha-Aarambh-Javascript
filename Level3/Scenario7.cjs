// 7. API Response Standardization

// Scenario: To make your API predictable for frontend developers, 
// you want all successful responses and all error responses to follow a consistent JSON structure.
// Task: Create two utility functions: sendSuccess(res, data, statusCode = 200) 
// and sendError(res, message, statusCode = 500).

// sendSuccess should format the response as { "status": "success", "data": { ... } }.

// sendError should format the response as { "status": "error", "error": { "message": "..." } }.

// Refactor a simple CRUD API (like the one from Day 1) to use these functions for all its responses.