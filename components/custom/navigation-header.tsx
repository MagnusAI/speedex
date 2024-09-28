import { H2 } from "./typosgraphy";

export function NavigationHeader({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <header
      className={`w-full h-16 flex items-center justify-center p-4 border-primary border-b-2 mb-4 ${className}`}
    >
      <div>
        <H2>Speedex</H2>
      </div>
    </header>
  );
}
