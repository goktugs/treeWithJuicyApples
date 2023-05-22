import { AppleSvg } from "../assets/appleSvg";

interface AppleProps {
  className?: string;
  color: string;
}

export const Apple: React.FC<AppleProps> = ({ className, color }) => {
  return (
    <div className={`apple ${className}`}>
      <AppleSvg width="50px" height="50px" color={color} />
    </div>
  );
};
