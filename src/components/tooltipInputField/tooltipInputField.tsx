import { Tooltip } from "antd";

interface IProps {
    message?: string;
    children: React.ReactNode;
}

const TooltipInputField = ({ message, children }: IProps) => {
    return (
        <Tooltip
            title={message ? <div className="text-center">{message}</div> : null}
            placement="bottom"
        >
            {children}
        </Tooltip>
    );
}

export default TooltipInputField;