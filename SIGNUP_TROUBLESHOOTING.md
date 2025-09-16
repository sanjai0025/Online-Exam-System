# Signup Troubleshooting Guide

## Issues Fixed:
1. ✅ **Critical Security Vulnerabilities** - Fixed Spring Framework vulnerabilities and unsafe CORS configuration
2. ✅ **Input Validation** - Added comprehensive null checks and validation
3. ✅ **Error Handling** - Improved error handling in controllers and services
4. ✅ **API Configuration** - Made API base URL configurable

## Steps to Fix Signup Issues:

### 1. Database Setup
**Problem**: MySQL database might not be running or configured properly.

**Solution**:
```bash
# Start MySQL service (Windows)
net start mysql

# Or start MySQL using XAMPP/WAMP if you're using those
```

Then run the database setup:
```sql
-- Run database-setup.sql in MySQL
mysql -u root -p < database-setup.sql
```

### 2. Check MySQL Connection
**Problem**: Database connection parameters might be wrong.

**Current config in application.properties**:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/app_db
spring.datasource.username=root
spring.datasource.password=Sanjai@1234
```

**Verify**:
- MySQL is running on port 3306
- Database `app_db` exists
- Username `root` with password `Sanjai@1234` can access the database

### 3. Start Backend Server
```bash
cd springapp
./mvnw spring-boot:run
# Or on Windows:
mvnw.cmd spring-boot:run
```

**Check**: Backend should start on http://localhost:8080

### 4. Start Frontend Server
```bash
cd reactapp
npm install
npm start
```

**Check**: Frontend should start on http://localhost:3000

### 5. Test Signup
1. Go to http://localhost:3000/signup
2. Fill in the form:
   - Username: testuser
   - Email: test@example.com
   - Full Name: Test User
   - Role: Student
   - Password: password123
   - Confirm Password: password123
3. Click "Create Account"

### 6. Common Error Messages and Solutions:

**"Registration failed: Connection refused"**
- Backend server is not running
- Start the Spring Boot application

**"Username already exists" or "Email already exists"**
- Try different username/email
- Check database for existing records

**"Network Error" or "CORS error"**
- Backend not running on port 8080
- CORS configuration issue (now fixed)

**"500 Internal Server Error"**
- Database connection issue
- Check MySQL service and credentials

### 7. Debug Steps:

1. **Check Backend Logs**:
   - Look for errors in Spring Boot console
   - Check for database connection errors

2. **Check Frontend Network Tab**:
   - Open browser DevTools → Network tab
   - Try signup and check if API call is made to http://localhost:8080/api/auth/register

3. **Test API Directly**:
   ```bash
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "testuser",
       "email": "test@example.com", 
       "fullName": "Test User",
       "password": "password123",
       "role": "STUDENT"
     }'
   ```

### 8. Environment Variables (Optional):
Create `.env` file in reactapp folder:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## Security Notes:
⚠️ **WARNING**: This application currently stores passwords in plain text, which is a critical security vulnerability. This is only acceptable for development/learning purposes. For production, implement proper password hashing using BCrypt.

## Next Steps After Fixing:
1. Implement password hashing with BCrypt
2. Add JWT token authentication
3. Implement proper session management
4. Add input sanitization
5. Set up proper CORS configuration for production