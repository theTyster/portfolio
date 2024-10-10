interface PortfolioDB<T = HTMLAnchorElement>{
  Data: {
    id: string;
    img: React.ReactNode;
    title?: string;
    onClick?: () => void;
    link?: [
      React.AnchorHTMLAttributes<T>["href"],
      React.AnchorHTMLAttributes<T>["target"]?,
    ];
    className?: string;
  };
  Names: Record<string, number>
  Map: Map<PortfolioDB['Names'], PortfolioDB["Data"][]>;
}
