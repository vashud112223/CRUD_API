const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const jobRoutes = require('./routes/job.js')
const applicantRoutes = require('./routes/applicant.js');
const interviewRoutes = require('./routes/interview.js');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Mongoose connection string and configuration
const MONGO_URL = 'mongodb+srv://ashutoshverma557:pZIEh9Dwyir124VI@cluster1.bdu7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
const PORT = 3001;

/* ROUTES */
app.use('/api',jobRoutes)
app.use('/api', applicantRoutes);
app.use('/api', interviewRoutes); 


// Connect to MongoDB
mongoose.connect(MONGO_URL, {
    dbName: "Crud_API", // The database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB Connected successfully!');
        // Start the server after MongoDB connection is successful
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process if MongoDB connection fails
    });

// Routes (commented out, add them as needed)
// app.use('/auth', authRoutes);
// app.use('/properties', listingRoutes);
// app.use('/bookings', bookingRoutes);
// app.use('/users', userRoutes);
