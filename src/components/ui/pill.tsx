import { type ButtonProps, Button } from "./button";

interface PillProps extends ButtonProps {
  children: React.ReactNode;
}

const Pill: React.FC<PillProps> = ({ children, className, ...props }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`rounded-full ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Pill;
