const Admin = require('../models/adminSchema');
const { MongooseError } = require('mongoose');

// Function to create admin with retry logic
async function createAdminWithRetry() {
    try {
        // Create admin document
        const newAdmin = await Admin.create({
            adminName: 'Your name',
            email: 'Your email',
            phone: 'Your phone',
            adminPassword: 'Your password',
            cPassword: 'Your Password'
        });
        console.log('New admin created:', newAdmin);
    } catch (error) {
        // Handle timeout error (MongooseError 16500) with retry logic
        if (error instanceof MongooseError && error.code === 16500) {
            console.log('Operation timed out, retrying...');
            // Retry after a short delay
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            await createAdminWithRetry(); // Retry
        } else {
            // Re-throw other errors
            throw error;
        }
    }
}

// Call the function to create admin
createAdminWithRetry();
