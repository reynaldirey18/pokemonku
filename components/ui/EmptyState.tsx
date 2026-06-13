type Props = {
  message: string;
};

export default function EmptyState({ message }: Props) {
  return (
    <p className="text-white/50 text-center py-12">{message}</p>
  );
}
