import { Component, type ErrorInfo, type ReactNode } from "react";

import { reportLovableError } from "@/lib/lovable-error-reporting";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
  boundary: string;
};

type State = {
  hasError: boolean;
};

/**
 * Clerk can briefly expose an incomplete session while a browser cookie is
 * being refreshed. Keep that transient auth error from taking down public
 * route content, and report it for diagnosis instead of hiding it silently.
 */
export class AuthRuntimeBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportLovableError(error, {
      boundary: this.props.boundary,
      componentStack: info.componentStack?.slice(0, 2000),
    });
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
