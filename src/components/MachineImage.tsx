import { ASSETS } from '@/lib/constants';

interface MachineImageProps {
  className?: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
}

export default function MachineImage({
  className = '',
  loading = 'lazy',
  priority = false,
}: MachineImageProps) {
  return (
    <img
      src={ASSETS.machine}
      alt="Nexera Smart CXH01 automated helmet cleaning machine"
      className={className}
      loading={priority ? 'eager' : loading}
      decoding={priority ? 'auto' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      width={620}
      height={700}
    />
  );
}
