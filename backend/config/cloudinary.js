import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
};

const uploadImage = async (imageFile) => {
    try {
        // Check if imageFile exists
        if (!imageFile) {
            return {
                success: false,
                message: "No image file provided",
                url: ""
            };
        }

        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
            resource_type: "image",
            folder: "jeevancare",
            quality: "auto",
            fetch_format: "auto"
        });

        return {
            success: true,
            message: "Image uploaded successfully",
            url: result.secure_url,
            public_id: result.public_id
        };

    } catch (error) {
        return {
            success: false,
            message: error.message || "Image upload failed",
            url: ""
        };
    }
};

export { connectCloudinary, uploadImage };