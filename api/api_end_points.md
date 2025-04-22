## 4. API Endpoints

### 4.1 Authentication (`/auth`)

* **Base Path:** `/auth` (from `index.js`)

    #### 4.1.1 Register User

    * **Method:** `POST`
    * **Path:** `/auth/user`
    * **Description:** Registers a new user.

    * **Request Body (FormData):**

        * `studentId` (String, required): Student ID.
        * `username` (String, required): Username.
        * `cafeStatus` (String, required): Cafe status.
        * `department` (String, required): Department.
        * `email` (String, required): Email address.
        * `gender` (String, required): Gender.
        * `password` (String, required): Password.
        * `phone` (String, required): Phone number.
        * `userType` (String, required): User type (e.g., "student", "admin").
        * `profilePic` (File, optional): Profile picture.

    * **Response Codes:**

        * `200 OK`: User registered successfully.
        * `200 OK`: "Please fill the required inputs"
        * `200 OK`: "User Id is already taken"
        * `500 Internal Server Error`: Server error during registration.

    * **Response Body (Success):**

        ```json
        {
          "message": "User account created successfully",
          "finalSavedUser": {
            "_id": "65...",
            "studentId": "12345",
            "username": "johndoe",
            "cafeStatus": "cafe",
            "department": "Computer Science",
            "email": "john.doe@example.com",
            "gender": "male",
            "phone": "123-456-7890",
            "userType": "student",
            "profilePic": "https://cloudinary...",
            "digitalId": "https://cloudinary...",
            "__v": 0
          }
        }
        ```

    * **Response Body (Error):**

        ```json
        {
          "message": "Account creation failed"
        }
        ```

    #### 4.1.2 Get User(s)

    * **Method:** `GET`
    * **Path:** `/auth/users/:id`
    * **Description:** Retrieves user(s). `:id` can be a specific user ID or "all".

    * **Response Codes:**

        * `200 OK`: User data retrieved successfully.
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success - Single User):**

        ```json
        {
          "message": "User data",
          "user": {
            "_id": "65...",
            "studentId": "12345",
            "username": "johndoe",
            "cafeStatus": "cafe",
            "department": "Computer Science",
            "email": "john.doe@example.com",
            "gender": "male",
            "phone": "123-456-7890",
            "userType": "student",
            "profilePic": "https://cloudinary...",
            "digitalId": "https://cloudinary...",
            "__v": 0
          }
        }
        ```

    * **Response Body (Success - All Users):**

        ```json
        {
          "message": "All users data",
          "users": [
            {
              "_id": "65...",
              "studentId": "12345",
              "username": "johndoe",
              "cafeStatus": "cafe",
              "department": "Computer Science",
              "email": "john.doe@example.com",
              "gender": "male",
              "phone": "123-456-7890",
              "userType": "student",
              "profilePic": "https://cloudinary...",
              "digitalId": "https://cloudinary...",
              "__v": 0
            },
            // ... more users
          ]
        }
        ```

    #### 4.1.3 Get Digital ID

    * **Method:** `POST`
    * **Path:** `/auth/digitalid`
    * **Description:** Retrieves a user's digital ID.

    * **Request Body:**

        ```json
        {
          "userId": "12345" // studentId
        }
        ```

    * **Response Codes:**

        * `200 OK`: Digital ID retrieved successfully.
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "Digital ID",
          "digitalId": "https://cloudinary...",
          "user": {
            "_id": "65...",
            "studentId": "12345",
            "username": "johndoe",
            "cafeStatus": "cafe",
            "department": "Computer Science",
            "email": "john.doe@example.com",
            "gender": "male",
            "phone": "123-456-7890",
            "userType": "student",
            "profilePic": "https://cloudinary...",
            "__v": 0
          }
        }
        ```

    #### 4.1.4 Register Guest

    * **Method:** `POST`
    * **Path:** `/auth/guest`
    * **Description:** Registers a guest user.

    * **Request Body:**

        ```json
        {
          "username": "Guest User",
          "phone": "987-654-3210",
          "gender": "male"  // optional
        }
        ```

    * **Response Codes:**

        * `200 OK`: Guest registered successfully.
        * `200 OK`: "Please fill the required inputs"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "New user saved successfully"
        }
        ```

    #### 4.1.5 Student Login

    * **Method:** `POST`
    * **Path:** `/auth/studentlogin`
    * **Description:** Logs in a student user.

    * **Request Body:**

        ```json
        {
          "id": "12345",  // studentId
          "password": "password123"
        }
        ```

    * **Response Codes:**

        * `200 OK`: Login successful.
        * `400 Bad Request`: "Please fill the required inputs!"
        * `200 OK`: "Wrong Credentials!"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "Login Success",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cE..."  // JWT token
        }
        ```

    #### 4.1.6 User Login

    * **Method:** `POST`
    * **Path:** `/auth/login`
    * **Description:** Logs in a user (non-student).

    * **Request Body:**

        ```json
        {
          "email": "user@example.com",
          "password": "password123"
        }
        ```

    * **Response Codes:**

        * `200 OK`: Login successful.
        * `400 Bad Request`: "Please fill the required inputs!"
        * `200 OK`: "Wrong Credientials!"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "Login Success",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cE..."  // JWT token
        }
        ```

    #### 4.1.7 Forgot Password

    * **Method:** `POST`
    * **Path:** `/auth/forgot-password`
    * **Description:** Initiates the password reset process by sending an OTP to the user's email.

    * **Request Body:**

        ```json
        {
          "email": "user@example.com"
        }
        ```

    * **Response Codes:**

        * `200 OK`: OTP sent successfully.
        * `200 OK`: "Please fill the required inputs!"
        * `200 OK`: "User with the given email does not exist"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "OTP sent to your email"
        }
        ```

    #### 4.1.8 Reset Password

    * **Method:** `POST`
    * **Path:** `/auth/reset-password`
    * **Description:** Resets the user's password after OTP verification. Requires the `verifyOTP` middleware to be used before this route.

    * **Request Body:**

        ```json
        {
          "email": "user@example.com",
          "newPassword": "newpassword123"
        }
        ```

    * **Response Codes:**

        * `200 OK`: Password reset successfully.
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "Password reset successfully"
        }
        ```

