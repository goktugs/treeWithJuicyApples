import { AppleSvg } from "../assets/appleSvg";

interface AppleProps {
  className?: string;
  color: string;
  style?: React.CSSProperties;
}

export const Apple: React.FC<AppleProps> = ({ className, color, style }) => {
  return (
    <div style={style} className={`apple ${className}`}>
      <AppleSvg width="50px" height="50px" color={color} />
    </div>
  );
};
