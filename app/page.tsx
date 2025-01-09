import { H1, H2, H4, Text } from "@/components/custom/typosgraphy";
import { getDogs } from "./actions";
import { DogCard } from "@/components/custom/dog-card";
import '@aws-amplify/ui-react/styles.css';

export default function Home() {
  const dogs = getDogs();

  return (
    <>
      <div className="px-2 lg:px-6">
        <H1>Kennel Speedex</H1>
        <H4>opdræt under DKK og FCI</H4>
        <Text className="text-wrap max-w-xs">
          Kennel Speedex er et lille seriøst opdræt af Jack Russell Terrier i
          Gilleleje. Her på siden kan du følge med i vores liv med hundene.
          Rigtig god fornøjelse.
        </Text>
      </div>
      <div className="flex flex-col gap-4 py-6   bg-primary">
        <div className="px-4">
          <H2 className="text-white">Vores hunde</H2>
        </div>
        <div className="flex gap-8 px-4 overflow-x-auto">
          {dogs.map((dog) => (
            <DogCard key={dog.name} dog={dog} />
          ))}
        </div>
      </div>
    </>
  );
}
