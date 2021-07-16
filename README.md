### Set utf8
```
ALTER DATABASE `online-course` CHARACTER SET utf8 COLLATE utf8_general_ci;
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
/auth
```
* Register: lmtoan
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

* Signin: lmtoan
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

* Refresh AccessToken: lmtoan
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
    Query:
    * `page` (number): page number
    * `limit` (number): item per page

    Example query:
    ```
    http://localhost:3000/api/categories?limit=2&page=2
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "count": 8,
            "rows": [
                {
                    "id": 3,
                    "category_name": "ASP.NET",
                    "status": 1,
                    "number_enrolled": 3,
                    "parentId": null,
                    "createdBy": 1,
                    "updatedBy": 1,
                    "createdAt": "2021-06-03T08:11:17.000Z",
                    "updatedAt": "2021-06-03T08:11:17.000Z",
                    "categories": [
                        {
                            "id": 9,
                            "category_name": "ASP.NET CORE",
                            "status": 1,
                            "number_enrolled": 0,
                            "parentId": 3,
                            "createdBy": 4,
                            "updatedBy": null,
                            "createdAt": "2021-06-12T09:07:43.000Z",
                            "updatedAt": "2021-06-12T09:07:43.000Z"
                        },
                        {
                            "id": 10,
                            "category_name": "ASP.NET CORE CORE CORE",
                            "status": 1,
                            "number_enrolled": 0,
                            "parentId": 3,
                            "createdBy": 4,
                            "updatedBy": null,
                            "createdAt": "2021-06-12T09:08:37.000Z",
                            "updatedAt": "2021-06-12T09:08:37.000Z"
                        }
                    ]
                },
                {
                    "id": 4,
                    "category_name": "NodeJs",
                    "status": 1,
                    "number_enrolled": 1,
                    "parentId": null,
                    "createdBy": 1,
                    "updatedBy": 1,
                    "createdAt": "2021-06-03T08:11:17.000Z",
                    "updatedAt": "2021-06-03T08:11:17.000Z",
                    "categories": []
                }
            ]
        },
        "pageNumber": 2,
        "pageSize": 2
    }
    ```

* Get category by id:
    ```
    GET '/:id'
    ```
    Example query:
    ```
    http://localhost:3000/api/categories/3
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 3,
            "category_name": "ASP.NET",
            "status": 1,
            "number_enrolled": 3,
            "parentId": null,
            "createdBy": 1,
            "updatedBy": 1,
            "createdAt": "2021-06-03T08:11:17.000Z",
            "updatedAt": "2021-06-03T08:11:17.000Z",
            "categories": [
                {
                    "id": 9,
                    "category_name": "ASP.NET CORE",
                    "status": 1,
                    "number_enrolled": 0,
                    "parentId": 3,
                    "createdBy": 4,
                    "updatedBy": null,
                    "createdAt": "2021-06-12T09:07:43.000Z",
                    "updatedAt": "2021-06-12T09:07:43.000Z"
                },
                {
                    "id": 10,
                    "category_name": "ASP.NET CORE CORE CORE",
                    "status": 1,
                    "number_enrolled": 0,
                    "parentId": 3,
                    "createdBy": 4,
                    "updatedBy": null,
                    "createdAt": "2021-06-12T09:08:37.000Z",
                    "updatedAt": "2021-06-12T09:08:37.000Z"
                }
            ]
        }
    }
    ```

* Get categories which have the most enrollments this week:
    ```
    GET '/most-enroll-this-week'
    ```

    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": [
            {
                "id": 3,
                "category_name": "ASP.NET",
                "number_enrolled": 3,
                "status": 1,
                "createdAt": "2021-06-03T08:11:17.000Z",
                "updatedAt": "2021-06-03T08:11:17.000Z",
                "createdBy": 1,
                "updatedBy": 1,
                "numberEnrollThisWeek": 3
            },
            {
                "id": 4,
                "category_name": "NodeJs",
                "number_enrolled": 1,
                "status": 1,
                "createdAt": "2021-06-03T08:11:17.000Z",
                "updatedAt": "2021-06-03T08:11:17.000Z",
                "createdBy": 1,
                "updatedBy": 1,
                "numberEnrollThisWeek": 1
            },
            {
                "id": 8,
                "category_name": "ANGULAR 3",
                "number_enrolled": 1,
                "status": 1,
                "createdAt": "2021-06-08T03:17:39.000Z",
                "updatedAt": "2021-06-09T08:02:25.000Z",
                "createdBy": 2,
                "updatedBy": null,
                "numberEnrollThisWeek": 1
            },
            {
                "id": 1,
                "category_name": "Java",
                "number_enrolled": 1,
                "status": 1,
                "createdAt": "2021-06-03T08:11:17.000Z",
                "updatedAt": "2021-06-03T08:11:17.000Z",
                "createdBy": 1,
                "updatedBy": 1,
                "numberEnrollThisWeek": 1
            }
        ]
    }
    ```

* Create new category (admin):
    ```
    POST '/'
    ```

    Body:
    ```
    {
        "category_name":"ANGULAR 3"
    }
    ```

    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 8,
            "category_name": "ANGULAR 3",
            "createdBy": 2,
            "status": 1,
            "number_enrolled": 0,
            "updatedAt": "2021-06-08T03:17:39.153Z",
            "createdAt": "2021-06-08T03:17:39.153Z"
        }
    }
    ```

