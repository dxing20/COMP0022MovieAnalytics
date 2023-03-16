"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-client)/./app/data-flow-render.tsx":
/*!**********************************!*\
  !*** ./app/data-flow-render.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _hooks_use_data_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/hooks/use-data-store */ \"(app-client)/./hooks/use-data-store.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reactflow */ \"(app-client)/./node_modules/@reactflow/core/dist/esm/index.js\");\n/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reactflow */ \"(app-client)/./node_modules/@reactflow/controls/dist/esm/index.js\");\n/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reactflow */ \"(app-client)/./node_modules/@reactflow/minimap/dist/esm/index.js\");\n/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! reactflow */ \"(app-client)/./node_modules/@reactflow/background/dist/esm/index.js\");\n/* harmony import */ var reactflow_dist_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactflow/dist/style.css */ \"(app-client)/./node_modules/reactflow/dist/style.css\");\n/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand/shallow */ \"(app-client)/./node_modules/zustand/esm/shallow.mjs\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nconst initialNodes = [\n    {\n        id: \"1\",\n        type: \"input\",\n        data: {\n            label: \"Movies\"\n        },\n        position: {\n            x: 0,\n            y: 25\n        },\n        connectable: false,\n        sourcePosition: \"right\"\n    },\n    {\n        id: \"3\",\n        type: \"output\",\n        data: {\n            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: \"Movies with letter A\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\DannyXing\\\\OneDrive\\\\UCLCourseFiles\\\\Database\\\\COMP0022MovieAnalytics\\\\client\\\\app\\\\data-flow-render.tsx\",\n                lineNumber: 38,\n                columnNumber: 20\n            }, undefined)\n        },\n        position: {\n            x: 500,\n            y: 25\n        },\n        connectable: false\n    },\n    {\n        id: \"2\",\n        type: \"operation\",\n        data: {\n            label: \"Filter\"\n        },\n        position: {\n            x: 250,\n            y: 250\n        },\n        connectable: false\n    }\n];\nconst initialEdges = [\n    {\n        id: \"e1-2\",\n        source: \"1\",\n        target: \"2\"\n    },\n    {\n        id: \"e2-3\",\n        source: \"2\",\n        target: \"3\",\n        animated: true\n    }\n];\nconst nodeColor = (node)=>{\n    switch(node.type){\n        case \"input\":\n            return \"#6ede87\";\n        case \"output\":\n            return \"#6865A5\";\n        default:\n            return \"#ff0072\";\n    }\n};\nconst selector = (state)=>({\n        nodes: state.nodes,\n        edges: state.edges,\n        setNodes: state.setNodes,\n        setEdges: state.setEdges\n    });\nfunction RenderDataFlow() {\n    _s();\n    const { nodes , setNodes , edges , setEdges  } = (0,_hooks_use_data_store__WEBPACK_IMPORTED_MODULE_1__.useDataStore)(selector, zustand_shallow__WEBPACK_IMPORTED_MODULE_4__.shallow);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        setNodes(initialNodes);\n        setEdges(initialEdges);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"border  flex-auto\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(reactflow__WEBPACK_IMPORTED_MODULE_5__.ReactFlow, {\n            nodes: nodes,\n            edges: edges,\n            fitView: true,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(reactflow__WEBPACK_IMPORTED_MODULE_5__.Panel, {\n                    position: \"top-left\",\n                    children: \"top-left\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\DannyXing\\\\OneDrive\\\\UCLCourseFiles\\\\Database\\\\COMP0022MovieAnalytics\\\\client\\\\app\\\\data-flow-render.tsx\",\n                    lineNumber: 85,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(reactflow__WEBPACK_IMPORTED_MODULE_6__.Controls, {}, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\DannyXing\\\\OneDrive\\\\UCLCourseFiles\\\\Database\\\\COMP0022MovieAnalytics\\\\client\\\\app\\\\data-flow-render.tsx\",\n                    lineNumber: 86,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(reactflow__WEBPACK_IMPORTED_MODULE_7__.MiniMap, {\n                    nodeColor: nodeColor,\n                    nodeStrokeWidth: 3,\n                    zoomable: true,\n                    pannable: true\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\DannyXing\\\\OneDrive\\\\UCLCourseFiles\\\\Database\\\\COMP0022MovieAnalytics\\\\client\\\\app\\\\data-flow-render.tsx\",\n                    lineNumber: 87,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(reactflow__WEBPACK_IMPORTED_MODULE_8__.Background, {\n                    color: \"#99b3ec\",\n                    variant: \"dots\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\DannyXing\\\\OneDrive\\\\UCLCourseFiles\\\\Database\\\\COMP0022MovieAnalytics\\\\client\\\\app\\\\data-flow-render.tsx\",\n                    lineNumber: 88,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\DannyXing\\\\OneDrive\\\\UCLCourseFiles\\\\Database\\\\COMP0022MovieAnalytics\\\\client\\\\app\\\\data-flow-render.tsx\",\n            lineNumber: 84,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\DannyXing\\\\OneDrive\\\\UCLCourseFiles\\\\Database\\\\COMP0022MovieAnalytics\\\\client\\\\app\\\\data-flow-render.tsx\",\n        lineNumber: 83,\n        columnNumber: 5\n    }, this);\n}\n_s(RenderDataFlow, \"1kUIesSLDhYJGObg0D6GjQeYxlQ=\", false, function() {\n    return [\n        _hooks_use_data_store__WEBPACK_IMPORTED_MODULE_1__.useDataStore\n    ];\n});\n_c = RenderDataFlow;\n/* harmony default export */ __webpack_exports__[\"default\"] = (RenderDataFlow);\nvar _c;\n$RefreshReg$(_c, \"RenderDataFlow\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vYXBwL2RhdGEtZmxvdy1yZW5kZXIudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFNkQ7QUFDSjtBQWlCdEM7QUFDZTtBQUNRO0FBRTFDLE1BQU1RLGVBQXVCO0lBQzNCO1FBQ0VDLElBQUk7UUFDSkMsTUFBTTtRQUNOQyxNQUFNO1lBQUVDLE9BQU87UUFBUztRQUN4QkMsVUFBVTtZQUFFQyxHQUFHO1lBQUdDLEdBQUc7UUFBRztRQUN4QkMsYUFBYSxLQUFLO1FBQ2xCQyxnQkFBZ0I7SUFDbEI7SUFFQTtRQUNFUixJQUFJO1FBQ0pDLE1BQU07UUFDTkMsTUFBTTtZQUFFQyxxQkFBTyw4REFBQ007MEJBQUk7Ozs7OztRQUEyQjtRQUMvQ0wsVUFBVTtZQUFFQyxHQUFHO1lBQUtDLEdBQUc7UUFBRztRQUMxQkMsYUFBYSxLQUFLO0lBQ3BCO0lBQ0E7UUFDRVAsSUFBSTtRQUNKQyxNQUFNO1FBQ05DLE1BQU07WUFBRUMsT0FBTztRQUFTO1FBQ3hCQyxVQUFVO1lBQUVDLEdBQUc7WUFBS0MsR0FBRztRQUFJO1FBQzNCQyxhQUFhLEtBQUs7SUFDcEI7Q0FDRDtBQUVELE1BQU1HLGVBQXVCO0lBQzNCO1FBQUVWLElBQUk7UUFBUVcsUUFBUTtRQUFLQyxRQUFRO0lBQUk7SUFDdkM7UUFBRVosSUFBSTtRQUFRVyxRQUFRO1FBQUtDLFFBQVE7UUFBS0MsVUFBVSxJQUFJO0lBQUM7Q0FDeEQ7QUFFRCxNQUFNQyxZQUFZLENBQUNDLE9BQWU7SUFDaEMsT0FBUUEsS0FBS2QsSUFBSTtRQUNmLEtBQUs7WUFDSCxPQUFPO1FBQ1QsS0FBSztZQUNILE9BQU87UUFDVDtZQUNFLE9BQU87SUFDWDtBQUNGO0FBRUEsTUFBTWUsV0FBVyxDQUFDQyxRQUFrQjtRQUNsQ0MsT0FBT0QsTUFBTUMsS0FBSztRQUNsQkMsT0FBT0YsTUFBTUUsS0FBSztRQUNsQkMsVUFBVUgsTUFBTUcsUUFBUTtRQUN4QkMsVUFBVUosTUFBTUksUUFBUTtJQUMxQjtBQUVBLFNBQVNDLGlCQUFpQjs7SUFDeEIsTUFBTSxFQUFFSixNQUFLLEVBQUVFLFNBQVEsRUFBRUQsTUFBSyxFQUFFRSxTQUFRLEVBQUUsR0FBRzlCLG1FQUFZQSxDQUFDeUIsVUFBVWxCLG9EQUFPQTtJQUUzRU4sZ0RBQVNBLENBQUMsSUFBTTtRQUNkNEIsU0FBU3JCO1FBQ1RzQixTQUFTWDtJQUNYLEdBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDRDtRQUFJYyxXQUFVO2tCQUNiLDRFQUFDOUIsZ0RBQVNBO1lBQUN5QixPQUFPQTtZQUFPQyxPQUFPQTtZQUFPSyxPQUFPOzs4QkFDNUMsOERBQUMzQiw0Q0FBS0E7b0JBQUNPLFVBQVM7OEJBQVc7Ozs7Ozs4QkFDM0IsOERBQUNULCtDQUFRQTs7Ozs7OEJBQ1QsOERBQUNELDhDQUFPQTtvQkFBQ29CLFdBQVdBO29CQUFXVyxpQkFBaUI7b0JBQUdDLFFBQVE7b0JBQUNDLFFBQVE7Ozs7Ozs4QkFDcEUsOERBQUMvQixpREFBVUE7b0JBQUNnQyxPQUFNO29CQUFVQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7OztBQUk3QztHQWxCU1A7O1FBQ3NDL0IsK0RBQVlBOzs7S0FEbEQrQjtBQW9CVCwrREFBZUEsY0FBY0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvZGF0YS1mbG93LXJlbmRlci50c3g/MDU0ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHsgdXNlRGF0YVN0b3JlLCBTdGF0ZSB9IGZyb20gXCJAL2hvb2tzL3VzZS1kYXRhLXN0b3JlXCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0Rmxvdywge1xuICBhZGRFZGdlLFxuICBGaXRWaWV3T3B0aW9ucyxcbiAgYXBwbHlOb2RlQ2hhbmdlcyxcbiAgYXBwbHlFZGdlQ2hhbmdlcyxcbiAgTm9kZSxcbiAgRWRnZSxcbiAgTm9kZUNoYW5nZSxcbiAgRWRnZUNoYW5nZSxcbiAgQ29ubmVjdGlvbixcbiAgTWluaU1hcCxcbiAgR2V0TWluaU1hcE5vZGVBdHRyaWJ1dGUsXG4gIENvbnRyb2xzLFxuICBCYWNrZ3JvdW5kLFxuICBCYWNrZ3JvdW5kVmFyaWFudCxcbiAgUGFuZWwsXG59IGZyb20gXCJyZWFjdGZsb3dcIjtcbmltcG9ydCBcInJlYWN0Zmxvdy9kaXN0L3N0eWxlLmNzc1wiO1xuaW1wb3J0IHsgc2hhbGxvdyB9IGZyb20gXCJ6dXN0YW5kL3NoYWxsb3dcIjtcblxuY29uc3QgaW5pdGlhbE5vZGVzOiBOb2RlW10gPSBbXG4gIHtcbiAgICBpZDogXCIxXCIsXG4gICAgdHlwZTogXCJpbnB1dFwiLFxuICAgIGRhdGE6IHsgbGFiZWw6IFwiTW92aWVzXCIgfSxcbiAgICBwb3NpdGlvbjogeyB4OiAwLCB5OiAyNSB9LFxuICAgIGNvbm5lY3RhYmxlOiBmYWxzZSxcbiAgICBzb3VyY2VQb3NpdGlvbjogXCJyaWdodFwiLFxuICB9LFxuXG4gIHtcbiAgICBpZDogXCIzXCIsXG4gICAgdHlwZTogXCJvdXRwdXRcIixcbiAgICBkYXRhOiB7IGxhYmVsOiA8ZGl2Pk1vdmllcyB3aXRoIGxldHRlciBBPC9kaXY+IH0sXG4gICAgcG9zaXRpb246IHsgeDogNTAwLCB5OiAyNSB9LFxuICAgIGNvbm5lY3RhYmxlOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIGlkOiBcIjJcIixcbiAgICB0eXBlOiBcIm9wZXJhdGlvblwiLFxuICAgIGRhdGE6IHsgbGFiZWw6IFwiRmlsdGVyXCIgfSxcbiAgICBwb3NpdGlvbjogeyB4OiAyNTAsIHk6IDI1MCB9LFxuICAgIGNvbm5lY3RhYmxlOiBmYWxzZSxcbiAgfSxcbl07XG5cbmNvbnN0IGluaXRpYWxFZGdlczogRWRnZVtdID0gW1xuICB7IGlkOiBcImUxLTJcIiwgc291cmNlOiBcIjFcIiwgdGFyZ2V0OiBcIjJcIiB9LFxuICB7IGlkOiBcImUyLTNcIiwgc291cmNlOiBcIjJcIiwgdGFyZ2V0OiBcIjNcIiwgYW5pbWF0ZWQ6IHRydWUgfSxcbl07XG5cbmNvbnN0IG5vZGVDb2xvciA9IChub2RlOiBOb2RlKSA9PiB7XG4gIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgY2FzZSBcImlucHV0XCI6XG4gICAgICByZXR1cm4gXCIjNmVkZTg3XCI7XG4gICAgY2FzZSBcIm91dHB1dFwiOlxuICAgICAgcmV0dXJuIFwiIzY4NjVBNVwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCIjZmYwMDcyXCI7XG4gIH1cbn07XG5cbmNvbnN0IHNlbGVjdG9yID0gKHN0YXRlOiBTdGF0ZSkgPT4gKHtcbiAgbm9kZXM6IHN0YXRlLm5vZGVzLFxuICBlZGdlczogc3RhdGUuZWRnZXMsXG4gIHNldE5vZGVzOiBzdGF0ZS5zZXROb2RlcyxcbiAgc2V0RWRnZXM6IHN0YXRlLnNldEVkZ2VzLFxufSk7XG5cbmZ1bmN0aW9uIFJlbmRlckRhdGFGbG93KCkge1xuICBjb25zdCB7IG5vZGVzLCBzZXROb2RlcywgZWRnZXMsIHNldEVkZ2VzIH0gPSB1c2VEYXRhU3RvcmUoc2VsZWN0b3IsIHNoYWxsb3cpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Tm9kZXMoaW5pdGlhbE5vZGVzKTtcbiAgICBzZXRFZGdlcyhpbml0aWFsRWRnZXMpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciAgZmxleC1hdXRvXCI+XG4gICAgICA8UmVhY3RGbG93IG5vZGVzPXtub2Rlc30gZWRnZXM9e2VkZ2VzfSBmaXRWaWV3PlxuICAgICAgICA8UGFuZWwgcG9zaXRpb249XCJ0b3AtbGVmdFwiPnRvcC1sZWZ0PC9QYW5lbD5cbiAgICAgICAgPENvbnRyb2xzIC8+XG4gICAgICAgIDxNaW5pTWFwIG5vZGVDb2xvcj17bm9kZUNvbG9yfSBub2RlU3Ryb2tlV2lkdGg9ezN9IHpvb21hYmxlIHBhbm5hYmxlIC8+XG4gICAgICAgIDxCYWNrZ3JvdW5kIGNvbG9yPVwiIzk5YjNlY1wiIHZhcmlhbnQ9e1wiZG90c1wiIGFzIEJhY2tncm91bmRWYXJpYW50fSAvPlxuICAgICAgPC9SZWFjdEZsb3c+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlbmRlckRhdGFGbG93O1xuIl0sIm5hbWVzIjpbInVzZURhdGFTdG9yZSIsInVzZUVmZmVjdCIsIlJlYWN0RmxvdyIsIk1pbmlNYXAiLCJDb250cm9scyIsIkJhY2tncm91bmQiLCJQYW5lbCIsInNoYWxsb3ciLCJpbml0aWFsTm9kZXMiLCJpZCIsInR5cGUiLCJkYXRhIiwibGFiZWwiLCJwb3NpdGlvbiIsIngiLCJ5IiwiY29ubmVjdGFibGUiLCJzb3VyY2VQb3NpdGlvbiIsImRpdiIsImluaXRpYWxFZGdlcyIsInNvdXJjZSIsInRhcmdldCIsImFuaW1hdGVkIiwibm9kZUNvbG9yIiwibm9kZSIsInNlbGVjdG9yIiwic3RhdGUiLCJub2RlcyIsImVkZ2VzIiwic2V0Tm9kZXMiLCJzZXRFZGdlcyIsIlJlbmRlckRhdGFGbG93IiwiY2xhc3NOYW1lIiwiZml0VmlldyIsIm5vZGVTdHJva2VXaWR0aCIsInpvb21hYmxlIiwicGFubmFibGUiLCJjb2xvciIsInZhcmlhbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./app/data-flow-render.tsx\n"));

/***/ })

});