/\*\*

- Production Build Configuration and Deployment Guide
  \*/

# Production Build Configuration

## Build Optimization

- **Asset bundling**: Optimized with Vite for minimal bundle size
- **Code splitting**: Lazy loading implemented for components and assets
- **Tree shaking**: Unused code automatically removed
- **Compression**: Gzip and Brotli compression enabled
- **Cache optimization**: Long-term caching with content hashing

## Performance Features

- **Asset Manager**: Intelligent caching with LRU eviction
- **Performance Monitor**: Real-time performance tracking and auto-optimization
- **Lazy Loading**: Assets loaded on-demand to reduce initial load time
- **Quality Scaling**: Automatic quality adjustment based on device capabilities
- **Memory Management**: Efficient cleanup of unused resources

## Testing Infrastructure

- **Unit Tests**: Comprehensive component testing with Vitest
- **Integration Tests**: Full game flow testing
- **Performance Tests**: Benchmark testing for critical paths
- **Coverage Reports**: Detailed code coverage analysis
- **Mock System**: Complete mocking for external dependencies

## Build Commands

### Development

```bash
npm run dev           # Start development server
npm run dev --host    # Development with network access
```

### Testing

```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:ui       # Run tests with UI interface
npm run test:coverage # Generate coverage reports
```

### Production

```bash
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run code quality checks
npm run type-check    # TypeScript type checking
```

### Asset Optimization

```bash
npm run optimize-images    # Optimize all images
npm run optimize-quick     # Quick image optimization
npm run optimize-webp      # Convert to WebP format
```

## Deployment Checklist

### Pre-deployment

- [ ] Run full test suite: `npm run test`
- [ ] Generate coverage report: `npm run test:coverage`
- [ ] Optimize images: `npm run optimize-images`
- [ ] Type check: `npm run type-check`
- [ ] Lint code: `npm run lint`
- [ ] Build production: `npm run build`
- [ ] Test production build: `npm run preview`

### Performance Validation

- [ ] Check bundle size (should be < 2MB total)
- [ ] Verify lazy loading works correctly
- [ ] Test on various device capabilities
- [ ] Validate loading performance (< 3s initial load)
- [ ] Confirm memory usage stays under limits

### Quality Assurance

- [ ] All 145 game assets properly integrated
- [ ] Educational system fully functional
- [ ] Smooth transitions between scenes
- [ ] Character portraits loading correctly
- [ ] Audio system working properly
- [ ] Responsive design on all screen sizes

## Environment Configuration

### Development

```env
NODE_ENV=development
VITE_DEV_MODE=true
VITE_PERFORMANCE_MONITORING=true
```

### Production

```env
NODE_ENV=production
VITE_DEV_MODE=false
VITE_PERFORMANCE_MONITORING=false
VITE_ANALYTICS_ENABLED=true
```

## Deployment Platforms

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
```

### GitHub Pages

```bash
# Enable GitHub Actions for deployment
# Configure build workflow in .github/workflows/
```

## Performance Monitoring

### Metrics Tracked

- Frame rate (target: >30 FPS)
- Memory usage (target: <200MB)
- Asset load times
- Render performance
- Cache hit rates

### Auto-optimization Features

- Quality level adjustment based on performance
- Dynamic asset preloading
- Memory-based cache size management
- Connection-aware loading strategies

## Security Considerations

- No sensitive data in client-side code
- Content Security Policy configured
- Asset integrity verification
- XSS protection enabled

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Asset Management

- 145 high-quality game assets optimized
- WebP format for modern browsers
- Fallback formats for compatibility
- Progressive loading for large assets
- Efficient sprite atlasing

## Troubleshooting

### Common Issues

1. **Large bundle size**: Check for unused imports, optimize images
2. **Slow loading**: Enable lazy loading, check network conditions
3. **Memory leaks**: Review component cleanup, asset management
4. **Performance issues**: Enable auto-optimization, reduce quality

### Debug Tools

- Browser DevTools performance profiler
- React DevTools profiler
- Built-in performance monitor
- Coverage reports for unused code

## Maintenance

- Regular dependency updates
- Performance monitoring review
- Asset optimization cycles
- Code quality audits

---

**Production Ready**: This configuration provides a complete, optimized, and scalable solution for the Chakra Hearts visual novel game.