### 4.2 Notices (`/notice`)

* **Base Path:** `/notice` (from `index.js`)

    #### 4.2.1 Get Notices

    * **Method:** `GET`
    * **Path:** `/notice/:category`
    * **Description:** Retrieves notices. `:category` can be "all" or a specific category.

    * **Response Codes:**

        * `200 OK`: Notices retrieved successfully.
        * `200 OK`: "No notices found"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "Notices Found",
          "notices": [
            {
              "_id": "65...",
              "category": "general",
              "description": "Important announcement",
              "owner": "Admin",
              "title": "Meeting",
              "__v": 0
            },
            // ... more notices
          ]
        }
        ```

    #### 4.2.2 Create Notice

    * **Method:** `POST`
    * **Path:** `/notice`
    * **Description:** Creates a new notice.

    * **Request Body:**

        ```json
        {
          "title": "Meeting",
          "owner": "Admin",
          "description": "Important announcement",
          "category": "general"
        }
        ```

    * **Response Codes:**

        * `200 OK`: Notice created successfully.
        * `200 OK`: "Please fill the required inputs"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "New notices has been added.",
          "newNotice": {
            "_id": "65...",
            "category": "general",
            "description": "Important announcement",
            "owner": "Admin",
            "title": "Meeting",
            "__v": 0
          }
        }
        ```

### 4.3 Belongings (`/belongings`)

* **Base Path:** `/belongings` (from `index.js`)

    #### 4.3.1 Get Belongings

    * **Method:** `GET`
    * **Path:** `/belongings/:filter`
    * **Description:** Retrieves belongings. `:filter` can be "all" or a specific belonging `_id`.

    * **Response Codes:**

        * `200 OK`: Belongings retrieved successfully.
        * `200 OK`: "No items found"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "Items Found",
          "belongings": [
            {
              "_id": "65...",
              "userId": "65...",
              "serialKey": "ABCD123",
              "__v": 0
            },
            // ... more belongings
          ]
        }
        ```

    #### 4.3.2 Register Belonging

    * **Method:** `POST`
    * **Path:** `/belongings`
    * **Description:** Registers a belonging.

    * **Request Body:**

        ```json
        {
          "userId": "65...",
          "serialKey": "ABCD123"
        }
        ```

    * **Response Codes:**

        * `200 OK`: Belonging registered successfully.
        * `200 OK`: "Please fill the required inputs"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "New Items added.",
          "newBelongings": {
            "_id": "65...",
            "userId": "65...",
            "serialKey": "ABCD123",
            "__v": 0
          }
        }
        ```

### 4.4 Messages (`/messages`)

