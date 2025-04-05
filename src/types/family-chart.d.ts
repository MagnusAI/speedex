declare module 'family-chart' {
  interface FamilyChartOptions {
    container: HTMLElement;
    data: FamilyMember[];
    nodeWidth?: number;
    nodeHeight?: number;
    nodeGap?: number;
    levelGap?: number;
    nodeStyle?: {
      fill?: string;
      stroke?: string;
      strokeWidth?: number;
      rx?: number;
      ry?: number;
    };
    textStyle?: {
      fill?: string;
      fontSize?: number;
      fontWeight?: string;
    };
    linkStyle?: {
      stroke?: string;
      strokeWidth?: number;
    };
  }

  interface FamilyMember {
    id: string;
    name: string;
    breed: string;
    gender: 'male' | 'female';
    parents?: string[];
    children?: string[];
  }

  class FamilyChart {
    constructor(options: FamilyChartOptions);
    destroy(): void;
  }

  export { FamilyChart };
} 