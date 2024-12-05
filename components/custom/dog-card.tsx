import { Dog } from "@/data/dog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

export function DogCard({ dog }: { dog: Dog }) {
  return (
    <Card className="min-w-[260px] max-w-[260px] lg:min-w-[360px] lg:max-w-[360px] overflow-hidden">
      <div className="w-full overflow-hidden relative h-[160px] lg:h-[260px]">
        {dog.image && (
          <Image
            src={dog.image}
            alt={dog.name}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <CardHeader>
        <CardTitle>{dog.name}</CardTitle>
        <CardDescription>{dog.kennel}</CardDescription>
      </CardHeader>
    </Card>
  );
}
