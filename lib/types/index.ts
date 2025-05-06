// Base User type
export interface User {
  id: string;
  name?: string; // Optional name
  email: string;
  roles?: string[]; // Optional roles
}

// Generic paginated response structure from Spring Boot Page
export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

// Re-export other types
export * from "./product";
export * from "./categories-schema";
export * from "./rating";
export * from "./order"; // Add order types
