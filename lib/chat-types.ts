import type { InferUITools, UIDataTypes, UIMessage } from "ai"
import type { tools } from "@/lib/tools"

// Type-only import: erased at compile time, so this never pulls the server
// tool implementations (which read the filesystem) into the client bundle.
export type AppTools = InferUITools<typeof tools>
export type AppUIMessage = UIMessage<unknown, UIDataTypes, AppTools>
