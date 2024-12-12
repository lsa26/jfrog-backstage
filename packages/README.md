# Frontend
# Integrating JFrog Plugin into Backstage Application
This guide explains how to integrate the JFrog plugin into your Backstage application by adding a sidebar link and configuring the routing.

## Steps to Integrate the JFrog Plugin
### 1. Modify `Root.tsx` to Add JFrog Sidebar Link
To add the JFrog plugin link in the sidebar of your Backstage app, you need to modify the `Root.tsx` file.

#### File Location:
/packages/app/src/components/Root/Root.tsx

#### Changes Made:
In the `Root.tsx` file, a new sidebar item has been added for the JFrog plugin. The following JSX code was added:

```tsx
<SidebarItem icon={CreateComponentIcon} to="/jfrog" text="JFrog" />

### 2. Modify App.tsx to Add JFrog Route
Next, you need to define the route that will render the JFrog page when the user clicks the link in the sidebar.
/packages/app/src/App.tsx

Changes Made:
In the App.tsx file, a new route has been added to load the JFrog plugin page. The following import and route code were added:

import { JfrogPage } from 'backstage-plugin-jfrog';
...
<Route path="/jfrog" element={<JfrogPage />} />

Explanation:
The first line imports the JfrogPage component from the plugin.
The second line adds a new route to the Backstage app. When the user navigates to /jfrog, it will render the JfrogPage component, which is the main page of the JFrog plugin.

# Backend
# JFrog Script Executor

This is a simple backend built using Express.js that allows you to execute local shell scripts via an API. It exposes an endpoint that takes parameters like JFrog URL and access token to execute a specific shell script and returns the output or error.
## backend/src/index.ts - //JFrog backend plugin

## Features

- **Execute Local Scripts**: Allows executing Bash scripts stored in the `/plugins/jfrog/src/scripts/` directory.
- **API Endpoint**: Accepts a `POST` request to trigger script execution.
- **Error Handling**: Returns meaningful error messages when the script fails or parameters are missing.
- **CORS Support**: The server supports cross-origin requests.

## API Endpoint

### `POST /api/execute-script`

#### Request Body

The request should contain a JSON object with the following parameters:

- `scriptName` (string): The name of the script you want to execute.
- `jfrogUrl` (string): The URL of the JFrog instance.
- `jfrogAccessToken` (string): The access token for JFrog.

**Example Request Body:**

```json
{
  "scriptName": "myScript.sh",
  "jfrogUrl": "https://your.jfrog.url",
  "jfrogAccessToken": "your-access-token"
}



