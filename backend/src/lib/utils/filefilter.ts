import { HttpException, HttpStatus } from "@nestjs/common";

export const imageFileFilter = (req, file, callback) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
    return callback(
      new HttpException(
        "file must be of type image",
        HttpStatus.BAD_REQUEST
      ),
      false
    );
  }
  callback(null, true);
};
