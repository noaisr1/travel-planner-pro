import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  handleRetry = () => {
    this.props.onReset?.();
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.root}>
          <p className={styles.title}>Something went wrong</p>
          <p className={styles.detail}>Could not load trips. Check the server and try again.</p>
          <button type="button" className={styles.retry} onClick={this.handleRetry}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
