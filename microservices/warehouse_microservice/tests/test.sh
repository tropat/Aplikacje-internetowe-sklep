#!/bin/bash

BASE_URL="http://localhost:3321"

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

# Function to test PUT request
test_put() {
    local endpoint=$1
    local data=$2
    local expected_status=$3
    local response=$(curl -s -o /dev/null -w "%{http_code}" -X PUT -H "Content-Type: application/json" -d "${data}" "${BASE_URL}${endpoint}")
    if [ "$response" -eq "$expected_status" ]; then
        echo "PUT ${endpoint}: Passed"
    else
        echo "PUT ${endpoint}: Failed (expected ${expected_status}, got ${response})"
    fi
}

# Test getAllPackages
test_get "/packages" 200

# Test getPackageById
test_get "/packages/2" 200
test_get "/packages/999" 404

# Test getPackagesByDelivererId
test_get "/packages/deliverer/1" 200
test_get "/packages/deliverer/999" 404

# Test createPackage
test_post "/packages" '{"products":[1,2],"address":"123 Test St"}' 201
test_post "/packages" '{"products":[999],"address":"123 Test St"}' 500  # Product not found

# Test updatePackageStatus
test_put "/packages/status/2" '{"status":"shipped"}' 200
test_put "/packages/status/2" '{"status":"unknown"}' 400  # Invalid status
test_put "/packages/status/999" '{"status":"shipped"}' 404  # Package not found

# Test updatePackageDeliverer
test_put "/packages/deliverer/2" '{"deliverer_id":2}' 200
test_put "/packages/deliverer/999" '{"deliverer_id":1}' 404  # Package not found

test_get "/products/1" 200
test_get "/products/999" 404
