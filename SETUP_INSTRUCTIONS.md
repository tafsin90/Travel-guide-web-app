# Travel Guide Web App - Authentication System Setup

## Database Setup

The following tables should already exist in your MySQL database named `travel`:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visited_places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  spot_id INT NOT NULL,
  visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (spot_id) REFERENCES tourist_spots(id)
);

CREATE TABLE wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  spot_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (spot_id) REFERENCES tourist_spots(id)
);

CREATE TABLE tourist_spots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    district_id INT NOT NULL,
    spot_name VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (district_id) REFERENCES districts(id)
);

CREATE TABLE districts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) UNIQUE
);
```

## Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure your `Backend/db.js` file has the correct database credentials:
   ```javascript
   import mysql from 'mysql2/promise'

   export const db = await mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: 'tafsin0022', // Change this to your MySQL password
     database: 'travel'
   })
   ```

4. Start the backend server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

   The server will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will typically run on `http://localhost:5173` (or another port if 5173 is busy)

## Application Flow

1. **Initial Load**: The app redirects to `/login` if user is not authenticated
2. **Login/Register**: Users can register a new account or login with existing credentials
3. **After Authentication**: Users are redirected to `/home` (Home.jsx)
4. **Profile Page**: Accessible via navbar, shows:
   - User information (name, email)
   - Total visited places count
   - List of visited places
   - Search functionality to add places to wishlist
5. **Protected Routes**: All routes except `/login` and `/register` are protected and require authentication

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### User Profile
- `GET /api/user/profile` - Get user profile with visited places (requires authentication)
- `POST /api/user/wishlist` - Add a place to wishlist (requires authentication)
- `POST /api/user/visited` - Mark a place as visited (requires authentication)

### Search
- `GET /api/search?q=query` - Search tourist spots by name or district

## File Structure

### Backend
```
Backend/
├── db.js                    # Database connection
├── server.js                # Main server file
├── middleware/
│   └── auth.js             # JWT authentication middleware
└── routes/
    ├── auth.js             # Authentication routes (register, login)
    ├── user.js             # User routes (profile, wishlist, visited)
    └── search.js           # Search routes
```

### Frontend
```
Frontend/
├── src/
│   ├── App.jsx             # Main app component with routes
│   ├── main.jsx            # Entry point
│   ├── Components/
│   │   ├── Login.jsx       # Login component
│   │   ├── Register.jsx    # Register component
│   │   ├── Profile.jsx     # Profile component with search
│   │   ├── ProtectedRoute.jsx  # Route protection component
│   │   ├── Navbar.jsx      # Navigation bar with auth state
│   │   └── ...             # Other components
│   ├── routes/
│   │   ├── Home.jsx        # Home page (shown after login)
│   │   ├── Districts.jsx   # Districts listing
│   │   └── DistrictPlaces.jsx  # Places in a district
│   └── Styles/
│       ├── Auth.css        # Authentication page styles
│       ├── Profile.css     # Profile page styles
│       └── navbar.css      # Navbar styles
```

## Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ User Profile Page
- ✅ Visited Places Tracking
- ✅ Search Functionality
- ✅ Add to Wishlist
- ✅ Responsive UI

## Notes

- Tokens are stored in localStorage
- Tokens expire after 1 day
- All protected routes require a valid JWT token
- Search works on both place names and district names
- The navbar automatically updates based on authentication state


