import cloudinary from "../cloudinary.js"
export const deleteSources = async (matchs, options) => {
  const res = await cloudinary.api.delete_resources(matchs, options)
  return res
}