const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ডেটা সংরক্ষণের জন্য লোকাল JSON ফাইল বা ডেটাবেজ পাথ
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)){
    fs.mkdirSync(DATA_DIR);
}

// ১. সার্ভার স্ট্যাটাস চেক করার রুট
app.get('/', (req, res) => {
    res.json({ 
        status: 'success', 
        message: 'Salsabilah Amin Empires & SR Electronics Park POS Backend is running!' 
    });
});

// ২. পণ্যের তালিকা পাওয়ার রুট (Products API)
app.get('/api/products', (req, res) => {
    const filePath = path.join(DATA_DIR, 'products.json');
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.json(data);
    } else {
        res.json([]);
    }
});

// ৩. নতুন পণ্য যোগ করার রুট
app.post('/api/products', (req, res) => {
    const filePath = path.join(DATA_DIR, 'products.json');
    let products = [];
    if (fs.existsSync(filePath)) {
        products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    res.json({ status: 'success', message: 'Product added successfully', product: newProduct });
});

// ৪. নতুন সেল বা বিক্রি রেকর্ড করার রুট (Sales API)
app.post('/api/sales', (req, res) => {
    const filePath = path.join(DATA_DIR, 'sales.json');
    let sales = [];
    if (fs.existsSync(filePath)) {
        sales = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    const saleRecord = { id: Date.now(), date: new Date(), ...req.body };
    sales.push(saleRecord);
    fs.writeFileSync(filePath, JSON.stringify(sales, null, 2));
    res.json({ status: 'success', message: 'Sale recorded successfully', sale: saleRecord });
});

// সার্ভার স্টার্ট
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
