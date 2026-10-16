# School Admin Dashboard API

RESTful API endpoints for the School Admin Dashboard.

## Authentication Required
All API endpoints (except login) require admin authentication via session cookies.

## Base URL
```
http://localhost/school-dashboard/backend/api/
```

## Authentication Endpoints

### Login
```
POST /auth/login.php
```
**Body:**
```json
{
    "email": "admin@gmail.com",
    "password": "admin"
}
```
**Response:**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "email": "admin@gmail.com", 
            "name": "School Administrator"
        },
        "csrf_token": "abc123..."
    }
}
```

### Logout
```
POST /auth/logout.php
```
**Response:**
```json
{
    "success": true,
    "message": "Logout successful"
}
```

### Check Authentication
```
GET /auth/check.php
```
**Response:**
```json
{
    "success": true,
    "authenticated": true,
    "data": {
        "user": {
            "id": 1,
            "email": "admin@gmail.com",
            "name": "School Administrator"
        },
        "csrf_token": "abc123..."
    }
}
```

## Events Endpoints

### Get All Events
```
GET /events/
```
**Query Parameters:**
- `type` - Filter by event type (academic, sports, cultural, meeting, holiday, other)
- `status` - Filter by status (active, cancelled, completed)
- `upcoming` - Set to 'true' to get only upcoming events
- `limit` - Limit number of results

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "Annual Science Fair",
            "description": "Students will showcase their science projects...",
            "event_date": "2024-01-15",
            "start_time": "09:00:00",
            "end_time": "15:00:00",
            "location": "Main Auditorium",
            "event_type": "academic",
            "status": "active",
            "max_participants": 200,
            "current_participants": 45,
            "created_by": 1,
            "created_by_name": "School Administrator",
            "created_at": "2024-01-01 10:00:00",
            "updated_at": "2024-01-01 10:00:00"
        }
    ],
    "count": 1
}
```

### Get Single Event
```
GET /events/event.php?id={id}
```
**Response:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "Annual Science Fair",
        ...
    }
}
```

### Create Event
```
POST /events/
```
**Body:**
```json
{
    "title": "New Event",
    "description": "Event description",
    "event_date": "2024-02-15",
    "start_time": "10:00:00",
    "end_time": "12:00:00",
    "location": "Classroom A",
    "event_type": "academic",
    "status": "active",
    "max_participants": 50,
    "current_participants": 0
}
```
**Response:**
```json
{
    "success": true,
    "message": "Event created successfully",
    "data": {
        "id": 2,
        "title": "New Event",
        ...
    }
}
```

### Update Event
```
PUT /events/event.php?id={id}
```
**Body:** (Any subset of event fields)
```json
{
    "title": "Updated Event Title",
    "status": "completed"
}
```
**Response:**
```json
{
    "success": true,
    "message": "Event updated successfully",
    "data": {
        "id": 1,
        "title": "Updated Event Title",
        ...
    }
}
```

### Delete Event
```
DELETE /events/event.php?id={id}
```
**Response:**
```json
{
    "success": true,
    "message": "Event 'Event Title' deleted successfully"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
    "success": false,
    "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

## Event Types
- `academic` - Academic events like exams, fairs
- `sports` - Sports competitions and activities  
- `cultural` - Cultural programs and performances
- `meeting` - Meetings and conferences
- `holiday` - School holidays and breaks
- `other` - Other events

## Event Statuses
- `active` - Event is active and scheduled
- `cancelled` - Event has been cancelled
- `completed` - Event has been completed