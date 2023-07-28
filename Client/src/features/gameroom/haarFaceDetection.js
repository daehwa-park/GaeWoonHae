import cv from "@techstark/opencv-js";
import { loadDataFile } from "./cvDataFile";

const msize = new cv.Size(0, 0);
let faceCascade;

export async function loadHaarFaceModels() {
  console.log("=======start downloading Haar-cascade models=======");
  return loadDataFile(
    "haarcascade_frontalface_default.xml",
    "../../models/haarcascade_frontalface_default.xml"
  )
    .then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            // load pre-trained classifiers
            faceCascade = new cv.CascadeClassifier();
            faceCascade.load("haarcascade_frontalface_default.xml");
            resolve();
          }, 2000);
        })
    )
    .then(() => {
      console.log("=======downloaded Haar-cascade models=======");
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Detect faces from the input image.
 * See https://docs.opencv.org/master/d2/d99/tutorial_js_face_detection.html
 * @param {cv.Mat} img  Input image
 * @param {cv.Mat} emo
 * @returns the modified image with detected faces drawn on it.
 */
export function detectHaarFace(img, emo) {
  // const newImg = img.clone();
  const dst = img;
  const emoji = emo;

  const gray = new cv.Mat();
  cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);

  const faces = new cv.RectVector();

  

  // detect faces
  faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
  for (let i = 0; i < faces.size(); ++i) {
    let face = faces.get(i);
    let dsize = new cv.Size(face.width, face.height);
    let emocopy = new cv.Mat();
    let emogray = new cv.Mat();
    let rect = new cv.Rect(face.x, face.y, face.width, face.height);
    let roi = new cv.Mat();
    let maskInv = new cv.Mat();
    let imgBg = new cv.Mat();
    let imgFg = new cv.Mat();
    let sum = new cv.Mat();
    
    cv.resize(emoji, emocopy, dsize, 0, 0, cv.INTER_AREA);

    roi = dst.roi(rect);
    cv.cvtColor(emocopy, emogray, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(emogray, emogray, 254, 255, cv.THRESH_BINARY);
    cv.bitwise_not(emogray,maskInv);

    cv.bitwise_and(roi, roi, imgBg, emogray);
    cv.bitwise_and(emocopy, emocopy, imgFg, maskInv);

    cv.add(imgBg, imgFg, sum );

    for (let i = face.y, k = 0; i < face.y + face.height; i++, k++) {
        for (let j = face.x, l = 0; j < face.x + face.width; j++, l++) {
            dst.ucharPtr(i, j)[0] = sum.ucharPtr(k, l)[0];
            dst.ucharPtr(i, j)[1] = sum.ucharPtr(k, l)[1];
            dst.ucharPtr(i, j)[2] = sum.ucharPtr(k, l)[2];
        }
    }

    emocopy.delete();
    emogray.delete();
    roi.delete();
    maskInv.delete();
    imgBg.delete();
    imgFg.delete();
    sum.delete();
    // const point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
    // const point2 = new cv.Point(
    //   faces.get(i).x + faces.get(i).width,
    //   faces.get(i).y + faces.get(i).height
    // );
    // cv.rectangle(newImg, point1, point2, [255, 0, 0, 255]);
  }

  gray.delete();
  faces.delete();

  return dst;
}
s