* Edit category (admin):
    ```
    PUT '/'
    ```
    Body:
    ```
    {
        "id": 11,
        "category_name":"JAVA 8"
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 11,
            "category_name": "JAVA 8",
            "status": 1,
            "number_enrolled": 0,
            "parentId": null,
            "createdBy": 4,
            "updatedBy": 4,
            "createdAt": "2021-06-12T09:27:52.000Z",
            "updatedAt": "2021-06-12T10:33:11.272Z",
            "categories": []
        }
    }
    ```

* Delete category (admin):
    ```
    DELETE '/:id'
    ```

## Course
```
courses/
```
* Get course:
    ```
    GET '/'
    ```
    Query

    * `page` (number): page number (default: 1)
    * `limit` (number): number of course per page (default: 10)
    * `categoryId` (number)
    * `teacherId` (number)
    * `sort` (string) [`rating` or `cost`]

    Status:
    * 1: teacher uploaded all document and video
    * 0: not finish uploading

    Example:
    ```
    http://localhost:3000/api/courses?teacherId=1&categoryId=3
    ```
    Response:
    ```
    
    ```

* Get newest course list:
    ```
    GET '/newest'
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "count": 1,
            "rows": [
                {
                    "id": 3,
                    "course_name": "ASP.NET Window tool",
                    "categoryId": 3,
                    "picture": null,
                    "description": "This is a course to create a tool with ASP.NET",
                    "number_enrolled": 1,
                    "rating": 4,
                    "number_rating": 1,
                    "total_rating": 4,
                    "tuition_fee": 3000,
                    "sale": null,
                    "status": 1,
                    "teacherId": 1,
                    "createdBy": 4,
                    "updatedBy": null,
                    "createdAt": "2021-06-05T08:44:00.000Z",
                    "updatedAt": "2021-06-09T06:50:05.000Z",
                    "isNew": true,
                    "isMostEnrolled": true,
                    "isHighlight": true
                }
            ]
        },
        "pageNumber": 1,
        "pageSize": 10
    }
    ```


* Get list highlight courses: lmtoan
    ```
    GET '/highlights'
    ```
    Example:
    ```
    http://localhost:3000/api/courses/highlights
    ```
    Response:
    ```
    200 OK
    {
        "message": null,
        "code": true,
        "data": [
            {
                "id": 3,
                "course_name": "ASP.NET Window tool",
                "categoryId": 3,
                "picture": null,
                "description": "This is a course to create a tool with ASP.NET",
                "number_enrolled": 1,
                "rating": 4,
                "number_rating": 1,
                "total_rating": 4,
                "tuition_fee": 3000,
                "sale": null,
                "status": 1,
                "teacherId": 1,
                "createdBy": 4,
                "updatedBy": null,
                "createdAt": "2021-06-05T08:44:00.000Z",
                "updatedAt": "2021-06-09T06:50:05.000Z"
            },
            ...
        ]
    }
    ```

