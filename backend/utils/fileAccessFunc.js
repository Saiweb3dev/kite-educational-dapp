const fs = require('fs');
const path = require('path');

const fileAccessFunc = async (dirPath) => {
    try {
        if (!fs.existsSync(dirPath)) {
            throw new Error(`Directory does not exist: ${dirPath}`);
        }

        const files = fs.readdirSync(dirPath);
        const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
        
        const jsonData = await Promise.all(jsonFiles.map(async (filename) => {
            const filePath = path.join(dirPath, filename);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileContent);
        }));

        console.log(jsonData);
        return jsonData;
    } catch (error) {
        console.error(error);
        return [];
    }
}

module.exports = {fileAccessFunc} // Correctly exporting the function
