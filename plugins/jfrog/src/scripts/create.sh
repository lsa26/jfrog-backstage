#!/bin/bash

# Checking the input parameters
if [[ $# -lt 2 ]]; then
    echo "Error: Usage: $0 <JFROG_URL> <JFROG_ACCESS_TOKEN>"
    exit 1
fi

# Artifactory API parameters
ARTIFACTORY_URL="$1"
API_KEY="$2"
PATHBACKSTAGE="/PathToBackstageFolder" #Backstage folder
CONFIG_FILE="$PATHBACKSTAGE/plugins/jfrog/src/scripts/repositories-config.json"  # Constant file

# Check if the configuration file exists
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: The configuration file $CONFIG_FILE is not found."
    exit 1
fi

# Function to create a repository via the REST API
create_repository() {
    repo_config="$1"
    repo_key=$(echo "$repo_config" | jq -r '.key')

    echo "Creating repository with key: $repo_key..."

    # PUT API call to create the repository with the confirmed structure
    response=$(curl -s -o /dev/null -w "%{http_code}" -X PUT \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      -d "$repo_config" \
      "$ARTIFACTORY_URL/artifactory/api/repositories/$repo_key")

    # Check the response
    if [[ "$response" -eq 200 ]]; then
        echo "Repository created successfully: $repo_key"
    else
        echo "Error creating repository: $repo_key (HTTP code: $response)"
        # Display the full API response for more details
        echo "API Response: $(curl -s -X GET "$ARTIFACTORY_URL/artifactory/api/repositories/$repo_key")"
    fi
}

# Loop through each repository in the JSON file
total_repos=$(jq '.repositories | length' "$CONFIG_FILE")

for ((i=0; i<$total_repos; i++)); do
    # Extract the current repository configuration
    repo_config=$(jq ".repositories[$i]" "$CONFIG_FILE")

    # Create the repository with the extracted configuration
    create_repository "$repo_config"
done

echo "All repositories have been processed."
