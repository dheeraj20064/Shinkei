// Mock AI summaries keyed by node label

export const MOCK_SUMMARIES = {
  'handleSubmit': {
    purpose: 'Handles the login form submission by validating credentials and authenticating the user.',
    calls: ['validateCredentials(form)', 'loginUser(email, password)', "navigate('/dashboard')", 'setError(msg)'],
    details: [
      'Prevents default form submission behavior',
      'Validates form input before making API call',
      'On success, navigates user to dashboard',
      'Catches errors and displays them via setError',
    ],
    complexity: 'Low',
    sideEffects: ['Navigation redirect', 'Error state update'],
  },
  'validateCredentials': {
    purpose: 'Validates email format and password length from the login form.',
    calls: ['setError(msg)'],
    details: [
      'Checks email is non-empty and contains @ symbol',
      'Enforces minimum password length of 8 characters',
      'Returns boolean indicating validity',
    ],
    complexity: 'Low',
    sideEffects: ['Error state update on validation failure'],
  },
  'loginUser': {
    purpose: 'Makes an HTTP POST request to the authentication endpoint with user credentials.',
    calls: ['fetch(/api/auth/login)', 'res.json()'],
    details: [
      'Sends email and password as JSON body',
      'Throws error if response is not OK',
      'Returns parsed JSON response on success',
    ],
    complexity: 'Low',
    sideEffects: ['Network request to auth API'],
  },
  'POST /api/auth/login': {
    purpose: 'Express route definition that maps POST /login to the auth controller.',
    calls: ['authController.login'],
    details: [
      'Routes through validateBody middleware',
      'Rate limiter applied to prevent brute force',
      'Delegates to authController.login handler',
    ],
    complexity: 'Low',
    sideEffects: ['None — route definition only'],
  },
  'authController.login': {
    purpose: 'Server-side login handler that authenticates users and generates JWT tokens.',
    calls: ['UserService.findByEmail(email)', 'jwt.sign(payload)', 'res.json()', 'res.status()'],
    details: [
      'Extracts email/password from request body',
      'Looks up user by email via UserService',
      'Returns 401 if user not found',
      'Signs JWT with user ID and secret',
      'Returns token + user object on success',
      'Catches and returns 500 on server error',
    ],
    complexity: 'Medium',
    sideEffects: ['JWT token generation', 'HTTP response'],
  },
  'UserService.findByEmail': {
    purpose: 'Finds a user by email and verifies their password using bcrypt.',
    calls: ['User.findOne()', 'bcrypt.compare()'],
    details: [
      'Queries MongoDB for user with matching email',
      'Selects password field (normally excluded)',
      'Uses lean() for performance',
      'Compares plain password with hashed version',
      'Returns null if no match, user object if valid',
    ],
    complexity: 'Medium',
    sideEffects: ['Database read query'],
  },
  'bcrypt.compare': {
    purpose: 'Compares a plain-text password against a bcrypt hash to verify authenticity.',
    calls: [],
    details: [
      'Uses bcryptjs library',
      'Takes plain password and stored hash as inputs',
      'Returns true if passwords match, false otherwise',
      'Timing-safe comparison prevents side-channel attacks',
    ],
    complexity: 'Low',
    sideEffects: ['None — pure comparison'],
  },
  'jwt.sign': {
    purpose: 'Creates a signed JSON Web Token containing user identity claims.',
    calls: [],
    details: [
      'Encodes user ID and role in token payload',
      'Signs with JWT_SECRET from environment variables',
      'Token expires after 7 days',
    ],
    complexity: 'Low',
    sideEffects: ['None — pure token generation'],
  },
  "res.json({token,user})": {
    purpose: 'Sends the final successful login response to the client.',
    calls: [],
    details: [
      'Returns HTTP 200 with JSON body',
      'Includes JWT token for subsequent auth headers',
      'Returns sanitized user object (id, email, name)',
    ],
    complexity: 'Low',
    sideEffects: ['HTTP response sent'],
  },
  "navigate('/dashboard')": {
    purpose: 'Navigates the user to the dashboard after successful login.',
    calls: [],
    details: [
      'Uses React Router navigate function',
      'Replaces /login in browser history (no back to login)',
      'Passes state indicating navigation came from login flow',
    ],
    complexity: 'Low',
    sideEffects: ['Client-side navigation', 'History stack modification'],
  },
  'handleCheckout': {
    purpose: 'Initiates the checkout process by validating the cart and creating an order via API.',
    calls: ['validateCart()', 'fetch(/api/orders/create)', "navigate('/order-confirmation')"],
    details: [
      'Validates cart items before proceeding',
      'Sends cart items as POST request to orders API',
      'Navigates to confirmation page with order ID on success',
    ],
    complexity: 'Medium',
    sideEffects: ['Network request', 'Navigation redirect'],
  },
  'validateCart': {
    purpose: 'Validates that the shopping cart is non-empty and all items have valid quantities.',
    calls: ['setError(msg)'],
    details: [
      'Checks cart is not null/empty',
      'Verifies each item has an ID and quantity ≥ 1',
      'Sets error message on validation failure',
    ],
    complexity: 'Low',
    sideEffects: ['Error state update'],
  },
  'handleSearch': {
    purpose: 'Handles search input by debouncing the query and fetching results from the API.',
    calls: ['debounce()', 'fetch(/api/search)', 'setResults()'],
    details: [
      'Debounces input with 300ms delay',
      'Fetches search results from API',
      'Updates local state with results',
    ],
    complexity: 'Low',
    sideEffects: ['Network request', 'State update'],
  },
  'debounce': {
    purpose: 'Utility that delays function execution until a specified time has elapsed since the last call.',
    calls: ['clearTimeout()', 'setTimeout()'],
    details: [
      'Returns a new debounced function',
      'Clears previous timer on each call',
      'Executes original function after delay expires',
      'Passes through all arguments',
    ],
    complexity: 'Low',
    sideEffects: ['Timer creation/cancellation'],
  },
};

export function getSummary(node) {
  return MOCK_SUMMARIES[node.label] || {
    purpose: `Processes logic defined in ${node.file} at line ${node.line}.`,
    calls: [],
    details: ['Summary not available in mock mode — connect a repository for AI-powered analysis.'],
    complexity: 'Unknown',
    sideEffects: ['Unknown'],
  };
}
