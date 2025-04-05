declare module 'f3' {
  interface StoreOptions {
    data: any[];
    node_separation?: number;
    level_separation?: number;
  }

  interface CardOptions {
    store: any;
    svg: any;
    card_dim: {
      w: number;
      h: number;
      text_x: number;
      text_y: number;
      img_w: number;
      img_h: number;
      img_x: number;
      img_y: number;
    };
    card_display: ((i: any) => string)[];
    mini_tree?: boolean;
    link_break?: boolean;
  }

  interface F3 {
    createStore(options: StoreOptions): any;
    createSvg(container: HTMLElement): any;
    view(tree: any, svg: any, Card: any, props?: any): void;
    elements: {
      Card(options: CardOptions): any;
    };
  }

  const f3: F3;
  export default f3;
} 