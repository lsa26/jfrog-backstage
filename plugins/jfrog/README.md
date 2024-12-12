# JFrog Repository Management

This project provides a set of scripts to manage repositories in JFrog Artifactory. It includes two main operations:

1. **Create Repositories**: Using a configuration file, this script will create repositories in Artifactory via the REST API.
2. **Delete Repositories**: This script will delete all repositories that exist in Artifactory.

The repository configurations should be updated regularly according to the new requirements or changes in the JFrog platform. This is controlled via the `repositories-config.json` file.

## Files

### `repositories-config.json`

This file contains the configuration for the repositories to be created in Artifactory. It includes the details like the repository keys, types, and other configuration settings.

You should update this file regularly based on the latest updates or requirements from the JFrog platform. This file allows you to define the repository settings and relationships between them.

**Example `repositories-config.json`:**
```json
{
  "repositories": [
    {
      "key": "repo1",
      "rclass": "local",
      "packageType": "maven",
      "description": "A sample Maven repository"
    },
    {
      "key": "repo2",
      "rclass": "remote",
      "packageType": "npm",
      "url": "https://npm.jfrog.org"
    }
  ]
}


# JFrog Repository Management Plugin - Editing Guide

This Backstage plugin allows users to manage repositories on the JFrog platform by automating repository creation and deletion processes. The main page of the plugin is built in React and can be customized by editing a specific file.

## Editing the Plugin Page

The main page of the plugin is defined in the `ExampleComponent.tsx` file. This is where you can modify the UI and functionality of the plugin.

### File Location:

To edit the page, navigate to the following file within your project directory:
plugins/jfrog/src/components/ExampleComponent/ExampleComponent.tsx


### What You Can Edit in `ExampleComponent.tsx`:

1. **UI Customization**: You can modify how the page looks by adjusting the JSX structure and Material-UI components used (e.g., buttons, text fields, dialogs).
   - Add or remove components like buttons, text inputs, or headers.
   - Change the content of the cards or buttons (e.g., titles, descriptions).
   - Customize styles by modifying the CSS or adding new classes.

2. **Script Execution**: The file contains logic to call the shell scripts (`create.sh` and `delete.sh`). If you need to adjust how these scripts are executed or add new scripts, you can modify the `executeScript` function.
   
3. **State Management**: The React component uses React's `useState` and `useEffect` hooks to manage the state of the page. You can add more state variables if needed to store additional data or handle more user interactions.

4. **Encryption/Token Handling**: The component encrypts and stores the JFrog URL and access token in the browser's local storage. If you want to change how tokens are handled (e.g., using a different method of encryption or storing them elsewhere), you can update the encryption logic in the `saveConfiguration` function.

5. **Dialogs and Confirmation**: There are dialogs for entering the JFrog URL and Access Token and for confirming the execution of scripts. You can modify these dialogs, change their content, or add new ones as needed.

### Example Customization:

For instance, to change the button text that triggers the creation of repositories, you would look for the following JSX code in `ExampleComponent.tsx`:

```tsx
<Button
  variant="contained"
  color="primary"
  className={styles.cardButton}
  onClick={() => handleConfirmOpen('create.sh')}
  disabled={isCreating}
>
  {isCreating ? 'In Progress...' : 'Create Repositories'}
</Button>

You can modify the button text, style, or behavior as needed.