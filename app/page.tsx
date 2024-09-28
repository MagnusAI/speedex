import { H1, H4, Text } from "@/components/custom/typosgraphy";

export default function Home() {
  return (
    <>
      <H1>Kennel Speedex</H1>
      <H4>opdræt under DKK og FCI</H4>
      <Text className='text-wrap max-w-xs'>
        Kennel Speedex er et lille seriøst opdræt af Jack Russell Terrier i
        Gilleleje. Her på siden kan du følge med i vores liv med hundene. Rigtig
        god fornøjelse.
      </Text>
    </>
  );
}
