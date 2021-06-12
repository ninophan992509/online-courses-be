### Set utf8
```
ALTER DATABASE `onlinecw_online-courses` CHARACTER SET utf8 COLLATE utf8_general_ci;
```

### Generate migration file
```
sequelize migration:generate --name <name>
```

# API
```
localhost:3000/api/
```

## Authentication
```
auth/
```
* Register:
    ```
    POST '/register'
    ```
    Body:
    ```
    {
        "email":"lmtoan@email.com",
        "password":"123@Aa",
        "fullname":"Le Mau Toan"
    }
    ```
    Response:
    ```
    200 OK:
    {
        "message": null,
        "code": true,
        "data": {
            "id": 4,
            "email": "lmtoan@email.com",
            "fullname": "Le Mau Toan",
            "status": 1,
            "type": "student",
            "updatedAt": "2021-06-05T15:55:11.089Z",
            "createdAt": "2021-06-05T15:55:11.089Z"
        }
    }

    400 Bad Request:
    {
        "message": "Email existed",
        "code": false,
        "data": null
    }
    ```

* Signin:
    ```
    POST '/signin'
    ```
    Body:
    ```
    {
        "email":"lmtoan@email.com",
        "password":"123@Aa"
    }
    ```
    Response:
    ```
    200 OK:
    {
        "message": null,
        "code": true,
        "data": {
            "userInfo": {
                "id": 4,
                "email": "lmtoan@email.com",
                "fullname": "Le Mau Toan",
                "type": "student",
                "status": 1
            },
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA4NzMyLCJleHAiOjE2MjY1MDg3MzJ9.-VXvcXbEoaDs9n7TO1xuwxjy309CpEgwWhpXD27eiuo",
            "rfToken": "BtnVYvLfssuLMug1fclLdQQPUdfj1fFLtT64br3PV2nXhkX0PJHiQXjeTfovkbHtMhWAZ9Sl7s260RbebaqMF2gkuWAYEVayAJGC"
        }
    }

    404 Not Found:
    {
        "message": "Wrong email or password",
        "code": false,
        "data": null
    }
    ```

* Refresh AccessToken
    ```
    POST '/refresh-token'
    ```
    Body:
    ```
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA4OTI4LCJleHAiOjE2MjY1MDg5Mjh9.MSjYJk5Jl-4awaSDX0GwLK-wbz3hA62VBA1x-Cleg2c",  
        "refreshToken": "tCsbUZLvXFlCdjzJhP0yoBXbm8gNdLC9LqJxMgvnQvvqf6th5f6eem8FUUlH03cHCD4VOGWsGHWPb6mK4c4M9rL8XNUEXMYasBMU" 
    }
    ```
    Response:
    ```
    200 OK:
    {
        "message": null,
        "code": true,
        "data": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA4OTU5LCJleHAiOjE2MjY1MDg5NTl9.f5y4wIOKxBSBQYBAXFiaDRbV9NBBkBEYb8KgMhuTs9M"
        }
    }

    401 Unauthorized:
    {
        "message": "Invalid access token",
        "code": false,
        "data": null
    }

    400 Bad Request:
    {
        "message": "Invalid refresh token",
        "code": false,
        "data": null
    }
    ```

## Category
```
categories/
```

* Get category:
    ```
    GET '/'
    ```
    Response:
    ```
    {
        "count": 6,
        "rows": [
            {
                "id": 1,
                "category_name": "JAVA",
                "status": 1,
                "number_enrolled": 0,
                "createdBy": 1,
                "updatedBy": 1,
                "createdAt": "2021-06-03T08:11:17.000Z",
                "updatedAt": "2021-06-03T08:16:30.000Z"
            },
            ...
        ]
    }
    ```

* Create new category:
    ```
    POST '/'
    ```

    Body:
    ```
    {
        "category_name":"ANGULAR"
    }
    ```

    Response:
    ```
    {
        "id": 6,
        "category_name": "ANGULAR",
        "createdBy": 1,
        "status": 1,
        "updatedAt": "2021-06-03T08:12:41.465Z",
        "createdAt": "2021-06-03T08:12:41.465Z"
    }
    ```
