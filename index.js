import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/db/connect.js';


const PORT = process.env.PORT;

if (!PORT) {
    console.error('PORT is not defined in environment variables');
    process.exit(1);
}

await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});