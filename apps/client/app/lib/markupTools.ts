// import * as fabric from "fabric";

// const removeObject = (pointer: fabric.Point, canvas: fabric.Canvas) => {
//   const objects = canvas.getObjects();

//   for (let i = objects.length - 1; i >= 0; i--) {
//     const obj = objects[i];

//     if (obj.containsPoint(pointer)) {
//       canvas.remove(obj);
//       canvas.renderAll();
//       break;
//     }
//   }
// };

// export const handlePenTool = (canvas: fabric.Canvas) => {
//   canvas.isDrawingMode = true;
//   const brush = new fabric.PencilBrush(canvas);
//   brush.color = "black";
//   brush.width = 5;
//   canvas.freeDrawingBrush = brush;
// };

// export const handleEraserTool = (canvas: fabric.Canvas) => {
//   canvas.isDrawingMode = false;
//   canvas.selection = false;

//   let isMouseDown = false;

//   canvas.on("mouse:down", (e) => {
//     isMouseDown = true;
//     const pointer = canvas.getViewportPoint(e.e);
//     removeObject(pointer, canvas);
//   });

//   canvas.on("mouse:move", (e) => {
//     if (!isMouseDown) return;

//     const pointer = canvas.getViewportPoint(e.e);
//     removeObject(pointer, canvas);
//   });

//   canvas.on("mouse:up", (e) => {
//     isMouseDown = false;
//   });
// };

// // export const handleTextTool = (canvas: fabric.Canvas) => {
// //   canvas.on("mouse:up", (e) => {
// //     const pointer = canvas.getViewportPoint(e.e);
// //     if (e.target) return;
// //     const text = new fabric.IText("텍스트 입력", {
// //       left: pointer.x,
// //       top: pointer.y,
// //       fontSize: 16,
// //       fill: "black",
// //     });
// //     canvas.add(text);
// //     canvas.setActiveObject(text);
// //   });
// // };

// // object = new fabric.Path(coordinateToPath(markup.data.points, offset), {
// //     id: markup.id,
// //     type: markup.mode,
// //     strokeWidth: 5,
// //     stroke: 'red',
// //     strokeLineCap: 'round',
// //     strokeLineJoin: 'round',
// //     fill: null,
// //     selectable: false,
// // });
// // object.animate('opacity', '0', {
// //     duration: 1000,
// //     onChange: canvas.renderAll.bind(canvas),
// //     onComplete: function () {
// //         canvas.remove(object);
// //     },
// // });
