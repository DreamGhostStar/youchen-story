import React from 'react';
interface BaseIconFontProps {
    className?: string;
    style?: React.CSSProperties;
    type: string;
}
export declare type IconFontProps = Partial<React.SVGProps<SVGSVGElement> & BaseIconFontProps>;
declare const IconFont: React.FC<IconFontProps>;
export default IconFont;
