import Card from "@/components/card";


export default function Home() {
  return (
    <div className="">
      <div className="carousel p-5 gap-10">
        <Card name="Handwritten Pdf" image="/cardImages/Handwritten.jpeg" redirectTo="/handwritten"/>
        <Card name="Digital file" image="/cardImages/Digital.png" redirectTo="/digital"/>
        <Card name="Copy Assignment" image="/cardImages/Copy.avif" redirectTo="/copy"/>
      </div>
    </div>
  );
}
