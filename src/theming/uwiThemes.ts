import { createLightTheme, createDarkTheme } from "@fluentui/react-components";
import type { BrandVariants, Theme } from '@fluentui/react-components';

const uwiTheme: BrandVariants = { 
  10: "#060300",
  20: "#241500",
  30: "#3B2300",
  40: "#4B2D00",
  50: "#5A3900",
  60: "#6A4500",
  70: "#795100",
  80: "#895E00",
  90: "#986C00",
  100: "#A87A00",
  110: "#B78800",
  120: "#C79700",
  130: "#D6A600",
  140: "#E4B61A",
  150: "#F1C635",
  160: "#FCD761"
};
    
export const lightTheme: Theme = {
    ...createLightTheme(uwiTheme),
    colorNeutralForeground2: '#F3F2F1',
    colorNeutralBackground1: '#F5F5F5',
    colorNeutralBackground2: '#FFFFFF'
};

export const darkTheme: Theme = {
    ...createDarkTheme(uwiTheme), 
    colorBrandForeground1: uwiTheme[110],
    colorBrandForeground2: uwiTheme[120],
};
    
    
     

     