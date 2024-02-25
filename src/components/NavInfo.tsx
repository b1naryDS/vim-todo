import { Timer } from "lucide-react";

function NavInfo() {
return (
      <><strong>J</strong> for down,<br/>
      <strong>K </strong>for up,<br/>
      <strong>Space</strong> for checking,<br/>
      <p className="flex items-center gap-2"><strong>Enter</strong> for more info<Timer className="inline mx-2" size="20" />(coming soon)<br/></p>
      <p className="flex items-center gap-2"><strong>N</strong> for new todo<Timer className="inline mx-2" size="20" />(coming soon)<br/></p>
    </>)
}

export { NavInfo }
