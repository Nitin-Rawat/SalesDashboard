// import { extendTheme } from "@chakra-ui/react";

// const Theme = {
//   config: {
//     intialColorMode: "dark",
//     useSystemColorMode: true,
//   },
//   styles: {
//     global: {
//       body: {
//         margin: 0,
//         "font-family":
//           "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
//         "-webkit-font-smoothing": "antialiased",
//         "-moz-osx-font-smoothing": "grayscale",
//       },

//       code: {
//         "font-family":
//           "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
//       },
//     },
//   },
// };

// export default extendTheme(Theme);
// +++++++++++++++++++++++++++++++++🫡🫡🫡 Dont Change above code without saving below one 🥲🥲🥲+++++++++++++++++++++++++++++


import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
