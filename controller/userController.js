import { catchAsyncErrors } from "../midddlewares/catchAsyError.js";
import ErrorHandler from "../midddlewares/error.js";
import cloudinary from 'cloudinary';
import User from '../model/userSchema.js'

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Avatar Required!", 400));
  }
  const { avatar } = req.files;
  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/avif",
  ];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(
      new ErrorHandler(
        "Please provide avatar in png,jpg,webp or avif format!",
        400
      )
    );
  }
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinary.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown cloudinary error!"
    );
  }
  user = await User.create({
    name,
    email,
    phone,
    password,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  sendToken("User Registered!", user, res, 200);
});


export const login = catchAsyncErrors((req,res,next) => {})
// export const logout = catchAsyncErrors = async() => {}
// export const myProfile = catchAsyncErrors =async() => {}









