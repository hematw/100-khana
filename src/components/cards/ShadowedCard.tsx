import { Card } from "../ui/card";
import "./card.css"

const ShadowedCard: React.FC<{ children: React.ReactNode, className?:string }> = ({ children, className }) => {
    return (
        <Card className={`card min-w-80 shadow-sm rounded-2xl transition-all duration-300 ${className}`}>
            <Card className="card2  rounded-2xl flex justify-center items-center min-h-full min-w-full">
                {children}
            </Card>
        </Card>
    );
}


export default ShadowedCard;
