const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const authRoutes = require('./backend/routes/authRoutes');
const issueRoutes = require('./backend/routes/issueRoutes');
const proposalRoutes = require('./backend/routes/proposalRoutes');
const votesRouter = require('./backend/routes/votes');
const mapRoutes = require('./backend/routes/mapRoutes');
const adminRoutes = require('./backend/routes/adminRoutes'); 
const chatRoutes = require('./backend/routes/chatRoutes');
const notificationRoutes = require('./backend/routes/notificationRoutes');

const app = express();

// File upload handling
const upload = multer({ dest: 'uploads/' }); // Save files in "uploads/" folder

app.use(cors());
app.use(express.json());

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/issues', upload.array('file', 1), issueRoutes); // issues API with file upload
app.use('/api/proposals', proposalRoutes);
app.use('/api/votes', votesRouter);
app.use('/api/map', mapRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Technoverse API 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
