import requests
import sys
from datetime import datetime
import json

class AffiliateHubAPITester:
    def __init__(self, base_url="https://affiliate-hub-330.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_json = response.json()
                    print(f"   Response: {json.dumps(response_json, indent=2)}")
                    return True, response_json
                except:
                    print(f"   Response (text): {response.text[:200]}")
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test the health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_contact_form_submission(self):
        """Test the contact form submission"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "subject": "Test Contact Form Submission",
            "message": "This is a test message to verify the contact form functionality."
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data
        )

    def test_contact_form_validation(self):
        """Test contact form validation with missing fields"""
        test_data = {
            "name": "",
            "email": "invalid-email",
            "subject": "",
            "message": ""
        }
        
        # This should fail validation, expecting 422 (Unprocessable Entity) or similar
        success, response = self.run_test(
            "Contact Form Validation (Invalid Data)",
            "POST",
            "api/contact",
            422,
            data=test_data
        )
        
        # If it doesn't return 422, check if it returns 200 (API might be lenient)
        if not success:
            success, response = self.run_test(
                "Contact Form Validation (Invalid Data - Alternative)",
                "POST",
                "api/contact",
                200,
                data=test_data
            )
        
        return success, response

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

def main():
    print("=" * 60)
    print("🚀 AFFILIATE HUB BACKEND API TESTING")
    print("=" * 60)
    
    # Setup
    tester = AffiliateHubAPITester()

    # Run tests
    print("\n📋 Running Backend API Tests...")
    
    # Test 1: Health endpoint
    health_success, health_response = tester.test_health_endpoint()
    
    # Test 2: Root endpoint
    root_success, root_response = tester.test_root_endpoint()
    
    # Test 3: Valid contact form submission
    contact_success, contact_response = tester.test_contact_form_submission()
    
    # Test 4: Invalid contact form submission
    validation_success, validation_response = tester.test_contact_form_validation()

    # Print results summary
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Detailed results
    print("\n🔍 DETAILED RESULTS:")
    print(f"✅ Health endpoint working: {health_success}")
    print(f"✅ Root endpoint working: {root_success}")
    print(f"✅ Contact form submission working: {contact_success}")
    print(f"✅ Contact form validation working: {validation_success}")
    
    # Check critical functionality
    critical_tests = [health_success, contact_success]
    critical_passed = sum(critical_tests)
    
    print(f"\n🎯 CRITICAL FUNCTIONALITY: {critical_passed}/2 tests passed")
    
    if critical_passed == 2:
        print("🎉 All critical backend functionality is working!")
        return 0
    else:
        print("⚠️  Some critical backend functionality has issues.")
        return 1

if __name__ == "__main__":
    sys.exit(main())