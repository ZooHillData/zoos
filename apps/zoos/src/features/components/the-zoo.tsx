import { cn } from "@zoos/shadcn";

import alex from "../../assets/alex-snail.svg";
import bryce from "../../assets/bryce-dolphin.svg";
import borst from "../../assets/borst-turtle.svg";
import brian from "../../assets/brian-monkey.svg";

type Props = { className?: string; style?: React.CSSProperties };

const AlexSnail = (props: Props) => (
  <img src={alex} alt="Alex Snail" {...props} />
);
const BryceDolphin = (props: Props) => (
  <img src={bryce} alt="Bryce Dolphin" {...props} />
);
const BrianMonkey = (props: Props) => (
  <img src={brian} alt="Brian Monkey" {...props} />
);
const BorstTurtle = (props: Props) => (
  <img src={borst} alt="Borst Turtle" {...props} />
);

const TheZoo = ({ className }: { className?: string }) => (
  <>
    <AlexSnail className="h-20 w-20" />
    <BryceDolphin className="h-20 w-20" />
    <BrianMonkey className="h-20 w-20" />
    <BorstTurtle className="h-20 w-20" />
  </>
);

export { TheZoo, AlexSnail, BryceDolphin, BrianMonkey, BorstTurtle };
