# Design Patterns, Practices, Clean Code & AI Rulesets

## **Intro**

This document outlines the design patterns, best practices, clean code principles, and AI coding rulesets used in this project. Use this as a reference guide when building similar applications with the same architecture.

## **Table of Contents**

1. [**Backend Design Patterns**](https://www.notion.so/Backend-Design-Patterns-2efa63dd800b80009e11c505e07e8457?pvs=21) 
2. [**Frontend Design Patterns**](https://www.notion.so/Frontend-Design-Patterns-2efa63dd800b808eab00e31047120da8?pvs=21) 
3. [**Clean Code Principles**](https://www.notion.so/Clean-Code-Principles-2efa63dd800b80b8916fc1820ed52de2?pvs=21) 
4. [**Best Practices**](https://www.notion.so/Best-Practices-2efa63dd800b80b19a45c2d04f6793dc?pvs=21) 
5. [**AI Coding Rulesets**](https://www.notion.so/AI-Coding-Rulesets-2efa63dd800b80ddba68d415608ef76e?pvs=21) 

---

## **Backend Design Patterns**

### **1. Module Pattern (NestJS)**

**Pattern**: Feature-based modular architecture

**Implementation**:

- Each feature domain has its own module (e.g., `AccountsModule`, `TransactionsModule`)
- Modules encapsulate controllers, services, and entities
- Modules export services for cross-module dependencies

**Example Structure**:

```tsx
@Module({
  imports: [
    TypeOrmModule.forFeature([Entity]),
    OtherModule, // Import dependencies
  ],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [FeatureService], // Export for other modules
})
export class FeatureModule {}

```

**Rules**:

- One module per feature domain
- Export services that other modules need
- Import modules, not direct service dependencies
- Keep modules focused on a single responsibility

---

### **2. Dependency Injection Pattern**

**Pattern**: Constructor-based dependency injection

**Implementation**:

- All dependencies injected via constructor
- Use `@InjectRepository()` for TypeORM repositories
- Use `@Injectable()` decorator for services

**Example**:

```tsx
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private currenciesService: CurrenciesService, // Injected service
    private dataSource: DataSource,
    configService: ConfigService,
) {}
}

```

**Rules**:

- Always inject dependencies, never instantiate directly
- Use constructor injection, not property injection
- Mark services with `@Injectable()` decorator
- Inject repositories using `@InjectRepository()`

---

### **3. Repository Pattern**

**Pattern**: Data access abstraction layer

**Implementation**:

- Use TypeORM repositories for database operations
- Encapsulate database queries in service layer
- Use QueryBuilder for complex queries

**Example**:

```tsx
// Simple query
const account = await this.accountRepository.findOne({
  where: { id: accountId },
  relations: ['currency', 'userAccounts'],
});

// Complex query with QueryBuilder
const accounts = await this.accountRepository
  .createQueryBuilder('account')
  .leftJoinAndSelect('account.currency', 'currency')
  .where('account.status = :status', { status: 'ACTIVE' })
  .orderBy('account.createdAt', 'DESC')
  .getMany();

```

**Rules**:

- Never expose repositories directly to controllers
- Always use repositories through services
- Use QueryBuilder for complex queries
- Always include necessary relations to avoid N+1 queries

---

### **4. DTO (Data Transfer Object) Pattern**

**Pattern**: Separate data structures for API boundaries

**Implementation**:

- Create DTOs for all API inputs/outputs
- Use Zod schemas for runtime validation
- Use class-validator decorators for additional validation

**Example**:

```tsx
// Zod schema for validation
export const createAccountSchema = z.object({
  type: z.nativeEnum(AccountType).optional().default(AccountType.CHECKING),
  currencyId: z.string().length(3).optional().default('USD'),
});

// DTO class
export class CreateAccountDto {
  @IsOptional()
  @IsEnum(AccountType)
  type?: AccountType;

  @IsOptional()
  currencyId?: string;
}

```

**Rules**:

- Create DTOs for all controller endpoints
- Use Zod for runtime validation
- Use class-validator decorators for additional validation
- Never expose entities directly in API responses
- Transform entities to DTOs before returning

---

### **5. Guard Pattern (Authentication/Authorization)**

**Pattern**: Route protection and access control

**Implementation**:

- Use `JwtAuthGuard` for authentication
- Use `RolesGuard` with `@Roles()` decorator for authorization
- Create custom guards for specific requirements

**Example**:

```tsx
@Controller('transactions')
@UseGuards(JwtAuthGuard) // Apply to all routes
export class TransactionsController {
  @Post('deposit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.EMPLOYEE, UserRole.ADMIN) // Role-based access
  async deposit(@CurrentUser() user: User, @Body() dto: DepositDto) {
    return this.service.deposit(user.id, user.role, dto);
  }
}

```

**Rules**:

- Always protect routes with `JwtAuthGuard`
- Use `@Roles()` decorator for role-based access control
- Use `@CurrentUser()` decorator to get authenticated user
- Create custom guards for complex authorization logic

---

### **6. Decorator Pattern**

**Pattern**: Custom parameter decorators

**Implementation**:

- Create custom decorators for common patterns
- Use `createParamDecorator` for parameter extraction

**Example**:

```tsx
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    return request.user;
  },
);

```

**Rules**:

- Create reusable decorators for common patterns
- Use decorators to extract request data
- Keep decorators simple and focused

---

### **7. Interceptor Pattern**

**Pattern**: Cross-cutting concerns

**Implementation**:

- Use interceptors for request/response transformation
- Implement `NestInterceptor` interface
- Register globally or per route

**Example**:

```tsx
@Injectable()
export class UserStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const user = request.user as User;

    // Add custom headers
    response.setHeader('X-User-Status', user?.status || 'DISABLED');

    return next.handle();
  }
}

```

**Rules**:

- Use interceptors for cross-cutting concerns
- Register globally in `main.ts` for app-wide behavior
- Keep interceptors lightweight and fast

---

### **8. Exception Filter Pattern**

**Pattern**: Centralized error handling

**Implementation**:

- Create global exception filters
- Transform exceptions to consistent API responses
- Add custom headers in error responses

**Example**:

```tsx
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json(exception.getResponse());
  }
}

```

**Rules**:

- Use exception filters for centralized error handling
- Always return consistent error response format
- Log errors appropriately
- Don't expose internal error details in production

---

### **9. Service Layer Pattern**

**Pattern**: Business logic encapsulation

**Implementation**:

- All business logic in services
- Controllers only handle HTTP concerns
- Services are reusable across modules

**Example**:

```tsx
@Injectable()
export class AccountsService {
  async create(userId: string, dto: CreateAccountDto) {
    // Business logic here
    // Validation
    // Database operations
    // Return result
  }
}

```

**Rules**:

- Controllers should be thin - delegate to services
- Services contain all business logic
- Services can call other services
- Services handle transactions and error handling

---

### **10. Transaction Pattern**

**Pattern**: Database transaction management

**Implementation**:

- Use QueryRunner for manual transactions
- Always handle rollback on errors
- Release QueryRunner in finally block

**Example**:

```tsx
const queryRunner = this.dataSource.createQueryRunner();
await queryRunner.connect();
await queryRunner.startTransaction();

try {
  // Multiple database operations
  await queryRunner.manager.save(entity1);
  await queryRunner.manager.save(entity2);

  await queryRunner.commitTransaction();
} catch (error) {
  await queryRunner.rollbackTransaction();
  throw error;
} finally {
  await queryRunner.release();
}

```

**Rules**:

- Always use transactions for multi-step operations
- Always rollback on errors
- Always release QueryRunner in finally block
- Keep transactions as short as possible

---

### **11. Factory Pattern (Configuration)**

**Pattern**: Configuration factory functions

**Implementation**:

- Create factory functions for configuration
- Use ConfigService for environment variables
- Return typed configuration objects

**Example**:

```tsx
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    // ... other config
  };
};

```

**Rules**:

- Use factory functions for complex configurations
- Validate required configuration values
- Return typed configuration objects
- Throw errors for missing required config

---

### **12. Strategy Pattern (Authentication)**

**Pattern**: Pluggable authentication strategies

**Implementation**:

- Use Passport strategies for authentication
- Implement Strategy interface
- Register strategies in AuthModule

**Example**:

```tsx
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

```

**Rules**:

- Use Passport strategies for authentication
- Keep validation logic in strategy
- Return user object from validate method

---

## **Frontend Design Patterns**

### **1. Component Pattern**

**Pattern**: Reusable UI components

**Implementation**:

- Create reusable components in `ui/` directory
- Create feature-specific components in `components/` directory
- Use TypeScript interfaces for props

**Example**:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <button className={getButtonClasses(variant)} {...props}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

```

**Rules**:

- Use TypeScript for all component props
- Extract reusable components to `ui/` directory
- Keep components focused and single-purpose
- Use composition over inheritance

---

### **2. Custom Hooks Pattern**

**Pattern**: Reusable logic extraction

**Implementation**:

- Create custom hooks for reusable logic
- Use `use` prefix for hook names
- Return objects or arrays from hooks

**Example**:

```tsx
export const useAccounts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.get('/accounts').then(res => res.data),
  });

  return { accounts: data, isLoading, error };
};

```

**Rules**:

- Extract reusable logic into custom hooks
- Use React Query for server state
- Keep hooks focused on single responsibility
- Return consistent hook interfaces

---

### **3. Context API Pattern**

**Pattern**: Global state management

**Implementation**:

- Use Context API for app-wide state
- Create Provider components
- Create custom hooks for context access

**Example**:

```tsx
const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  const openModal = useCallback((content: React.ReactNode) => {
    // Implementation
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};

```

**Rules**:

- Use Context API for app-wide state
- Create Provider components
- Create custom hooks for context access
- Always check context existence in hooks

---

### **4. State Management Pattern (Zustand)**

**Pattern**: Client-side state management

**Implementation**:

- Use Zustand for client-side state
- Use React Query for server state
- Persist state when needed

**Example**:

```tsx
interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
);

```

**Rules**:

- Use Zustand for client-side state (auth, UI state)
- Use React Query for server state (API data)
- Persist only necessary state
- Keep stores focused and small

---

### **5. Service Layer Pattern (API)**

**Pattern**: API abstraction layer

**Implementation**:

- Create API service with Axios instance
- Use interceptors for common concerns
- Export typed API functions

**Example**:

```tsx
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

```

**Rules**:

- Create single Axios instance
- Use interceptors for auth tokens
- Handle errors in response interceptor
- Export typed API functions

---

### **6. Protected Routes Pattern**

**Pattern**: Route access control

**Implementation**:

- Create ProtectedRoute component
- Check authentication status
- Redirect to login if not authenticated

**Example**:

```tsx
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

```

**Rules**:

- Protect routes that require authentication
- Redirect to login if not authenticated
- Check roles for role-based routes
- Keep route protection logic simple

---

### **7. Form Handling Pattern**

**Pattern**: Controlled form components

**Implementation**:

- Use controlled components for forms
- Manage form state with useState
- Handle validation and errors

**Example**:

```tsx
export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      // Handle success
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};

```

**Rules**:

- Use controlled components for all forms
- Handle loading and error states
- Clear errors on form submission
- Validate on submit, not on change

---

## **Clean Code Principles**

### **1. TypeScript Strict Typing**

**Rules**:

- Always use TypeScript, never `any` type
- Define interfaces for all data structures
- Use type inference where possible
- Use enums for constants

**Example**:

```tsx
// Good
interface User {
  id: string;
  email: string;
  role: UserRole;
}

// Bad
const user: any = { id: 1, email: 'test' };

```

---

### **2. Utility Functions**

**Rules**:

- Extract reusable logic into utility functions
- Place utilities in `common/utils/` directory
- Document utility functions with JSDoc
- Keep utilities pure (no side effects)

**Example**:

```tsx
/**
 * Convert dollars to cents (for storage)
 * @param dollars - Amount in dollars (e.g., 1.5)
 * @returns Amount in cents (e.g., 150)
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

```

---

### **3. Error Handling**

**Rules**:

- Always handle errors explicitly
- Use try-catch for async operations
- Provide meaningful error messages
- Log errors appropriately

**Example**:

```tsx
try {
  const result = await this.service.operation();
  return result;
} catch (error) {
  if (error instanceof NotFoundException) {
    throw new NotFoundException('Resource not found');
  }
  throw new BadRequestException('Operation failed');
}

```

---

### **4. Validation**

**Rules**:

- Validate all inputs at API boundaries
- Use Zod for runtime validation
- Use class-validator for DTOs
- Return clear validation error messages

**Example**:

```tsx
// Zod schema
const schema = z.object({
  email: z.string().email(),
  amount: z.number().positive(),
});

// Validate
const validated = schema.parse(input);

```

---

### **5. Constants Extraction**

**Rules**:

- Extract magic numbers and strings to constants
- Use enums for related constants
- Place constants at top of file or separate file
- Use descriptive constant names

**Example**:

```tsx
// Good
private readonly MAX_ACCOUNTS_PER_USER = 3;
private readonly DEFAULT_CURRENCY = 'USD';

// Bad
if (count >= 3) { }
const currency = 'USD';

```

---

### **6. Single Responsibility Principle**

**Rules**:

- Each class/function should have one reason to change
- Keep functions small and focused
- Split large functions into smaller ones
- One module per feature domain

---

### **7. DRY (Don't Repeat Yourself)**

**Rules**:

- Extract repeated code into functions/components
- Use shared utilities for common operations
- Create reusable components
- Avoid code duplication

---

### **8. Naming Conventions**

**Rules**:

- Use descriptive names for variables, functions, classes
- Use camelCase for variables and functions
- Use PascalCase for classes and components
- Use UPPER_SNAKE_CASE for constants
- Use descriptive file names

**Example**:

```tsx
// Good
const userAccountCount = 0;
function calculateAccountBalance() {}
class AccountsService {}
const MAX_ACCOUNTS = 3;

// Bad
const uac = 0;
function calc() {}
class AS {}
const max = 3;

```

---

## **Best Practices**

### **Backend Best Practices**

1. **Database Migrations**
    - Always use migrations, never synchronize
    - Name migrations descriptively
    - Test migrations before deploying
2. **Environment Variables**
    - Never commit `.env` files
    - Use ConfigService for environment access
    - Validate required environment variables
3. **API Responses**
    - Return consistent response formats
    - Use appropriate HTTP status codes
    - Include error messages in responses
4. **Security**
    - Always hash passwords with bcrypt
    - Use JWT for authentication
    - Validate and sanitize all inputs
    - Use HTTPS in production
5. **Testing**
    - Write unit tests for services
    - Write integration tests for APIs
    - Write E2E tests for critical flows
    - Aim for high test coverage

### **Frontend Best Practices**

1. **Component Organization**
    - Organize by feature, not by type
    - Keep components small and focused
    - Extract reusable components
2. **State Management**
    - Use React Query for server state
    - Use Zustand for client state
    - Minimize prop drilling
3. **Performance**
    - Use React.memo for expensive components
    - Use useMemo and useCallback appropriately
    - Lazy load routes
    - Optimize images
4. **Accessibility**
    - Use semantic HTML
    - Add ARIA labels where needed
    - Ensure keyboard navigation
    - Test with screen readers
5. **Error Handling**
    - Show user-friendly error messages
    - Handle loading states
    - Provide fallback UI
    - Log errors for debugging

---

## **AI Coding Rulesets**

### **Backend AI Rules**

```
When writing NestJS backend code:

1. Always use TypeScript with strict typing - never use 'any'
2. Follow the module pattern - one module per feature domain
3. Use dependency injection - inject via constructor
4. Create DTOs for all API endpoints with Zod validation
5. Use @Injectable() decorator for all services
6. Use @InjectRepository() for TypeORM repositories
7. Protect routes with @UseGuards(JwtAuthGuard)
8. Use @Roles() decorator for role-based access control
9. Use @CurrentUser() decorator to get authenticated user
10. Always handle errors with try-catch and appropriate exceptions
11. Use transactions (QueryRunner) for multi-step operations
12. Always rollback transactions on errors
13. Always release QueryRunner in finally block
14. Use QueryBuilder for complex database queries
15. Always include necessary relations to avoid N+1 queries
16. Extract constants to class properties or enums
17. Use utility functions for reusable logic
18. Document complex functions with JSDoc comments
19. Use descriptive names for all variables and functions
20. Keep functions small and focused (single responsibility)

```

### **Frontend AI Rules**

```
When writing React frontend code:

1. Always use TypeScript with strict typing - never use 'any'
2. Define interfaces for all component props
3. Use functional components with hooks
4. Extract reusable components to ui/ directory
5. Use custom hooks for reusable logic
6. Use React Query for server state management
7. Use Zustand for client-side state (auth, UI state)
8. Use controlled components for all forms
9. Handle loading and error states in components
10. Use Axios interceptors for auth tokens
11. Protect routes with ProtectedRoute component
12. Use React.memo for expensive components
13. Use useMemo and useCallback appropriately
14. Extract API calls to service layer
15. Use descriptive names for all variables and functions
16. Keep components small and focused
17. Use composition over inheritance
18. Handle errors gracefully with user-friendly messages
19. Use semantic HTML for accessibility
20. Always handle async operations with try-catch

```

### **Database AI Rules**

```
When working with database code:

1. Always use migrations, never synchronize
2. Name migrations descriptively with timestamps
3. Use TypeORM entities for database models
4. Define relationships explicitly in entities
5. Use enums for status and type fields
6. Store monetary amounts as integers (cents)
7. Use UUIDs for primary keys
8. Add indexes for frequently queried fields
9. Use soft deletes where appropriate
10. Add createdAt and updatedAt timestamps
11. Use transactions for multi-step operations
12. Always handle foreign key constraints
13. Use QueryBuilder for complex queries
14. Always include necessary relations
15. Avoid N+1 query problems

```

### **General AI Rules**

```
General coding rules:

1. Write self-documenting code with clear names
2. Keep functions under 50 lines when possible
3. Extract magic numbers and strings to constants
4. Use early returns to reduce nesting
5. Comment why, not what
6. Follow consistent code formatting
7. Use ESLint and Prettier
8. Write tests for critical functionality
9. Handle errors explicitly
10. Validate all inputs
11. Use environment variables for configuration
12. Never commit secrets or credentials
13. Use version control effectively
14. Write meaningful commit messages
15. Keep dependencies up to date

```

---

## **Project Structure Standards**

### **Backend Structure**

```
backend/
├── src/
│   ├── [feature]/          # Feature modules
│   │   ├── [feature].controller.ts
│   │   ├── [feature].service.ts
│   │   ├── [feature].module.ts
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entities/        # TypeORM entities
│   │   └── [feature].service.spec.ts  # Tests
│   ├── auth/                # Authentication module
│   │   ├── guards/          # Auth guards
│   │   ├── strategies/      # Passport strategies
│   │   └── decorators/       # Custom decorators
│   ├── common/              # Shared code
│   │   ├── filters/         # Exception filters
│   │   ├── interceptors/    # Interceptors
│   │   ├── pipes/           # Validation pipes
│   │   └── utils/           # Utility functions
│   ├── config/              # Configuration
│   ├── database/            # Migrations and seeds
│   └── main.ts              # Application entry

```

### **Frontend Structure**

```
frontend/
├── src/
│   ├── components/          # Feature components
│   ├── pages/               # Page components
│   ├── ui/                  # Reusable UI components
│   ├── hooks/               # Custom hooks
│   ├── stores/               # Zustand stores
│   ├── services/            # API services
│   ├── types/               # TypeScript types
│   ├── routes/              # Route configuration
│   ├── layout/              # Layout components
│   └── utils/               # Utility functions

```

---

## **Summary**

This document provides a comprehensive guide to the design patterns, practices, and coding standards used in this project. Follow these guidelines to maintain consistency and code quality across the codebase. When working with AI coding assistants, use the provided rulesets to ensure generated code follows these patterns and practices.

**Key Takeaways**:

- Use modular architecture with clear separation of concerns
- Follow dependency injection patterns
- Implement proper error handling and validation
- Use TypeScript strictly throughout
- Keep code DRY and maintainable
- Write tests for critical functionality
- Follow consistent naming conventions
- Document complex logic

---

- Sub Pages
    
    [**Backend Design Patterns**](https://www.notion.so/Backend-Design-Patterns-2efa63dd800b808883ade78a0a84621e?pvs=21)
    
    [Frontend **Design Patterns**](https://www.notion.so/Frontend-Design-Patterns-2efa63dd800b808197e2d40626100826?pvs=21)
    
    [Clean Code Principles](https://www.notion.so/Clean-Code-Principles-2efa63dd800b80269877d98533d27c5e?pvs=21)
    
    [AI Coding Rulesets](https://www.notion.so/AI-Coding-Rulesets-2efa63dd800b8038a150d2d845b45e46?pvs=21)
    
    [Project Structure **Standards**](https://www.notion.so/Project-Structure-Standards-2efa63dd800b807c965cd2a5089167b9?pvs=21)