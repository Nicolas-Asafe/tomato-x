# Tomato-X: Declarative JSON-Driven Backend Framework

A modern Node.js backend framework where HTTP routes are defined through JSON files organized in directories, rather than traditional code-based controllers.

## What is Tomato-X?

Tomato-X is an experimental backend framework that separates application structure, business logic, and response handling into distinct layers. Instead of writing controller functions, you organize files in folders and define route behavior through JSON configuration.

### Key Features

- **Declarative Routing**: Define routes using JSON, not code
- **File-Based Structure**: Routes live in organized folder hierarchies
- **Plugin Architecture**: Extend functionality with distros (plugin modules)
- **Pipeline Processing**: Request → Action → Response → Client
- **Type Validation**: Built-in parameter and response validation
- **Error Handling**: Standardized error responses with catch-response handlers

## How It Works

### The Three-Layer Pipeline

```
HTTP Request
    ↓
[ACTION] - Process request and extract data
    ↓
[RESPONSE] - Format data and send to client
    ↓
[CATCH_RESPONSE] - Handle errors if they occur
    ↓
HTTP Response
```

### The Distro System

Distros are plugin modules that provide reusable actions, responses, and validators. The framework ships with a `generic` distro containing basic functionality that you can extend or build upon.

## Project Structure

```
tomato/
├── boot/                          # Application initialization
│   ├── init_api.js                # Express server setup and request orchestration
│   ├── place_distros.js           # Loads distro plugins
│   └── recepts/                   # Route discovery
│       ├── recept_manifest.js     # Loads manifest.json
│       └── recept_routes.js       # Finds and loads routes
├── distros/                       # Plugin system
│   └── generic/                   # Default plugin
│       ├── actions/               # Request processors
│       ├── responses/             # Response formatters
│       ├── catchresponses/        # Error handlers
│       ├── params/                # Parameter validators
│       ├── types/                 # Data type validators
│       └── door.js                # Plugin interface
├── models/                        # Core data structures
│       ├── route.js               # Route definition and validation
│       ├── action.js              # Action model
│       ├── response.js            # Response model
│       ├── type.js                # Type validator model
│       └── manifest.js            # Project manifest model
├── user/
│   └── projects/                  # Your projects live here
│       └── testapi/               # Example project
│           ├── manifest.json      # Project configuration
│           └── users/             # Route folder
│               └── index.json     # Route configuration
├── util/                          # Utilities
│       ├── open_door.js           # Dynamic distro loader
│       └── readjson.js            # JSON file reader
├── main.js                        # Application entry point
├── package.json                   # Dependencies
└── WHATSNEW.md                    # Change documentation
```

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Create Your First Route

Create a route that responds with "I love tomatos" at `GET /tomatos`

#### Step 1: Create the folder structure

```
user/projects/testapi/tomatos/
```

#### Step 2: Create `index.json` with route configuration

**File**: `user/projects/testapi/tomatos/index.json`

```json
{
  "base": "generic:action_responsetxt",
  "method": "GET",
  "status": 200,
  "response": "generic:response_responsetxt",
  "catch_response": "generic:catch_responsetxt"
}
```

#### Step 3: Create a POST request body to send data

Make a request with:

```bash
curl -X GET http://localhost:8000/tomatos \
  -H "Content-Type: application/json" \
  -d '{"message": "I love tomatos"}'
```

#### Step 4: Start the server

```bash
npm run dev
```

The server will start on port 8000 (configured in `manifest.json`).

### 3. Understanding the Response

The route above will respond with:

```json
{
  "status": "success",
  "data": {
    "message": "I love tomatos"
  },
  "metadata": {
    "timestamp": "2026-01-03T10:30:45.123Z",
    "path": "/tomatos",
    "method": "GET"
  }
}
```

## Route Configuration (index.json)

Each route is defined in an `index.json` file with the following properties:

```json
{
  "base": "generic:action_responsetxt",
  "method": "GET",
  "status": 200,
  "response": "generic:response_responsetxt",
  "catch_response": "generic:catch_responsetxt",
  "params": {
    "customParam": "value"
  }
}
```

### Properties Explained

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `base` | string | Yes | Action to execute. Format: `"distro:action_name"` |
| `method` | string | No | HTTP method (GET, POST, PUT, DELETE, PATCH). Default: GET |
| `status` | number | No | HTTP status code for success. Default: 200 |
| `response` | string | No | Response handler. Format: `"distro:response_name"` |
| `catch_response` | string | No | Error handler. Format: `"distro:catch_response_name"` |
| `params` | string/number/boolean/object | No | Static parameters passed to the action |

**Note**: At least one of `response` or `catch_response` must be defined.

## Understanding the Request Pipeline

### Example: GET /users

**Request**:
```
GET /users
Content-Type: application/json

{
  "data": "user information"
}
```

**Route Configuration** (`user/projects/testapi/users/index.json`):
```json
{
  "base": "generic:action_responsetxt",
  "method": "GET",
  "status": 200,
  "response": "generic:response_responsetxt",
  "catch_response": "generic:catch_responsetxt",
  "params": {
    "message": "Welcome to users endpoint",
    "version": "1.0"
  }
}
```

**Execution Flow**:

1. **ACTION STAGE** (`generic:action_responsetxt`)
   - Receives request body and route params
   - Merges route parameters with request data
   - Validates parameters
   - Returns: `{ success: true, data, statusCode }`

2. **RESPONSE STAGE** (`generic:response_responsetxt`)
   - Receives processed data from action
   - Enriches with metadata (timestamp, path, method)
   - Formats as JSON response
   - Sends to client with proper HTTP status

