
type InfoItemProps = {
  label: string;
  value: string;
};

export const InfoItem = ({ label, value }: InfoItemProps) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-muted/20 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-card-foreground">{value}</span>
    </div>
  );
};
