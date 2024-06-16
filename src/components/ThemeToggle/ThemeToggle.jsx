// import { Button } from "@chakra-ui/button";
// import { useColorMode } from "@chakra-ui/color-mode";
// import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// const ThemeToggle = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <Button
//       onClick={() => toggleColorMode()}
//       pos="absolute"
//       top="0"
//       right="0"
//       m="1rem"
//     >
//       {colorMode === "dark" ? (
//         <SunIcon color="orange.200" />
//       ) : (
//         <MoonIcon color="blue.700" />
//       )}
//     </Button>
//   );
// };

// export default ThemeToggle;

// +++++++++++++++++++++++++++++++++🫡🫡🫡 Dont Change above code without saving below one 🥲🥲🥲+++++++++++++++++++++++++++++


import React from "react";
import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={() => toggleColorMode()}
      pos="absolute"
      top="0"
      right="0"
      m="1rem"
    >
      {colorMode === "dark" ? (
        <SunIcon color="orange.200" />
      ) : (
        <MoonIcon color="blue.700" />
      )}
    </Button>
  );
};

export default ThemeToggle;
