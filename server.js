const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Setup
app.use(express.json());
app.use(cors());

// Empire Root & System Status Endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        empire: "Salsabilah Amin Empires Limited",
        project: "SR Electronics Park API",
        status: "Active & Secure",
        version: "1.0.0"
    });
});

// Products Endpoints
app.get('/api/products', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'Retrieved all product records successfully' 
    });
});

app.post('/api/products', (req, res) => {
    const productData = req.body;
    res.status(201).json({ 
        success: true, 
        message: 'New product created successfully', 
        data: productData 
    });
});

// Inventory Endpoints
app.get('/api/inventory', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'Retrieved current inventory details successfully' 
    });
});

// Customers Endpoints
app.get('/api/customers', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'Retrieved all customer profiles successfully' 
    });
});

app.post('/api/customers', (req, res) => {
    const customerData = req.body;
    res.status(201).json({ 
        success: true, 
        message: 'New customer profile created successfully', 
        data: customerData 
    });
});

// Sales Endpoints
app.get('/api/sales', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'Retrieved sales records successfully' 
    });
});

app.post('/api/sales', (req, res) => {
    const saleData = req.body;
    res.status(201).json({ 
        success: true, 
        message: 'New sale recorded successfully', 
        data: saleData 
    });
});

// Payments Endpoint
app.post('/api/payments', (req, res) => {
    const paymentData = req.body;
    res.status(200).json({ 
        success: true, 
        message: 'Payment processed successfully', 
        data: paymentData 
    });
});

// Reports Endpoint
app.get('/api/reports', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'Reports generated successfully' 
    });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        error: 'Internal Empire Server Error' 
    });
});

// Server Initialization
app.listen(PORT, () => {
    console.log(`Salsabilah Empire Server is running on port ${PORT}`);
});