3. **SUCCESS RESPONSE**:
```json
{
  "status": "success",
  "data": {
    "message": "Welcome to users endpoint",
    "version": "1.0",
    "data": "user information"
  },
  "metadata": {
    "timestamp": "2026-01-03T10:30:45.123Z",
    "path": "/users",
    "method": "GET"
  }
}
```

### Error Handling

If any stage throws an error, the **CATCH_RESPONSE STAGE** activates:

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "ACTION_ERROR",
  "path": "/users",
  "timestamp": "2026-01-03T10:30:45.123Z"
}
```

## Project Manifest (manifest.json)

Located at `user/projects/testapi/manifest.json`, this file configures your project:

```json
{
  "port": 8000,
  "author": "Your Name",
  "hello_route": true,
  "running_message": "Server is ready to love tomatos!",
  "rendered_directory": "",
  "distros": ["generic"]
}
```

### Manifest Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `port` | number | Yes | Server port |
| `author` | string | Yes | Project author name |
| `hello_route` | boolean | No | Enable `/hello` test route. Default: false |
| `running_message` | string | No | Custom startup message |
| `rendered_directory` | string | Yes | Directory where routes are located (usually empty string for root) |
| `distros` | array | Yes | List of distro plugin names to load |

## Creating a Complete Example

Let's create a simple API with two routes:

### Project Structure

```
user/projects/myapi/
├── manifest.json
├── greeting/
│   └── index.json
└── tomatos/
    └── index.json
```

### 1. Create manifest.json

**File**: `user/projects/myapi/manifest.json`

```json
{
  "port": 8000,
  "author": "John Developer",
  "hello_route": true,
  "running_message": "MyAPI is running and ready!",
  "rendered_directory": "",
  "distros": ["generic"]
}
```

### 2. Create GET /greeting route

**File**: `user/projects/myapi/greeting/index.json`

```json
{
  "base": "generic:action_responsetxt",
  "method": "GET",
  "status": 200,
  "response": "generic:response_responsetxt",
  "catch_response": "generic:catch_responsetxt",
  "params": {
    "greeting": "Hello, welcome to MyAPI!"
  }
}
```

**Test**:
```bash
curl http://localhost:8000/greeting
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "greeting": "Hello, welcome to MyAPI!"
  },
  "metadata": {
    "timestamp": "2026-01-03T11:00:00.000Z",
    "path": "/greeting",
    "method": "GET"
  }
}
```

### 3. Create GET /tomatos route

**File**: `user/projects/myapi/tomatos/index.json`

```json
{
  "base": "generic:action_responsetxt",
  "method": "GET",
  "status": 200,
  "response": "generic:response_responsetxt",
  "catch_response": "generic:catch_responsetxt",
  "params": "I love tomatos"
}
```

**Test**:
```bash
curl http://localhost:8000/tomatos
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "routeParam": "I love tomatos"
  },
  "metadata": {
    "timestamp": "2026-01-03T11:00:00.000Z",
    "path": "/tomatos",
    "method": "GET"
  }
}
```

## Running the Server

### Development Mode

```bash
npm run dev
```

Starts the server with hot-reload support.

### Available Scripts

Check `package.json` for available npm scripts:

```bash
npm run dev       # Start development server
npm start        # Start production server
npm test         # Run tests (if configured)
```

## Advanced Features

### Route Parameters

Pass static data from route configuration to your action:

```json
{
  "base": "generic:action_responsetxt",
  "method": "POST",
  "status": 201,
  "response": "generic:response_responsetxt",
  "catch_response": "generic:catch_responsetxt",
  "params": {
    "apiVersion": "v1",
    "requiresAuth": true,
    "rateLimit": 100
  }
}
```

These parameters are accessible in the action via `ctx.routeParams`.

### Nested Routes

Routes can be nested in folder hierarchies:

```
user/projects/testapi/
├── api/
│   ├── v1/
│   │   └── users/
│   │       └── index.json     → GET /api/v1/users
│   └── v2/
│       └── users/
│           └── index.json     → GET /api/v2/users
```

### Response Status Codes

Configure different HTTP status codes for different routes:

```json
{
  "base": "generic:action_responsetxt",
  "method": "POST",
  "status": 201,
  "response": "generic:response_responsetxt",
  "catch_response": "generic:catch_responsetxt"
}
```

## Extending Tomato-X

### Creating Custom Distros

Distros are plugin modules. Create a custom distro by:

1. Creating a new folder in `distros/mycontext/`
2. Implementing `door.js` with your actions, responses, and validators
3. Adding the distro name to your `manifest.json`

```json
{
  "distros": ["generic", "mycontext"]
}
```

## Troubleshooting

### Routes not loading?

1. Verify `manifest.json` exists in your project folder
2. Check that at least one distro is configured
3. Ensure route files are named exactly `index.json`
4. Run with `npm run dev` to see detailed error messages

### Response formatting issues?

- Verify both `response` and `catch_response` are configured
- Check that `data` in action return is always an object
- Ensure `statusCode` is between 100-599

### Distro not found?

- Add the distro name to `manifest.json` in the `distros` array
- Verify the distro folder exists in `distros/`
- Check that `door.js` exists and exports a default class

## Use Cases

Tomato-X is perfect for:

- **Learning**: Understand backend architecture without framework complexity
- **Prototyping**: Quickly build API structures without writing code
- **Experiments**: Test new ideas and patterns easily
- **Small Projects**: Simple, organized backends for microservices
- **API Mocking**: Create mock APIs for frontend development

## Architecture Benefits

| Aspect | Benefit |
|--------|---------|
| **Declarative** | No controller code needed |
| **Organized** | Files follow URL structure |
| **Extensible** | Add features via distros |
| **Maintainable** | Clear separation of concerns |
| **Learnable** | Minimal framework magic |

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

---

**Happy tomato-building! 🍅**
