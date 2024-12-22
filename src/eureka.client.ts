const Eureka = require('eureka-js-client').Eureka;

// Configure Eureka client
const client = new Eureka({
    instance: {
        instanceId: 'PRODUCT-SERVICE',
        app: 'PRODUCT-SERVICE',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        statusPageUrl: `http://localhost:${process.env.PORT}/info`,
        healthCheckUrl: `http://localhost:${process.env.PORT}/health`,
        port: {
            '$': process.env.PORT,
            '@enabled': 'true',
        },
        vipAddress: 'product-service',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
        maxRetries: 5, // Number of retries for registering
        requestRetryDelay: 1000, // Delay between retries
    }
});

// Start Eureka client
client.logger.level('debug'); // Set logger level to debug to see detailed logs
client.start((error:any) => {
    if (error) {
        console.error('Eureka client failed to start:', error);
    } else {
        console.log('Eureka client started successfully');
    }
});

// Handle client shutdown 
process.on('SIGINT', () => {
    client.stop();
    console.log('Eureka client stopped');
    process.exit();
});

module.exports = client;
