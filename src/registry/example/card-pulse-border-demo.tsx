import {
  CardPulseBorder,
  CardPulseBorderContent,
  CardPulseBorderOutline,
} from "../smooth-ui/card-pulse-border";

export default function CardPulseBorderDemo() {
  return (
    <CardPulseBorder>
      <CardPulseBorderOutline />
      <CardPulseBorderContent>
        <p className="font-display font-semibold">Smooth UI</p>
      </CardPulseBorderContent>
    </CardPulseBorder>
  );
}
