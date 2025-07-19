export const isCloudinaryUrl = (url) => {
    return typeof url === "string" && url.includes("res.cloudinary.com/dutabvlxt");
};