
const myCommand = ({params, context}) => {


    //we return message type
    return { contents: [{ type: "text", text: "hello" }] }

}

export default myCommand