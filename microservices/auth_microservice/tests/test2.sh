#!/bin/bash

BASE_URL="http://localhost:3322"

# Function to test POST request with Origin header
test_post_with_origin() {
    local endpoint=$1
    local data=$2
    local expected_status=$3
    local origin=$4
    local response=$(curl -s -o /dev/null -w "%{http_code}" -H "Content-Type: application/json" -H "Origin: ${origin}" -d "${data}" "${BASE_URL}${endpoint}")
    if [ "$response" -eq "$expected_status" ]; then
        echo "POST ${endpoint} from ${origin}: Passed"
    else
        echo "POST ${endpoint} from ${origin}: Failed (expected ${expected_status}, got ${response})"
    fi
}

# Add User (assuming these users are already created in the database)
test_post_with_origin "/users" '{"username":"clientuser","password":"clientpass","role":"client"}' 201 "http://localhost:3000"
test_post_with_origin "/users" '{"username":"delivereruser","password":"delivererpass","role":"deliverer"}' 201 "http://localhost:3001"

# Authenticate User with correct role
test_post_with_origin "/users/login" '{"username":"clientuser","password":"clientpass"}' 200 "http://localhost:3000"
test_post_with_origin "/users/login" '{"username":"delivereruser","password":"delivererpass"}' 200 "http://localhost:3001"

# Authenticate User with incorrect role
test_post_with_origin "/users/login" '{"username":"clientuser","password":"clientpass"}' 403 "http://localhost:3001"  # Client user trying to access deliverer frontend
test_post_with_origin "/users/login" '{"username":"delivereruser","password":"delivererpass"}' 403 "http://localhost:3000"  # Deliverer user trying to access client frontend

# Authenticate User with wrong credentials
test_post_with_origin "/users/login" '{"username":"clientuser","password":"wrongpass"}' 401 "http://localhost:3000"
test_post_with_origin "/users/login" '{"username":"nonexistent","password":"clientpass"}' 401 "http://localhost:3000"
