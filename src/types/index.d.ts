/**
 * Represents a single TODO item in the application.
 * @interface Todo
 * @property {string} id - Unique identifier for the TODO (UUID v4)
 * @property {string} body - The text content/description of the TODO
 * @property {boolean} completed - Whether the TODO has been completed
 */
export interface Todo {
    id: string;
    body: string;
    completed: boolean;
}

/**
 * Type alias for TODO identifiers.
 * Provides type safety when passing TODO IDs between components.
 * @typedef {string} TodoId
 */
export type TodoId = Todo["id"];

/**
 * Union type representing all possible filter values.
 * Derived from the TODO_FILTERS constant to ensure type safety.
 * @typedef {"all" | "active" | "completed"} FilterValue
 */
export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
