'use client';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  // O metadata agora é gerenciado pelo generateMetadata() no layout.tsx
  // Este componente pode ser usado para outras funcionalidades se necessário
  return <>{children}</>;
}
