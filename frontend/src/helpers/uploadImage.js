const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINERY}/image/upload`
const uploadImage = async(image) => {
    // create form data to send cloudinary
    const formData = new FormData();
    // append image
    formData.append('file', image);
    // append folder for image
    formData.append('upload_preset', 'mern-app-file');
    // send to cloudinary
    const dataResponse = await fetch(url,{
        method: 'post',
        body: formData
    })
    // response get from cloudinary
    return dataResponse.json();
}

export default uploadImage