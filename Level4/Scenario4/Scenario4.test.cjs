if(require.main === module){
    const request = require('supertest');

    const testValid = async () => {
        try {
            const res = await request(app)
                .post('/products')
                .send({ id: 1, name: 'Product1', price: 100 })
                .expect(201);

            console.log('Test 1 Passed: Valid payload');
            console.log(res.body);
        } catch (err) {
            console.error('Test 1 Failed:', err.message);
        }
    };

    const testInvalid = async () => {
        try {
            const res = await request(app)
                .post('/products')
                .send({ id: 2, name: 'Product2' }) 
                .expect(400);

            console.log('Test 2 Passed: Invalid payload');
            console.log(res.body);
        } catch (err) {
            console.error('Test 2 Failed:', err.message);
        }
    };

    (async () => {
        await testValid();
        await testInvalid();
        console.log('All tests completed');
    })();
}
