 # Development Guidelines

## Code Organization

### Project Structure
- Keep all source code in the `src` directory
- Organize components by feature in `src/components`
- Place shared types in `src/types`
- Keep utility functions in `src/lib`
- Store context providers in `src/contexts`

### File Naming
- Use PascalCase for component files (e.g., `DogList.tsx`)
- Use camelCase for utility files (e.g., `supabase.ts`)
- Use kebab-case for migration files (e.g., `20240320000000_initial_setup.md`)

## Documentation

### Development Logs
- Create a new log entry for every significant change
- Follow the naming convention: `YYYYMMDDNNNNNN_description.md`
  - YYYY: Year
  - MM: Month
  - DD: Day
  - NNNNNN: Sequential number (6 digits)
  - description: Brief description of the change
- Each log must include:
  - Description
  - Changes (with code snippets where relevant)
  - Testing
  - Known Issues
  - Next Steps

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props using TypeScript interfaces
- Include usage examples for reusable components
- Document any non-obvious business logic

## TypeScript

### Type Definitions
- Define interfaces for all data structures
- Use strict type checking
- Avoid using `any` type
- Create separate types for form data and API responses

### Component Props
- Always define prop interfaces
- Use descriptive prop names
- Make required props explicit
- Document prop types with JSDoc comments

## React

### Component Structure
- Use functional components with hooks
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks
- Use proper prop drilling or context for state management

### State Management
- Use React Context for global state
- Use local state for component-specific data
- Implement proper loading and error states
- Handle side effects with useEffect

## Styling

### Material-UI
- Use MUI v7 components as primary building blocks
- Follow MUI's design system guidelines
- Use the `sx` prop for component-specific styles
- Create theme customizations in a central location

### Responsive Design
- Implement mobile-first design
- Use MUI's breakpoint system
- Test on multiple screen sizes
- Ensure accessibility standards

## Database

### Supabase
- Use migrations for schema changes
- Implement proper RLS policies
- Document database schema changes
- Handle database errors gracefully

### Data Operations
- Use TypeScript types for database entities
- Implement proper error handling
- Add loading states for async operations
- Validate data before submission

## Testing

### Code Testing
- Write unit tests for complex logic
- Test component rendering
- Test user interactions
- Test error scenarios

### Manual Testing
- Test on multiple browsers
- Verify responsive behavior
- Check accessibility
- Validate form submissions

## Git Workflow

### Commits
- Write clear commit messages
- Keep commits focused and atomic
- Reference issue numbers when applicable
- Follow conventional commit format

### Branches
- Use feature branches for new development
- Keep main branch stable
- Review code before merging
- Update documentation with changes

## Performance

### Optimization
- Implement proper code splitting
- Optimize images and assets
- Minimize bundle size
- Use proper caching strategies

### Monitoring
- Track performance metrics
- Monitor error rates
- Log important events
- Set up error tracking

## Security

### Authentication
- Implement proper auth flows
- Secure sensitive routes
- Handle token management
- Validate user input

### Data Protection
- Use RLS policies
- Sanitize user input
- Implement rate limiting
- Follow security best practices

## Deployment

### Build Process
- Use Vite for building
- Optimize production builds
- Test builds locally
- Document deployment steps

### Environment
- Use environment variables
- Document required variables
- Keep sensitive data secure
- Use proper environment separation

## Maintenance

### Dependencies
- Keep dependencies updated
- Review security advisories
- Test after updates
- Document breaking changes

### Code Quality
- Run linter before commits
- Fix all TypeScript errors
- Remove unused code
- Keep code DRY

## Communication

### Team Collaboration
- Update documentation promptly
- Communicate breaking changes
- Share knowledge and solutions
- Document decisions and rationale

### Issue Tracking
- Create detailed issues
- Include reproduction steps
- Label issues appropriately
- Track issue resolution