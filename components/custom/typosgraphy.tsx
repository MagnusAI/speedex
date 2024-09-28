export function H1({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <h1 className={`text-foreground text-2xl lg:text-4xl font-bold ${className}`}>{children}</h1>;
}

export function H2({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <h2 className={`text-foreground text-xl lg:text-3xl font-bold ${className}`}>{children}</h2>;
}

export function H3({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <h3 className={`text-foreground text-lg lg:text-2xl font-bold ${className}`}>{children}</h3>;
}

export function H4({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <h4 className={`text-foreground text-base lg:text-xl font-bold ${className}`}>{children}</h4>;
}

export function H5({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <h5 className={`text-foreground text-sm lg:text-lg font-bold ${className}`}>{children}</h5>;
}

export function H6({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <h6 className={`text-foreground text-xs lg:text-base font-bold ${className}`}>{children}</h6>;
}

export function Label({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <label className={`text-foreground text-xs lg:text-sm ${className}`}>{children}</label>;
}

export function Text({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <p className={`text-foreground text-xs lg:text-base ${className}`}>{children}</p>;
}
