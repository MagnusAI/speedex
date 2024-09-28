import Image from "next/image";
import dkkUddanet from "@/public/dkk-uddannet.png";

export function Footer() {
  return (
    <footer className="absolute left-0 bottom-0 w-full border-primary border-t-2  text-primary flex flex-col items-center justify-center py-6">
      <a href="https://www.dkk.dk/" target="_blank" rel="noopener noreferrer">
        <div className="bg-white rounded-full">
          <Image
            src={dkkUddanet}
            alt="DKK Uddannet Opdrætter"
            aria-label="DKK Uddannet Opdrætter"
            width={80}
            height={80}
            className="w-10 h-10 lg:w-20 lg:h-20"
          />
        </div>
      </a>
    </footer>
  );
}
