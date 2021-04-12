import React, { useRef, useEffect } from "react";
import classes from "./Radar.module.css";

function resizeCanvas(canvas) {
  let { width, height } = canvas.getBoundingClientRect();
  // console.log('width: ', width, 'height, ', height)
  const BASE_DIMENSION = 496;
  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    const adjustmentRatio = (BASE_DIMENSION / width) * ratio * 1.5;

    // console.log(ratio)
    // console.log(width)
    // console.log(adjustmentRatio)

    const context = canvas.getContext("2d");
    canvas.width = width * adjustmentRatio;
    canvas.height = height * adjustmentRatio;
    // console.log(canvas.getBoundingClientRect())
    // Used to scale up the resolution
    context.scale(ratio * 1.5, ratio * 1.5);
    return ratio * 1.5;
  }

  return false;
}
// function getMousePos(canvas, event) {
//   var rect = canvas.getBoundingClientRect(), // abs. size of element
//     scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
//     scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
//   // console.log((event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY);
//   return {
//     x: (event.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
//     y: (event.clientY - rect.top) * scaleY, // been adjusted to be relative to element
//   };
// }

// export default Canvas;
const Canvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ratio = resizeCanvas(canvas);
    const context = canvas.getContext("2d");

    let animationFrameId;

    //Our draw came here
    const renderCanvas = () => {
      //   frameCount++;
      draw(context, ratio);
      // getMousePos(canvas);
      // animationFrameId = window.requestAnimationFrame(renderCanvas);
    };

    renderCanvas();
    // canvas.addEventListener("mousemove", (e) => {
    //   getMousePos(canvas, e)
    // });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);
  return <canvas ref={canvasRef} {...rest} className={classes.Canvas} />;
};

export default Canvas;