* Get list most views courses: lmtoan
    ```
    GET '/most-views'
    ```

    Example:
    ```
    http://localhost:3000/api/courses/most-views
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
                "total_rating": 0,
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

* Get list most enrolled courses in week: lmtoan
    ```
    GET '/most-enrolled'
    ```
    Example:
    ```
    http://localhost:3000/api/courses/most-enrolled
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
                ...
            },
            ...
        ]
    }
    ```
    
* Search course by course_name, descriprion: lmtoan
    ```
    GET '/search'
    ```
    Query:

    * `page` (number): page number (default: 1)
    * `limit` (number): number of course per page (default: 10)
    * `query` (string)
    
    Example:
    http://localhost:3000/api/courses/search?query=frame&page=1&limit=3
    ```
    Response:
    {
        "message": null,
        "code": true,
        "data": [
            {
                "id": 6,
                "course_name": "Java Framework 7",
                "number_enrolled": 2,
                "rating": 5,
                "number_rating": 1,
                "picture": "string",
                "tuition_fee": 2300,
                "sale": 0,
                "description": "test edit 2",
                "status": 1,
                "createdAt": "2021-06-08T03:43:56.000Z",
                "updatedAt": "2021-06-27T16:49:09.000Z",
                "createdBy": 5,
                "updatedBy": 5,
                "teacherId": 5,
                "categoryId": 10,
                "total_rating": 5,
                "short_description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
        ],
        "pageNumber": 1,
        "pageSize": 1
    }
    ```


* Create new course (admin, teacher):
    ```
    POST `/`
    ```
    Example:
    ```
    http://localhost:3000/api/courses
    ```
    Body:
    ```
    {
        "course_name": "Java Framework 14",
        "picture": "string",
        "tuition_fee": 2300,
        "description": "abc",
        "categoryId": 8
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 9,
            "course_name": "Java Framework 14",
            "picture": "string",
            "tuition_fee": 2300,
            "description": "abc",
            "categoryId": 8,
            "createdBy": 4,
            "teacherId": 4,
            "status": 0,
            "number_enrolled": 0,
            "sale": 0,
            "updatedAt": "2021-06-10T13:30:04.247Z",
            "createdAt": "2021-06-10T13:30:04.247Z"
        }
    }
    ```

* Edit course (admin, teacher of course):
    ```
    PUT '/'
    ```
    Example:
    ```
    http://localhost:3000/api/courses
    ```
    Body:
    ```
    {
        "id": 9,
        "description": "test edit 2"
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 9,
            "course_name": "Java Framework 14",
            "categoryId": 8,
            "picture": "string",
            "description": "test edit 2",
            "number_enrolled": 0,
            "rating": 0,
            "number_rating": 0,
            "total_rating": 0,
            "tuition_fee": 2300,
            "sale": 0,
            "status": 0,
            "teacherId": 4,
            "createdBy": 4,
            "updatedBy": 4,
            "createdAt": "2021-06-10T13:30:04.000Z",
            "updatedAt": "2021-06-10T13:31:52.873Z"
        }
    }
    ```

* Delete course (admin, teacher of course):
    ```
    DELETE '/:id'
    ```
    Example:
    ```
    http://localhost:3000/api/courses/9
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": null
    }
    ```

* Get one course:
    ```
    GET '/:id'
    ```
    Example:
    ```
    http://localhost:3000/api/courses/6
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 6,
            "course_name": "Java Framework 7",
            "categoryId": 3,
            "picture": "string",
            "description": "test edit 2",
            "number_enrolled": 2,
            "rating": 4,
            "number_rating": 1,
            "total_rating": 4,
            "tuition_fee": 2300,
            "sale": 0,
            "status": 1,
            "teacherId": 5,
            "createdBy": 5,
            "updatedBy": 5,
            "createdAt": "2021-06-08T03:43:56.000Z",
            "updatedAt": "2021-06-09T15:03:41.000Z"
        }
    }
    ```

* Get List enrolled courses: lmtoan
    ```
    GET '/enrolled?page=1&limit=10'
    ```
    Query:
    * `page`: page number
    * `limit`: number item per page
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
        "data": {
            count: 3,
            rows:[
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
            ]
        },
        "pageNumber": 1,
        "pageSize": 10
    }
    ```

