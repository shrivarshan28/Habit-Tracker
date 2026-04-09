// Simple test script for login/register endpoints
const http = require('http');

function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: responseData
        });
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🔧 Testing Habit Tracker API...\n');

  // Test 1: Register a new user
  console.log('1️⃣ Testing Registration...');
  const uniqueId = Date.now();
  const registerData = {
    username: `testuser_${uniqueId}`,
    email: `test_${uniqueId}@example.com`,
    password: 'TestPass123',
    confirmPassword: 'TestPass123'
  };

  try {
    const registerRes = await makeRequest('POST', '/api/auth/register', registerData);
    console.log(`   Status: ${registerRes.status}`);
    const registerJson = JSON.parse(registerRes.data);
    if (registerRes.status === 201 && registerJson.token) {
      console.log('   ✅ Registration working!\n');
      const token = registerJson.token;

      // Test 2: Login with the registered user
      console.log('2️⃣ Testing Login...');
      const loginData = {
        email: registerData.email,
        password: registerData.password
      };

      const loginRes = await makeRequest('POST', '/api/auth/login', loginData);
      console.log(`   Status: ${loginRes.statusCode}`);
      const loginJson = JSON.parse(loginRes.data);
      if (loginRes.status === 200 && loginJson.token) {
        console.log('   ✅ Login working!\n');
      } else {
        console.log('   ❌ Login failed');
        console.log('   Error:', loginJson.message);
      }
    } else {
      console.log('   ❌ Registration failed');
      console.log('   Error:', registerJson.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n✨ Test complete!');
  process.exit(0);
}

runTests();