* **Base Path:** `/messages` (from `index.js`)

    #### 4.4.1 Get Messages

    * **Method:** `GET`
    * **Path:** `/messages/:category`
    * **Description:** Retrieves messages. `:category` can be "all" or a specific category.

    * **Response Codes:**

        * `200 OK`: Messages retrieved successfully.
        * `200 OK`: "No messages found"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "Messages Found",
          "messages": [
            {
              "_id": "65...",
              "message": "Hello everyone!",
              "category": "general",
              "__v": 0
            },
            // ... more messages
          ]
        }
        ```

    #### 4.4.2 Create Message

    * **Method:** `POST`
    * **Path:** `/messages`
    * **Description:** Creates a new message.

    * **Request Body:**

        ```json
        {
          "message": "Hello everyone!",
          "category": "general"
        }
        ```

    * **Response Codes:**

        * `200 OK`: Message created successfully.
        * `200 OK`: "Please fill the required inputs"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "New messages added.",
          "newMessage": {
            "_id": "65...",
            "message": "Hello everyone!",
            "category": "general",
            "__v": 0
          }
        }
        ```

### 4.5 Activities (`/activity`)

* **Base Path:** `/activity` (from `index.js`)

    #### 4.5.1 Get Activities

    * **Method:** `GET`
    * **Path:** `/activity/:filter`
    * **Description:** Retrieves activities. `:filter` can be "all", "cafe", "gate", "school", or a specific `userId`.

    * **Response Codes:**

        * `200 OK`: Activities retrieved successfully.
        * `200 OK`: "No activities found"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "Activities Found",
          "activities": [
            {
              "_id": "65...",
              "userId": "65...",
              "description": "User entered the cafe",
              "title": "Cafe Entry",
              "category": "cafe",
              "__v": 0
            },
            // ... more activities
          ]
        }
        ```

    #### 4.5.2 Create Activity

    * **Method:** `POST`
    * **Path:** `/activity`
    * **Description:** Creates a new activity log.

    * **Request Body:**

        ```json
        {
          "userId": "65...",
          "description": "User entered the cafe",
          "title": "Cafe Entry",
          "category": "cafe"
          }
        ```

    * **Response Codes:**

        * `200 OK`: Activity created successfully.
        * `200 OK`: "Please fill the required inputs"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "New activity added.",
          "newActivity": {
            "_id": "65...",
            "userId": "65...",
            "description": "User entered the cafe",
            "title": "Cafe Entry",
            "category": "cafe",
            "__v": 0
          }
        }
        ```

### 4.6 Gate (`/gate`)

* **Base Path:** `/gate` (from `index.js`)

    #### 4.6.1 Enter Gate

    * **Method:** `POST`
    * **Path:** `/gate/enter`
    * **Description:** Records a user's entry into the campus.

    * **Request Body:**

        ```json
        {
          "id": "65..." // User's _id
        }
        ```

    * **Response Codes:**

        * `200 OK`: Entry recorded successfully.
        * `200 OK`: "Please fill the required inputs"
        * `200 OK`: "You may NOT enter" (if user is not found)
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "You may enter"
        }
        ```

    #### 4.6.2 Leave Gate

    * **Method:** `POST`
    * **Path:** `/gate/leave`
    * **Description:** Records a user's exit from the campus.

    * **Request Body:**

        ```json
        {
          "id": "65..." // User's _id
        }
        ```

    * **Response Codes:**

        * `200 OK`: Exit recorded successfully.
        * `200 OK`: "Please fill the required inputs"
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "You may leave"
        }
        ```

### 4.7 Cafe (`/cafe`)

* **Base Path:** `/cafe` (from `index.js`)

    #### 4.7.1 Enter Cafe

    * **Method:** `POST`
    * **Path:** `/cafe/enter`
    * **Description:** Records a user's entry into the cafe.

    * **Request Body:**

        ```json
        {
          "id": "65..." // User's _id
        }
        ```

    * **Response Codes:**

        * `200 OK`: Entry recorded successfully.
        * `200 OK`: "Please fill the required inputs"
        * `200 OK`: "You may NOT enter. You are not in the system." (if user is not found)
        * `200 OK`: "You may NOT enter. You are not a cafe user." (if user's cafe status is not valid)
        * `200 OK`: "You can not enter twice for the same meal..." (if user tries to enter too soon after a previous meal)
        * `500 Internal Server Error`: Server error.

    * **Response Body (Success):**

        ```json
        {
          "message": "You may enter"
        }
        ```
        