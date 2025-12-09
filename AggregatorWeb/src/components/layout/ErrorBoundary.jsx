import React, { Component } from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import Button from '../ui/Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <FiAlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Что-то пошло не так
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Приложение столкнулось с ошибкой. Пожалуйста, попробуйте обновить страницу.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6 text-left">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Детали ошибки:
              </div>
              <code className="text-xs text-red-600 dark:text-red-400 break-all">
                {this.state.error?.toString()}
              </code>
              {this.state.errorInfo && (
                <details className="mt-3">
                  <summary className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                    Подробности стека
                  </summary>
                  <pre className="mt-2 text-xs text-gray-500 dark:text-gray-400 overflow-auto max-h-40 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={this.handleReset}
                className="flex-1"
              >
                <FiRefreshCw className="mr-2" />
                Обновить приложение
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/'}
                className="flex-1"
              >
                На главную
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;