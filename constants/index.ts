const SEO_TAGS_PER_PATH = {
  '/': {
    title: 'Welcome to Our Website',
    description:
      'Discover our amazing platform and learn more about what we offer.',
    keywords: 'home, welcome, platform, services',
    canonical: 'https://example.com',
    image: 'https://example.com/images/homepage.jpg',
    url: 'https://example.com'
  },
  '/sign-up': {
    title: 'Sign Up for an Account',
    description: 'Create an account to access exclusive features and benefits.',
    keywords: 'sign up, register, create account',
    canonical: 'https://example.com/auth/sign-up',
    image: 'https://example.com/images/signup.jpg',
    url: 'https://example.com/auth/sign-up'
  },
  '/login': {
    title: 'Login to Your Account',
    description: 'Access your account and manage your preferences.',
    keywords: 'login, sign in, account access',
    canonical: 'https://example.com/auth/login',
    image: 'https://example.com/images/login.jpg',
    url: 'https://example.com/auth/login'
  },
  '/dashboard': {
    title: 'Your Dashboard',
    description: 'View your personalized dashboard and manage your activities.',
    keywords: 'dashboard, user panel, account management',
    canonical: 'https://example.com/dashboard',
    image: 'https://example.com/images/dashboard.jpg',
    url: 'https://example.com/dashboard'
  },
  '/dashboard-iframe': {
    title: 'Embedded Dashboard',
    description: 'Access your dashboard in an embedded view.',
    keywords: 'iframe, embedded dashboard, user panel',
    canonical: 'https://example.com/dashboard-iframe',
    image: 'https://example.com/images/dashboard-iframe.jpg',
    url: 'https://example.com/dashboard-iframe'
  },
  '/dashboard-vue-in-ejs': {
    title: 'Vue-Powered Dashboard',
    description: 'Experience a dynamic dashboard powered by Vue.js.',
    keywords: 'vue, dynamic dashboard, modern UI',
    canonical: 'https://example.com/dashboard-vue-in-ejs',
    image: 'https://example.com/images/dashboard-vue.jpg',
    url: 'https://example.com/dashboard-vue-in-ejs'
  },
  '/hydrate-vue': {
    title: 'Hydrate Vue Component',
    description: 'Learn how to hydrate Vue components in your application.',
    keywords: 'vue, hydration, component',
    canonical: 'https://example.com/hydrate-vue',
    image: 'https://example.com/images/hydrate-vue.jpg',
    url: 'https://example.com/hydrate-vue'
  },
  '/cities': {
    title: 'Cities List',
    description: 'Explore the list of cities available in our database.',
    keywords: 'cities, locations, database',
    canonical: 'https://example.com/cities',
    image: 'https://example.com/images/cities.jpg',
    url: 'https://example.com/cities'
  },
  '/cities/new': {
    title: 'Add a New City',
    description: 'Submit a new city to our database.',
    keywords: 'add city, new location, database',
    canonical: 'https://example.com/cities/new',
    image: 'https://example.com/images/add-city.jpg',
    url: 'https://example.com/cities/new'
  },
  '/users': {
    title: 'User Management',
    description: 'Manage users and their permissions.',
    keywords: 'users, management, permissions',
    canonical: 'https://example.com/users',
    image: 'https://example.com/images/users.jpg',
    url: 'https://example.com/users'
  },
  '/users/new': {
    title: 'Add a New User',
    description: 'Create a new user account in the system.',
    keywords: 'add user, create account, management',
    canonical: 'https://example.com/users/new',
    image: 'https://example.com/images/add-user.jpg',
    url: 'https://example.com/users/new'
  }
}

const SEO_TAGS_PER_ERROR_PATH = {
  401: {
    title: 'Unauthorized Access',
    description: 'You are not authorized to access this page.',
    keywords: '401, unauthorized, error',
    canonical: 'https://example.com/401',
    image: 'https://example.com/images/401.jpg',
    url: 'https://example.com/401'
  },
  403: {
    title: 'Forbidden Access',
    description: 'You do not have permission to view this page.',
    keywords: '403, forbidden, error',
    canonical: 'https://example.com/403',
    image: 'https://example.com/images/403.jpg',
    url: 'https://example.com/403'
  },
  404: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    keywords: '404, not found, error',
    canonical: 'https://example.com/404',
    image: 'https://example.com/images/404.jpg',
    url: 'https://example.com/404'
  },
  500: {
    title: 'Internal Server Error',
    description: 'An unexpected error occurred on the server.',
    keywords: '500, server error, error',
    canonical: 'https://example.com/500',
    image: 'https://example.com/images/500.jpg',
    url: 'https://example.com/500'
  }
}

export { SEO_TAGS_PER_PATH, SEO_TAGS_PER_ERROR_PATH }