* Edit category:
    ```
    PUT '/'
    ```
    Body:
    ```
    {
        "id": 1,
        "category_name":"JAVA 8"
    }
    ```
    Response:
    ```
    {
        "id": 1,
        "category_name": "JAVA 8",
        "status": 1,
        "number_enrolled": 0,
        "createdBy": 1,
        "updatedBy": 1,
        "createdAt": "2021-06-03T08:11:17.000Z",
        "updatedAt": "2021-06-03T08:44:19.965Z"
    }  
    ```
* Delete category:
    ```
    DELETE '/:id'
    ```

## Course
* Get course:
    ```
    GET '/'
    ```
    Query

    * `page`: page number (default: 1)
    * `limit`: number of course per page (default: 10)
    * `categoryId`
    
    Example:
    ```
    http://localhost:3000/api/courses?limit=2&categoryId=1
    ```

* Get list highlight courses:
    ```
    GET '/highlights'
    ```
    Response:
    ```
    200 OK
    {
        "message": null,
        "code": true,
        "data": [
            {
                "id": 1,
                "course_name": "Windows 10",
                "categoryId": 2,
                "picture": "",
                "description": "abc",
                "number_enrolled": 0,
                "rating": 0,
                "number_rating": 0,
                "tuition_fee": 2300,
                "sale": null,
                "status": -1,
                "teacherId": null,
                "createdBy": 2,
                "updatedBy": 2,
                "createdAt": "2021-06-05T08:44:00.000Z",
                "updatedAt": "2021-06-05T09:00:43.000Z"
            },
            ....
        ]
    }
    ```

* Get list most views courses:
    ```
    GET '/most-views'
    ```
    Response:
    ```
    200 OK
    {
        "message": null,
        "code": true,
        "data": [
            {
                "id": 1,
                "course_name": "Windows 10",
                "categoryId": 2,
                "picture": "",
                "description": "abc",
                "number_enrolled": 0,
                "rating": 0,
                "number_rating": 0,
                "tuition_fee": 2300,
                "sale": null,
                "status": -1,
                "teacherId": null,
                "createdBy": 2,
                "updatedBy": 2,
                "createdAt": "2021-06-05T08:44:00.000Z",
                "updatedAt": "2021-06-05T09:00:43.000Z"
            },
            ...
        ]
    }
    ```

* Get List enrolled courses
    ```
    GET '/enrolled?page=1&limit=10'
    ```
    Headers:
    ```
    {
        x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA3MTY2LCJleHAiOjE2MjY1MDcxNjZ9.MpH_R4P_O7-i1GEG5i-G-xkVXIpDHJTCkxqGlZFffO4
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": [
            {
                "id": 1,
                "course_name": "Java Basic",
                ...
            },
            {
                "id": 2,
                "course_name": "Angular",
                ...
            }
            ...
        ],
        "pageNumber": 1,
        "pageSize": 10,
        "totalPage": 1
    }
    ```

* Enroll course
    ```
    GET '/:id/enroll'
    ```
    Headers:
    ```
    {
        x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA3MTY2LCJleHAiOjE2MjY1MDcxNjZ9.MpH_R4P_O7-i1GEG5i-G-xkVXIpDHJTCkxqGlZFffO4
    }
    ```
    Response:
    ```
    200 OK:
    {
        "message": null,
        "code": true,
        "data": {
            "id": 17,
            "watching": 0,
            "done": "[]",
            "status": 1,
            "courseId": 1,
            "createdBy": 1,
            "updatedAt": "2021-06-05T16:13:45.925Z",
            "createdAt": "2021-06-05T16:13:45.925Z"
        }
    }
    ```

