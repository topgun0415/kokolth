interface LoadingBarProps {
  message?: string;
  subMessage?: string;
}

export default function LoadingBar({ message, subMessage }: LoadingBarProps) {
  return (
    <div className="flex flex-col justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
      {message && (
        <p className="mt-2 text-gray-600 text-sm font-medium">{message}</p>
      )}
      {subMessage && (
        <p className="mt-1 text-gray-400 text-xs">{subMessage}</p>
      )}
    </div>
  );
}
