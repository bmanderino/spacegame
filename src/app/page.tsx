import Image from "next/image";
import styles from "./page.module.css";
import { createClient } from '@/utils/supabase/server';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

// these can all be different commits
// - make sure everything is server components (sanity check - turn off JS in browser)
// - [X] populate a row with a sample save state (serialized state of the world, not the setup inputs)
// - [X] load that data via supabase
// - [ ] unpack next steps for setup

// type StateOfWorld = {
//   player: unknown;
// }
type StateOfWorld = any;

async function loadWorld(): StateOfWorld {
  // TODO: actually pull from supabase
  // let's hardcode the first row
  const supabase = createClient();
  const { data: world } = await supabase.from("world").select();
  const userID = '1';


  // this is the state of the world, not the setup input
  return world
}

export default async function Home() {
  const worldState = await loadWorld();
  console.log(worldState)

  return (
    <main>
      {worldState.map((world:any) => <div key={world.id}>
        <p>Name: {world.worldState.character?.name}</p>
        <p>Role: {world.worldState.character?.role}</p>
        <p>ShipName: {world.worldState.character?.shipName}</p>
      </div>)}
    </main>
  );
}