* Get Enroll course information
    ```
    POST '/:id/enroll'
    ```
    Headers:
    ```
    {
        x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA3MTY2LCJleHAiOjE2MjY1MDcxNjZ9.MpH_R4P_O7-i1GEG5i-G-xkVXIpDHJTCkxqGlZFffO4
    }
    ```
    Response:
    ```
    200 OK:
    {
        "message": null,
        "code": true,
        "data": {
            "id": 17,
            "watching": 0,
            "done": "[]",
            "status": 1,
            "courseId": 1,
            "createdBy": 1,
            "updatedAt": "2021-06-05T16:13:45.925Z",
            "createdAt": "2021-06-05T16:13:45.925Z"
        }
    }
    ```

* Update Enroll course information
    ```
    PUT '/:id/enroll'
    ```
    Headers:
    ```
    {
        x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA3MTY2LCJleHAiOjE2MjY1MDcxNjZ9.MpH_R4P_O7-i1GEG5i-G-xkVXIpDHJTCkxqGlZFffO4
    }
    ```
    Body:
    ```
    {
        "watching": 2,
        "done": "[1]",
        "status": 1
    }
    ```
    Response:
    ```
    200 OK:
    {
        "message": null,
        "code": true,
        "data": {
            "id": 17,
            "watching": 2,
            "done": "[1]",
            "status": 1,
            "courseId": 1,
            "createdBy": 1,
            "updatedAt": "2021-06-05T16:13:45.925Z",
            "createdAt": "2021-06-05T16:13:45.925Z"
        }
    }
    ```

## Storage
* Get Upload URL
    ```
    GET '/upload-url'
    ```
    Headers:
    ```
    {
        x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA3MTY2LCJleHAiOjE2MjY1MDcxNjZ9.MpH_R4P_O7-i1GEG5i-G-xkVXIpDHJTCkxqGlZFffO4
    }
    ```
    Response:
    ```
    200 OK:
    {
        "message": null,
        "code": true,
        "data": {
        "signedUrl": "https://storage.googleapis.com/online-course-316014.appspot.com/cf8de57b-6a80-452e-a0b5-ab0fcbec3218?X-Goog-Algorithm=GOOG4-RSA-SHA256&..."
        }
    }
    ```
## Video
* Get videos by chapterId
    ```
    GET '/by-chapterId/:chapterId'
    ```
    Headers:
    ```
    {
        x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA3MTY2LCJleHAiOjE2MjY1MDcxNjZ9.MpH_R4P_O7-i1GEG5i-G-xkVXIpDHJTCkxqGlZFffO4
    }
    ```
    Response:
    ```
    200 OK:
    {
        "message": null,
        "code": true,
        "data": [
            {
                "id": 1,
                "chapterId": 1,
                "title": "test video",
                "description": "this is a test video",
                "link": "https://storage.googleapis.com/online-course-316014.appspot.com/267b38ca-8372-4cff-84ec-a04bde067d6a",
                ...
            },
            {
                "id": 2,
                "chapterId": 1,
                "title": "test video",
                "description": "this is a test video",
                "link": "https://storage.googleapis.com/online-course-316014.appspot.com/267b38ca-8372-4cff-84ec-a04bde067d6a",
                ...
            }
        ]
    }
    ```

* Post video
    ```
    POST '/'
    ```
    Headers:
    ```
    {
        x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjIyOTA3MTY2LCJleHAiOjE2MjY1MDcxNjZ9.MpH_R4P_O7-i1GEG5i-G-xkVXIpDHJTCkxqGlZFffO4
    }
    ```
    Body:
    ```
    {
        "chapterId": 1,
        "title": "test video",
        "description": "this is a test video",
        "link": "https://storage.googleapis.com/online-course-316014.appspot.com/267b38ca-8372-4cff-84ec-a04bde067d6a",
        "time": 100
    }
    ```
    Response:
    ```
    200 OK:
    {
    "message": null,
    "code": true,
    "data": {
        "id": 3,
        "chapterId": 1,
        "title": "test video",
        "description": "this is a test video",
        "link": "https://storage.googleapis.com/online-course-316014.appspot.com/267b38ca-8372-4cff-84ec-a04bde067d6a",
        "time": 100,
        "createdBy": 1,
        ...
    }
    ```