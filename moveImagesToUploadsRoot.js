import fs from 'fs';
import path from 'path';

// Function to move all images to the root of the uploads directory
function moveImagesToUploadsRoot(directory) {
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directory}: ${err.message}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file.name);

            if (file.isDirectory()) {
                // If it's a directory, recurse into it
                moveImagesToUploadsRoot(filePath);
            } else if (isImageFile(file.name)) {
                // If it's an image file, move it to the uploads root
                const newFilePath = path.join(uploadsRoot, file.name);
                fs.rename(filePath, newFilePath, (err) => {
                    if (err) {
                        console.error(`Error moving file ${filePath}: ${err.message}`);
                    } else {
                        console.log(`Moved ${filePath} to ${newFilePath}`);
                    }
                });
            }
        });
    });
}

// Helper function to check if a file is an image
function isImageFile(fileName) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.svg'];
    return imageExtensions.includes(path.extname(fileName).toLowerCase());
}

// Define the root of the uploads directory
const uploadsRoot = './uploads'; // Replace with your actual uploads directory path

// Start the process
moveImagesToUploadsRoot(uploadsRoot);
