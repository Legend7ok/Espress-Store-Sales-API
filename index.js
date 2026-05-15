import 'dotenv/config';
import app from './src/app.js';
import connectDB from "./src/db/connect.js";


const PORT = process.env.PORT

await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});