* Get all chapters of course:
    ```
    GET /:id/chapters
    ```

    Example:
    ```
    http://localhost:3000/api/courses/8/chapters
    ```

    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "count": 8,
            "rows": [
                {
                    "id": 1,
                    "courseId": 8,
                    "chapter_name": "Lorem ipsum dolor sit amet, consecte",
                    "description": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur ",
                    "is_previewed": 1,
                    "status": 1,
                    "createdBy": 5,
                    "updatedBy": 4,
                    "createdAt": "2021-06-09T10:26:25.000Z",
                    "updatedAt": "2021-06-09T16:07:08.000Z",
                    "documents": [
                        {
                            "id": 2,
                            "chapterId": 1,
                            "title": "abc",
                            "description": null,
                            "status": 1,
                            "createdBy": 4,
                            "updatedBy": null,
                            "createdAt": "2021-06-09T15:48:57.000Z",
                            "updatedAt": "2021-06-09T15:48:57.000Z"
                        },
                        {
                            "id": 3,
                            "chapterId": 1,
                            "title": "abc",
                            "description": null,
                            "status": 1,
                            "createdBy": 4,
                            "updatedBy": null,
                            "createdAt": "2021-06-09T15:49:12.000Z",
                            "updatedAt": "2021-06-09T15:49:12.000Z"
                        },
                        {
                            "id": 4,
                            "chapterId": 1,
                            "title": "abc",
                            "description": null,
                            "status": 1,
                            "createdBy": 4,
                            "updatedBy": null,
                            "createdAt": "2021-06-09T15:49:21.000Z",
                            "updatedAt": "2021-06-09T15:49:21.000Z"
                        }
                    ],
                    "lessons": []
                },
                ...
            ]
        },
        "pageNumber": 1,
        "pageSize": 10
    }
    ```

* Get rating of course (1-5):
    ```
    GET /:id/rating
    ```
    Example:
    ```
    http://localhost:3000/api/courses/6/rating
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 1,
            "5": 0
        }
    }
    ```

* Get feedbacks of course:
    ```
    '/:id/feedbacks'
    ```
    Query:
    * `page`: page number
    * `limit`: number item per page
    Example:
    ```
    http://localhost:3000/api/courses/6/feedbacks?limit=10
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "count": 1,
            "rows": [
                {
                    "id": 11,
                    "courseId": 6,
                    "title": "Cloud for beginner 10",
                    "content": "string",
                    "rating": 4,
                    "status": 1,
                    "createdBy": 4,
                    "updatedBy": 4,
                    "createdAt": "2021-06-09T05:04:18.000Z",
                    "updatedAt": "2021-06-09T06:50:17.000Z"
                }
            ]
        },
        "pageNumber": 1,
        "pageSize": 10
    }
    ```

* Get Enroll course information: lmtoan
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

* Enroll course: lmtoan
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

* Update enroll course: lmtoan
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

* Teacher get self courses
    ```
    GET '/my-course'
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
            "count": 5,
            "rows": [
                {
                    "id": 1,
                    "course_name": "Java Basic",
                    "categoryId": 1,
                    "picture": null,
                    "short_description": "ipsum dolor",
                    "description": "This is an java basic course",
                    "number_enrolled": 1,
                    "rating": 0,
                    "number_rating": 0,
                    "total_rating": 0,
                    "tuition_fee": 2300,
                    "sale": null,
                    "status": -1,
                    "teacherId": 1,
                    "createdBy": 4,
                    "updatedBy": null,
                    "createdAt": "2021-06-05T08:44:00.000Z",
                    "updatedAt": "2021-06-05T08:44:00.000Z",
                    "category_name": "Java",
                    "teacher_name": "Le Mau Toan"
                },
                ...
            ]
        },
        "pageNumber": 1,
        "pageSize": 10
    }
    ```

## Chapter
* Create new chapter (admin, teacher of course):
    ```
    POST '/'
    ```
    Example:
    ```
    http://localhost:3000/api/chapters
    ```
    Body:
    ```
    {
        "courseId": 8,
        "chapter_name":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 7,
            "courseId": 8,
            "chapter_name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
            "createdBy": 4,
            "status": 1,
            "updatedAt": "2021-06-10T14:09:11.504Z",
            "createdAt": "2021-06-10T14:09:11.504Z"
        }
    }
    ```

* Get chapters by courseId (same as get all chapters of couse):
    ```
    GET '/'
    ```
    Example:
    ```
    http://localhost:3000/api/chapters?courseId=8
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "count": 9,
            "rows": [
                {
                    "id": 1,
                    "courseId": 8,
                    "chapter_name": "Lorem ipsum dolor sit amet, consecte",
                    "description": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur ",
                    "is_previewed": 1,
                    "status": 1,
                    "createdBy": 5,
                    "updatedBy": 4,
                    "createdAt": "2021-06-09T10:26:25.000Z",
                    "updatedAt": "2021-06-09T16:07:08.000Z",
                    "documents": [
                        {
                            "id": 2,
                            "chapterId": 1,
                            "title": "abc",
                            "description": null,
                            "status": 1,
                            "createdBy": 4,
                            "updatedBy": null,
                            "createdAt": "2021-06-09T15:48:57.000Z",
                            "updatedAt": "2021-06-09T15:48:57.000Z"
                        },
                        {
                            "id": 3,
                            "chapterId": 1,
                            "title": "abc",
                            "description": null,
                            "status": 1,
                            "createdBy": 4,
                            "updatedBy": null,
                            "createdAt": "2021-06-09T15:49:12.000Z",
                            "updatedAt": "2021-06-09T15:49:12.000Z"
                        },
                        {
                            "id": 4,
                            "chapterId": 1,
                            "title": "abc",
                            "description": null,
                            "status": 1,
                            "createdBy": 4,
                            "updatedBy": null,
                            "createdAt": "2021-06-09T15:49:21.000Z",
                            "updatedAt": "2021-06-09T15:49:21.000Z"
                        }
                    ],
                    "videos": []
                },
                ...
            ]
        },
        "pageNumber": 1,
        "pageSize": 10
    }
    ```

* Get info of chapter (include documents and videos of chapter):
    ```
    GET '/:id'
    ```
    Example:
    ```
    http://localhost:3000/api/chapters/1
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 1,
            "courseId": 8,
            "chapter_name": "Lorem ipsum dolor sit amet, consecte",
            "description": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur ",
            "is_previewed": 1,
            "status": 1,
            "createdBy": 5,
            "updatedBy": 4,
            "createdAt": "2021-06-09T10:26:25.000Z",
            "updatedAt": "2021-06-09T16:07:08.000Z",
            "documents": [
                {
                    "id": 2,
                    "chapterId": 1,
                    "title": "abc",
                    "description": null,
                    "status": 1,
                    "createdBy": 4,
                    "updatedBy": null,
                    "createdAt": "2021-06-09T15:48:57.000Z",
                    "updatedAt": "2021-06-09T15:48:57.000Z"
                },
                {
                    "id": 3,
                    "chapterId": 1,
                    "title": "abc",
                    "description": null,
                    "status": 1,
                    "createdBy": 4,
                    "updatedBy": null,
                    "createdAt": "2021-06-09T15:49:12.000Z",
                    "updatedAt": "2021-06-09T15:49:12.000Z"
                },
                {
                    "id": 4,
                    "chapterId": 1,
                    "title": "abc",
                    "description": null,
                    "status": 1,
                    "createdBy": 4,
                    "updatedBy": null,
                    "createdAt": "2021-06-09T15:49:21.000Z",
                    "updatedAt": "2021-06-09T15:49:21.000Z"
                }
            ],
            "videos": []
        }
    }
    ```

* Edit chapter (admin, teacher of course)
    ```
    PUT '/:id'
    ```
    Example:
    ```
    http://localhost:3000/api/chapters/1
    ```
    Body:
    ```
    {
        "id": 1,
        "chapter_name": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "is_previewed": 1
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 1,
            "courseId": 8,
            "chapter_name": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "description": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur ",
            "is_previewed": 1,
            "status": 1,
            "createdBy": 5,
            "updatedBy": 4,
            "createdAt": "2021-06-09T10:26:25.000Z",
            "updatedAt": "2021-06-10T14:15:03.560Z"
        }
    }
    ```

* Delete chapter (admin, teacher of course)
    ```
    DELETE '/:id'
    ```
    Example:
    ```
    http://localhost:3000/api/chapters/4
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": null
    }
    ```


## Document
* Create new document (admin, teacher of course):
    ```
    POST '/'
    ```
    Example:
    ```
    http://localhost:3000/api/documents
    ```
    Body:
    ```
    {
        "chapterId": 1,
        "title": "Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae."
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 5,
            "chapterId": 1,
            "title": "Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae.",
            "createdBy": 4,
            "status": 1,
            "updatedAt": "2021-06-10T14:22:20.467Z",
            "createdAt": "2021-06-10T14:22:20.467Z"
        }
    }
    ```

* Get documents by chapterId:
    ```
    GET '/'
    ```
    Example:
    ```
    http://localhost:3000/api/documents?chapterId=1
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "count": 4,
            "rows": [
                {
                    "id": 2,
                    "chapterId": 1,
                    "title": "Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae.",
                    "description": null,
                    "status": 1,
                    "createdBy": 4,
                    "updatedBy": 4,
                    "createdAt": "2021-06-09T15:48:57.000Z",
                    "updatedAt": "2021-06-10T14:29:10.000Z"
                },
                ...
            ]
        },
        "pageNumber": 1,
        "pageSize": 10
    }
    ```

* Get info of document
    ```
    GET '/:id'
    ```
    Example:
    ```
    http://localhost:3000/api/documents/2
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 2,
            "chapterId": 1,
            "title": "abc",
            "description": null,
            "status": 1,
            "createdBy": 4,
            "updatedBy": null,
            "createdAt": "2021-06-09T15:48:57.000Z",
            "updatedAt": "2021-06-09T15:48:57.000Z"
        }
    }
    ```

* Edit document (admin, teacher of course)
    ```
    PUT '/:id'
    ```
    Example:
    ```
    http://localhost:3000/api/documents
    ```
    Body:
    ```
    {
        "id": 2,
        "chapterId": 1,
        "title": "Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae."
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 2,
            "chapterId": 1,
            "title": "Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae.",
            "description": null,
            "status": 1,
            "createdBy": 4,
            "updatedBy": 4,
            "createdAt": "2021-06-09T15:48:57.000Z",
            "updatedAt": "2021-06-10T14:29:10.931Z"
        }
    }
    ```

* Delete document (admin, teacher of course)

    ```
    DELETE /:id
    ```
    Example:
    ```
    http://localhost:3000/api/documents/4
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": null
    }
    ```
## Storage
```
/storage
```
* Get Upload URL: lmtoan
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
```
/video
```
* Get videos by chapterId: lmtoan
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

* Post video: lmtoan
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

## Lesson
```
/lesson
```
* Get lesson detail by Id
    ```
    GET '/:id'
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
        {
            "message": null,
            "code": true,
            "data": {
                "id": 1,
                "chapterId": 1,
                "name": "Lesson 1",
                "number_order": 1,
                "content": "This is a lesson",
                "createdBy": 1,
                "updatedBy": 1,
                "createdAt": null,
                "updatedAt": null,
                "videos": [
                    {
                        "id": 1,
                        "lessonId": 1,
                        "title": "test video",
                        "description": "this is a test video",
                        "link": "https://storage.googleapis.com/online-course-316014.appspot.com/267b38ca-8372-4cff-84ec-a04bde067d6a",
                        "time": 0,
                        "status": 0,
                        "createdBy": 1,
                        "updatedBy": null,
                        "createdAt": null,
                        "updatedAt": null
                    },
                    ...
                ],
                "documents": [
                    {
                        "id": 5,
                        "lessonId": 1,
                        "title": "Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae.",
                        "description": null,
                        "status": 1,
                        "link": null,
                        "createdBy": 4,
                        "updatedBy": null,
                        "createdAt": "2021-06-10T14:22:20.000Z",
                        "updatedAt": "2021-06-10T14:22:20.000Z"
                    },
                    ...
                ]
            }
        }
    }

