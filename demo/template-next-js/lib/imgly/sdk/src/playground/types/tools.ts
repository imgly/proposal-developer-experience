// We need this to fill this later with module declarations
export interface ToolSchema {

}




type ToolName = keyof ToolSchema;

type ToolHandler<T extends ToolName> = (
  ...params: ToolSchema[T]['params']
) => ToolSchema[T]['result']; // | Promise<ToolSchema[T]['result']>;

export type ToolFn<T> = (...args: T['params']) => T['result'];


type Tools = {
  [K in ToolName]: ToolFn<ToolSchema[K]>;
} & {
  call: <T extends ToolName>(
    name: T,
    ...params: ToolSchema[T]['params']
  ) => ToolSchema[T]['result];

  handle: <T extends ToolName>(
    name: T,
    handler: ToolHandler<T>
  ) => void;
};

// 👇 dynamic call object (mutable)
const tools = {} as Tools;

tools.handle = function <T extends ToolName>(
  name: T,
  handler: ToolHandler<T>
) {
  // Store the raw function directly
  (tools as any)[name] = (...args: any[]) => {
    return tools.call(name, ...args); // central dispatcher
  };

  // Also store the raw handler internally
  (tools._handlers ??= {})[name] = handler;
};


tools.call = function <T extends ToolName>(
  name: T,
  ...params: ToolSchema[T]['params']
): ToolSchema[T]['result'] {
  const handlers = (tools as any)._handlers as {
    [K in ToolName]: ToolHandler<K>;
  };

  const fn = handlers?.[name];
  if (!fn) throw new Error(`Handler for "${name}" not registered`);

  return fn(...params);
};


export default tools;
