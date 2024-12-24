import alex from "~/assets/alex-snail.svg";
import bryce from "~/assets/bryce-dolphin.svg";
import borst from "~/assets/borst-turtle.svg";

export function App() {
  return (
    <div className="bg-background text-foreground flex h-screen w-screen flex-col items-center justify-center gap-2">
      <div className="flex w-full flex-wrap items-center justify-around">
        <img src={borst} alt="Borst Turtle" className="h-96 w-96" />
        <img src={alex} alt="Alex Snail" className="h-96 w-96" />
        <img src={bryce} alt="Bryce Dolphin" className="h-96 w-96" />
      </div>
    </div>
  );
}

export default App;
