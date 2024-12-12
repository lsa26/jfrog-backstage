#!/bin/bash

# Artifactory URL and API key
ARTIFACTORY_URL="$1"    # Takes the URL as the first argument
API_KEY="$2"            # Takes the API key as the second argument

# Function to get the list of repositories
get_repositories() {
    curl -s -H "Authorization: Bearer $API_KEY" \
        "$ARTIFACTORY_URL/artifactory/api/repositories"
}

# Function to delete a repository
delete_repository() {
    local repo_key="$1"
    echo "Deleting repository: $repo_key"
    response=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE \
        -H "Authorization: Bearer $API_KEY" \
        "$ARTIFACTORY_URL/artifactory/api/repositories/$repo_key")

    if [[ "$response" -eq 200 || "$response" -eq 204 ]]; then
        echo "Repository $repo_key successfully deleted."
    else
        echo "Error deleting repository $repo_key (HTTP Code: $response)"
    fi
}

# Get the list of repositories
repositories=$(get_repositories)

# Check if the repositories list is empty
if [[ -z "$repositories" ]]; then
    echo "No repositories found."
    exit 0
fi

# Loop through each repository and delete it
echo "$repositories" | jq -c '.[]' | while read -r repo; do
    repo_key=$(echo "$repo" | jq -r '.key')
    delete_repository "$repo_key"
done

echo "All repositories have been processed."
