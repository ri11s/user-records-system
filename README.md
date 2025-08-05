### User Management System

A web system for managing user records with instant status toggling

 ### Features:
- Add new users
- Display all users in a table
- Toggle active/inactive status
- Real-time UI updates

### Technologies Used :
- Frontend: HTML5, CSS3, JavaScript (ES6)
- Backend: PHP 8+
- Database: MySQL


### Prerequisites
- Web server (Apache/Nginx)
- PHP 8.0+
- MySQL 5.7+

### Setup Steps
1. Clone repository:
     git clone https://github.com/yourusername/user-records-system.git
   2. Import database:
     CREATE DATABASE user_records;
   USE user_records;
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(50) NOT NULL,
       age INT NOT NULL,
       status TINYINT DEFAULT 0
   );
   3. Configure connection:
   Edit PHP files in php/ folder to match your server settings

4. Run project:
   - Move files to htdocs or www folder
   - Access http://localhost/path-to-project

## Development Notes
- To change DB settings, edit PHP files directly
- For local development, use XAMPP/WAMP
