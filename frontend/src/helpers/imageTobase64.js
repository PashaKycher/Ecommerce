const imageToBase64 = async(image) => {
    // create reader
    const reader = new FileReader();
    // read file
    reader.readAsDataURL(image);
    // convert to base64
    const data = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    return data;
}

export default imageToBase64