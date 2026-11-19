import { Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ColorStudioCanvas, type ColorStudioCanvasProps } from './ColorStudioCanvas';

class CanvasBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function mount(container: HTMLElement, onUnavailable: () => void) {
  const root = createRoot(container);
  const lost = (event: Event) => {
    event.preventDefault();
    onUnavailable();
  };
  container.addEventListener('webglcontextlost', lost, true);
  return {
    render(props: ColorStudioCanvasProps) {
      root.render(<CanvasBoundary onUnavailable={onUnavailable}><ColorStudioCanvas {...props} /></CanvasBoundary>);
    },
    destroy() {
      container.removeEventListener('webglcontextlost', lost, true);
      root.unmount();
    },
  };
}
