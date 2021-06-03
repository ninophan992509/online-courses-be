### Set utf8
```
ALTER DATABASE `onlinecw_online-courses` CHARACTER SET utf8 COLLATE utf8_general_ci;
```

# API
```
localhost:3000/api/
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
                "category_name": "JAVA SUCK",
                "status": 1,
                "number_assigned": 0,
                "created_by": 1,
                "updated_by": 1,
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
        "created_by": 1,
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
        "number_assigned": 0,
        "created_by": 1,
        "updated_by": 1,
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
    * `category_id`
    
    Example:
    ```
    http://localhost:3000/api/courses?limit=2&category_id=1
    ```