* Create lesson
    ```
    POST ''
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
        "name": "Lesson 1",
        "number_order": 1,
        "content": "this is a lesson"
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 2,
            "chapterId": 1,
            "name": "Lesson 2",
            "number_order": 2,
            "content": "",
            "updatedAt": "2021-07-15T08:52:31.800Z",
            "createdAt": "2021-07-15T08:52:31.800Z"
        }
    }
    ```

* Update lesson
    ```
    PUT '/:id'
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
        "name": "Lesson 1",
        "number_order": 1,
        "content": "this is a lesson"
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 2,
            "chapterId": 1,
            "name": "Lesson 2",
            "number_order": 2,
            "content": "",
            "updatedAt": "2021-07-15T08:52:31.800Z",
            "createdAt": "2021-07-15T08:52:31.800Z"
        }
    }
    ```

* Delete lesson
    ```
    DELETE '/:id'
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
        "data": null
    }
    ```

## Users
```
/users
```
* Create teacher
    ```
    POST '/teacher'
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
        "email":"test.teacher@gmail.com",
        "password":"123123",
        "fullname":"Test Teacher"
    }
    ```
    Response:
    ```
    {
        "message": null,
        "code": true,
        "data": {
            "id": 9,
            "email": "test.teacher@gmail.com",
            "fullname": "Test Teacher",
            "status": 1,
            "type": "teacher",
            "updatedAt": "2021-07-16T15:18:12.536Z",
            "createdAt": "2021-07-16T15:18:12.536Z"
        }
    }
    ```

* Delete user
    ```
    DELETE '/:id'
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
        "data": null
    }
    ```

