import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const cloudinary_upload = async (filePath) => {
    try {
        if(!filePath) return null

        cloud = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        })
        console.log("Successfully uploaded - ", cloud.url);
        fs.unlinkSync(filePath)
        return cloud 
    }
    catch (error) {
        fs.unlinkSync(filePath) //if upload fails we remove it from our local system
        return null
    }
}

export {cloudinary_upload}