// 1. 얼굴인식 학습 파일 load, 
// 2. canvas => 이모지 씌우기

import cv from "@techstark/opencv-js";
import { loadDataFile } from "./cvDataFile";

const minsize = new cv.Size(0, 0);
const maxsize = new cv.Size(130, 130);

let faceCascade;

export async function loadHaarFaceModels() {
  console.log("=======start downloading Haar-cascade models=======");
  return loadDataFile(
    "haarcascade_frontalface_alt2.xml",
    "../../models/haarcascade_frontalface_alt2.xml"
  )
    .then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            // load pre-trained classifiers
            faceCascade = new cv.CascadeClassifier();
            faceCascade.load("haarcascade_frontalface_alt2.xml");
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

  let M = cv.Mat.ones(3, 3, cv.CV_8U);
  let anchor = new cv.Point(-1, -1);
  
  // detect faces
  faceCascade.detectMultiScale(gray, faces, 1.12, 4, 0, minsize, maxsize);

  for (let i = 0; i < faces.size(); ++i) {
    let face = faces.get(i);
    let dsize = new cv.Size(face.width, face.height);
    let maskInv = new cv.Mat();  //
    let emogray = new cv.Mat();  //
    let emocopy = new cv.Mat();
    let rect = new cv.Rect(face.x, face.y, face.width, face.height);
    let roi = new cv.Mat();
    let imgBg = new cv.Mat();
    let imgFg = new cv.Mat();
    let sum = new cv.Mat();
    
    cv.resize(emoji, emocopy, dsize, 0, 0, cv.INTER_AREA);

    roi = dst.roi(rect);

    cv.cvtColor(emocopy, emogray, cv.COLOR_RGBA2GRAY, 0);  //
    cv.threshold(emogray, emogray, 254, 255, cv.THRESH_BINARY);  //
    cv.bitwise_not(emogray,maskInv);    //

    cv.bitwise_and(roi, roi, imgBg, emogray);
    cv.bitwise_and(emocopy, emocopy, imgFg, maskInv);

    cv.erode(imgFg, imgFg, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    cv.dilate(imgFg, imgFg, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

    cv.add(imgBg, imgFg, sum );

    for (let i = 0; i < face.height; i++) {
      for (let j = 0; j < face.width; j++) {
        dst.ucharPtr(face.y + i, face.x + j)[0] = sum.ucharPtr(i, j)[0];
        dst.ucharPtr(face.y + i, face.x + j)[1] = sum.ucharPtr(i, j)[1];
        dst.ucharPtr(face.y + i, face.x + j)[2] = sum.ucharPtr(i, j)[2];
      }
    }

    emocopy.delete();
    emogray.delete();
    roi.delete();
    maskInv.delete();
    imgBg.delete();
    imgFg.delete();
    sum.delete();
  }

  gray.delete();
  faces.delete();
  M.delete();
  emoji.delete();

  return dst;
}
