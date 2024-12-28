const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const leaveRequestRoutes = require("./routes/leaveRequest.routes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const heuresRoutes = require('./routes/heures');
const notificationRoutes = require('./routes/notifications');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Pour parser le corps des requêtes en JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/leave-requests", leaveRequestRoutes);
app.use('/api', evaluationRoutes);
app.use('/api/heures', heuresRoutes);
app.use('/api/notifications', notificationRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
