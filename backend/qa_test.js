

const API_URL = 'http://localhost:5000/api';
let token = '';

const results = {
  passed: [],
  failed: []
};

async function testEndpoint(name, method, url, data = null, headers = {}) {
  try {
    const config = {
      method,
      headers: { 
        'Content-Type': 'application/json',
        ...headers, 
        Authorization: `Bearer ${token}` 
      }
    };
    if (data) config.body = JSON.stringify(data);
    
    const res = await fetch(`${API_URL}${url}`, config);
    let resData = null;
    try {
      resData = await res.json();
    } catch(e) {}

    if (res.ok) {
      results.passed.push(name);
      return resData;
    } else {
      results.failed.push(`${name} (Status: ${res.status}) - ${resData?.message || ''}`);
      return null;
    }
  } catch (error) {
    results.failed.push(`${name} - Error: ${error.message}`);
    return null;
  }
}

async function runTests() {
  console.log('Starting QA Tests...');

  // 1. Auth Login
  const loginRes = await testEndpoint('Login', 'POST', '/auth/login', {
    email: 'admin@serviscianjur.com',
    password: 'password123'
  });
  
  if (loginRes && loginRes.data.accessToken) {
    token = loginRes.data.accessToken;
  } else {
    console.error('Cannot proceed without token. Login failed.');
    console.log(results);
    return;
  }

  // 2. Auth Me & Refresh
  await testEndpoint('Auth Me', 'GET', '/auth/me');

  // 3. Master Data (Brand)
  const randStr = Math.random().toString(36).substring(7);
  const brandCreate = await testEndpoint('Create Brand', 'POST', '/brands', { name: 'QA Brand ' + randStr, code: 'QAB' + randStr });
  let brandId = brandCreate?.data?.id;
  if (brandId) {
    await testEndpoint('Get Brands', 'GET', '/brands');
    await testEndpoint('Update Brand', 'PUT', `/brands/${brandId}`, { name: 'QA Brand Updated ' + randStr, code: 'QAB' + randStr });
  }

  // 4. Booking Flow
  const me = await testEndpoint('Auth Me', 'GET', '/auth/me');
  // Create a random user for Customer profile
  const custUserCreate = await testEndpoint('Create Cust User', 'POST', '/users', {
    name: 'QA Cust User', username: 'qacust' + randStr, email: `qacust${randStr}@test.com`, password: 'password', roleId: me?.data?.role?.id || null, status: 'ACTIVE'
  });
  
  const myUserId = custUserCreate?.data?.id || me?.data?.id;

  const customerCreate = await testEndpoint('Create Customer', 'POST', '/customers', { userId: myUserId, fullName: 'QA Customer', phoneNumber: '0812345678' + randStr, address: 'QA Address' });
  let customerId = customerCreate?.data?.id;

  const techCreate = await testEndpoint('Create Technician', 'POST', '/technicians', { name: 'QA Tech', email: `qatech${randStr}@sc.com`, phone: '08999999' + randStr });
  let techId = techCreate?.data?.id;

  const deviceCreate = await testEndpoint('Create Device Type', 'POST', '/device-types', { name: 'QA Device ' + randStr, categoryId: null });
  let deviceId = deviceCreate?.data?.id;

  const serviceCreate = await testEndpoint('Create Service Category', 'POST', '/service-categories', { name: 'QA Service ' + randStr, description: 'Test Service' });
  let serviceId = serviceCreate?.data?.id;

  if (customerId && deviceId && brandId && serviceId) {
    const bookingCreate = await testEndpoint('Create Booking', 'POST', '/bookings', {
      customerId,
      deviceTypeId: deviceId,
      brandId,
      serviceCategoryId: serviceId,
      deviceName: 'QA Test Device',
      complaint: 'Layar mati QA',
      estimatedCost: 100000
    });
    
    let bookingId = bookingCreate?.data?.id;
    if (bookingId) {
      await testEndpoint('Get Bookings', 'GET', '/bookings');
      await testEndpoint('Get Booking By Id', 'GET', `/bookings/${bookingId}`);
      await testEndpoint('Update Status Checking', 'PATCH', `/bookings/${bookingId}/status`, { status: 'Checking' });
      await testEndpoint('Update Status Repairing', 'PATCH', `/bookings/${bookingId}/status`, { status: 'Repairing' });
      await testEndpoint('Update Status Finished', 'PATCH', `/bookings/${bookingId}/status`, { status: 'Finished' });
      
      // Tracking
      await testEndpoint('Tracking Get By Code', 'GET', `/tracking/code/${bookingCreate.data.bookingNumber}`);
      
      // Dashboard API
      await testEndpoint('Dashboard Summary', 'GET', '/dashboard/summary');
      await testEndpoint('Dashboard Chart', 'GET', '/dashboard/chart/bookings');
      await testEndpoint('Dashboard Activity', 'GET', '/dashboard/activity');

      await testEndpoint('Delete Booking', 'DELETE', `/bookings/${bookingId}`);
    }
  }

  if (customerId) await testEndpoint('Delete Customer', 'DELETE', `/customers/${customerId}`);
  if (techId) await testEndpoint('Delete Technician', 'DELETE', `/technicians/${techId}`);
  if (deviceId) await testEndpoint('Delete Device Type', 'DELETE', `/device-types/${deviceId}`);
  if (serviceId) await testEndpoint('Delete Service Category', 'DELETE', `/service-categories/${serviceId}`);
  if (brandId) await testEndpoint('Delete Brand', 'DELETE', `/brands/${brandId}`);

  console.log('\n--- QA RESULTS ---');
  console.log(`Passed: ${results.passed.length}`);
  console.log(`Failed: ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\nFailed Items:');
    results.failed.forEach(f => console.log(`- ${f}`));
  }
}

runTests();
