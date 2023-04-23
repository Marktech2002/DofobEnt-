const cloudinary = require('cloudinary').v2;
 const fs = require('fs') ;
// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// // upload an image 
// const uploadImage = async (imagePath) => {
//     // Use the uploaded file's name as the asset's public ID and 
//     // allow overwriting the asset with new versions
//     const options = {
//         use_filename: true,
//         unique_filename: false,
//         overwrite: true,
//     };
//     try {
//         // Upload the image
//         // const imagePath = await fs.promises.readFile(image.path)
//         const result = await cloudinary.uploader.upload(imagePath, options);
//         console.log(result);
//         return result.public_id;
//     } catch (error) {
//         console.error(error);
//     }
// };

// const deleteImage = async (public_id) => {
//     try {
//          const image = await cloudinary.uploader.destroy(public_id , (error , result)=>{
//             console.log( result , error)
//          }) 

//     } catch (error) {
//         console.log(error)
//     }
// }
// module.exports = { uploadImage , deleteImage } ;

module.exports =  cloudinary ;

