import { Button } from "@/components/ui/button";
import ToggleMode from "./components/toggle-mode";

export default function Home() {
  return (
    <div>Learn, prepare, and land your dream job.
      <br/>
      <Button>Let's Get Started</Button>
      <ToggleMode />
    </div>
  );
}
