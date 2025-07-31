import { supabase } from '@/utils/supabase';
import { ERROR_MESSAGES } from '@/constants';

// Custom error classes for better error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, public field?: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = ERROR_MESSAGES.NETWORK_ERROR) {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

// Type for database operations
export interface DatabaseQuery<T = any> {
  from: (table: string) => DatabaseQuery<T>;
  select: (columns?: string) => DatabaseQuery<T>;
  insert: (data: Partial<T> | Partial<T>[]) => DatabaseQuery<T>;
  update: (data: Partial<T>) => DatabaseQuery<T>;
  delete: () => DatabaseQuery<T>;
  eq: (column: string, value: any) => DatabaseQuery<T>;
  order: (column: string, options?: { ascending?: boolean }) => DatabaseQuery<T>;
  limit: (count: number) => DatabaseQuery<T>;
  single: () => DatabaseQuery<T>;
  overlaps: (column: string, value: any[]) => DatabaseQuery<T>;
  or: (filters: string) => DatabaseQuery<T>;
}

// Response wrapper for consistent error handling
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  success: boolean;
}

class ApiClient {
  private handleError(error: any): ApiError {
    console.error('API Error:', error);

    if (!navigator.onLine) {
      return new NetworkError();
    }

    if (error.code === 'PGRST301') {
      return new ValidationError('Resource not found');
    }

    if (error.code?.startsWith('PGRST')) {
      return new ApiError(error.message || ERROR_MESSAGES.UNKNOWN_ERROR, 400, error);
    }

    if (error.name === 'NetworkError') {
      return new NetworkError();
    }

    return new ApiError(
      error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      error.status || 500,
      error
    );
  }

  async query<T>(queryFn: () => Promise<any>): Promise<ApiResponse<T>> {
    try {
      const result = await queryFn();

      if (result.error) {
        return {
          data: null,
          error: this.handleError(result.error),
          success: false,
        };
      }

      return {
        data: result.data,
        error: null,
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
        success: false,
      };
    }
  }

  // Convenience methods for common operations
  async get<T>(table: string, options: {
    select?: string;
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    single?: boolean;
  } = {}): Promise<ApiResponse<T>> {
    return this.query(async () => {
      let query = supabase.from(table).select(options.select || '*');

      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      if (options.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? false 
        });
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.single) {
        query = query.single();
      }

      return query;
    });
  }

  async create<T>(table: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.query(async () => {
      return supabase.from(table).insert(data).select().single();
    });
  }

  async update<T>(
    table: string, 
    id: string | number, 
    data: Partial<T>
  ): Promise<ApiResponse<T>> {
    return this.query(async () => {
      return supabase.from(table).update(data).eq('id', id).select().single();
    });
  }

  async delete(table: string, id: string | number): Promise<ApiResponse<void>> {
    return this.query(async () => {
      return supabase.from(table).delete().eq('id', id);
    });
  }

  // File upload helpers
  async uploadFile(
    bucket: string, 
    path: string, 
    file: File
  ): Promise<ApiResponse<{ path: string; url: string }>> {
    return this.query(async () => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return {
        data: {
          path: data.path,
          url: urlData.publicUrl,
        },
        error: null,
      };
    });
  }
}

export const apiClient = new ApiClient();