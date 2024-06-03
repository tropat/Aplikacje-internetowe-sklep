#!/bin/bash

BASE_URL="http://localhost:3322"

# Function to test GET request
test_get() {
    local endpoint=$1
    local expected_status=$2
    local response=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${endpoint}")
    if [ "$response" -eq "$expected_status" ]; then
        echo "GET ${endpoint}: Passed"
    else
        echo "GET ${endpoint}: Failed (expected ${expected_status}, got ${response})"
    fi
}

# Function to test POST request
test_post() {
    local endpoint=$1
    local data=$2
    local expected_status=$3
    local response=$(curl -s -o /dev/null -w "%{http_code}" -H "Content-Type: application/json" -d "${data}" "${BASE_URL}${endpoint}")
    if [ "$response" -eq "$expected_status" ]; then
        echo "POST ${endpoint}: Passed"
    else
        echo "POST ${endpoint}: Failed (expected ${expected_status}, got ${response})"
    fi
}

# Add User
test_post "/users" '{"username":"testuser","password":"testpass","role":"client"}' 201
test_post "/users" '{"username":"","password":"testpass","role":"client"}' 400  # Missing username
test_post "/users" '{"username":"testuser","password":"","role":"client"}' 400  # Missing password
test_post "/users" '{"username":"testuser","password":"testpass","role":""}' 400  # Missing role

# Authenticate User
test_post "/users/login" '{"username":"testuser","password":"testpass"}' 200
test_post "/users/login" '{"username":"testuser","password":"wrongpass"}' 401  # Invalid password
test_post "/users/login" '{"username":"nonexistent","password":"testpass"}' 401  # Nonexistent user

# Get User by ID
test_get "/users/1" 200  # Assuming the user with ID 1 exists
test_get "/users/999" 404  # User not found
