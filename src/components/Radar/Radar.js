// import classes from "./Radar.module.css";
import React, { Component } from 'react';
import Canvas from "./Canvas";

class Radar extends Component {
  render() {
    const topicNames = Object.keys(this.props.topics);
    topicNames.sort();
    const RADIUS = 25;
    const GRADECOLORMAPPER = {
      7: "#5ADBCE",
      6: "#48C8EF",
      5: "#3A63CC",
      4: "#D274E5",
      3: "#E23287",
      2: "#E23287",
      1: "#E23287",
      0: "#B1B1B1"
    };

    const drawInnerBorders = (cx, cy, ctx, grade, count) => {
      if (grade === 0) {
        return;
      }
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.lineTo(cx, cy);
      ctx.arc(
        cx,
        cy,
        grade * RADIUS,
        (count / 5) * 2 * Math.PI - Math.PI / 2,
        ((count + 1) / 5) * 2 * Math.PI - Math.PI / 2
      );
      ctx.lineTo(cx, cy);
      ctx.closePath();
      ctx.strokeStyle = "white";
      ctx.stroke();
      drawInnerBorders(cx, cy, ctx, grade - 1, count);
    };

    const drawSector = (cx, cy, ctx, grade, count) => {
      let sectorColor = GRADECOLORMAPPER[grade]
      let radius = grade
      if (grade > 7) {
        radius = 7;
      } else if (grade === 0) {
        radius = 0.5
      }

      ctx.fillStyle = sectorColor;
      ctx.beginPath();
      ctx.lineTo(cx, cy);
      ctx.arc(
        cx,
        cy,
        radius * RADIUS,
        (count / 5) * 2 * Math.PI - Math.PI / 2,
        ((count + 1) / 5) * 2 * Math.PI - Math.PI / 2
      );
      ctx.lineTo(cx, cy);
      ctx.fill();
      ctx.closePath();
    };

    const drawBackgroundCircles = (cx, cy, ctx) => {
      for (let i = 0; i < 8; i++) {
        ctx.arc(cx, cy, i * RADIUS, -Math.PI / 2, 2 * Math.PI - Math.PI / 2);
        ctx.strokeStyle = "#d2d2d2";
        ctx.stroke();
      }
    };

    const drawHighlightedSector = (cx, cy, ctx, grade, count) => {
      let radius = grade;
      if (grade === 0) {
        radius = 0.5
      }
      ctx.beginPath();
      ctx.lineTo(cx, cy);
      ctx.arc(
        cx,
        cy,
        radius * RADIUS,
        (count / 5) * 2 * Math.PI - Math.PI / 2,
        ((count + 1) / 5) * 2 * Math.PI - Math.PI / 2
      );
      ctx.lineTo(cx, cy);
      ctx.closePath();
      ctx.strokeStyle = "#2d2d2d";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const draw = (ctx, ratio) => {
      const cx = ctx.canvas.width / 2 / ratio;
      const cy = ctx.canvas.height / 2 / ratio;
      drawBackgroundCircles(cx, cy, ctx);
      let angleCount = 0;
      for (let topic of topicNames) {
        let grade = this.props.topics[topic];
        // Draw solid sectors with dynamics color & size
        drawSector(cx, cy, ctx, grade, angleCount);
        // Recursively draw white borders
        drawInnerBorders(cx, cy, ctx, grade, angleCount);
        angleCount++;
      }

      angleCount = 0;
      for (let topic in this.props.topics) {
        if (topic === this.props.highlightTopic) {
          drawHighlightedSector(cx, cy, ctx, this.props.topics[topic], angleCount);
        }
        angleCount++;
      }
      if (this.props.showText) {
        ctx.fillStyle = "black";
        ctx.font = "600 15px Raleway";
        // ctx.fillText("Functions and", 340, 70);
        // ctx.fillText("Equations", 360, 90);
        ctx.fillText('Algebra', 350, 80)
        ctx.fillText("Calculus", 425, 320);
        ctx.fillText("Functions and Equations", 160, 460);
        ctx.fillText("Geometry", 5, 320);
        ctx.fillText("Statistics", 70, 80);
      }

      ctx.fillStyle = "grey";
      ctx.font = "200 12px open sans";
      for (let i = 1; i < 8; i++) {
        ctx.fillStyle = "grey";
        let tempGrade = this.props.topics["Functions and Equations"];
        if (this.props.topics["Functions and Equations"] <= 5 && i <= tempGrade) {
          // console.log('yes')
          ctx.fillStyle = "white";
        }
        ctx.fillText(i.toString(), cx + 5, cy + 15 - i * RADIUS);
      }
    };
    return (<Canvas draw={draw} />
    );
  }
}

export default Radar;

// const radar = (this.props) => {
//   const RADIUS = 25;

//   return (
//     <div className={classes.Radar}>
//       <Canvas draw={draw} />
//     </div>
//   );
// };

// export default radar;
