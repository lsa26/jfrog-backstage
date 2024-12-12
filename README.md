# JFrog Management Plugin for Backstage

This plugin integrates [JFrog Artifactory](https://www.jfrog.com/artifactory/) with [Backstage](https://backstage.io/), providing an interface for managing repositories and automating tasks directly from Backstage.

## Features

- **Create Repositories**: Automate the creation of repositories on your JFrog Artifactory platform.
- **Delete Repositories**: Remove all repositories from your JFrog Artifactory platform.
- **Secure Token Storage**: Store your JFrog access token securely in the browser's local storage, encrypted for ease of use.
- **Customizable Configuration**: Modify repository configurations in the `repositories-config.json` file to customize your repository setup.
- **Simple UI**: A user-friendly interface for entering your JFrog configuration (URL and access token).

## Requirements

- A running [Backstage](https://backstage.io/) instance.
- Access to a [JFrog Artifactory](https://www.jfrog.com/artifactory/) instance with the necessary API credentials (API key/token).

## Installation

Follow the steps below to install the JFrog plugin into your Backstage project.

### 1. Clone the Plugin Repository

Clone the repository into the `plugins/jfrog` directory of your Backstage project.

git clone https://github.com/lsa26/jfrog-backstage/plugins/jfrog plugins/jfrog

### 2. Install Dependencies
Navigate to the plugins/jfrog folder and install the required dependencies.

cd plugins/jfrog
yarn install

# Linking the JFrog Plugin to Backstage Using Yarn Link

This allows you to use the plugin in your Backstage instance without manually copying files.

## In the Plugin Directory
1. Navigate to the plugin directory (`plugins/jfrog`).
2. Run the following command to make the plugin available in your local Yarn registry:

yarn link
yarn link backstage-plugin-jfrog

### 3. Link the Plugin to Backstage and add it to the menu

To use the plugin, you need to modify your Backstage app's files.

Modify /packages/app/src/App.tsx

Import the JFrog plugin and add a route for the JFrog page.

import { JfrogPage } from 'backstage-plugin-jfrog';

<Route path="/jfrog" element={<JfrogPage />} />

Modify /packages/app/src/components/Root/Root.tsx

Add a sidebar item for navigation to the JFrog page.

<SidebarItem icon={CreateComponentIcon} to="/jfrog" text="JFrog" />


### 4.a Configure access (mandatory)

Go to /plugins/jfrog/src/scripts/create.sh

Edit your PATHBACKSTAGE="/PathToBackstageFolder" #Backstage folder root. Here it's https://github.com/lsa26/jfrog-backstage/ for example

### 4.b Configure UI experience (optional)

Go to /plugins/jfrog/src/scripts/repositories-config.json to decide repositories you want to create, by default is all repositories (Example)

Go to /plugins/jfrog/src/components/ExampleComponent/ExampleComponent.tsx to edit the plugin page


### 5. You are ready to test
Open the url: http://localhost:3000/jfrog
![image](https://github.com/user-attachments/assets/91bf87ef-8f6a-4672-a05b-3397c99307eb)

Configure your credentials
![image](https://github.com/user-attachments/assets/10a408a1-ed6c-4b55-ad2d-17525524e1c5)

Use create all repositories
![image](https://github.com/user-attachments/assets/e7658c57-9f36-492a-9ae1-4c10744ae1c1)

Use delete all repositories
![image](https://github.com/user-attachments/assets/6a3eb5d5-08c8-42a3-9318-8502a4f664c3)


### 6. Enjoy!
