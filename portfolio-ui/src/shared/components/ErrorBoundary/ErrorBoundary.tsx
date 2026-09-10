import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in sub-tree boundary:', error, errorInfo);
  }

  private handleRetry = () => this.setState({ hasError: false });

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          role="alert"
          style={{
            padding: '2.5rem',
            margin: '2rem auto',
            maxWidth: '500px',
            backgroundColor: 'rgba(255, 77, 77, 0.05)',
            border: '1.5px dashed rgba(255, 77, 77, 0.3)',
            borderRadius: '12px',
            textAlign: 'center',
            color: 'var(--color-text-primary)'
          }}
        >
          <h2 style={{ margin: '0 0 1rem 0', color: '#ff4d4d' }}>This section didn’t load</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
            Something went wrong while rendering it. Try again, or reload the page if it keeps happening.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
