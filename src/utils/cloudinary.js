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

        const cloud = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            image_metadata: true
        })
        console.log("Successfully uploaded - ", cloud.url);
        fs.unlinkSync(filePath)
        return {
            secure_url: cloud.secure_url,
            public_id: cloud.public_id,
            duration: cloud?.vid_info?.duration // Access duration from upload response
        };
    }
    catch (error) {
        fs.unlinkSync(filePath) //if upload fails we remove it from our local system
        return null
    }
}

export {cloudinary_upload}

// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"


// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         // file has been uploaded successfull
//         //console.log("file is uploaded on cloudinary ", response.url);
//         fs.unlinkSync(localFilePath)
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }



// export {uploadOnCloudinary}