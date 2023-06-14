/**
 * Inteface for Pop up Component
 * Describes the title and the message that is send to the component
 * Contains call back to parent component to close the Pop Up windows
 *
 */
 interface popupProps
{
    title: string;
    message: string;
    handleClose: (event: any) => void;
    handleProceed: (event: any) => void;
    success: boolean;
}

export default popupProps;
