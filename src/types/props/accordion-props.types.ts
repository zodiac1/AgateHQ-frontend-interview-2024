import { ReactNode } from "react";

interface AccordionProps {
    title: string;
    children: ReactNode;
    titleClassOverride?: string;
    containerClassOverride?: string;
    buttonClassOverride?: string;
    buttonContentClassOverride?: string;
}

export default AccordionProps;