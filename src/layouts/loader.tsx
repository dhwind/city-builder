import React, { ReactNode } from 'react';

import { useTranslations } from 'next-intl';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

type ComponentProps = {
  children: ReactNode;
  className?: string;
  isLoading: boolean;
  message?: string;
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
};

/**
 * Wrap your component with this, pass the necessary props
 * and it will show a loader until the component is loaded
 */
const LoaderLayout: React.FC<ComponentProps> = ({
  isLoading,
  message,
  children,
  className,
  size = 'medium',
}) => {
  const t = useTranslations();

  return (
    <>
      {isLoading ? (
        <div
          className={cn(
            'flex items-center justify-center gap-x-2 p-2',
            className,
          )}
        >
          <Spinner size={size} />
          {message ? <div>{t(message)}</div> : ''}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default LoaderLayout;
