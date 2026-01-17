import multer from "multer";

// Configure memory storage
const storage = multer.memoryStorage();

// Initialize multer with storage and limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

/**
 * Multer middleware for handling single image uploads to memory.
 * The file will be available at req.file.buffer.
 */
export const uploadSingle = upload.single("image");

/**
 * Multer middleware for handling multiple image uploads to memory.
 */
export const uploadArray = (fieldName, maxCount = 5) =>
  upload.array(fieldName, maxCount);

export { upload };
