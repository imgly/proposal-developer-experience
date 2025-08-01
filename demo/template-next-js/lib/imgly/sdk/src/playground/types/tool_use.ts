import tools from "./tools"
import background_removal from "@imgly/plugin-bgremove"

tools.imgly. 


declare module "./tools" {
interface ToolSchema {
      "plugin_reverse": {
      params: [options:{ text: string }];
      result: void;
    };
  }
}



declare module "./tools" {
  interface ToolSchema {
    /**
    * Reverses a string.
    * @param text The input string to reverse
    * @param value The input string to reverse (default: 42)
    * @returns The reversed string
    */
    "uno_reverse": {
      params: [text: string, value?: number];
      result: string;
    };
  }
}





// // will throw an error as no handler is registered
// tools.uno_reverse("Hello", 42)
// tools.plugin_reverse({ text: "hello" })



// tools.handle("uno_reverse", (text, value) => { return "hello" })
// tools.handle("plugin_reverse", (options) => { })

// // middleware 
// tools.use("uno_reverse", (text, value, context) => { 
//     console.trace("Debug log")
//     let val = context.next?.(text, value);
//     console.trace("Debug log")
//     return val + " (Middleware)";
// })


// // should work
// tools.uno_reverse("Hello", 42)
// tools.plugin_reverse({ text: "hello" })

// tools.dad_joke("willy wonkers")

// /**
//   {
//       "name": "dad_joke",
//       "description": "Reverses a string.",
//       "params": [
//         {
//           "name": "text",
//           "description": "The input string to reverse",
//           "schema": {
//             "type": "string",
//           }
//         }
//       ],
//       "result": {
//         "name": "result",
//         "description": "The reversed string",
//         "schema": {
//           "type": "string"
//         }
//       }
//     } 
  
//  */

// /**
// name: dad_joke
// description: Reverses a string.
// params:
//   - name: text
//     description: The input string to reverse
//     schema:
//       type: string
// result:
//   name: result
//   description: The reversed string
//   schema:
//     type: string
// */



// declare module "./tools" {
//   interface ToolSchema {
//     /**
//     * Reverses a string.
//     * @param  [text = "hello"] The input string to reverse
//     * @returns The reversed string
//     */
//     "dad_joke": {
//       params: [text?: string];
//       result: Promise<string>;
//     };
//   }
// }



// declare module "./tools" {
//   interface ToolSchema {
//     /**
//     * Reverses a string.
//     * @param  [text = "hello"] The input string to reverse
//     * @returns The reversed string
//     */
//     "dad_joke": {text?: string) => Promise<string>;
//   }
// }



// tools.dad_joke("How many engineers are needed to change a bulb?")
// tools.handle("dad_joke", async (text = "Hello") => text)


// await tools.dad_joke()



// await tools.call("dad_joke", "bla")



// // this shall return the full api reference
// tools.describe() 
